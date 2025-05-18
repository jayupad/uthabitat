"use client";

import { useEffect, useState } from 'react';
import "../styles/default.css";

export default function MemberClient() {
  const [memberSheetId, setMemberSheetId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSheet = async () => {
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
          .filter(row => row.includes("points"))
        const memberId = row[0]
          .split(",")[1]
          .replace(/^"|"$/g, "")
        setMemberSheetId(memberId);
        setIsLoading(false);

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
        {isLoading ? (
          <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
        ) : (
        <iframe
          src={`https://docs.google.com/spreadsheets/d/e/${memberSheetId}/pubhtml?widget=true&headers=false`}
          width="100%"
          height="600"
          style={{ border: 'none' }}
          title="Google Sheet"
        /> )
      }
      </div>
      <br />
    </div>
  );
} 