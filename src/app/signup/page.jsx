import React from 'react'

const page = () => {
    return (
        <div className=' h-screen w-screen bg-gradient-to-r from-slate-600 to-neutral-100 flex flex-col gap-5 justify-center'>
            <h1 className=' text-xl flex justify-start mx-[41%] font-bold text-slate-800 sm:justify-start md:text-4xl'>Sign up</h1>
            <form action="" className=' flex flex-col gap-5 justify-center items-center '>
                <input type="text" placeholder='email' required className='  rounded-3xl px-10 py-3 bg-gray-200' />
                <input type="password" placeholder='password' required className=' border rounded-3xl px-10 py-3 bg-gray-200 ' />
                <button className=' border rounded-3xl px-28 py-3 bg-red-300'>Sign up</button>
            </form>
            {/* <h1 className='flex justify-center'>Don't have an account?<span className='mx-2 text-red-600 font-semibold cursor-pointer'>Sign up</span></h1> */}
        </div>
    )
}

export default page