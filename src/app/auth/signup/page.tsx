"use client"

import { CSSProperties, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import Image from "next/image";
import dark_bg from "../../../../public/images/dark-bg.png"
import axios from "axios";
import { Loading } from "@/components/Loading";
import PropagateLoader from "react-spinners/PropagateLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0",
  borderColor: "#000000",
};


const FormSchema = z.object({
  username: z.string().min(1,{ message: "Username is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});


type FormData = z.infer<typeof FormSchema>;

export default function Signup() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });
  
  const onSubmit = async (data: FormData ) => {
    setLoading(true);
    const user = {username: data.username, email: data.email, password: data.password};
    try {
      const response = await axios.post('/api/auth/signup', user);
      if(response.data){
        setLoading(false);
        router.replace('/user');
      }
    } catch (error) {
      setLoading(false);
      console.error("Error logging in", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <div className="h-screen font-[family-name:var(--font-geist-sans)]">
        <main className="flex h-full">
          <div className="flex-1 h-full bg-gray-900 max-lg:hidden relative">
            <Image src={dark_bg} alt="bg" layout="fill" objectFit="cover"/>
          </div>
          <div className="flex-1 h-full flex items-center justify-center">
            <Card className="w-[80%]">
              <CardHeader>
                <CardTitle className="text-2xl">Sign Up</CardTitle>
                <CardDescription>
                  Enter your creadentials below to signup your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="mExample"
                      {...register("username")}
                      required
                    />
                    {errors.username && <span className="text-red-500 text-sm">{errors.username.message}</span>}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      {...register("email")}
                      required
                    />
                    {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                        Forgot your password?
                      </a>
                    </div>
                    <Input id="password" type="password" {...register("password")} required />
                    {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                  </div>
                  {loading ? (
                    <div className="w-full flex justify-center items-center my-6">
                      <PropagateLoader 
                        color={'#000000'}
                        loading={true}
                        cssOverride={override}
                        size={6}
                        speedMultiplier={1}
                        aria-label="PropagateLoader "
                        data-testid="PropagateLoader "
                      />
                    </div>
                  ):(
                    <>
                      <Button onClick={handleSubmit(onSubmit)} className="w-full">Sign Up</Button>
                      <Button variant="outline" className="w-full">Sign up with Google</Button>
                    </>
                  )}
                </div>
                <div className="mt-4 text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <a href="/auth/login" className="underline underline-offset-4">
                    Sign in
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      {/* Loading Indicator */}
      {/* <Loading open={loading} setOpen={setLoading} /> */}
    </>
  );
}
