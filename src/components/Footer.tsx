import Image from "next/image";

export default function Footer() {
    return (
    <footer>
      <div className="grid grid-cols-12" style={{ backgroundColor: 'grey' }}>
        <div className='col-span-2'> </div>
        <div className="col-span-6">
            <p> Join our email newsletter</p>
            <input type="email" placeholder="Enter email" />
            <button>Subscribe</button>
        </div>
        <div className="col-span-4">
            <div className="flex items-center">
                <p className="mr-2"> Our Platforms | </p>
                <Image 
                  src="/instagram-brands.svg" 
                  alt="Instagram" 
                  width={128}
                  height={128}
                  className="w-4 h-auto mr-2" />
                <Image 
                  src='/slack-brands.svg' 
                  alt="Slack" 
                  width={128}
                  height={128}
                  className="w-4 h-auto" />
            </div>
        </div>
      </div>
      </footer>
    );
  }