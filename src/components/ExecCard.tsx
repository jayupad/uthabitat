import Image from 'next/image';

interface ExecCardProps {
    index: number;
    name: string;
    position: string;
    major: string;
    img_src: string;
}

export default function ExecCard({ index, name, position, major, img_src }: ExecCardProps) {
    return (
        <div className="pb-[5%]" id={"exec-card-"+index} key={index}>
            <div className="bg-white rounded border border-white shadow-lg relative">
                <div className="aspect-w-1 aspect-h-1">
                    <Image 
                        src={img_src} 
                        alt={`${name} - ${position}`}
                        height={240}
                        width={240}
                        className="rounded w-full h-64 object-cover"
                    />
                </div>
                <div className="absolute rounded exec-desc w-[90%] bg-white/90 p-4 text-right">
                    <h2 className="text-large font-bold text-gray-800">{name}</h2>
                    <p className="text-[#548c6c] text-sm">{position}</p>
                    {major && <p className="text-gray-600 text-sm italic">{major}</p>}
                </div>
            </div>
        </div>
    )
}