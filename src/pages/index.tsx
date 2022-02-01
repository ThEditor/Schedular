import { Tab } from '@headlessui/react';
import { DateTime } from 'luxon';
import * as React from 'react';

import clsxm from '@/lib/clsxm';
import { clazzes } from '@/lib/data';
import { Task } from '@/lib/utils/Store';

import Card from '@/components/Card';
import Seo from '@/components/Seo';

export default function HomePage() {
  const categories = clazzes;
  
  const current = (tasks: Task[]) => {
    const time = DateTime.now();
    for (let i=0; i<tasks.length; i++) {
      const v = tasks[i];
      if (time.weekdayLong !== v.time.day) continue;
      const start = DateTime.fromISO(v.time.start);
      const end = DateTime.fromISO(v.time.end);
      if (time >= start && time < end) {
        return [i, v] as [number, Task];
      }
    };
  }
  const next = (tasks: Task[]) => {
    const curr = current(tasks);
    if (!curr) return tasks.find(v => {
      const start = DateTime.fromISO(v.time.start);
      const time = DateTime.now();
      if (time < start) {
        return v;
      }
    });
    return tasks[curr[0] + 1] ?? tasks[0];
  }

  return (
    <div className='w-full bg-[length:400%] bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 animate-breathe'>
      <Seo />
      <div className='flex flex-col items-center justify-center w-full'>
      <div className="w-full max-w-md px-2 py-16 sm:px-0">
      <h1 className='text-center text-white mb-2'>Schedule</h1>
      <Tab.Group>
        <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                clsxm(
                  'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg',
                  'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="" >
          {Object.entries(categories).map((clazz) => (
            <Tab.Panel
              key={clazz[0]}
              className={clsxm(
                'bg-white rounded-xl p-3',
                'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
              )}
            >
            {[{ task: (current(clazz[1]) ?? [])[1], label: 'Now'} , { task: next(clazz[1]), label: 'Next' } ].map(({ task, label }, i) => (
              <Card key={task?.info?.title ?? 'No Class' + i} title={task?.info?.title ?? 'No Class'} caption={task?.info?.caption  ?? 'Giga Chad'} description={task?.info?.description  ?? '...'} button={{
                name: task?.info?.button?.name ?? 'Join',
                url: task?.info?.button?.url ?? 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
              }} label={label} className='mx-auto' />
            ))}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
      {/* <div className='flex flex-row justify-center gap-10 border-2 border-white p-10'>
      </div> */}
    </div>
      </div>
    </div>
  );
}
