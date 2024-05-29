// routes/index.tsx
import React from 'react';
import ActivityCard from '~/components/token-activity';

export default function Index() {
  return (
    <div className=" bg-transparent flex justify-center">
      <ActivityCard />
    </div>
  );
}
