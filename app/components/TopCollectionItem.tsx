import React from 'react';

const TopCollectionItem = ({ collection }) => {
  return (
    <div className="p-4 border-b border-[#6EEAEA]">
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex items-center w-full sm:w-auto mb-2 sm:mb-0">
          <img src={collection.image} alt={collection.name} className="w-11 h-11 rounded-lg" />
          <div className="ml-4">
            <p className="text-sm font-semibold text-[#F5F5F5]">{collection.name}</p>
          </div>
        </div>
        <div className="text-right w-full sm:w-auto sm:text-left mb-2 sm:mb-0">
          <p className="text-sm font-semibold text-[#F5F5F5]">{collection.price}</p>
          <p className="text-sm font-semibold text-[#F5F5F5]">{collection.priceUsd}</p>
        </div>
        <p className="text-sm font-semibold text-green-500 w-full sm:w-auto mb-2 sm:mb-0">{collection.priceChange24h}</p>
        <p className="text-sm font-semibold text-[#F5F5F5] w-full sm:w-auto mb-2 sm:mb-0">{collection.marketCap}</p>
        <p className="text-sm font-semibold text-green-500 w-full sm:w-auto">{collection.marketCapChange24h}</p>
      </div>
    </div>
  );
};

export default TopCollectionItem;
