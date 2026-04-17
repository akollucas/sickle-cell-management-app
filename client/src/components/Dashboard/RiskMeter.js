export default function RiskMeter({ riskScore = 25, factors = [] }) {
  const getRiskColor = (score) => {
    if (score < 30) return 'bg-green-500';
    if (score < 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getRiskText = (score) => {
    if (score < 30) return 'Low Risk';
    if (score < 60) return 'Moderate Risk';
    return 'High Risk';
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Crisis Risk Prediction</h2>
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-gray-600 bg-gray-200">
              Today's Risk
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-gray-600">
              {Math.round(riskScore)}%
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-4 mb-4 text-xs flex rounded bg-gray-200">
          <div
            style={{ width: `${riskScore}%` }}
            className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${getRiskColor(riskScore)}`}
          ></div>
        </div>
        <p className={`text-xl font-bold ${getRiskColor(riskScore).replace('bg-', 'text-')}`}>
          {getRiskText(riskScore)}
        </p>
      </div>
      
      {factors?.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Contributing Factors</h3>
          <ul className="space-y-1 text-sm text-gray-600">
            {factors.map((factor, i) => (
              <li key={i} className="flex items-center">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                {factor}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}