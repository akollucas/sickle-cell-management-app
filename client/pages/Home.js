import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        Sickle Cell Care Companion
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        AI-powered monitoring and crisis prediction for children with Sickle Cell Disease.
      </p>
      <Link to="/register" className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium">
        Get Started
      </Link>
    </div>
  );
}