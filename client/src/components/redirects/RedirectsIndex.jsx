import React from 'react'

export default function RedirectsIndex({href,text}) {
  return (
    
    <div className=' '>
   
    <a href={href}>
    <button className="px-12 py-4 rounded-full bg-[#1e2ad7] font-bold text-white tracking-widest uppercase transform hover:scale-105 hover:bg-[#0b1e5f] transition-colors duration-200">
    {text}
    </button>
    </a>
    </div>
    
    
  )
}
