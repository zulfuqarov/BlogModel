import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'
import { ContextBlog } from '../context/Context'


const FilteringBlogAdmin = () => {
    const context = useContext(ContextBlog)

    const deleteBlog = async (id) => {
        try {
            const result = await axios.delete(`${context.env.REACT_APP_BACKEND_HOST}/Blog/BlogDelete/${id}`)
            console.log(result.data)
        } catch (error) {
            console.log(error)
        }
    }


    const [searchInput, setsearchInput] = useState({
        Search: ''
    })

    const hadleChangeSearch = (e) => {
        setsearchInput({
            ...searchInput,
            [e.target.name]: e.target.value
        })
    }




    useEffect(() => {
        context.GetBlogSearch(searchInput)
    }, [])


    return (
        <div className=' w-[600px] h-[100vh] py-[10px] overflow-y-auto '>
            <div className="relative">
                <button onClick={() => context.GetBlogSearch(searchInput)} ><svg className="w-6 h-6 mr-[5px] cursor-pointer text-gray-700 absolute top-3 right-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></button>
                <input name="Search" onChange={hadleChangeSearch} type="search" placeholder="Search" className="  border-b-2 w-full border-gray-200 py-3 px-9" />
            </div>
            <div>
                {
                    context.searchData &&
                    context.searchData
                        .slice() // Mevcut verilerin kopyasını alıyoruz
                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Eklenme zamanına göre sıralama yapılıyor
                        .map((oneMap,index) => (
                            <div key={index} className='flex w-full py-[5px] my-[5px] border-b-[1px] border-b-black'>
                                <div>
                                    <img className='w-[150px]' src={`${oneMap.img[0].url}`} alt='' />
                                </div>
                                <div className='flex justify-center items-center w-full flex-col'>
                                    <h2 className='pb-[10px]'>{oneMap.title}</h2>
                                    <div className='flex justify-evenly items-center w-full'>
                                        <Link
                                            to={`Update/${oneMap._id}`}
                                            className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
                                        >
                                            Update
                                        </Link>
                                        <Link
                                            onClick={() => deleteBlog(oneMap._id)}
                                            className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
                                        >
                                            Delete
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))

                }

            </div>
        </div>
    )
}

export default FilteringBlogAdmin