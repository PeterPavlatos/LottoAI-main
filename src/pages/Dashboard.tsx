import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';
import { CreditCard, Brain, History, Sparkles } from 'lucide-react';
import { BuyCreditsModal } from '../components/BuyCreditsModal';
import { generateRandomNumbers, type LotteryNumbers } from '../lib/numberGeneration';
import { WinningNumbers } from '../components/WinningNumbers';

export function Dashboard() {
  const { user, credits, setCredits } = useAuthStore();
  const [generations, setGenerations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [isBuyCreditsModalOpen, setIsBuyCreditsModalOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const navigate = useNavigate();
  const userType = credits > 0 ? 'Premium' : 'Free';

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const loadUserData = async () => {
      try {
        // Load user profile - Fixed query to use eq() before single()
        const { data: profileData, error: profileError } = await supabase
          .from('user_profiles')
          .select('first_name')
          .eq('user_id', user.id)
          .single();

        if (profileError) {
          console.error('Error loading profile:', profileError);
        } else if (profileData) {
          setFirstName(profileData.first_name);
        }

        // Load user credits
        const { data: creditsData } = await supabase
          .from('user_credits')
          .select('credits')
          .eq('user_id', user.id)
          .single();

        if (creditsData) {
          setCredits(creditsData.credits);
        }

        // Load recent generations
        const { data: generationsData } = await supabase
          .from('number_generations')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(5);

        if (generationsData) {
          setGenerations(generationsData);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [user, navigate, setCredits]);

  const handleGenerateNumbers = async (useAI: boolean) => {
    if (useAI && credits < 1) {
      alert('You need at least 1 credit to use AI generation');
      return;
    }

    setGenerating(true);
    try {
      // Generate numbers
      const numbers: LotteryNumbers = generateRandomNumbers();
      
      // For AI generation, deduct credits and save to database
      if (useAI) {
        const { error: creditsError } = await supabase
          .from('user_credits')
          .update({ credits: credits - 1 })
          .eq('user_id', user.id);

        if (creditsError) throw creditsError;
        setCredits(credits - 1);
      }

      // Save to database
      const { error: generationError } = await supabase
        .from('number_generations')
        .insert({
          user_id: user.id,
          numbers: [...numbers.mainNumbers, numbers.bonusNumber],
          is_ai_generated: useAI
        });

      if (generationError) throw generationError;

      // Update local state
      const newGeneration = {
        id: Date.now(), // Temporary ID until we refresh
        user_id: user.id,
        numbers: [...numbers.mainNumbers, numbers.bonusNumber],
        is_ai_generated: useAI,
        created_at: new Date().toISOString()
      };
      setGenerations([newGeneration, ...generations.slice(0, 4)]);
    } catch (error) {
      console.error('Error generating numbers:', error);
      alert('Failed to generate numbers. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h1 className="text-2xl font-bold mb-2">Welcome Back{firstName ? `, ${firstName}` : ''}!</h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">Account Type:</span>
          <span className={`px-3 py-1 rounded-full text-sm ${
            userType === 'Premium' 
              ? 'bg-indigo-100 text-indigo-600' 
              : 'bg-gray-100 text-gray-600'
          }`}>
            {userType} User
          </span>
        </div>
      </div>

      <WinningNumbers />
      
      <div className="grid md:grid-cols-2 gap-8 mt-8">
        {/* Credits Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="bg-indigo-100 p-3 rounded-full">
              <CreditCard className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-2xl font-semibold">Credits</h2>
              <p className="text-gray-600">Available: {credits}</p>
            </div>
          </div>
          <button 
            onClick={() => setIsBuyCreditsModalOpen(true)}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition"
          >
            Buy More Credits
          </button>
        </div>

        {/* Free Generation Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="bg-indigo-100 p-3 rounded-full">
              <Brain className="h-6 w-6 text-indigo-600" />
            </div>
            <h2 className="ml-4 text-2xl font-semibold">Free Generation</h2>
          </div>
          <button 
            onClick={() => handleGenerateNumbers(false)}
            disabled={generating}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {generating ? 'Generating...' : 'Generate Free Numbers'}
          </button>
          <p className="text-sm text-gray-500 mt-2">
            Generate random numbers without using AI analysis.
          </p>
        </div>

        {/* AI Generation Card - Full Width */}
        <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2">
          <div className="flex items-center mb-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <Sparkles className="h-6 w-6 text-purple-600" />
            </div>
            <h2 className="ml-4 text-2xl font-semibold">AI-Powered Generation</h2>
          </div>
          <div className="space-y-4">
            <button 
              onClick={() => handleGenerateNumbers(true)}
              disabled={generating || credits < 1}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              <Sparkles className="h-5 w-5" />
              <span>{generating ? 'Generating...' : 'Generate AI Numbers'}</span>
            </button>
            {credits < 1 ? (
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-red-600 text-sm">
                  You need at least 1 credit to use AI generation.{' '}
                  <button 
                    onClick={() => setIsBuyCreditsModalOpen(true)}
                    className="text-red-700 font-semibold hover:text-red-800"
                  >
                    Buy credits
                  </button>
                </p>
              </div>
            ) : (
              <p className="text-sm text-gray-600">
                Uses advanced AI to analyze patterns and generate optimized numbers. Costs 1 credit per generation.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center mb-6">
          <div className="bg-indigo-100 p-3 rounded-full">
            <History className="h-6 w-6 text-indigo-600" />
          </div>
          <h2 className="ml-4 text-2xl font-semibold">Recent Generations</h2>
        </div>

        {generations.length === 0 ? (
          <p className="text-gray-600 text-center py-4">No generations yet</p>
        ) : (
          <div className="space-y-6">
            {generations.map((gen) => (
              <div key={gen.id} className="border rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-full ${gen.is_ai_generated ? 'bg-purple-100' : 'bg-indigo-100'}`}>
                      {gen.is_ai_generated ? (
                        <Sparkles className={`h-5 w-5 ${gen.is_ai_generated ? 'text-purple-600' : 'text-indigo-600'}`} />
                      ) : (
                        <Brain className="h-5 w-5 text-indigo-600" />
                      )}
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-600">
                      {gen.is_ai_generated ? 'AI Generated' : 'Random Generation'}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(gen.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {gen.numbers.slice(0, -1).map((number: number, index: number) => (
                    <div
                      key={index}
                      className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-600"
                    >
                      {number}
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center font-bold text-yellow-600">
                    {gen.numbers[gen.numbers.length - 1]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BuyCreditsModal 
        isOpen={isBuyCreditsModalOpen}
        onClose={() => setIsBuyCreditsModalOpen(false)}
      />
    </div>
  );
}