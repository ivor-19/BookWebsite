"use client"

import Content from "@/components/Content";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CSSProperties, useEffect, useState } from "react";
import PropagateLoader from "react-spinners/PropagateLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0",
  borderColor: "#000000",
};

type Book = {
  _id: number;
  title: string;
  author: string;
  details: string;
  image: string;
};

export default function BookPage() {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   const fetchBook = async () => {
    try {
      const response = await axios.get(`/api/books/${id}`);
      if(response.data){
        setBook(response.data);
      }
    } catch (error) {
      console.error('Error fetching data');
    } finally {
      setLoading(false);
    }
   }
   fetchBook();

  },[id])

  return (
    <>
      <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen py-8 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 w-full items-center sm:items-start max-w-[80%] px-4">
          {loading ? (
             <div className="w-full h-full flex justify-center items-center">
             <PropagateLoader 
               color={'#000000'}
               loading={true}
               cssOverride={override}
               size={10}
               speedMultiplier={1}
               aria-label="PropagateLoader"
               data-testid="PropagateLoader"
             />
           </div>
          ):(
            <div className="flex flex-col gap-6 w-full">
              <Link href={'/user'}>
                <Button>Go Back</Button>
              </Link>
              <div className="w-full flex justify-center">
                <div className="w-[70%] max-xl:w-full">
                  {book && (
                    <>
                      <Image
                        src={book.image}
                        alt={book.title}
                        width={500}
                        height={400}
                        className="w-full h-64 object-cover"
                      />
                      <div className="p-6">
                        <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
                        <p className="text-gray-600 text-lg mb-4">{book.author}</p>
                        <p className="text-gray-700">{book.details}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
         
        </main>
        
      </div>
    </>
  );
}
