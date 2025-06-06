"use client";


import "../styles/default.css"
import Image from "next/image";
import { useEffect, useState } from "react";

export default function AboutClient() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [alt, setAlt] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const secret = await fetch('/api/secrets/other-sheet');
        const { dataSheetId } = await secret.json();
        if (!dataSheetId) {
          console.error("Sheet ID not found");
          return;
        }
        const res = await fetch(`https://docs.google.com/spreadsheets/d/${dataSheetId}/gviz/tq?tqx=out:csv`);
        const text = await res.text();

        const row = text.split("\n")
                        .filter(row => row.trim() !== "")
                        .filter(row => row.includes("about-us"))
        const imageUrl = row[0]
                        .split(",")[1]
                        .replace(/^"|"$/g, "")
        const alt = row[0]
                    .split(",")[2]
                    .replace(/^"|"$/g, "")
          
        setImageUrl(`https://drive.google.com/uc?export=view&id=${imageUrl}`);
        setAlt(alt);
        setIsLoading(false);

      } catch (error) {
        console.error("Error fetching image URL:", error);
      }
    };

    fetchImage();
  }, []);

  return (

    <div>
      <br/>
      <div className='box-center'>
        <br/>
        <div className='grid grid-cols-1 md:grid-cols-12'>
        <div className='md:col-span-12 px-2 mb-[2%]'>
          <h1 className='text-4xl font-bold text-[#548c6c]'>About Us</h1>
        </div>
        <div className='md:col-span-8 px-2'>
          <h3 className='text-base mb-2'>
            The Habitat for Humanity UT Campus Chapter works, helps, volunteers, and contributes solutions to the growing Austin housing crisis. 
            <br/>
            <br/>            
            Saturday mornings we head to build sites and home repairs for 8-hour workdays. Our members assist in almost every part of the building process. No experience is required! You&#39;re taught everything on the site.
            <br/>
            <br/>
            We don&#39;t just wield hammers; our advocacy game goes strong. We tackle opportunities to raise awareness about affordable housing in Austin and engage with local policymakers.
            <br/>
            <br/>
            UT Habitat also regularly holds socials and fundraisers. We want all our members to get to know each other better get involved, and of course, have fun doing it!
          </h3>
        </div>
          <div className="md:col-span-4 px-2">
            {isLoading ? (
              <div className="w-full h-[500px] bg-gray-200 animate-pulse rounded-lg" />
            ) : (
              <Image
                alt={alt || "About Us Image"}
                src={imageUrl || ""}
                className="w-full h-auto"
                width={600}
                height={800}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}