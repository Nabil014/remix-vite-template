import React from 'react';

const TrendItem = ({ trend }) => {
  return (
    <div className="p-4 bg-transparent border-b border-[#6EEAEA]">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img src={trend.image} alt={trend.name} className="w-11 h-11 rounded-lg" />
          <div className="ml-4">
            <p className="text-sm font-semibold text-[#F5F5F5]">{trend.name}</p>
          </div>
        </div>
        <p className="text-sm font-semibold text-[#F5F5F5]">{trend.price}</p>
      </div>
    </div>
  );
};

export default TrendItem;
