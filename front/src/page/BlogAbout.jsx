import React, { useContext, useEffect, useState } from 'react'
import { ContextBlog } from '../context/Context'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const BlogAbout = () => {
    const { id } = useParams()
    const context = useContext(ContextBlog)

    const [data, setdata] = useState()

    const GetPost = async () => {
        try {
            const result = await axios.get(`${context.env.REACT_APP_BACKEND_HOST}/Blog/BlogGet/${id}`)
            setdata(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        GetPost()
    }, [])

    return (
        data &&
        <section>
            <header>
                <div className='group h-[70vh] relative overflow-hidden'>
                    <div className='bg-black z-10 w-full h-full absolute opacity-0 group-hover:opacity-50  ease-in duration-300 '></div>
                    <img className='w-full h-full object-cover object-center  transform transition duration-500 group-hover:scale-105' src={`${data.img[0].url}`} alt="" />
                    <div className='absolute top-0 z-20 left-0 w-full h-full p-10 flex flex-col justify-end'>
                        <p className='text-[32px] max-[600px]:w-[300px] max-[600px]:text-[22px]  text-gray-400 group-hover:text-white transition-all font-bold w-[450px]'>{data.title}</p>
                    </div>
                </div>
            </header>
            <div className='container mx-auto'>
                <section className='flex py-[60px]'>
                    <div className='basis-2/4'>
                        <img className='w-full h-full object-cover object-center  transform transition duration-500 group-hover:scale-105' src={`${data.img.length > 1 ? data.img[1].url : data.img[0].url}`} alt="" />
                    </div>
                    <div className='basis-2/4 flex justify-center items-center'>
                        <p className='text-[26px] font-thin font-semibold text-center w-[600px]'>
                            {data.title}
                        </p>
                    </div>
                </section>
                <section>
                    
                </section>
            </div>
        </section>
    )
}

export default BlogAbout