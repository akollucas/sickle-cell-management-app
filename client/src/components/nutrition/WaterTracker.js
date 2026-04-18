import { useState } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';

export default function WaterTracker() {
  const [waterIntake, setWaterIntake] = useState(0);

  const handleAddWater = async () => {
    const newIntake = waterIntake + 1;
    setWaterIntake(newIntake);
    try {
      await api.post('/nutrition', { waterIntake: newIntake });
    } catch (error) {
      toast.error('Failed to update hydration');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Hydration Tracker</h1>
      <div className="bg-white shadow rounded-lg p-6 text-center">
        <div className="text-6xl mb-4">💧</div>
        <p className="text-4xl font-bold text-indigo-600 mb-4">{waterIntake}</p>
        <p className="text-gray-600 mb-6">glasses of water today</p>
        <button
          onClick={handleAddWater}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 text-lg"
        >
          + Add Glass
        </button>
      </div>
    </div>
  );
}