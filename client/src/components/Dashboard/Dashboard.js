import { useState, useEffect } from 'react';
import api from '../../services/api';
import RiskMeter from './RiskMeter';
import HealthChart from './HealthChart';
import { useAuth } from '../../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  const [riskData, setRiskData] = useState(null);
  const [stats, setStats] = useState({ water: 0, pain: 0, sleep: 0 });

  useEffect(() => {
    fetchRiskPrediction();
    fetchRecentLogs();
  }, []);

  const fetchRiskPrediction = async () => {
    try {
      const { data } = await api.get('/ai/predict-risk');
      setRiskData(data);
    } catch (error) {
      console.error('Failed to fetch risk prediction');
    }
  };

  const fetchRecentLogs = async () => {
    try {
      const [nutrition, crisis] = await Promise.all([
        api.get('/nutrition/today'),
        api.get('/crisis/recent')
      ]);
      setStats({
        water: nutrition.data.waterIntake || 0,
        pain: crisis.data[0]?.painLevel || 0,
        sleep: crisis.data[0]?.sleepHours || 0
      });
    } catch (error) {
      console.error('Failed to fetch stats');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Welcome back, {user?.name?.split(' ')[0]}!
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <RiskMeter riskScore={riskData?.riskScore} factors={riskData?.contributingFactors} />
        </div>
        <div className="lg:col-span-2">
          <HealthChart />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <QuickStatCard title="Hydration" value={`${stats.water} glasses`} icon="💧" />
        <QuickStatCard title="Pain Level" value={`${stats.pain}/10`} icon="📊" />
        <QuickStatCard title="Sleep" value={`${stats.sleep} hours`} icon="😴" />
      </div>
    </div>
  );
}

function QuickStatCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-lg shadow p-5">
      <div className="flex items-center">
        <span className="text-3xl mr-3">{icon}</span>
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}