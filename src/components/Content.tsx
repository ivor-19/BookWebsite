import Image, { StaticImageData } from "next/image"
import Link from "next/link";

interface ContentProps {
  title: string;
  details: string;
  author: string;
  image: StaticImageData | string;
  link: string;
}

export default function Content({title, details, author, image, link}: ContentProps) {
  return(
    <a href={link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="group transform transition-transform duration-300 ease-in-out hover:scale-105 rounded-md h-80 shadow-xl overflow-hidden border-[1px] border-border-[var(--gray-foreground)]">
        <div className="h-1/2 bg-gray-200 relative overflow-hidden">
          <Image src={image} alt="" layout="fill" objectFit="cover" />
        </div>
        <div className="h-1/2 p-2 flex flex-col gap-4">
          <h1 className="font-semibold">{title}</h1>
          <span className="text-[14px] text-[var(--secondary-text)]">{details}</span>
          <span className="text-[14px] text-[var(--secondary-text)]">{author}</span>
        </div>
      </div>
    </a>
  )
}