'use client'

import { Loading } from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";


export default function AddBook() {
  const [title, setTitle] = useState<string | ''>('');
  const [details, setDetails] = useState<string | ''>('');
  const [author, setAuthor] = useState<string | ''>('');
  
  const [file, setFile] = useState<File | null>(null);
  const [imagePath, setImagePath] = useState<string | ''>(''); 

  const [url, setUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const [loading, setLoading] = useState(false);

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   // Handle file selection
  //   if (event.target.files) {
  //     setFile(event.target.files[0]);
  //   }
  // };

  // // Update the event type to MouseEvent
  // const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault();  // Prevent default behavior (not strictly needed but good practice)
  //   if (!file) {
  //     setMessage('Please select a file to upload.');
  //     return;
  //   }
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   try {
  //     const response = await fetch('/api/upload', {
  //       method: 'POST',
  //       body: formData,
  //     });

  //     const data = await response.json();
  //     if (response.ok) {
  //       setMessage(`File uploaded successfully: ${data.filename}`);
  //       setImagePath(`/uploads/${data.filename}`);

  //       //upload to database
  //       try{
  //         const response = await axios.post('../api/books', {title, details, author,  imagePath: `/uploads/${data.filename}`});
  //         console.log("Book has been create", response.data);

  //         toast("Book has been created", {
  //           description: `${title} by ${author}`,
  //           action: {
  //             label: "Close",
  //             onClick: () => console.log("Close"),
  //           },
  //         })
  //         setTitle('');
  //         setDetails('');
  //         setAuthor('');
  //         setImagePath('')
  //       }
  //       catch(error){
  //         console.error("Error adding book", error);
  //         alert("Something went wrong. Try again");
  //       }
  //     } else {
  //       setMessage(`Upload failed: ${data.error || 'Unknown error'}`);
  //     }
  //   } catch (error) {
  //     setMessage('An error occurred during the upload.');
  //   }
  // };

  const handleSubmit = async () => {
    try {
      if (!file) {
        alert("No file selected");
        return;
      }

      setLoading(true);
      setUploading(true);
      const data = new FormData();
      data.set("file", file);
      const uploadRequest = await fetch("/api/files", {
        method: "POST",
        body: data,
      });
      const signedUrl = await uploadRequest.json();
      setUrl(signedUrl);
      setUploading(false);
      try{
        const response = await axios.post('../api/books', {title, details, author, imagePath: signedUrl});
        console.log("Book has been create", response.data);

        toast("Book has been created", {
          description: `${title} by ${author}`,
          action: {
            label: "Close",
            onClick: () => console.log("Close"),
          },
        })
        setTitle('');
        setDetails('');
        setAuthor('');
        setImagePath('')
        setLoading(false);
      }
      catch(error){
        console.error("Error adding book", error);
        alert("Something went wrong. Try again");
      }
    } catch (e) {
      console.log(e);
      setUploading(false);
      alert("Trouble uploading file");
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
          <div className=" h-full w-full gap-10 flex justify-center">
            {/* <div className="w-full h-full bg-gray-100">
              
            </div> */}
            <div className="flex flex-col h-full xl:w-[700px] sm:w-full justify-between">
              <div className="flex flex-col justify-between gap-6">
                <Input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                  className="font-geist"
                />
                <Input
                  type="text"
                  value={author}
                  placeholder="Author"
                  onChange={(e) => setAuthor(e.target.value)}
                  className="font-geist"
                />
                <Textarea
                  value={details}
                  placeholder="Type here..."
                  onChange={(e) => setDetails(e.target.value)}
                  className="font-geist w-full min-h-40 resize-none"
                />
                <Input 
                  type="file" 
                  onChange={handleFileChange} 
                  className="font-geist text-[var(--secondary-text)]"
                />
              </div>
              <Button onClick={handleSubmit}>Submit</Button>
            </div>
          </div>
        </main>
      </div>
      <Loading
        open={loading}
        setOpen={setLoading}
      />
    </>
  );
}
