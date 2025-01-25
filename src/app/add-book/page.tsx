'use client'

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
  const [message, setMessage] = useState<string | ''>('');
  
  const [file, setFile] = useState<File | null>(null);
  const [imagePath, setImagePath] = useState<string | ''>(''); 

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Handle file selection
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  // Update the event type to MouseEvent
  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();  // Prevent default behavior (not strictly needed but good practice)
    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(`File uploaded successfully: ${data.filename}`);
        setImagePath(`/uploads/${data.filename}`);

        //upload to database
        try{
          const response = await axios.post('../api/books', {title, details, author,  imagePath: `/uploads/${data.filename}` });
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
        }
        catch(error){
          console.error("Error adding book", error);
          alert("Something went wrong. Try again");
        }
      } else {
        setMessage(`Upload failed: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      setMessage('An error occurred during the upload.');
    }
  };


  return (
    <>
      <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen py-8 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 w-full items-center sm:items-start max-w-[80%] px-4">
          <div className="add-book-grid h-full w-full gap-10">
            <div className="w-full h-full bg-gray-100">
              {/* Your background or other elements */}
            </div>
            <div className="flex flex-col h-full justify-between">
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
                  className="font-geist"
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
    </>
  );
}
