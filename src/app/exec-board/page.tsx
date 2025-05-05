"use client"

import "../styles/default.css"
import execBoardData from '@/data/exec-board.json';
import ExecCard from '../../components/ExecCard'

export default function ExecBoard() {
    const execs = execBoardData.execBoard;
    return (
    <div className='body-bg'>
        <br/>
        <div className='no-box-center'>
            <div className='flex justify-center'>
                <div className="bg-[#548c6c] text-white px-4 sm:px-6 py-3 sm:py-4 shadow-xl inline-block">
                    <h1 className="text-4xl font-bold text-white"> 2025-2026 Executive Board </h1>
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