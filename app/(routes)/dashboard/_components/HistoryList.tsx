'use client'

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useState } from 'react'
import NewSession from './NewSession';

export default function HistoryList() {

    const [history, setHistory] = useState([]);

  return (
    <div className='mt-10'>
        {history.length == 0 ? (
            <div className='flex flex-col items-center justify-center p-7 border-dashed rounded-2xl border-gray-300 border-3 '>
                <Image src={'/vet-assistance.png'} alt='Vet Assistance' width={200} height={2000} />
                <h2 className='text-lg font-semibold mt-3'>No history available</h2>
                <p>It looks like you haven't consulted with a vet yet.</p>
                <NewSession>
                    <Button className='mt-3 hover:scale-110'>Start a consultation</Button>
                </NewSession>
            </div>
        ) : (
            <div>
                List
            </div>
        )}
    </div>
  )
}
