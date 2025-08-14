import { useState, } from 'react';





import { Check, Shield, CreditCard, Smartphone, Building2 } from 'lucide-react';
import Footer from '../components/footer';
import Navbar from '../components/navbar';


const PricingPaymentSection = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [paymentMethod, setPaymentMethod] = useState('card');

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: { monthly: 9, yearly: 7 },
      description: 'Perfect for individuals getting started',
      features: [
        'Up to 5 projects',
        '10GB storage',
        'Email support',
        'Basic analytics',
        'Mobile app access',
        'API access',
        'Custom integrations'
      ],
      popular: false
    },
    {
      id: 'pro',
      name: 'Professional',
      price: { monthly: 29, yearly: 24 },
      description: 'Best for growing businesses and teams',
      features: [
        'Unlimited projects',
        '100GB storage',
        'Priority support',
        'Advanced analytics',
        'Team collaboration',
        'API access',
        'Custom integrations'
      ],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: { monthly: 99, yearly: 79 },
      description: 'For large organizations with custom',
      features: [
        'Everything in Pro',
        'Unlimited storage',
        '24/7 phone support',
        'Custom reporting',
        'SSO integration',
        'Dedicated account manager',
        'SLA guarantee'
      ],
      popular: false
    }
  ];

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
    { id: 'paypal', name: 'PayPal', icon: Shield },
    { id: 'apple', name: 'Apple Pay', icon: Smartphone },
    { id: 'google', name: 'Google Pay', icon: Building2 }
  ];

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
  };

  const calculateSavings = (monthly, yearly) => {
    const monthlyCost = monthly * 12;
    const yearlyCost = yearly * 12;
    return Math.round(((monthlyCost - yearlyCost) / monthlyCost) * 100);
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Scale your business with our flexible pricing options. No hidden fees, cancel anytime.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-12">
            <div className="bg-slate-800 p-1 rounded-lg border border-slate-700">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-md transition-all duration-300 ${
                  billingCycle === 'monthly'
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-2 rounded-md transition-all duration-300 ${
                  billingCycle === 'yearly'
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Yearly
                <span className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border transition-all duration-300  cursor-pointer ${
                plan.popular
                  ? 'border-purple-500 shadow-2xl shadow-purple-500/20'
                  : selectedPlan === plan.id
                  ? 'border-blue-500 shadow-xl shadow-blue-500/20'
                  : 'border-slate-700 hover:border-slate-600'
              }`}
              onClick={() => handlePlanSelect(plan.id)}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-4">{plan.description}</p>
                
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-4xl font-bold text-white">
                    ${plan.price[billingCycle]}
                  </span>
                  <span className="text-gray-400 ml-2">/month</span>
                </div>
                
                {billingCycle === 'yearly' && (
                  <p className="text-green-400 text-sm">
                    Save {calculateSavings(plan.price.monthly, plan.price.yearly)}% annually
                  </p>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                  selectedPlan === plan.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl'
                    : plan.popular
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg'
                    : 'bg-slate-700 text-white hover:bg-slate-600'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlanSelect(plan.id);
                }}
              >
                {selectedPlan === plan.id ? 'Selected' : 'Choose Plan'}
              </button>
            </div>
          ))}
        </div>

        {/* Payment Section */}
        

        {/* Trust Indicators */}
        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">Trusted by over 10,000+ businesses worldwide</p>
          <div className="flex justify-center items-center space-x-8 text-gray-500">
            <div className="flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              <span>30-day money back</span>
            </div>
            <div className="flex items-center">
              <Check className="w-5 h-5 mr-2" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center">
              <Star className="w-5 h-5 mr-2" />
              <span>24/7 support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default PricingPaymentSection;