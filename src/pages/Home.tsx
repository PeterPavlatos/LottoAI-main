import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Brain, Sparkles, Check } from 'lucide-react';
import { WinningNumbers } from '../components/WinningNumbers';
import { generateRandomNumbers, type LotteryNumbers } from '../lib/numberGeneration';

const creditPackages = [
  {
    id: 'basic',
    name: 'Starter Pack',
    credits: 5,
    price: 20,
    description: 'Perfect for trying out our AI-powered predictions'
  },
  {
    id: 'popular',
    name: 'Popular Pack',
    credits: 12,
    price: 40,
    description: 'Our most popular choice for regular players'
  },
  {
    id: 'pro',
    name: 'Pro Pack',
    credits: 25,
    price: 80,
    description: 'Ideal for serious players who need more predictions'
  },
  {
    id: 'ultimate',
    name: 'Ultimate Pack',
    credits: 35,
    price: 100,
    description: 'Best value for maximum AI-powered predictions'
  }
];

export function Home() {
  const [generatedNumbers, setGeneratedNumbers] = useState<LotteryNumbers | null>(null);
  const [generating, setGenerating] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(creditPackages[0].id);

  const handleFreeGeneration = () => {
    setGenerating(true);
    setTimeout(() => {
      const numbers = generateRandomNumbers();
      setGeneratedNumbers(numbers);
      setGenerating(false);
    }, 500);
  };

  const selectedPkg = creditPackages.find(pkg => pkg.id === selectedPackage) || creditPackages[0];

  return (
    <div>
      {/* Hero Section */}
      <div 
        className="relative h-[500px] flex items-center justify-center mb-16"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="text-center text-white z-10 px-4">
          <h1 className="text-5xl font-bold mb-6">Transform Your Lottery Strategy</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Harness the power of AI to make smarter lottery number selections. Join thousands of players who trust LottoAI.
          </p>
          <Link
            to="/register"
            className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105"
          >
            Get Started Now
          </Link>
        </div>
      </div>

      {/* Winning Numbers Section */}
      <div className="max-w-4xl mx-auto px-4 mb-16">
        <WinningNumbers />
      </div>

      {/* Services Section */}
      <div className="max-w-6xl mx-auto px-4 mb-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-indigo-600 mb-4">Choose Your Path to Winning</h2>
          <p className="text-xl text-gray-600">Select the service that best fits your lottery strategy</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Free Tier */}
          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 hover:border-indigo-200 transition-all">
            <div className="flex items-center mb-4">
              <div className="bg-indigo-100 p-3 rounded-full">
                <Brain className="h-6 w-6 text-indigo-600" />
              </div>
              <h2 className="ml-4 text-2xl font-semibold">Free Service</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Perfect for casual players looking for quick number generation.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-gray-600">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                Random number generation
              </li>
              <li className="flex items-center text-gray-600">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                Instant results
              </li>
              <li className="flex items-center text-gray-600">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                No registration required
              </li>
            </ul>
            
            {generatedNumbers && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Your Generated Numbers</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {generatedNumbers.mainNumbers.map((number, index) => (
                    <div
                      key={index}
                      className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-600"
                    >
                      {number}
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center font-bold text-yellow-600">
                    {generatedNumbers.bonusNumber}
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  These numbers were generated randomly. For AI-powered predictions, try our premium service.
                </p>
              </div>
            )}

            <button 
              onClick={handleFreeGeneration}
              disabled={generating}
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {generating ? 'Generating...' : 'Generate Free Numbers'}
            </button>
          </div>

          {/* Premium Tier */}
          <div className="bg-white p-8 rounded-lg shadow-md border-2 border-indigo-600 transform hover:scale-105 transition-all">
            <div className="flex items-center mb-4">
              <div className="bg-indigo-100 p-3 rounded-full">
                <Sparkles className="h-6 w-6 text-indigo-600" />
              </div>
              <h2 className="ml-4 text-2xl font-semibold">Premium AI Service</h2>
            </div>
            <div className="mb-6">
              <p className="text-gray-600">
                Advanced AI-powered predictions for serious players.
              </p>
              <div className="mt-6 space-y-4">
                <div>
                  <label htmlFor="creditPackage" className="block text-sm font-medium text-gray-700 mb-2">
                    Select Credit Package
                  </label>
                  <select
                    id="creditPackage"
                    value={selectedPackage}
                    onChange={(e) => setSelectedPackage(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    {creditPackages.map(pkg => (
                      <option key={pkg.id} value={pkg.id}>
                        {pkg.name} - {pkg.credits} credits for ${pkg.price}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-gray-600">{selectedPkg.description}</p>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-indigo-600">${selectedPkg.price}</p>
                      <p className="text-sm text-gray-500">${(selectedPkg.price / selectedPkg.credits).toFixed(2)}/credit</p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Sparkles className="h-5 w-5 text-indigo-600 mr-2" />
                    <span>{selectedPkg.credits} AI-powered predictions</span>
                  </div>
                </div>
              </div>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-gray-600">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                AI-powered number analysis
              </li>
              <li className="flex items-center text-gray-600">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                Historical data insights
              </li>
              <li className="flex items-center text-gray-600">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                Pattern recognition
              </li>
              <li className="flex items-center text-gray-600">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                Premium support
              </li>
            </ul>
            <Link
              to="/register"
              className="block w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition text-center font-semibold"
            >
              Get Started with {selectedPkg.credits} Credits
            </Link>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-50 py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-indigo-600 mb-4">
            Ready to Transform Your Lottery Experience?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of satisfied users who have already discovered the power of AI-driven lottery predictions.
          </p>
          <Link
            to="/register"
            className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105"
          >
            Start Your Journey Today
          </Link>
        </div>
      </div>
    </div>
  );
}