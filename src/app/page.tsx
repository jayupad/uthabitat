"use client"

import EmblaCarousel from "@/components/EmblaCarousel";
import { EmblaOptionsType } from 'embla-carousel';
import './styles/base.css';
import Image from 'next/image';
import CustomCalendar from '../components/CustomCalendar';
import { useEffect, useState } from "react";

export default function Home() {
  const [slides, setSlides] = useState<{ page: string; image: string; alt: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSlides() {
      try {
        const secret = await fetch('/api/secrets/other-sheet');
        const { dataSheetId } = await secret.json();
        if (!dataSheetId) throw new Error("Missing Sheet ID");

        const res = await fetch(`https://docs.google.com/spreadsheets/d/${dataSheetId}/gviz/tq?tqx=out:csv`);
        const text = await res.text();
        const rows = text.split("\n").filter(row => row.trim() !== "");
        const data = rows.slice(1).map(row => {
          const cols = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
          return {
            page: cols[0]?.replace(/^"|"$/g, ""),
            image: `https://drive.google.com/uc?export=view&id=${cols[1]?.replace(/^"|"$/g, "")}`,
            alt: cols[2]?.replace(/^"|"$/g, ""),
          };
        });
        setSlides(data);
      } catch (err) {
        console.error("Failed to load slides", err);
      } finally {
        setLoading(false);
      }
    }

    fetchSlides();
  }, []);

  const OPTIONS: EmblaOptionsType = { loop: true };

  return (
    <div className="bg-white min-h-screen w-full overflow-x-hidden p-4 sm:p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-center sm:items-start max-w-screen-lg mx-auto w-full">

        {/* Carousel or skeleton */}
        <div className="w-full overflow-hidden">
          {loading ? (
            <div className="w-full h-[300px] bg-gray-200 animate-pulse rounded-lg" />
          ) : (
            <EmblaCarousel slides={slides} options={OPTIONS} />
          )}
        </div>

        {/* Image + Text Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">
          <div className="md:col-span-6 px-2">
            {loading ? (
              <div className="w-full h-[300px] bg-gray-200 animate-pulse rounded-lg" />
            ) : (
              slides
                .filter(slide => slide.page === "home")
                .map(slide => (
                  <Image
                    key={slide.image}
                    alt={slide.alt}
                    src={slide.image}
                    className="w-full h-auto"
                    height={500}
                    width={400}
                  />
                ))
            )}
          </div>

          <div className="md:col-span-6 px-2">
            <h1 className="text-2xl text-[#548c6c] font-bold">Who We Are</h1>
            <p className="text-sm mb-4">
              Founded in 1989, UT Habitat is the University of Texas at Austin Campus Chapter of Habitat for Humanity International.
            </p>
            <h1 className="text-2xl text-[#548c6c] font-bold">Our Mission</h1>
            <p className="text-sm mb-4">
              Seeking to spread love through action.
            </p>
            <h1 className="text-2xl text-[#548c6c] font-bold">Our Vision</h1>
            <p className="text-sm mb-4">
              A world where everyone has a decent place to live.
            </p>
            <h1 className="text-2xl text-[#548c6c] font-bold">Our Values</h1>
            <p className="text-sm">
              Forward Thinking | Collaborative | Service Oriented
            </p>
          </div>
        </div>

        {/* Calendar */}
        <div className="w-full">
          <CustomCalendar />
        </div>
      </main>
    </div>
  );
}
