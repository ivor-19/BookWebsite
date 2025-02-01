'use client'

import { Loading } from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";

// Corrected Zod Schema
const FormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  author: z.string().min(1, { message: "Author is required" }),
  details: z.string().min(12, { message: "Details must have at least 12 characters" }),
});

type FormData = z.infer<typeof FormSchema>;

export default function AddBook() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });

  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    try {
      if (!file) {
        alert("No file selected");
        return;
      }

      setLoading(true);
      setUploading(true);

      // Upload file
      const formData = new FormData();
      formData.set("file", file);
      const uploadRequest = await fetch("/api/files", {
        method: "POST",
        body: formData,
      });
      const signedUrl = await uploadRequest.json();
      console.log("Received signed URL:", signedUrl);

      // Submit book data
      const response = await axios.post('/api/books', {
        title: data.title,
        author: data.author,
        details: data.details,
        imagePath: signedUrl,
      });

      console.log("Book has been created", response.data);

      toast("Book has been created", {
        description: `${data.title} by ${data.author}`,
        action: {
          label: "Close",
          onClick: () => console.log("Close"),
        },
      });

      // Reset form
      reset();
      setFile(null);
      setLoading(false);
    } catch (error) {
      console.error("Error adding book", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setUploading(false);
      setLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  return (
    <>
      <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen py-8 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 w-full items-center sm:items-start max-w-[80%] px-4">
          <div className="h-full w-full gap-10 flex justify-center">
            <div className="flex flex-col h-full xl:w-[700px] sm:w-full justify-between">
              <div className="flex flex-col justify-between gap-6">
                {/* Title Field */}
                <div className="grid w-full items-center gap-1.5">
                  <div className="w-full flex justify-between">
                    <Label htmlFor="author">Title</Label>
                    {errors.title && <span className="text-red-500 text-sm font-geist">{errors.title.message}</span>}
                  </div>
                  <Input
                    type="text"
                    {...register("title")}
                    placeholder="Title"
                    className="font-geist"
                  />
                </div>

                {/* Author Field */}
                <div className="grid w-full items-center gap-1.5">
                  <div className="w-full flex justify-between">
                    <Label htmlFor="author">Author</Label>
                    {errors.author && <span className="text-red-500 text-sm font-geist">{errors.author.message}</span>}
                  </div>
                  <Input
                    type="text"
                    {...register("author")}
                    placeholder="Author"
                    className="font-geist"
                  />

                </div>

                {/* Details Field */}
                <div className="w-full items-center gap-1.5">
                  <div className="w-full flex justify-between">
                    <Label htmlFor="details">Details</Label>
                    {errors.details && <span className="text-red-500 text-sm font-geist">{errors.details.message}</span>}
                  </div>
                  <Textarea
                    {...register("details")}
                    placeholder="Type here..."
                    className="font-geist w-full min-h-40 resize-none"
                  />
                 
                </div>

                {/* Image Field */}
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="image">Image</Label>
                  <Input
                    type="file"
                    onChange={handleFileChange}
                    className="font-geist text-[var(--secondary-text)]"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button onClick={handleSubmit(onSubmit)}>
                Submit
              </Button>
            </div>
          </div>
        </main>
      </div>

      {/* Loading Indicator */}
      <Loading open={loading} setOpen={setLoading} note={'Wait a moment'}/>
    </>
  );
}