import { Link } from 'react-router-dom';
import { Brain } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <Brain className="h-16 w-16 text-blue-600" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to MASS News Detection
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Secure, seamless, and intelligent fake news detection powered by AI.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/login"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-50 transition-colors font-semibold border border-blue-600"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}