import { json, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import React from 'react';
import axios from 'axios';
import Footer from '~/components/footer';
import Table from '~/components/table-list';

// Definir el tipo de datos esperados desde la API de Etherscan
interface RichestWallet {
  account: string;
  balance: string;
}

interface LoaderData {
  richestWallets: RichestWallet[];
}

// Loader function to fetch data from Etherscan API
export const loader: LoaderFunction = async () => {
  const API_KEY = 'XM3HGZP6V44QHAHGE6IZWJFIBJPQWGVPQP';

  const getRichestWallets = async () => {
    try {
      const response = await axios.get(`https://api.etherscan.io/api`, {
        params: {
          module: 'account',
          action: 'top',
          apikey: API_KEY,
        },
      });

      console.log("API Response: ", response.data); // 

      if (response.data.status !== "1") {
        throw new Error(response.data.message || 'Error fetching data');
      }

      return response.data.result;
    } catch (error) {
      console.error('Error fetching richest wallets:', error);
      return [];
    }
  };

  const richestWallets = await getRichestWallets();
  console.log("Richest Wallets: ", richestWallets); // Verifica que los datos se obtienen correctamente
  return json({ richestWallets });
};

// React component to display the data
export default function TopTraders() {
  const { richestWallets } = useLoaderData<LoaderData>();

  const columns = [
    { key: 'rank', label: 'Rank', link: null, format: null },
    { key: 'account', label: 'Wallet Address', link: null, format: null },
    { key: 'balance', label: 'Balance (ETH)', link: null, format: (val: string) => (parseFloat(val) / 1e18).toFixed(2) },
  ];

  const data = richestWallets.map((wallet, index) => ({
    rank: index + 1,
    account: wallet.account,
    balance: wallet.balance,
  }));

  return (
    <div className="relative flex min-h-screen flex-col gap-8 overflow-hidden bg-gradient-radial from-[#043033] via-[#000D0E] to-[#000D0E] p-8">
      <div>
        <Table
          data={data}
          title="Top 10 Richest Wallets"
          description="Overview of the top 10 richest wallets by balance"
          columns={columns}
        />
      </div>
      <Footer />
    </div>
  );
}
