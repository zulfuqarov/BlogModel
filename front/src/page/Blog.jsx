import React, { useContext, useEffect, useState } from 'react'
import { ContextBlog } from '../context/Context'
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate';

const Blog = () => {
    const context = useContext(ContextBlog)
    // console.log(context.env.REACT_APP_BACKEND_HOST)

    const shortenText = (text) => {
        if (text.length > 50) {
            return text.slice(0, 80) + '...'; // Metnin kırpılması ve üç nokta eklenmesi
        }
        return text;
    };
    const shortenTitle = (text) => {
        if (text.length > 25) {
            return text.slice(0, 35) + '...'; // Metnin kırpılması ve üç nokta eklenmesi
        }
        return text;
    };
    // Dbdata start
    const [searchInput, setsearchInput] = useState({
        Search: ''
    })

    const handleChangeInputSearch = (e) => {
        setsearchInput({
            ...searchInput,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        context.GetBlogSearch(searchInput)
    }, [])

    // Dbdata end


    // pagination start
    const [currentPage, setCurrentPage] = useState(0);
    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const itemsPerPage = 6;
    const pageCount = Math.ceil(context.searchData.length / itemsPerPage);
    const displayedItems = context.searchData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    // paginations end


    return (
        context.seacrhDataLoading ?
            <div className='flex justify-center items-center w-full h-[100vh]' role="status ">
                <svg aria-hidden="true" className="w-[50px] h-[50px] text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
            </div>
            :
            <section className='container mx-auto py-[80px]'>
                <div className="relative w-[600px] mx-auto">
                    <button onClick={() => context.GetBlogSearch(searchInput)} ><svg className="w-6 h-6 mr-[5px] cursor-pointer text-gray-700 absolute top-3 right-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></button>
                    <input value={searchInput.Search} name='Search' onChange={handleChangeInputSearch} type="search" placeholder="Search" className="  border-2 w-full border-gray-200 py-3 px-9" />
                </div>
                {
                    context.searchError ?
                        <div className='w-[100%] h-[100vh] py-[10px] overflow-y-auto'>
                            <h2 className='text-center text-[24px] pt-[15px] text-red-600 font-semibold'>Blog is not defined!</h2>
                        </div> :
                        <div className="m-4 lg:flex lg:flex-wrap">
                            {
                                displayedItems &&
                                displayedItems.map((oneMap,index) => (

                                    <div key={index} className="p-4 md:w-1/3 group">
                                        <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
                                            <img className="object-cover object-center w-full lg:h-48 md:h-36 transform transition duration-300 group-hover:scale-105"
                                                src={`${oneMap.img[0].url}`} alt="blog" />
                                            <div className="p-6">
                                                <span className="inline-block p-2 mb-2 text-xs font-medium tracking-widest text-black rounded">{oneMap.Name}</span>
                                                <h1 className="mb-2 text-lg font-medium text-gray-900">{shortenTitle(oneMap.title)}</h1>
                                                <p className="mb-2 text-sm tracking-wide text-gray-700">{shortenText(oneMap.descriptionTitle)}</p>
                                                <div className="flex items-center">
                                                    <Link className="inline-flex items-center text-indigo-500 cursor-pointer md:mb-2 lg:mb-0">Read More
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                        </svg>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                ))
                            }
                        </div>
                }

                <div className=" mx-auto">
                    <ReactPaginate
                        className='flex items-center justify-center gap-2 pagination'
                        pageCount={pageCount}
                        onPageChange={handlePageChange}
                        containerClassName="pagination"
                        activeClassName="active"
                    />
                </div>

            </section>
    )
}

export default Blog