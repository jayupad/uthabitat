"use client";

import "../styles/default.css"
import Image from "next/image";
import { useEffect, useState } from "react";


export default function Involved() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [alt, setAlt] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const sheetId = process.env.NEXT_PUBLIC_IMAGES_SHEET_ID;
        const res = await fetch(`https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv`);
        const text = await res.text();

        const row = text.split("\n")
                        .filter(row => row.trim() !== "")
                        .filter(row => row.includes("involved"))
        const imageUrl = row[0]
                        .split(",")[1]
                        .replace(/^"|"$/g, "")
        const alt = row[0]
                    .split(",")[2]
                    .replace(/^"|"$/g, "")
          
        setImageUrl(`https://drive.google.com/uc?export=view&id=${imageUrl}`);
        setAlt(alt);

      } catch (error) {
        console.error("Error fetching image URL:", error);
      }
    };

    fetchImage();
  }, []);

    return (
      <div className='body-bg'>
        <br/>
        <div className='box-center'>
          <div className="relative w-full">
            <Image 
              alt={alt || ""} 
              src={imageUrl || "/placeholder-image.jpg"}
              height={300}
              width={1200}
              className="opacity-60 w-full h-auto object-cover"
            />
            <div className="absolute left-0 top-9/24 bg-[#548c6c] text-white px-4 sm:px-6 py-3 sm:py-4 shadow-lg max-w-[80%] sm:max-w-none">
              <h1 className="text-xl sm:text-2xl font-bold">Get Involved</h1>
              <p className="text-xs sm:text-sm">Join our mission to build homes</p>
            </div>
          </div>
          <br />
          <h2 className='text-lg involved-body'>For updates on our events, dates for our builds, or when and where our next meetings will be, please scroll down to sign up for our newsletter and join our Slack!</h2>
          <br />
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16'>
            <div className='md:col-span-1 px-2'>
              <h1 className="text-3xl font-bold involved-body text-[#548c6c]"> Become a Member </h1>
              <br/>
              <p> Just come to a meeting, pay your dues, and start getting involved! There are no applications or other requirements! </p>
              <br/>
              <p> To be recognized as an official active Habitat member at the end of the semester, you must: </p>
              <ul className="list-disc pl-6">
                <li> <p> <b> Pay dues </b> (at a meeting or before a workday) </p> 
                  <ul className="list-disc pl-6 mt-2 space-y-1 text-lg">
                    <li className='text-sm'> $35 for a semester </li>
                    <li className='text-sm'> $50 for the year </li>
                    <li className='text-sm'> Both options include a UT Habitat shirt! </li>
                  </ul>
                </li>
              </ul>
              <br/>
              <p> <b> 10 total points </b> are needed to be considered an active member: </p>
              <ul className="list-disc pl-6 text-2xl">

                <li><p className="text-sm"><b>Build/advocacy</b> events are worth <b>3</b> points </p> </li>
                <li><p className="text-sm"><b>Fundraising</b>  events <b>2</b> points </p> </li>
                <li><p className="text-sm"><b>Socials</b> are worth <b>2</b> points </p> </li>
                <li><p className="text-sm"><b>General meetings</b> are worth <b>1</b> point </p> </li>
              </ul>
            </div>
            <div className='md:col-span-1 px-2'>
              <h1 className="text-3xl font-bold involved-body text-[#548c6c]"> First Build Day </h1>
              <br/>
              <p> <b>Before your first build day:</b> </p>
              <ol className="list-decimal pl-6 space-y-2 text-sm">
                <br/>
                <li> <p> Pay your dues </p></li>
                <li> <p> Sign up for the build on VolunteerHub with Austin Habitat </p></li>
                <li> <p> Sign up for the build on the spreadsheet we send out through the newsletter or Slack </p></li>
                <li> <p> Get a good night&#39;s rest and bring plenty of water for some fun building! </p></li>
              </ol>
            </div>
          </div>
        </div>
        <br/>
      </div>
    );
  }