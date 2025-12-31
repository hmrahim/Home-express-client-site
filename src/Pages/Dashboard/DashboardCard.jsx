import React from 'react';

const DashboardCard = ({ title, value, icon: Icon, gradient }) => {
  return (
    <div className={`p-6 rounded-2xl text-white shadow-lg ${gradient} transition-transform transform hover:scale-105`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-80">{title}</p>
          <h2 className="text-3xl font-bold">{value}</h2>
        </div>
        <Icon className="text-4xl opacity-80" />
      </div>
    </div>
  );
};

export default DashboardCard;