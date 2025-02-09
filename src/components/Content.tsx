import Image, { StaticImageData } from "next/image"
import Link from "next/link";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
// import Link from "next/link";

interface ContentProps {
  title: string;
  details: string;
  author: string;
  image: StaticImageData | string;
  link: string;
}

export default function Content({title, details, author, image, link}: ContentProps) {
  return(
    <Link href={link}>
      <div className="group transform transition-transform duration-300 ease-in-out hover:scale-105 rounded-md h-80 shadow-xl overflow-hidden border-[1px] border-border-[var(--gray-foreground)]">
        <div className="h-1/2 bg-gray-200 relative overflow-hidden">
          {image ? (
            <Image src={image} alt="" layout="fill" objectFit="cover" />
          ):(
            <div className="w-full h-full flex justify-center items-center bg-[var(--gray-foreground)] font-geist text-[14px]">
              Photo Is Not Available
            </div>
          )}
        </div>
        <div className="h-1/2 px-2 py-2 flex flex-col gap-4">
          <h1 className="font-semibold">{title || <Skeleton />}</h1>
          <div className="flex flex-1 overflow-hidden">
            <span className="text-[14px] text-[var(--secondary-text)] text-ellipsis">{details || <Skeleton count={4}/>}</span>
          </div>
          
          <span className="text-[14px] text-[var(--secondary-text)]">by {author || <Skeleton />}</span>
        </div>
      </div>
    </Link>
  )
}