import { useRouter } from "next/router";

import clsxm from "@/lib/clsxm";


export interface Card {
  title: string;
  caption: string;
  description: string;
  button: {
    name: string;
    url: string;
  }
}

interface CardProps extends Card {
  label: string
  className?: string
}

export default function Card({ title, caption, description, button, label, className }: CardProps) {
  const router = useRouter();
  return (
    <div className={clsxm(className, "block p-6 bg-white max-w-sm text-center")}>
      <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
        <span className='px-3 py-1 bg-blue-500 mr-2 text-white font-medium text-xs'>{label}</span>
        {title}
      </h5>
      <h3 className="text-sm text-gray-400 ">{caption}</h3>
      <p className="text-gray-700 text-base mb-4">
        {description}
      </p>
      <button onClick={() => router.push(button.url)} type="button" className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">{button.name}</button>
    </div>
  );
}