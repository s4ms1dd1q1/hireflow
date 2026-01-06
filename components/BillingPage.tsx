
import React from 'react';
import { Check, Sparkles, Zap, ShieldCheck } from 'lucide-react';

export default function BillingPage() {
  return (
    <div className="p-10 max-w-5xl mx-auto space-y-12 animate-fade-in">
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-semibold tracking-tight text-gray-900">Subscription & Billing</h1>
        <p className="text-gray-500 font-normal max-w-lg mx-auto leading-relaxed text-[15px]">
          Unlock advanced AI tailoring, deep analytics, and unlimited applications to accelerate your job search.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
        {/* Free Plan */}
        <div className="bg-white p-10 rounded-3xl border border-gray-100 relative group transition-all duration-300 shadow-sm hover:shadow-md">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Essential</h3>
          <p className="text-gray-400 text-sm font-normal mb-8 uppercase tracking-widest">Baseline Experience</p>
          <div className="flex items-baseline gap-1 mb-8">
            <span className="text-4xl font-bold text-gray-900">$0</span>
            <span className="text-gray-400 text-sm font-medium">/month</span>
          </div>
          
          <ul className="space-y-4 mb-10">
            {[
              'Up to 15 applications',
              'Basic Kanban tracking',
              '3 AI resume tailorings / week',
              'Community support'
            ].map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-gray-600 font-normal">
                <Check size={16} className="text-gray-300 shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
          
          <button className="w-full py-3 border border-gray-200 rounded-2xl text-sm font-semibold text-gray-400 bg-gray-50 cursor-default">
            Current Plan
          </button>
        </div>

        {/* Pro Plan - Monochrome Refresh */}
        <div className="bg-white p-10 rounded-3xl border-2 border-gray-900 relative group transition-all duration-300 shadow-xl shadow-gray-100">
          <div className="absolute top-0 right-10 -translate-y-1/2 px-4 py-1.5 bg-gray-900 text-white text-[11px] font-bold rounded-full uppercase tracking-widest flex items-center gap-2">
            <Sparkles size={12} className="text-white" />
            Recommended
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-2">HireFlow Pro</h3>
          <p className="text-gray-500 text-sm font-normal mb-8 uppercase tracking-widest">Career Powerhouse</p>
          <div className="flex items-baseline gap-1 mb-8">
            <span className="text-4xl font-bold text-gray-900">$19</span>
            <span className="text-gray-500 text-sm font-medium">/month</span>
          </div>
          
          <ul className="space-y-4 mb-10">
            {[
              'Unlimited applications',
              'Advanced analytics dashboard',
              'Unlimited AI tailorings',
              'Custom resume versions',
              'Priority 24/7 support',
              'Early access to new features'
            ].map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-gray-900 font-medium">
                <Zap size={16} className="text-gray-900 shrink-0 fill-gray-900" />
                {feature}
              </li>
            ))}
          </ul>
          
          <button className="w-full py-3 bg-gray-900 text-white rounded-2xl text-sm font-bold hover:bg-black transition-all shadow-xl shadow-gray-200">
            Upgrade to Pro
          </button>
        </div>
      </div>

      <div className="p-8 bg-white rounded-3xl border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gray-50 text-gray-900 rounded-2xl border border-gray-100">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">Secure Billing</h4>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-tighter">Payments processed via Stripe</p>
          </div>
        </div>
        <div className="flex gap-6 items-center">
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4 grayscale contrast-0 opacity-30" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3 grayscale contrast-0 opacity-30" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5 grayscale contrast-0 opacity-30" />
        </div>
      </div>
    </div>
  );
}
