import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Brain, LayoutDashboard, Info, LogOut, BarChart2, CheckCircle, XCircle, Users } from 'lucide-react';
import axios from 'axios';

interface Prediction {
  id: string;
  text: string;
  result: string;
  confidence: number;
  timestamp: string;
}

export default function Dashboard() {
  const [newsText, setNewsText] = useState('');
  const [result, setResult] = useState<null | { isReal: boolean; confidence: number }>(null);
  const [error, setError] = useState('');
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [stats, setStats] = useState({
    totalPredictions: 0,
    realNews: 0,
    fakeNews: 0,
    userActivity: 0
  });

  useEffect(() => {
    // Simulated data - replace with actual API calls
    setStats({
      totalPredictions: 156,
      realNews: 89,
      fakeNews: 67,
      userActivity: 42
    });

    setPredictions([
      {
        id: '1',
        text: 'NASA announces new mission to Mars',
        result: 'REAL',
        confidence: 95.5,
        timestamp: '2024-03-15 14:30'
      },
      {
        id: '2',
        text: 'Scientists discover dragons in Antarctica',
        result: 'FAKE',
        confidence: 98.2,
        timestamp: '2024-03-15 13:45'
      },
      // Add more mock predictions as needed
    ]);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);

    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', { text: newsText });
      const newResult = {
        isReal: response.data.prediction === 'Real News ✅',
        confidence: response.data.prediction === 'Real News ✅' ? response.data.confidence_real : response.data.confidence_fake
      };
      console.log(newResult)
      setResult(newResult);

      // Add new prediction to history
      const newPrediction: Prediction = {
        id: Date.now().toString(),
        text: newsText,
        result: newResult.isReal ? 'REAL' : 'FAKE',
        confidence: newResult.confidence,
        timestamp: new Date().toLocaleString()
      };
      setPredictions([newPrediction, ...predictions]);

      // Update stats
      setStats(prev => ({
        ...prev,
        totalPredictions: prev.totalPredictions + 1,
        realNews: prev.realNews + (newResult.isReal ? 1 : 0),
        fakeNews: prev.fakeNews + (newResult.isReal ? 0 : 1)
      }));
    } catch (err) {
      setError('Error connecting to the backend. Please try again later.');
    }
  };

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
              className="flex items-center gap-2 px-4 py-2 text-blue-600 bg-blue-50 rounded-lg"
            >
              <LayoutDashboard className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              to="/about"
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
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
        <div className="max-w-6xl mx-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center gap-4">
                <BarChart2 className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Total Predictions</p>
                  <p className="text-2xl font-bold">{stats.totalPredictions}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center gap-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Real News</p>
                  <p className="text-2xl font-bold">{stats.realNews}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center gap-4">
                <XCircle className="h-8 w-8 text-red-600" />
                <div>
                  <p className="text-sm text-gray-600">Fake News</p>
                  <p className="text-2xl font-bold">{stats.fakeNews}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center gap-4">
                <Users className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Active Users</p>
                  <p className="text-2xl font-bold">{stats.userActivity}</p>
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-8">Predict News</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="news" className="block text-sm font-medium text-gray-700 mb-2">
                Paste your news article or sentence
              </label>
              <textarea
                id="news"
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={newsText}
                onChange={(e) => setNewsText(e.target.value)}
                placeholder="Enter the news text here..."
              />
            </div>
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              disabled={!newsText.trim()}
            >
              Check
            </button>
          </form>

          {error && (
            <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {result && (
            <div className="mt-8 p-6 bg-white rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Analysis Result</h2>
              <div className={`text-xl font-semibold ${result.isReal ? 'text-green-600' : 'text-red-600'}`}>
                This news appears to be {result.isReal ? 'REAL' : 'FAKE'}
              </div>
              <div className="mt-2 text-gray-600">
                Confidence: {result.confidence}
              </div>
            </div>
          )}

          {/* Prediction History */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Recent Predictions</h2>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Text</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Confidence</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {predictions.map((prediction) => (
                      <tr key={prediction.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {prediction.text.length > 100 
                            ? `${prediction.text.substring(0, 100)}...` 
                            : prediction.text}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            prediction.result === 'REAL' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {prediction.result}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {prediction.confidence}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {prediction.timestamp}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}