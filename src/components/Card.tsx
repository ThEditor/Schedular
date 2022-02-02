import { useContext } from 'react';

import clsxm from '@/lib/clsxm';
import { StoreContext } from '@/lib/utils/Store';

export interface Card {
  title: string;
  caption: string;
  description: string;
  button: {
    name: string;
    url: string;
  };
}

interface CardProps extends Card {
  label: string;
  className?: string;
}

export default function Card({
  title,
  caption,
  description,
  button,
  label,
  className,
}: CardProps) {
  const { state } = useContext(StoreContext)!;
  return (
    <div
      className={clsxm(className, 'block max-w-sm bg-white p-6 text-center')}
    >
      <h5 className='mb-2 text-xl font-medium leading-tight text-gray-900'>
        <span className='mr-2 bg-blue-500 px-3 py-1 text-xs font-medium text-white'>
          {label}
        </span>
        {title}
      </h5>
      <h3 className='text-sm text-gray-400 '>{caption}</h3>
      <p className='mb-4 text-base text-gray-700'>{description}</p>
      <button
        onClick={() => window.open(`${button.url}?authuser=${state.authuser}`)}
        type='button'
        className=' inline-block rounded bg-blue-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg'
      >
        {button.name}
      </button>
    </div>
  );
}
