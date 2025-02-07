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
import { Loading } from "@/components/Loading";
import PropagateLoader from "react-spinners/PropagateLoader";
import axios from '@/utils/axios'
import { useAuth } from "@/context/AuthContext";

const override: CSSProperties = {
  display: "block",
  margin: "0",
  borderColor: "#000000",
};


const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});


type FormData = z.infer<typeof FormSchema>;

export default function Login() {
  const { setUserData } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });
  
  const onSubmit = async (data: FormData ) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/auth/login', { email: data.email, password: data.password });
      if (response.data) {
        const { _id, username, email } = response.data.account;
        setUserData({ _id, username, email }); // This will also set the cookie
        router.replace('/user');
      }
    } catch (error) {
      setLoading(false);
      setLoginError(true);
      console.error("Error signing up", error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(onSubmit)();
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
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                  Enter your email below to login to your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      {...register("email")}
                      required
                      onKeyDown={handleKeyDown}
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
                    <Input id="password" type="password" {...register("password")} required onKeyDown={handleKeyDown}/>
                    {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                  </div>
                  {loginError && <span className="text-red-500 text-sm">Wrong credentials</span>}
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
                      <Button onClick={handleSubmit(onSubmit)} className="w-full">Log In</Button>
                      <Button variant="outline" className="w-full">Sign in with Google</Button>
                    </>
                  )}
                </div>
                <div className="mt-4 text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <a href="/auth/signup" className="underline underline-offset-4">
                    Sign up
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
