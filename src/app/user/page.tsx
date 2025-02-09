"use client"

import Content from "@/components/Content";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import Image from "next/image";
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
}

export default function Home() {
  const { user } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await axios.get('/api/books');
        if (Array.isArray(response.data.books)) {
          setBooks(response.data.books);
          setLoading(false);
        } else {
          console.error("Expected an array but got:", response.data);
          setBooks([]); 
          setLoading(false);
        }
      }
      catch(error){
        console.error('Error fetching data');
      }
    }
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 2000);

    return () => clearInterval(interval);
  },[])

  return (
    <>
      <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen py-8 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 w-full items-center sm:items-start max-w-[80%] px-4">
          <div className="w-full flex flex-col items-center gap-8 ">
            <h1 className="text-[24px] font-semibold">Templates and Examples {user?.username}</h1>
            <span className="text-[var(--secondary-text)] text-center">
              We hold these truths to be self-evident, that all men are created equal, 
              that they are endowed by their Creator with certain unalienable 
              Rights, that among these are Life, Liberty and the pursuit of Greatness.
            </span>
            <div className="flex gap-8">
            </div>
          </div>
          <div className="w-full mt-20">
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
            ) : Array.isArray(books) && books.length > 0 ? (
              <div className="contents-grid gap-6">
                {books.map((item, index) => (
                  <Content
                    key={index}
                    title={item.title}
                    author={item.author}
                    details={item.details}
                    image={item.image}
                    link={`/user/books/${item._id}`}
                  />
                ))}
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center font-geist">
                No books available
              </div>
            )}
          </div>
         
        </main>
        
      </div>
    </>
  );
}
