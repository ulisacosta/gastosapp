import React from "react";

export default function Button({ href, text }) {
  return (
    <div className=''>
      <a
        href={href}
        className=''
      >
        <button className='px-6 py-3 rounded-md border border-black bg-white text-neutarl-700 text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200'>
          {text}
        </button>
      </a>
    </div>
  );
}
