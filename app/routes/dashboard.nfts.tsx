import React, { useEffect, useState } from 'react';
import NFTCard from '../components/NFTCard';
import TrendItem from '../components/TrendItem';
import TopCollectionItem from '~/components/TopCollectionItem';
import Footer from '~/components/footer';

const Index = () => {
  const [nftData, setNftData] = useState([]);

  // Datos ficticios para NFTs
  const fakeNFTData = [
    {
      id: '1',
      title: 'CryptoPunk #3100',
      image: 'https://via.placeholder.com/150',
      price: '4200 ETH',
    },
    {
      id: '2',
      title: 'Bored Ape #1234',
      image: 'https://via.placeholder.com/150',
      price: '1500 ETH',
    },
    {
      id: '3',
      title: 'Art Blocks #987',
      image: 'https://via.placeholder.com/150',
      price: '800 ETH',
    },
    {
      id: '4',
      title: 'World of Women #567',
      image: 'https://via.placeholder.com/150',
      price: '300 ETH',
    },
  ];

  // Datos estáticos para trends y top collections
  const trendsData = [
    { id: 1, name: 'Nombre', image: 'https://via.placeholder.com/50', price: '0.00 ETH' },
    { id: 2, name: 'Nombre', image: 'https://via.placeholder.com/50', price: '0.00 ETH' },
    { id: 3, name: 'Nombre', image: 'https://via.placeholder.com/50', price: '0.00 ETH' },
    { id: 4, name: 'Nombre', image: 'https://via.placeholder.com/50', price: '0.00 ETH' },
    { id: 5, name: 'Nombre', image: 'https://via.placeholder.com/50', price: '0.00 ETH' },
    { id: 6, name: 'Nombre', image: 'https://via.placeholder.com/50', price: '0.00 ETH' },
  ];

  const topCollectionsData = [
    { id: 1, name: 'Nombre', image: 'https://via.placeholder.com/50', price: '0.00 ETH', priceUsd: '$000,00.00', priceChange24h: '+00,000', marketCap: '$0,000,000,000.00', marketCapChange24h: '+00,000' },
    { id: 2, name: 'Nombre', image: 'https://via.placeholder.com/50', price: '0.00 ETH', priceUsd: '$000,00.00', priceChange24h: '+00,000', marketCap: '$0,000,000,000.00', marketCapChange24h: '+00,000' },
    { id: 3, name: 'Nombre', image: 'https://via.placeholder.com/50', price: '0.00 ETH', priceUsd: '$000,00.00', priceChange24h: '+00,000', marketCap: '$0,000,000,000.00', marketCapChange24h: '+00,000' },
    { id: 4, name: 'Nombre', image: 'https://via.placeholder.com/50', price: '0.00 ETH', priceUsd: '$000,00.00', priceChange24h: '+00,000', marketCap: '$0,000,000,000.00', marketCapChange24h: '+00,000' },
  ];

  useEffect(() => {
    // Establecer los datos ficticios en el estado
    setNftData(fakeNFTData);
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gradient-radial">
      <div className="flex lg:grid lg:grid-cols-4 gap-6 overflow-x-auto lg:overflow-visible snap-x snap-mandatory mb-12 mt-">
        {nftData.map(nft => (
          <NFTCard key={nft.id} nft={nft} />
        ))}
      </div>
      
      <h2 className="text-xl font-black mb-4 text-[#F5F5F5] mt-36">Trends</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {trendsData.map(trend => (
          <TrendItem key={trend.id} trend={trend} />
        ))}
      </div>

      <h2 className="text-xl font-black mb-4 text-[#F5F5F5] mt-36">Top collections by market capitalization</h2>
      <div className="grid grid-cols-1 gap-6">
        {topCollectionsData.map(collection => (
          <TopCollectionItem key={collection.id} collection={collection} />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Index;
