"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import "../styles/default.css";

// https://docs.google.com/spreadsheets/d/1h0kdbM_19-_xy5LbrTlY_pYFoLUTyM9H62AX81P7_-k/edit?usp=sharing

export default function MembersPage() {
  const router = useRouter()
  // const [sheetUrl, setSheetUrl] = useState<string | null>(null);
  const [memberSheetId, setMemberSheetId] = useState<string | null>(null);
  // Check if password is correct
  useEffect(() => {
    const authed = localStorage.getItem('authenticated');
    if (authed !== 'true') {
      router.push('/');
    }
  }, [router]);

    useEffect(() => {
      const fetchSheet = async () => {
        try {
          const sheetId = process.env.NEXT_PUBLIC_IMAGES_SHEET_ID;
          const res = await fetch(`https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv`);
          const text = await res.text();
  
          const row = text.split("\n")
                          .filter(row => row.trim() !== "")
                          .filter(row => row.includes("points"))
          const memberId = row[0]
                          .split(",")[1]
                          .replace(/^"|"$/g, "")
          console.log("Member Sheet ID:", memberId);
          setMemberSheetId(memberId);
          console.log("Member Sheet URL:", `https://docs.google.com/spreadsheets/d/e/${memberId}/pubhtml?widget=true&headers=false`);
          // setSheetUrl(`https://docs.google.com/spreadsheets/d/${memberSheetId}/pubhtml?widget=true&headers=false`);

        } catch (error) {
          console.error("Error fetching sheet URL:", error);
        }
      };
  
      fetchSheet();
    }, []);
  

  return (
    <div className='body-bg'>
      <br />
      <div className='box-center'>
        <iframe
          src={`https://docs.google.com/spreadsheets/d/e/${memberSheetId}/pubhtml?widget=true&headers=false`}
          width="100%"
          height="600"
          style={{ border: 'none' }}
          title="Google Sheet"
        />
        
        {/* <a
          href={`https://docs.google.com/spreadsheets/d/${memberSheetId}/edit?usp=sharing`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 text-gray-800 font-bold bg-gray-300 mt-[3%] py-3 px-6 rounded-lg hover:text-white hover:bg-[#548c6c]"
        >
          Open Full Interactive Sheet
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a> */}
      </div>
      <br />
    </div>
  );
} 