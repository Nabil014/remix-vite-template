import React from 'react';

const NFTCard = ({ nft }) => {
  return (
    <div className="snap-center flex-shrink-0 w-full lg:w-auto bg-gradient-radial shadow-lg rounded-lg border-2 border-[#04E6E6] overflow-hidden text-white">
      <img src={nft.image} alt={nft.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <p className="text-[#6EEAEA] text-sm font-semibold mt-2">PFP</p>
        <h3 className="text-xl font-bold text-[#6EEAEA] mt-2">{nft.title}</h3>
        <p className="text-[#6EEAEA] font-semibold mt-4">{nft.price}</p>
      </div>
    </div>
  );
};

export default NFTCard;
