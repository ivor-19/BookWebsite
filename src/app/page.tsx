"use client"

import Content from "@/components/Content";
import axios from "axios";
import { useEffect, useState } from "react";
// import avatar from "../../public/avatars-content.jpg"
// import fire from "../../public/fire-content.jpg"
// import heart from "../../public/heart-content.jpg"

type Book = {
  _id: number;
  title: string;
  author: string;
  details: string;
  image: string;
}

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await axios.get('/api/books');
        if (Array.isArray(response.data.books)) {
          setBooks(response.data.books);
        } else {
          console.error("Expected an array but got:", response.data);
          setBooks([]); 
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
            <h1 className="text-[24px] font-semibold">Templates and Examples</h1>
            <span className="text-[var(--secondary-text)] text-center">
              We hold these truths to be self-evident, that all men are created equal, 
              that they are endowed by their Creator with certain unalienable 
              Rights, that among these are Life, Liberty and the pursuit of Greatness.
            </span>
            <div className="flex gap-8">
            </div>
          </div>
          <div className="w-full mt-20">
            {Array.isArray(books) && books.length > 0 ? (
              <div className="contents-grid gap-6">
                {books.map((item, index) => (
                  <Content
                    key={index}
                    title={item.title}
                    author={item.author}
                    details={item.details}
                    image={item.image}
                    link=""
                  />
                ))}
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center font-geist">No books available</div> // Display a message if no books are available
            )}
          </div>
        </main>
        
      </div>
    </>
  );
}
