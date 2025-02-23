import React from "react";

const SubscriptionPlans: React.FC = () => {
  const plans = [
    {
      name: "Basic",
      price: "Free",
      features: [
        "Access to mental health resources",
        "Guided self-help exercises",
        "Weekly motivational newsletters",
      ],
      bgColor: "bg-gray-100",
      textColor: "text-gray-800",
    },
    {
      name: "Standard",
      price: "$29.99/month",
      features: [
        "All Basic features",
        "Group therapy sessions",
        "Monthly progress reports",
        "Priority email support",
      ],
      bgColor: "bg-blue-100",
      textColor: "text-blue-800",
    },
    {
      name: "Premium",
      price: "$99.99/month",
      features: [
        "All Standard features",
        "Live 1-on-1 sessions with a therapist",
        "Hourly conversations with your therapist",
        "Personalized mental health plans",
        "24/7 priority support",
      ],
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-800",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-center text-3xl font-bold text-gray-900 mb-6">
        Emotional Health Subscription Plans
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`p-6 rounded-lg shadow-md border ${plan.bgColor} ${plan.textColor}`}
          >
            <h2 className="text-2xl font-semibold mb-4">{plan.name}</h2>
            <p className="text-xl font-bold mb-4">{plan.price}</p>
            <ul className="mb-6">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 mb-2">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Choose Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlans;
