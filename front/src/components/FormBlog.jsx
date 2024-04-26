import React, { useState } from 'react'

const FormBlog = () => {
    const [inputCount, setInputCount] = useState(0);
    const [inputCountLink, setinputCountLink] = useState(0);

    const [BlogImg, setBlogImg] = useState([])
    const handleChangeFile = (e) => {
        setBlogImg([...BlogImg, e.target.files[0]])
    }

    const [description, setDescription] = useState([]);
    const handleChangeDescription = (e, index) => {
        const newDescription = [...description];
        newDescription[index] = e.target.value;
        setDescription(newDescription);
    }

    const [linkUrl, setlinkUrl] = useState([])
    const handleChangeLinkUrl = (e, index) => {
        const newLinksUrl = [...linkUrl]
        newLinksUrl[index] = e.target.value
        setlinkUrl(newLinksUrl)
    }

    const handleSubmit = () => {
        console.log(BlogImg)
        console.log(description)
        console.log(linkUrl)
    }



    const handleAddInput = () => {
        setInputCount(prevCount => prevCount + 1);
    };
    const handleAddInputLink = () => {
        setinputCountLink(prevCount => prevCount + 1);
    };
    return (

        <div className='flex justify-center items-center flex-col w-full '>
            <h2 className='text-center text-[32px] font-semibold text-gray-500 pb-[30px]'>Adding Blog</h2>

            <div className="group relative w-72 md:w-80 lg:w-96">
                <label htmlFor="1" className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">Blog Titile</label>
                <input id="1" type="text" className="peer border-gray-600 focus:border-none border-[1px] h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400" />
            </div>

            <div className="pt-[30px] flex flex-col justify-center items-center">
                <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-600 hover:text-white">
                    <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                    </svg>
                    <span className="mt-2 text-base leading-normal">Select a Blog Img</span>
                    <input onChange={handleChangeFile} type='file' className="hidden" />
                </label>
                {
                    BlogImg.length > 0 ?
                        <div className='flex flex-col justify-center items-center'>
                            <p className='text-red-500 text-[22px] py-[15px]'>Selection Img</p>
                            {BlogImg.map((item, index) => (
                                <p key={index}>{item.name}</p>
                            ))}
                        </div> : ''
                }
            </div>

            <div className="group relative w-72 md:w-80 lg:w-96 py-[30px]">
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Blog Description Title</label>
                <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Blog Description Title"></textarea>
            </div>

            <div className="group relative w-72 md:w-80 lg:w-96">
                <label htmlFor="1" className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">Blog Description</label>
                <input onChange={(e) => { handleChangeDescription(e, 0) }} placeholder='Blog Description' id="1" type="text" className="peer border-gray-600 focus:border-none border-[1px] h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400" />
                {
                    [...Array(inputCount)].map((_, index) => (
                        <input key={index} id="1" type="text" onChange={(e) => { handleChangeDescription(e, index + 1) }} placeholder='Blog Description' className="peer mt-[5px] border-gray-600 focus:border-none border-[1px] h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400" />
                    ))
                }
                <button className="m-[10px] focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900" onClick={handleAddInput}>+</button>
            </div>

            <div className="group relative w-72 md:w-80 lg:w-96 pt-[30px]">
                <label htmlFor="1" className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">Links url</label>
                <input onChange={(e) => handleChangeLinkUrl(e, 0)} placeholder='Links 1' id="1" type="text" className="peer border-gray-600 focus:border-none border-[1px] h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400" />
                {
                    [...Array(inputCountLink)].map((_, index) => (
                        <input onChange={(e) => handleChangeLinkUrl(e, index + 1)} placeholder={`Links ${index + 2}`} key={index} id="1" type="text" className="peer mt-[5px] border-gray-600 focus:border-none border-[1px] h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400" />
                    ))

                }
                <button onClick={handleAddInputLink} className="m-[10px] focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900" >+</button>

            </div>

            <button onClick={handleSubmit}>click</button>
        </div>
    )
}

export default FormBlog