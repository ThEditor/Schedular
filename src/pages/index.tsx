import { Tab } from '@headlessui/react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { DateTime } from 'luxon';
import * as React from 'react';
import { Fragment, useContext } from 'react';

import clsxm from '@/lib/clsxm';
import { clazzes } from '@/lib/data';
import { ActionType, StoreContext, Task } from '@/lib/utils/Store';

import Card from '@/components/Card';
import Seo from '@/components/Seo';

export default function HomePage() {
  const { dispatch } = useContext(StoreContext)!;

  const handleClick = (n: number) => {
    dispatch({
      type: ActionType.SET_AUTHUSER,
      payload: n,
    });
  };
  const categories = clazzes;

  const current = (tasks: Task[]) => {
    const time = DateTime.now();
    for (let i = 0; i < tasks.length; i++) {
      const v = tasks[i];
      if (time.weekdayLong !== v.time.day) continue;
      const start = DateTime.fromISO(v.time.start);
      const end = DateTime.fromISO(v.time.end);
      if (time >= start && time < end) {
        return [i, v] as [number, Task];
      }
    }
  };
  const next = (tasks: Task[]) => {
    const curr = current(tasks);
    if (!curr)
      return tasks.find((v) => {
        const time = DateTime.now();
        if (time.weekdayLong !== v.time.day) return null;
        const start = DateTime.fromISO(v.time.start);
        if (time < start) {
          return v;
        }
      });
    return tasks[curr[0] + 1] ?? tasks[0];
  };

  return (
    <div className='w-full animate-breathe bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-[length:400%]'>
      <Seo />
      <div className='flex w-full flex-col items-center justify-center'>
        <div className='w-full max-w-md px-2 py-16 sm:px-0'>
          <div>
            <h1 className='mb-2 text-center text-white'>Schedule</h1>
            <Menu as='span' className='relative inline-block text-left'>
              <div>
                <Menu.Button className='inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
                  Authuser
                  <ChevronDownIcon
                    className='ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100'
                    aria-hidden='true'
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
              >
                <Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                  <div className='px-1 py-1 '>
                    {[0, 1, 2, 3, 4, 5].map((v) => (
                      <Menu.Item key={v}>
                        {({ active }) => (
                          <button
                            className={`${
                              active
                                ? 'bg-violet-500 text-white'
                                : 'text-gray-900'
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            onClick={() => handleClick(v)}
                          >
                            {v}
                          </button>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>

          <Tab.Group>
            <Tab.List className='flex space-x-1 rounded-xl bg-blue-900/20 p-1'>
              {Object.keys(categories).map((category) => (
                <Tab
                  key={category}
                  className={({ selected }) =>
                    clsxm(
                      'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
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
            <Tab.Panels className=''>
              {Object.entries(categories).map((clazz) => (
                <Tab.Panel
                  key={clazz[0]}
                  className={clsxm(
                    'rounded-xl bg-white p-3',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                  )}
                >
                  {[
                    { task: (current(clazz[1]) ?? [])[1], label: 'Now' },
                    { task: next(clazz[1]), label: 'Next' },
                  ].map(({ task, label }, i) => (
                    <Card
                      key={task?.info?.title ?? 'No Class' + i}
                      title={task?.info?.title ?? 'No Class'}
                      caption={task?.info?.caption ?? 'Giga Chad'}
                      description={task?.info?.description ?? '...'}
                      button={{
                        name: task?.info?.button?.name ?? 'Join',
                        url:
                          task?.info?.button?.url ??
                          'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                      }}
                      label={label}
                      className='mx-auto'
                    />
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
