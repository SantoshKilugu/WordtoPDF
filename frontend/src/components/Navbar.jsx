import React from 'react'

const Navbar = () => {
  return (
    <>
    <div className='max-w-screen-2xl mx-auto container px-6 py-3 md:px-40 shadow-lg h-16 fixed bg-slate-400'>
        <div className='flex justify-between'>
            <h1 className='text-2xl cursor-pointer font-bold'>word<span className='text-3xl text-orange-600'>To</span>PDF</h1>
            <h1 className='mt-1 text-2xl cursor-pointer font-bold hover:scale-125 duration-300'>Home</h1>
        </div>
    </div>
    </>
  )
}

export default Navbar