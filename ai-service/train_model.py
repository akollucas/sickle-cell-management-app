import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import pickle

# Generate synthetic training data
np.random.seed(42)
n_samples = 1000

data = {
    'hydration': np.random.normal(5, 2, n_samples),
    'pain': np.random.poisson(3, n_samples),
    'sleep': np.random.normal(7, 1.5, n_samples),
    'activity': np.random.choice([1,2,3], n_samples, p=[0.3,0.5,0.2]),
    'days_since_crisis': np.random.poisson(20, n_samples)
}
df = pd.DataFrame(data)

# Create target: crisis within next 7 days (1 = crisis, 0 = no crisis)
df['crisis'] = (
    (df['hydration'] < 4) & (df['pain'] > 5) |
    (df['sleep'] < 5) |
    (df['days_since_crisis'] < 7)
).astype(int)

# Add noise to make it realistic
df['crisis'] = np.where(np.random.random(n_samples) < 0.1, 1 - df['crisis'], df['crisis'])

X = df[['hydration', 'pain', 'sleep', 'activity', 'days_since_crisis']]
y = df['crisis']

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X, y)

# Save model
with open('model.pkl', 'wb') as f:
    pickle.dump(model, f)

print(f"Model trained and saved. Accuracy: {model.score(X, y):.2f}")
print("Features: hydration, pain, sleep, activity, days_since_crisis")