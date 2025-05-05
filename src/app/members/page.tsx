"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import "../styles/default.css";

export default function MembersPage() {
  const router = useRouter()
  // Check if password is correct
  useEffect(() => {
    const authed = localStorage.getItem('authenticated');
    if (authed !== 'true') {
      router.push('/');
    }
  }, []);

  return (
    <div className='body-bg'>
      <br/>
      <p> members only here </p>
    </div>
  );
} 