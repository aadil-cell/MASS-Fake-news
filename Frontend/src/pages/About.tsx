import { Link } from 'react-router-dom';
import { Brain, LayoutDashboard, Info, LogOut } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <Brain className="h-8 w-8 text-blue-600" />
            <span className="font-bold text-xl">MASS News</span>
          </div>
          <nav className="space-y-2">
            <Link
              to="/dashboard"
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              <LayoutDashboard className="h-5 w-5" />
              Predict News
            </Link>
            <Link
              to="/about"
              className="flex items-center gap-2 px-4 py-2 text-blue-600 bg-blue-50 rounded-lg"
            >
              <Info className="h-5 w-5" />
              About
            </Link>
            <Link
              to="/login"
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">About MASS News Detection</h1>
          
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">Our Mission</h2>
            <p className="text-gray-600 mb-8">
              MASS News Detection is dedicated to combating the spread of misinformation by providing
              a powerful, AI-driven tool that helps users identify potential fake news articles.
              Our platform employs advanced machine learning algorithms to analyze news content
              and provide reliable assessments of its authenticity.
            </p>

            <h2 className="text-2xl font-semibold mb-6">Technology Stack</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                <strong>Frontend:</strong> Built with React and Tailwind CSS for a modern,
                responsive user interface.
              </p>
              <p>
                <strong>Backend:</strong> Powered by a robust Node.js server with Express,
                ensuring fast and reliable performance.
              </p>
              <p>
                <strong>AI Model:</strong> Utilizes state-of-the-art natural language processing
                and machine learning algorithms, trained on a vast dataset of verified news articles.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}