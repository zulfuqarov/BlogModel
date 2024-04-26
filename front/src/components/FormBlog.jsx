import React, { useState, useContext } from 'react'
import axios from 'axios'
import { ContextBlog } from '../context/Context';
const FormBlog = () => {
    const context = useContext(ContextBlog)

    const [inputCount, setInputCount] = useState(0);
    const handleAddInput = () => {
        setInputCount(prevCount => prevCount + 1);
    };

    const [inputCountLink, setinputCountLink] = useState(0);
    const handleAddInputLink = () => {
        setinputCountLink(prevCount => prevCount + 1);
    };

    const [blogFormInput, setblogFromInput] = useState({
        title: '',
        descriptionTitle: '',
        Name: ''
    })
    const handleChangeblogFormInput = (e) => {
        setblogFromInput({
            ...blogFormInput,
            [e.target.name]: e.target.value
        })
    }

    const [BlogImg, setBlogImg] = useState([])
    const handleChangeFile = (e) => {
        if (!e.target.files[0]) {
            return;
        }
        setBlogImg([...BlogImg, e.target.files[0]])
    }

    const [descriptionImg, setdescriptionImg] = useState([])
    const handleChangeFileDescription = (e) => {
        if (!e.target.files[0]) {
            return;
        }
        setdescriptionImg([...descriptionImg, e.target.files[0]])
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
        if (!newLinksUrl[index]) {
            newLinksUrl[index] = {}
        }
        newLinksUrl[index][e.target.name] = e.target.value;

        setlinkUrl(newLinksUrl)
    }

    const handleSubmit = async () => {
        try {
            const fileUpload = new FormData()
            fileUpload.append('title', blogFormInput.title)
            fileUpload.append('descriptionTitle', blogFormInput.descriptionTitle)
            fileUpload.append('description', description)
            fileUpload.append('Name', blogFormInput.Name)
            fileUpload.append('links', linkUrl)
            descriptionImg.forEach(descriptionImg => {
                fileUpload.append('descriptionImg', descriptionImg)
            })
            BlogImg.forEach(BlogImg => {
                fileUpload.append('BlogImg', BlogImg)
            });

            const result = await axios.post(`${context.env.REACT_APP_BACKEND_HOST}/Blog/BlogPost`, fileUpload)
            console.log(result.data)
        } catch (error) {
            console.log(error)
            alert(`${error.response.data.message}`)
        }
        // console.log(BlogImg)
        // console.log(description)
        // console.log(linkUrl)
        // console.log(descriptionImg)
        // console.log(blogFormInput)
    }
    return (

        <div className='flex justify-center items-center flex-col w-full '>
            <h2 className='text-center text-[32px] font-semibold text-gray-500 pb-[30px]'>Adding Blog</h2>

            <div className="group relative w-72 md:w-80 lg:w-96">
                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">Blog Titile</label>
                <input onChange={handleChangeblogFormInput} name='title' id="1" type="text" className="peer border-gray-600 focus:border-none border-[1px] h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400" />
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
                <textarea onChange={handleChangeblogFormInput} name='descriptionTitle' id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Blog Description Title"></textarea>
            </div>

            <div className="group relative w-72 md:w-80 lg:w-96">
                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">Blog Description</label>
                <input onChange={(e) => { handleChangeDescription(e, 0) }} placeholder='Blog Description' id="1" type="text" className="peer border-gray-600 focus:border-none border-[1px] h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400" />
                {
                    [...Array(inputCount)].map((_, index) => (
                        <input key={index} id="1" type="text" onChange={(e) => { handleChangeDescription(e, index + 1) }} placeholder='Blog Description' className="peer mt-[5px] border-gray-600 focus:border-none border-[1px] h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400" />
                    ))
                }
                <button className="m-[10px] focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900" onClick={handleAddInput}>+</button>
            </div>

            <div className="group relative w-72 md:w-80 lg:w-96 pt-[30px]">
                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">Links url</label>
                <div className='py-[25px] px-[50px] rounded-lg border-[1px] border-black'>
                    <input name='Name' onChange={(e) => handleChangeLinkUrl(e, 0)} placeholder='name 1' type="text" className="peer border-gray-600 focus:border-none border-[1px] h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400" />
                    <input name='links' onChange={(e) => handleChangeLinkUrl(e, 0)} placeholder='Links 1' type="text" className="peer mt-[5px] border-gray-600 focus:border-none border-[1px] h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400" />
                </div>
                {
                    [...Array(inputCountLink)].map((_, index) => (
                        <div className='mt-[5px] py-[25px] px-[50px] rounded-lg border-[1px] border-black' key={index}>
                            <input name='Name' onChange={(e) => handleChangeLinkUrl(e, index + 1)} placeholder={`name ${index + 2}`} type="text" className="peer mt-[5px] border-gray-600 focus:border-none border-[1px] h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400" />
                            <input name='links' onChange={(e) => handleChangeLinkUrl(e, index + 1)} placeholder={`Links ${index + 2}`} type="text" className="peer mt-[5px] border-gray-600 focus:border-none border-[1px] h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400" />
                        </div>
                    ))

                }
                <button onClick={handleAddInputLink} className="m-[10px] focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900" >+</button>

            </div>

            <div className="group relative w-72 md:w-80 lg:w-96 pt-[30px]">
                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">Name</label>
                <input onChange={handleChangeblogFormInput} name='Name' placeholder='Name' id="1" type="text" className="peer border-gray-600 focus:border-none border-[1px] h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400" />
            </div>

            <div className="pt-[30px] flex flex-col justify-center items-center">
                <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-600 hover:text-white">
                    <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                    </svg>
                    <span className="mt-2 text-base leading-normal">Select a Descripton Img</span>
                    <input onChange={handleChangeFileDescription} type='file' className="hidden" />
                </label>
                {
                    descriptionImg.length > 0 ?
                        <div className='flex flex-col justify-center items-center'>
                            <p className='text-red-500 text-[22px] py-[15px]'>Selection Img</p>
                            {descriptionImg.map((item, index) => (
                                <p key={index}>{item.name}</p>
                            ))}
                        </div> : ''
                }
            </div>

            <button onClick={handleSubmit} className="bg-blue-500 mt-[50px] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Add Blog
            </button>
        </div>
    )
}

export default FormBlog