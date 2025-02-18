import React from 'react';
import { X, CreditCard, Sparkles, Star, Crown } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { createCheckoutSession, stripePromise } from '../lib/stripe';

interface BuyCreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const creditPackages = [
  {
    id: 'basic',
    name: 'Starter Pack',
    credits: 5,
    price: 20,
    icon: CreditCard,
    color: 'indigo'
  },
  {
    id: 'popular',
    name: 'Popular Pack',
    credits: 12,
    price: 40,
    icon: Sparkles,
    color: 'purple',
    popular: true
  },
  {
    id: 'pro',
    name: 'Pro Pack',
    credits: 25,
    price: 80,
    icon: Star,
    color: 'blue'
  },
  {
    id: 'ultimate',
    name: 'Ultimate Pack',
    credits: 35,
    price: 100,
    icon: Crown,
    color: 'yellow'
  }
];

export function BuyCreditsModal({ isOpen, onClose }: BuyCreditsModalProps) {
  const { user } = useAuthStore();

  const handlePurchase = async (packageId: string) => {
    try {
      if (!user) {
        throw new Error('User must be logged in to purchase credits');
      }

      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe failed to load');
      }

      const session = await createCheckoutSession(user.id);
      
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id
      });

      if (error) {
        throw error;
      }
    } catch (err) {
      console.error('Error initiating checkout:', err);
      // Handle error (show error message to user)
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-3xl w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold text-center mb-2">Buy Credits</h2>
        <p className="text-gray-600 text-center mb-8">Choose the package that best fits your needs</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {creditPackages.map((pkg) => {
            const IconComponent = pkg.icon;
            return (
              <div 
                key={pkg.id}
                className={`relative bg-white border-2 rounded-lg p-6 ${
                  pkg.popular 
                    ? 'border-purple-500 shadow-lg transform hover:scale-105' 
                    : 'border-gray-200 hover:border-indigo-300'
                } transition-all`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-purple-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="flex items-center mb-4">
                  <div className={`bg-${pkg.color}-100 p-3 rounded-full`}>
                    <IconComponent className={`h-6 w-6 text-${pkg.color}-600`} />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg">{pkg.name}</h3>
                    <p className="text-gray-600">{pkg.credits} credits</p>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-3xl font-bold text-gray-900">${pkg.price}</p>
                  <p className="text-gray-500 text-sm">
                    ${(pkg.price / pkg.credits).toFixed(2)} per credit
                  </p>
                </div>

                <button
                  onClick={() => handlePurchase(pkg.id)}
                  className={`w-full py-3 px-6 rounded-lg ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700'
                      : 'bg-indigo-600 hover:bg-indigo-700'
                  } text-white transition`}
                >
                  Purchase Now
                </button>
              </div>
            );
          })}
        </div>

        <p className="text-sm text-gray-500 text-center mt-8">
          Secure payment powered by Stripe • 100% secure checkout
        </p>
      </div>
    </div>
  );
}