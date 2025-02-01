"use client"

import Content from "@/components/Content";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CSSProperties, useEffect, useState } from "react";
import PropagateLoader from "react-spinners/PropagateLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0",
  borderColor: "#000000",
};


export default function Home() {
  const router = useRouter();

  return (
    <>
      <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen py-8 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 w-full items-center sm:items-start max-w-[80%] px-4">
          <h1>Welcome</h1>
          <Button onClick={() => router.replace('/auth/login')}>Login</Button>
          <Button onClick={() => router.replace('/auth/signup')}>Sign up</Button>
          
        </main>
        
      </div>
    </>
  );
}
