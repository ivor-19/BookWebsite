'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function Blog() {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // const list = [
  //   {id: 1, title: 'Tako is a beast!'},
  //   {id: 2, title: 'Mallows is a warrior!'},
  //   {id: 3, title: 'Mishy is the Queen!'},
  // ]

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await axios.get('/api/hello');
        setMessage(response.data);
      }
      catch(error){
        setError('Failed to fetch data');
        console.error(error);
      }
    }
    fetchData();
  },[])


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start max-w-[80%]">
        <div>
          {error ? (
            <h1>{error}</h1>
          ):(
            <h1>{message}</h1>
          )}
        </div>
      </main>
    </div>
  )
}
