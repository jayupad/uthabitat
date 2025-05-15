"use client"

import { useEffect, useState } from "react";
import "../styles/default.css";

export default function FAQ() {
    const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>([]);
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    useEffect(() => {
        async function fetchFAQ() {
            const faq_sheet_id = process.env.NEXT_PUBLIC_FAQ_SHEET_ID;
            const res = await fetch(
                `https://docs.google.com/spreadsheets/d/${faq_sheet_id}/gviz/tq?tqx=out:csv`
            );
            const text = await res.text();
            const rows = text.split("\n").filter(row => row.trim() !== "");
            const data = rows.slice(1).map(row => {
                const cols = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
                return {
                    question: cols[0]?.replace(/^"|"$/g, ""),
                    answer: cols[1]?.replace(/^"|"$/g, "")
                };
            });
            setFaqs(data);
        }

        fetchFAQ();
    }, []);

    return (
        <div className="body-bg">
            <br />
            <div className="box-center-faq">
                <div className="banner">
                    <div className="bg-[#548c6c] text-white px-4 sm:px-6 py-3 sm:py-4 inline-block">
                        <h1 className="text-4xl font-bold text-white">
                            Frequently Asked Questions
                        </h1>
                    </div>
                </div>
                {faqs.map((faq, index) => (
                    <div className="pl-[4%]" key={index}>
                        <h2>
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                type="button"
                                className={`flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border ${index !== faqs.length - 1 ? "border-b-0" : ""
                                    } border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3`}
                            >
                                <span>{faq.question}</span>
                                <svg
                                    className={`w-3 h-3 transform transition-transform duration-200 ${openIndex === index ? "rotate-0" : "rotate-180"
                                        }`}
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 10 6"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 5 5 1 1 5"
                                    />
                                </svg>
                            </button>
                        </h2>
                        {openIndex === index && (
                            <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                                <p className="mb-2 text-gray-500 dark:text-gray-400">
                                    {faq.answer}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <br />
        </div>
    );
}
