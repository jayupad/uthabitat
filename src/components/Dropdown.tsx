"use client";

import React, { useState } from 'react';

interface Props {
    name: string;
    dropdownList: string[];
    dropdownRefs: string[];
}

export default function Dropdown(props: Props) {

    const [isOpen, setOpen] = useState(false);

    const toggleDropdown = () => {
        setOpen(!isOpen);
    }

    const closeDropdown = () => { setOpen(false); }

    const handleMouseLeave = () => { setOpen(false); }

    const handleMouseEnter = () => { setOpen(true); }

    return (
        <div className='w-full' onMouseEnter={handleMouseEnter}>
            <div className="relative inline-block">
                <button
                    type="button"
                    className="hover:text-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm inline-flex items-center"
                    onClick={toggleDropdown}
                >
                    {props.name} { /* <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                    </svg> */}
                </button>
            {isOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-44 rounded-lg shadow-lg bg-white" onMouseLeave={handleMouseLeave}>
                        <ul role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {props.dropdownList.map((item, index) => (
                            <li key={index}>
                                <a
                                    href={props.dropdownRefs[index]}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-600"
                                    onClick={closeDropdown}
                                >
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    </div>
    )
}