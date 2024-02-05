import { Navbar, TextInput , Button} from 'flowbite-react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineSearch } from "react-icons/ai"
import { FaMoon } from "react-icons/fa";
import { IoIosMenu } from "react-icons/io"
import { useState } from 'react';
function Header() {
    const path =useLocation().pathname
  return (
    <>
    <Navbar className='border-b-2'>
        <Link to={'/'} className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white '>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Blog</span>
            Blog
        </Link>
        <form>
            <TextInput type='text' placeholder='Search' rightIcon={AiOutlineSearch} className='hidden lg:inline '/>
        </form>
        <Button className='h-10 w-10 lg:hidden' color='gray' pill>
            <AiOutlineSearch/>
        </Button>
        <div className='flex space-x-2'>
            <Button className='w-12 h-10 sm:inline hidden ' color='gray' pill>
                <FaMoon/>
            </Button>
            <Navbar.Toggle/>
            <Button color="gray" className=' black:text-white' gradientDuoTone='purpleToBlue'><Link to={'/signin'} >Sign in</Link></Button>
        </div>
        <Navbar.Collapse>
            <Navbar.Link active={path==='/'} as={'div'}>
                <Link to={"/"}>Home</Link>
            </Navbar.Link>
            <Navbar.Link active={path==='/About'} as={'div'}>
                <Link to={"/About"}>About</Link>
            </Navbar.Link>
            <Navbar.Link active={path==='/Projects'} as={'div'}>
                <Link to={"/Projects"}>Projects</Link>
            </Navbar.Link>
        </Navbar.Collapse>
    </Navbar>
    </>
  )
}

export default Header