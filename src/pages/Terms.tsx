import React from 'react';
import { Shield } from 'lucide-react';

export function Terms() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center mb-8">
          <div className="bg-indigo-100 p-3 rounded-full">
            <Shield className="h-6 w-6 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold ml-4">Terms and Conditions</h1>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">1. Gambling Awareness and Risks</h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
              <p className="text-red-700 font-semibold mb-4">⚠️ Important Gambling Warning</p>
              <p className="text-red-600">
                Gambling can be addictive and may result in substantial financial losses. If you or someone you know has a gambling problem, please seek help:
              </p>
              <ul className="list-disc ml-6 mt-2 text-red-600">
                <li>National Problem Gambling Helpline: 1-800-522-4700</li>
                <li>Visit: www.ncpgambling.org</li>
              </ul>
            </div>
            <p className="text-gray-600 mb-4">
              LottoAI strongly encourages responsible gambling. Never gamble with money you cannot afford to lose. Gambling should not be considered a way to make money or solve financial problems.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">2. Disclaimer of Guarantees</h2>
            <p className="text-gray-600 mb-4">
              While LottoAI uses advanced technology to analyze patterns and generate numbers, we make absolutely NO guarantees or promises regarding:
            </p>
            <ul className="list-disc ml-6 text-gray-600 space-y-2">
              <li>Winning any lottery game</li>
              <li>The accuracy of predictions</li>
              <li>The effectiveness of our number generation system</li>
              <li>Financial returns or profits</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">3. AI Technology Limitations</h2>
            <p className="text-gray-600 mb-4">
              Our AI-powered number generation system is based on mathematical models and historical data analysis. However:
            </p>
            <ul className="list-disc ml-6 text-gray-600 space-y-2">
              <li>Lottery drawings are completely random events</li>
              <li>Past results do not guarantee future outcomes</li>
              <li>AI predictions cannot influence or predict random events with certainty</li>
              <li>No system or method can guarantee lottery wins</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">4. Limitation of Liability</h2>
            <p className="text-gray-600 mb-4">
              By using LottoAI, you acknowledge and agree that:
            </p>
            <ul className="list-disc ml-6 text-gray-600 space-y-2">
              <li>LottoAI and its affiliates are not responsible for any gambling losses</li>
              <li>We are not liable for any financial decisions made based on our services</li>
              <li>All number generations and predictions are for entertainment purposes only</li>
              <li>Users are solely responsible for their gambling decisions and consequences</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">5. Age Restrictions and Legal Compliance</h2>
            <p className="text-gray-600 mb-4">
              Users must:
            </p>
            <ul className="list-disc ml-6 text-gray-600 space-y-2">
              <li>Be of legal gambling age in their jurisdiction</li>
              <li>Comply with all local gambling laws and regulations</li>
              <li>Verify their eligibility to participate in lottery games</li>
              <li>Not use our service where prohibited by law</li>
            </ul>
          </section>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-8">
            <p className="text-yellow-800 font-semibold">
              By using LottoAI, you acknowledge that you have read, understood, and agree to these terms and conditions. If you do not agree with any part of these terms, please do not use our service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}