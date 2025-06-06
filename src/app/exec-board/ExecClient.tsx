"use client"

import "../styles/default.css"
import { useEffect, useState } from "react";
import ExecCard from '../../components/ExecCard'

export default function ExecBoardClient() {
    const [execs, setExecs] = useState<{ name: string; position: string; major: string; image: string }[]>([]);
    useEffect(() => {
        async function fetchExecs() {
            const secret = await fetch('/api/secrets/exec-sheet');
            const { execSheetId } = await secret.json();
            if (!execSheetId) {
                console.error("Exec Sheet ID not found");
                return;
            }
            const res = await fetch(
                `https://docs.google.com/spreadsheets/d/${execSheetId}/gviz/tq?tqx=out:csv`
            );
            const text = await res.text();
            const rows = text.split("\n").filter(row => row.trim() !== "");
            const data = rows.slice(1).map(row => {
                const cols = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
                return {
                    name: cols[0]?.replace(/^"|"$/g, ""),
                    position: cols[1]?.replace(/^"|"$/g, ""),
                    major: cols[2]?.replace(/^"|"$/g, ""),
                    image: `https://drive.google.com/uc?export=view&id=${cols[3]?.replace(/^"|"$/g, "")}`
                };
            });
            setExecs(data);
        }
        fetchExecs();
    }, []);
    return (
    <div className='body-bg'>
        <br/>
        <div className='no-box-center'>
            <div className='flex justify-center'>
                <div className="bg-[#548c6c] text-white px-4 sm:px-6 py-3 sm:py-4 shadow-xl inline-block">
                    <h3 className="text-2xl text-center md:text-4xl font-bold text-white"> 2025-2026 Executive Board </h3>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-[6%] px-4 sm:px-6">
                {execs.map((exec, index) => (
                    <ExecCard key={"exec-card-"+index} index={index} name={exec.name} position={exec.position} major={exec.major} img_src={exec.image}
                    />
                ))}
            </div>
        </div>
    </div>);
}