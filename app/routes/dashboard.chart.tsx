import React from 'react'
import Footer from '~/components/footer'
import { InfiniteMovingCards } from '~/components/infinite-moving-cards'
import { PlaceholdersAndVanishInput } from '~/components/placeholders-and-vanish-input'
import Table from '~/components/table-list'
import lineChart from '../components/line-chart';
import ChartComponent from '~/components/line-chart';


export default function Index() {
  // carrousel
  const items = [
    {
      token: 'DOSE',
      inflow: '$190,083',
      average: '51',
    },
    {
      token: 'DOSE',
      inflow: '$190,083',
      average: '51',
    },
    {
      token: 'DOSE',
      inflow: '$190,083',
      average: '51',
    },
    {
      token: 'DOSE',
      inflow: '$190,083',
      average: '51',
    },
    {
      token: 'DOSE',
      inflow: '$190,083',
      average: '51',
    },
  ]

  const data = [
    {
      name: 'Token Name',
      pnl: 'PNL',
      amountWallet: 'Amount wallet',
      age: 'Age',
      marketCap: 'Market cap',
      potencialHigh: 'Potencial high',
      potencialLow: 'Potencial low',
      image: 'https://via.placeholder.com/20', // URL de la imagen del token
    },
    {
      name: 'Token Name',
      pnl: 'PNL',
      amountWallet: 'Amount wallet',
      age: 'Age',
      marketCap: 'Market cap',
      potencialHigh: 'Potencial high',
      potencialLow: 'Potencial low',
      image: 'https://via.placeholder.com/20', // URL de la imagen del token
    },
    {
      name: 'Token Name',
      pnl: 'PNL',
      amountWallet: 'Amount wallet',
      age: 'Age',
      marketCap: 'Market cap',
      potencialHigh: 'Potencial high',
      potencialLow: 'Potencial low',
      image: 'https://via.placeholder.com/20', // URL de la imagen del token
    },
    {
      name: 'Token Name',
      pnl: 'PNL',
      amountWallet: 'Amount wallet',
      age: 'Age',
      marketCap: 'Market cap',
      potencialHigh: 'Potencial high',
      potencialLow: 'Potencial low',
      image: 'https://via.placeholder.com/20', // URL de la imagen del token
    },
  ]

  // searchBar
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
  }

  // searchBar
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Form submitted')
  }

  return (
    <div className="bg-gradient-radial flex min-h-screen flex-col gap-8 from-[#043033] via-[#000D0E] to-[#000D0E] p-8">
      <PlaceholdersAndVanishInput
        placeholders={['Placeholder 1', 'Placeholder 2', 'Placeholder 3']}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <div>
        <h2 className="mb-4 text-base font-semibold leading-[19.36px] text-[#04E6E6]">
          Signals
        </h2>
        <InfiniteMovingCards
          items={items}
          speed="extra slow"
          direction="right"
          pauseOnHover={false}
        />
      </div>
      <div className="mt-10">
        <h2 className="mb-10 text-base font-semibold leading-[19.36px] text-[#04E6E6]">
          Top 10 PNL Coin
        </h2>
        <Table data={data} />
      </div>
      <div className="mt-10">
        <h2 className="mb-10 text-base font-semibold leading-[19.36px] text-[#04E6E6]">
          Top 10 Early Bird Coins
        </h2>
        <Table data={data} />
      </div>
      <ChartComponent/>
      <Footer/>
    </div>
  )
}
