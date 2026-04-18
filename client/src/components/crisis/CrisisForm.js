import { useState } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';

export default function CrisisForm() {
  const [formData, setFormData] = useState({
    painLevel: 0,
    painLocation: [],
    sleepHours: 7,
    notes: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/crisis', formData);
      toast.success('Crisis log saved');
      setFormData({ painLevel: 0, painLocation: [], sleepHours: 7, notes: '' });
    } catch (error) {
      toast.error('Failed to save log');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Log Crisis Event</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Pain Level (0-10)</label>
          <input
            type="range"
            min="0"
            max="10"
            value={formData.painLevel}
            onChange={(e) => setFormData({ ...formData, painLevel: parseInt(e.target.value) })}
            className="w-full"
          />
          <span className="text-sm text-gray-500">{formData.painLevel}</span>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Sleep Hours</label>
          <input
            type="number"
            value={formData.sleepHours}
            onChange={(e) => setFormData({ ...formData, sleepHours: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Notes</label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            rows="3"
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Save Log
        </button>
      </form>
    </div>
  );
}