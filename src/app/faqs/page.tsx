"use client"

import "../styles/default.css"
import faqData from '@/data/faq.json';
import 'flowbite';

export default function FAQ() {
    const faqs = faqData.faqs;

    return (
        <div className='body-bg'>
            <br/>
            <div id="accordion-collapse" className='box-center-faq' data-accordion="collapse">
            <div className='banner'>
                <div className="bg-[#548c6c] text-white px-4 sm:px-6 py-3 sm:py-4 inline-block">
                    <h1 className="text-4xl font-bold text-white"> Frequently Asked Questions </h1>
                </div>
            </div>
            {faqs.map((faq, index) => (
                <div className="pl-[4%]" key={index}>
                    <h2 id={`accordion-collapse-heading-${index}`}>
                        <button id={`accordion-collapse-button-${index}`}
                                type="button" 
                                className={`flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border ${index !== faqs.length - 1 ? 'border-b-0' : ''} border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3`} 
                                data-accordion-target={`#accordion-collapse-body-${index}`} 
                                aria-expanded="false" 
                                aria-controls={`accordion-collapse-body-${index}`}>
                        <span>{faq.question}</span>
                        <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
                        </svg>
                        </button>
                    </h2>
                    <div id={`accordion-collapse-body-${index}`} className="hidden" aria-labelledby={`accordion-collapse-heading-${index}`}>
                        <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                            <p className="mb-2 text-gray-500 dark:text-gray-400">{faq.answer}</p>
                        </div>
                    </div>
                </div>
            ))}
            </div>
            <br/>
        </div>
    )
}