import EmblaCarousel from "@/components/EmblaCarousel";
import { EmblaOptionsType } from 'embla-carousel'
import fs from 'fs'
import './styles/base.css'
import Image from 'next/image'
import CustomCalendar from '../components/CustomCalendar'

export default function Home() {
  const SLIDES = fs.readdirSync('./public/home').map(file => `/home/${file}`)
  const OPTIONS: EmblaOptionsType = { loop: true }
    
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <EmblaCarousel slides={SLIDES} options={OPTIONS}/>
        <div className="grid grid-cols-1 md:grid-cols-12">
          <div className="md:col-span-6 px-2">
            <Image 
              alt="Image of wood beam in front of Texas Capitol, with the inscription [Built with love from UT Habitat]"
              className="w-full h-auto"
              src='/about-us.png' 
              height={800}
              width={400}/>
          </div>
          <div className="md:col-span-6 px-2">
            <h1 className="text-2xl font-bold"> Who We Are </h1>
            <p className='text-sm mb-2'>
            Founded in 1989, UT Habitat is the University of Texas at Austin Campus Chapter of Habitat for Humanity International. We work directly with Austin Habitat for Humanity to build affordable housing in Central Texas. 
            </p>
            <br />
            <h1 className="text-2xl font-bold"> Our Mission </h1>
            <p className='text-sm mb-2'> Seeking to put God's love into action, UT Habitat brings people together to build Homes, Communities and Hope. </p>
            <br />
            <h1 className="text-2xl font-bold"> Our Vision </h1>
            <p className='text-sm mb-2'> A world where everyone has a decent place to live. </p>
            <br />
            <h1 className="text-2xl font-bold"> Our Values </h1>
            <p className='text-sm mb-2'> Forward Thinking | Collaborative | Service Oriented </p>
          </div>
        </div>
        <div>
        <CustomCalendar />
        </div>
      </main>
    </div>
  );
}
