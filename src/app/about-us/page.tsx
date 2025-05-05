import "../styles/default.css"
import Image from "next/image";

export default function About() {
  return (
    <div className='body-bg'>
      <br/>
      <div className='box-center'>
        <div className='grid grid-cols-1 md:grid-cols-12'>
        <div className='md:col-span-8 px-2'>
          <h1 className='text-4xl font-bold text-[#548c6c]'>About Us</h1>
          <br/>
          <h3 className='text-base mb-2'>
            The Habitat for Humanity UT Campus Chapter works, helps, volunteers, and contributes solutions to the growing Austin housing crisis. 
            <br/>
            <br/>            
            Saturday mornings we head to build sites and home repairs for 8-hour workdays. Our members assist in almost every part of the building process. No experience is required! You&#39;re taught everything on the site.
            <br/>
            <br/>
            We don&#39;t just wield hammers; our advocacy game goes strong. We tackle opportunities to raise awareness about affordable housing in Austin and engage with local policymakers.
            <br/>
            <br/>
            UT Habitat also regularly holds socials and fundraisers. We want all our members to get to know each other better get involved, and of course, have fun doing it!
          </h3>
        </div>
        <div className='md:col-span-4 px-2'>
            <Image 
              alt="Blue tote bag hanging on a fence with UT Habitat for Humanity written on it" 
              src="/about-us-2.png"
              className="w-full h-auto"
              width={600}
              height={800}
            />
          </div>
        </div>
      </div>
      <br/>
    </div>
  );
}