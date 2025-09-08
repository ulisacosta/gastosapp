import React from 'react';

export default function RedirectsIndex({ href, text, description, icon }) {
  return (
    <a 
      href={href}
      className="group block bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 p-6 cursor-pointer"
    >
      <div className='flex flex-col items-center text-center space-y-3'>
        <div className='w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold'>
          {icon} {/* <- Aquí se muestra el ícono */}
        </div>
        <h3 className='text-lg font-medium text-gray-800 group-hover:text-blue-600 transition-colors'>
          {text}
        </h3>
        <p className='text-sm text-gray-500'>
          {description}
        </p>
  
      </div>
    </a>
  );
}