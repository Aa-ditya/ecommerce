'use client'
import React from 'react'

const Navbar = () => {
    return (
        <div className=' px-4 py-4 bg-slate-300 flex justify-between'>
            <h1 className=' text-4xl font-bold'>logo</h1>
            <div>
                <input type="text" placeholder='search' className=' w-[40vw] py-2 rounded-lg focus:outline-none px-3' />
            </div>
            <div>
                <h1 className=' text-2xl font-semibold'>cart</h1>
            </div>
        </div>
    )
}

export default Navbar