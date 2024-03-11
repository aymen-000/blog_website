import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <div className='flex-col items-center  border-t-8 border-teal-500 w-full mb-2 py-4 px-5 my-4'>
        
        <div className='self-center whitespace-nowrap text-4xl  tracking-wide font-semibold dark:text-white'>
        <span className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Blog</span>Blog</div>
        <div className='grid grid-cols-3 max-sm:grid-cols-2 sm:space-x-3 sm:space-y-3 my-3 mx-auto  items-center'>
            <div >
                <h1 className='font-bold  mt-2  '>About</h1>
                <div className='text-gray-500'><Link>100 JS Projects</Link></div>
                <div className='text-gray-500'><Link>Blog's Blog</Link></div>
            </div>
            <div>
                <h1 className='font-bold  mt-2  '>FOLLOW US</h1>
                <div className='text-gray-500'><Link>Github</Link></div>
                <div className='text-gray-500'><Link>Discord</Link></div>
            </div>
            <div>
                <h1 className='font-bold mt-2 '>LEGAL</h1>
                <div className='text-gray-500'><Link>Privacy Policy</Link></div>
                <div className='text-gray-500'><Link>Terms & Conditions</Link></div>
            </div>
        </div>
        <hr class="my-3 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
        <div className='sm:flex sm:justify-between'>
            <div className='text-gray-500'>&copy; 2024 Blog's blog </div>
            <div className='flex space-x-4 my-3'>
                <Link to={"https://facebook.com"}><FaFacebook className='text-xl'/></Link>
                <Link to={"https://instagram.com"}><FaInstagramSquare className='text-xl'/></Link>
                <Link><FaXTwitter className='text-xl'/></Link>
                <Link to={"https://github.com"}><FaGithub className='text-xl'/></Link>
            </div>
        </div>
    </div>
  )
}

export default Footer