import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Dispatch, SetStateAction, useState } from 'react';
import './LeftPanel.css';

interface PanelProps {
  board: string;
  setBoard: Dispatch<SetStateAction<string>>;
  algo: string;
  setAlgo: Dispatch<SetStateAction<string>>;
  stepCount: number;
  setStepCount: Dispatch<SetStateAction<number>>;
  isAnimating: boolean;
  setIsAnimating: Dispatch<SetStateAction<boolean>>;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export const LeftPanel: React.FC<PanelProps> = ({
  board, 
  setBoard, 
  algo, 
  setAlgo,
  stepCount,
  setStepCount,
  isAnimating,
  setIsAnimating,
}) => {
  
  function MyMenuItem(name: string, action: Dispatch<SetStateAction<string>>) {
    return (
      <MenuItem>
        {({ focus }) => (
          <a
            onClick={() => action(name)}
            className={classNames(focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm')}
            >
            {name}
          </a>
        )}
      </MenuItem>
    );
  }
  
  function MyMenuButton(name: string) {
    return (
      <div>
        <MenuButton className="inline-flex w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {name}
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
        </MenuButton>
      </div>
    );
  }



  return (
    <div className='p-5'>


      <div className='flex flex-row justify-evenly w-full'>
        <div onClick={() => setStepCount(stepCount+1)}>
          Step
        </div>
        <div onClick={() => setIsAnimating(!isAnimating)}>
          {isAnimating ? "Pause" : "Play"}
        </div>
      </div>


      <div className='h-2'/>
      <div>Board Type</div>
      <Menu as="div" className="relative w-full inline-block text-left">
        {MyMenuButton(board)}
        <MenuItems
          
          className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
        >
          <div className="py-1">
            {MyMenuItem("Matrix", setBoard)}
            {MyMenuItem("Graph", setBoard)}
          </div>
        </MenuItems>
      </Menu>
      <div className='h-2'/>
      <div>Algorithm</div>
      <Menu as="div" className="relative w-full inline-block text-left">
        {MyMenuButton(algo)}
        <MenuItems
          
          className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
        >
          <div className="py-1">
            {MyMenuItem("BFS", setAlgo)}
            {MyMenuItem("DFS", setAlgo)}
            {MyMenuItem("Dijkstra", setAlgo)}
            {MyMenuItem("A Star", setAlgo)}
          </div>
        </MenuItems>
      </Menu>
    </div>
  );
}