'use client';

import Image from 'next/image'
import HoverCard from '@/components/HoverCard';


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-16">
      <div className='grid w-full grid-cols-4 gap-16 '>
        <Divs />
      </div>
    </main>
  )
}


const Divs = () => {
  return (
    <>
      {Array.from({ length: 8 }, (_, i) => (
        <HoverCard key={i} i={i}></HoverCard>
      ))}
    </>
  )
}



