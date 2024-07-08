"use client";

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { Squash as Hamburger } from 'hamburger-react'


const navigation = [
  { name: 'Home', href: '/' },
  { name: 'AlgoVis', href: '/algovis' },
  { name: 'Kelly Pool', href: '/kellypool' },
  // { name: 'More Chilly', href: '/morechilly' },
]


export default function Header() {
  const genericHamburgerLine = `h-1 w-6 my-1 bg-black transition ease transform duration-300`;

  return (
      <header className="bg-white">
        <nav className="h-10 mx-auto flex max-w-7xl items-center justify-between p-2 lg:px-8" aria-label="Global">

          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5"> 
              <span className="sr-only">Your Company</span>
              <a className="text-sm font-semibold leading-6 text-gray-900">
                Ben Shephard
              </a>
            </a>
          </div>

          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900">
                {item.name}
              </a>
            ))}
          </div>

          <div className="flex lg:hidden">
            <Popover className="relative content-center text-sm">
              {({ open }) => (  
                <>
                  <PopoverButton className="p-0" >
                    <Hamburger size={20} toggled={open} hideOutline={true}/>
                  </PopoverButton>
                  <PopoverPanel anchor="bottom" className="flex flex-col w-52">
                    {navigation.map((item) => (
                      <a
                      key={item.name}
                      href={item.href}
                      className="block rounded-lg px-3 py-2 text-base text-right font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </a>
                    ))}
                  </PopoverPanel>
                </>
              )}
            </Popover>
          </div>

        </nav>
      </header>
  )
}