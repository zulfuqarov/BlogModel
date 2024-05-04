import React, { useContext, useState } from 'react'
import { ContextBlog } from '../context/Context'
import { Link } from 'react-router-dom'
const Blog = () => {
    const context = useContext(ContextBlog)
    console.log(context.env.REACT_APP_BACKEND_HOST)

    const [text, setText] = useState("Photo booth fam kinfolk cold-pressedsriracha leggings jianbing microdosing tousled waistcoat");

    const shortenText = (text) => {
        if (text.length > 50) {
            return text.slice(0, 80) + '...'; // Metnin kırpılması ve üç nokta eklenmesi
        }
        return text;
    };

    return (
        <section className='container mx-auto py-[80px]'>
            <div className="relative w-[600px] mx-auto">
                <button ><svg className="w-6 h-6 mr-[5px] cursor-pointer text-gray-700 absolute top-3 right-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></button>
                <input type="search" placeholder="Search" className="  border-2 w-full border-gray-200 py-3 px-9" />
            </div>

            <div class="m-4 lg:flex lg:flex-wrap">
                <div class="p-4 md:w-1/3 group">
                    <div class="border-2 border-gray-200 rounded-lg overflow-hidden">
                        <img class="object-cover object-center w-full lg:h-48 md:h-36 transform transition duration-300 group-hover:scale-105"
                            src="https://source.unsplash.com/collection/190726/1000x900" alt="blog" />
                        <div class="p-6">
                            <span class="inline-block p-2 mb-2 text-xs font-medium tracking-widest text-black rounded">zulfuqarov.nebi</span>
                            <h1 class="mb-2 text-lg font-medium text-gray-900">The Title</h1>
                            <p class="mb-2 text-sm tracking-wide text-gray-700">{shortenText(text)}</p>
                            <div class="flex items-center">
                                <Link class="inline-flex items-center text-indigo-500 cursor-pointer md:mb-2 lg:mb-0">Read More
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="p-4 md:w-1/3 group">
                    <div class="border-2 border-gray-200 rounded-lg overflow-hidden">
                        <img class="object-cover object-center w-full lg:h-48 md:h-36 transform transition duration-300 group-hover:scale-105"
                            src="https://source.unsplash.com/collection/190726/1000x900" alt="blog" />
                        <div class="p-6">
                            <span class="inline-block p-2 mb-2 text-xs font-medium tracking-widest text-black rounded">zulfuqarov.nebi</span>
                            <h1 class="mb-2 text-lg font-medium text-gray-900">The Title</h1>
                            <p class="mb-2 text-sm tracking-wide text-gray-700">{shortenText(text)}</p>
                            <div class="flex items-center">
                                <Link class="inline-flex items-center text-indigo-500 cursor-pointer md:mb-2 lg:mb-0">Read More
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="p-4 md:w-1/3 group">
                    <div class="border-2 border-gray-200 rounded-lg overflow-hidden">
                        <img class="object-cover object-center w-full lg:h-48 md:h-36 transform transition duration-300 group-hover:scale-105"
                            src="https://source.unsplash.com/collection/190726/1000x900" alt="blog" />
                        <div class="p-6">
                            <span class="inline-block p-2 mb-2 text-xs font-medium tracking-widest text-black rounded">zulfuqarov.nebi</span>
                            <h1 class="mb-2 text-lg font-medium text-gray-900">The Title</h1>
                            <p class="mb-2 text-sm tracking-wide text-gray-700">{shortenText(text)}</p>
                            <div class="flex items-center">
                                <Link class="inline-flex items-center text-indigo-500 cursor-pointer md:mb-2 lg:mb-0">Read More
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="p-4 md:w-1/3 group">
                    <div class="border-2 border-gray-200 rounded-lg overflow-hidden">
                        <img class="object-cover object-center w-full lg:h-48 md:h-36 transform transition duration-300 group-hover:scale-105"
                            src="https://source.unsplash.com/collection/190726/1000x900" alt="blog" />
                        <div class="p-6">
                            <span class="inline-block p-2 mb-2 text-xs font-medium tracking-widest text-black rounded">zulfuqarov.nebi</span>
                            <h1 class="mb-2 text-lg font-medium text-gray-900">The Title</h1>
                            <p class="mb-2 text-sm tracking-wide text-gray-700">{shortenText(text)}</p>
                            <div class="flex items-center">
                                <Link class="inline-flex items-center text-indigo-500 cursor-pointer md:mb-2 lg:mb-0">Read More
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="p-4 md:w-1/3 group">
                    <div class="border-2 border-gray-200 rounded-lg overflow-hidden">
                        <img class="object-cover object-center w-full lg:h-48 md:h-36 transform transition duration-300 group-hover:scale-105"
                            src="https://source.unsplash.com/collection/190726/1000x900" alt="blog" />
                        <div class="p-6">
                            <span class="inline-block p-2 mb-2 text-xs font-medium tracking-widest text-black rounded">zulfuqarov.nebi</span>
                            <h1 class="mb-2 text-lg font-medium text-gray-900">The Title</h1>
                            <p class="mb-2 text-sm tracking-wide text-gray-700">{shortenText(text)}</p>
                            <div class="flex items-center">
                                <Link class="inline-flex items-center text-indigo-500 cursor-pointer md:mb-2 lg:mb-0">Read More
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="p-4 md:w-1/3 group">
                    <div class="border-2 border-gray-200 rounded-lg overflow-hidden">
                        <img class="object-cover object-center w-full lg:h-48 md:h-36 transform transition duration-300 group-hover:scale-105"
                            src="https://source.unsplash.com/collection/190726/1000x900" alt="blog" />
                        <div class="p-6">
                            <span class="inline-block p-2 mb-2 text-xs font-medium tracking-widest text-black rounded">zulfuqarov.nebi</span>
                            <h1 class="mb-2 text-lg font-medium text-gray-900">The Title</h1>
                            <p class="mb-2 text-sm tracking-wide text-gray-700">{shortenText(text)}</p>
                            <div class="flex items-center">
                                <Link class="inline-flex items-center text-indigo-500 cursor-pointer md:mb-2 lg:mb-0">Read More
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default Blog