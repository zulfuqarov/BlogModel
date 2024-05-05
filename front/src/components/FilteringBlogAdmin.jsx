import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'
import { ContextBlog } from '../context/Context'


const FilteringBlogAdmin = () => {
    const context = useContext(ContextBlog)

    const deleteBlog = async (id) => {
        try {
            const result = await axios.delete(`${context.env.REACT_APP_BACKEND_HOST}/Blog/BlogDelete/${id}`)
            alert(result.data.message)
        } catch (error) {
            alert(`${error.response.data.message}`)
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
        context.seacrhDataLoading ?
            <div className='flex justify-center items-center w-full h-[100vh]' role="status ">
                <svg aria-hidden="true" className="w-[50px] h-[50px] text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
            </div>
            :
            <div className='max-[1280px]:mb-[50px] '>
                <div className="relative">
                    <button onClick={() => context.GetBlogSearch(searchInput)} ><svg className="w-6 h-6 mr-[5px] cursor-pointer text-gray-700 absolute top-3 right-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></button>
                    <input value={searchInput.Search} name="Search" onChange={hadleChangeSearch} type="search" placeholder="Search" className="  border-b-2 w-full border-gray-200 py-3 px-9" />
                </div>
                {
                    context.searchError ?
                        <div className='w-[600px] h-[100vh] py-[10px] overflow-y-auto'>
                            <h2 className='text-center text-[24px] pt-[15px] text-red-600 font-semibold'>Blog is not defined!</h2>
                        </div> :
                        <div className=' w-[600px] max-[1280px]:w-full max-[1280px]:h-full  h-[100vh] py-[10px] overflow-y-auto '>

                            <div>
                                {
                                    context.searchData &&
                                    context.searchData
                                        .slice() // Mevcut verilerin kopyasını alıyoruz
                                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                                        .map((oneMap, index) => (
                                            <div key={index} className='flex w-full py-[5px] my-[5px] border-b-[1px] border-b-black'>
                                                <div>
                                                    <img className='w-[150px]' src={oneMap.img.length > 0 ? `${oneMap.img[0].url}` : ""} alt='no-img' />
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
                        </div>}
            </div>
    )
}

export default FilteringBlogAdmin