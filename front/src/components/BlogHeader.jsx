import React from 'react'
import { Link } from 'react-router-dom'
const BlogHeader = ({ data }) => {

    return (
        data.length > 0 &&
        <section className='bg-[#161616] w-full h-[100vh] '>
            <div className='container mx-auto flex justify-center items-center h-full'>
                <div className='flex'>
                    <div className=' basis-3/4 group relative overflow-hidden'>
                        <div className='bg-black z-10 w-full h-full absolute opacity-0 group-hover:opacity-50  ease-in duration-300 '></div>
                        <img className='w-full h-full object-cover object-center  transform transition duration-500 group-hover:scale-105' src={`${data[0].img[0].url}`} alt="" />
                        <div className='absolute top-0 z-20 left-0 w-full h-full p-10 flex flex-col justify-end'>
                            <p className='text-[32px] text-gray-400 group-hover:text-white transition-all font-bold w-[450px]'>{data[0].title}</p>
                            <Link to={`/Blog/${data[0]._id}`} className='text-[20px] text-white group-hover:text-gray-400 font-semibold transition-all hover:text-blue-600 pt-[10px]'>Read More </Link>
                        </div>
                    </div>
                    <div className=' basis-1/4 flex flex-col'>
                        <div className='group relative overflow-hidden basis-1/2'>
                            <div className='bg-black z-10 w-full h-full absolute opacity-0 group-hover:opacity-50  ease-in duration-300 '></div>
                            <img className='w-full h-full object-cover object-center  transform transition duration-500 group-hover:scale-105' src={`${data[1].img[0].url}`} alt="" />
                            <div className='absolute top-0 z-20 left-0 w-full h-full p-10 flex flex-col justify-end'>
                                <p className='text-[17px] text-gray-400 group-hover:text-white transition-all font-bold w-[full]'>{data[1].title}</p>
                                <Link to={`/Blog/${data[1]._id}`} className='text-[15px] text-white group-hover:text-gray-400 font-semibold transition-all hover:text-blue-600 pt-[10px]'>Read More</Link>
                            </div>
                        </div>
                        <div className='group relative overflow-hidden basis-1/2'>
                            <div className='bg-black z-10  w-full h-full absolute opacity-0 group-hover:opacity-50  ease-in duration-300 '></div>
                            <img className='w-full h-full object-cover object-center  transform transition duration-500 group-hover:scale-105' src={`${data[2].img[0].url}`} alt="" />
                            <div className='absolute top-0 z-20 left-0 w-full h-full p-10 flex flex-col justify-end'>
                                <p className='text-[17px] text-gray-400 group-hover:text-white transition-all font-bold w-[full]'>{data[2].title}</p>
                                <Link to={`/Blog/${data[2]._id}`} className='text-[15px] text-white group-hover:text-gray-400 font-semibold transition-all hover:text-blue-600 pt-[10px]'>Read More</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BlogHeader