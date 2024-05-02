import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { ContextBlog } from '../context/Context';
import { useParams } from 'react-router-dom';
const FormBlogUpdate = () => {
  const { id } = useParams()
  const [loading, setloading] = useState(false)
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

  const [oldBlogImg, setoldBlogImg] = useState([])
  const [BlogImg, setBlogImg] = useState([])
  const handleChangeFile = (e) => {
    if (!e.target.files[0]) {
      return;
    }
    setBlogImg([...BlogImg, e.target.files[0]])
  }

  const [olddescriptionImg, setolddescriptionImg] = useState([])
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
  const [newDescription, setnewDescription] = useState([]);
  const handleChangenewDescription = (e, index) => {
    const newdescription = [...newDescription];
    newdescription[index] = e.target.value;
    setnewDescription(newdescription);
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

  const [newLinkUrl, setnewLinkUrl] = useState([])
  const handleChangenewLinkUrl = (e, index) => {
    const newLinksUrl = [...newLinkUrl]
    if (!newLinksUrl[index]) {
      newLinksUrl[index] = {}
    }
    newLinksUrl[index][e.target.name] = e.target.value;

    setnewLinkUrl(newLinksUrl)
  }

  const handleSubmit = async () => {
    setnewDescription([...description, ...newDescription])
    setnewLinkUrl([...linkUrl, ...newLinkUrl])
    setloading(true)
    try {
      const fileUpload = new FormData()
      fileUpload.append('title', blogFormInput.title)
      fileUpload.append('descriptionTitle', blogFormInput.descriptionTitle)
      fileUpload.append('Name', blogFormInput.Name)
      fileUpload.append("links", JSON.stringify(newLinkUrl))

      newDescription.forEach(newDescription => {
        fileUpload.append('description', newDescription)
      })

      fileUpload.append('olddescriptionImg', JSON.stringify(olddescriptionImg))
      descriptionImg.forEach(descriptionImg => {
        fileUpload.append('descriptionImg', descriptionImg)
      })

      fileUpload.append('oldBlogImg', JSON.stringify(oldBlogImg))
      BlogImg.forEach(BlogImg => {
        fileUpload.append('BlogImg', BlogImg)
      });

      const result = await axios.put(`${context.env.REACT_APP_BACKEND_HOST}/Blog/BlogPut/${id}`, fileUpload)
      alert(result.data.message)
      setloading(false)

    } catch (error) {
      console.log(error)
      alert(`${error.response.data.message}`)
      setloading(false)
    }

  }


  const [seacrhDataLoading, setseacrhDataLoading] = useState(false)
  const BlogGetUpdateData = async () => {
    setseacrhDataLoading(true)
    try {
      const result = await axios.get(`${context.env.REACT_APP_BACKEND_HOST}/Blog/BlogGet/${id}`)
      const response = result.data
      console.log(response)
      setoldBlogImg(response.img)
      setblogFromInput({
        title: response.title,
        descriptionTitle: response.descriptionTitle,
        Name: response.Name
      })
      setolddescriptionImg(response.descriptionImg)
      setnewLinkUrl(response.links)
      setnewDescription(response.description)

      setseacrhDataLoading(false)
    } catch (error) {
      console.log(error)
      setseacrhDataLoading(false)
    }
  }

  const deleteImgOld = (name) => {
    const deleteImgFilter = oldBlogImg.filter((oneFilter) => {
      return oneFilter.secure_url !== name
    })
    setoldBlogImg(deleteImgFilter)
  }

  const deleteImgNew = (name) => {
    const deleteImgFilter = BlogImg.filter((oneFilter) => {
      return oneFilter.name !== name
    })
    setBlogImg(deleteImgFilter)
  }

  const deleteImgDescriptionOld = (name) => {
    const deleteImgFilter = olddescriptionImg.filter((oneFilter) => {
      return oneFilter.secure_url !== name
    })
    setolddescriptionImg(deleteImgFilter)
  }

  const deleteImgDescriptionNew = (name) => {
    const deleteImgFilter = descriptionImg.filter((oneFilter) => {
      return oneFilter.name !== name
    })
    setdescriptionImg(deleteImgFilter)
  }

  useEffect(() => {
    BlogGetUpdateData()
  }, [id])



  if (seacrhDataLoading || loading) {
    return (
      <div className='flex justify-center items-center w-full h-[100vh]' role="status ">
        <svg aria-hidden="true" className="w-[70px] h-[70px] text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
      </div>
    )
  }
  else {
    return (
      <div className='flex justify-center items-center flex-col w-full '>
        <h2 className='text-center text-[32px] font-semibold text-gray-500 pb-[30px]'>Adding Blog</h2>

        <div className="group relative w-72 md:w-80 lg:w-96">
          <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">Blog Titile</label>
          <input value={blogFormInput.title} onChange={handleChangeblogFormInput} name='title' type="text" className="peer border-gray-600 focus:border-none border-[1px] h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400" />
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
            oldBlogImg.length > 0 ?
              <div className='flex flex-col justify-center items-center'>
                <p className='text-red-500 text-[22px] py-[15px]'>Selection Img</p>
                {oldBlogImg.map((item, index) => (
                  <div className='flex items-center' key={index}>
                    <p>{item.secure_url}</p>
                    <button onClick={() => deleteImgOld(item.secure_url)} className='text-red-500 pl-[20px]  text-[32px] font-thin'>-</button>
                  </div>

                ))}
              </div> : ''
          }
          {
            BlogImg.length > 0 ?
              <div className='flex flex-col justify-center items-center'>
                {BlogImg.map((item, index) => (
                  <div className='flex items-center' key={index}>
                    <p key={index}>{item.name}</p>
                    <button onClick={() => deleteImgNew(item.name)} className='text-red-500 pl-[20px]  text-[32px] font-thin'>-</button>
                  </div>
                ))}
              </div> : ''
          }
        </div>

        <div className="group relative w-72 md:w-80 lg:w-96 py-[30px]">
          <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Blog Description Title</label>
          <textarea value={blogFormInput.descriptionTitle} onChange={handleChangeblogFormInput} name='descriptionTitle' rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Blog Description Title"></textarea>
        </div>

        <div className="group relative w-72 md:w-80 lg:w-96">
          <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">Blog Description</label>
          {
            newDescription &&
            newDescription.map((oneMap, index) => (
              <input value={newDescription[index]} onChange={(e) => { handleChangenewDescription(e, index) }} key={index} type="text" placeholder='Blog Description' className="peer mt-[5px] border-gray-600 focus:border-none border-[1px] h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400" />
            ))
          }
          {
            [...Array(inputCount)].map((_, index) => (
              <input value={description[index] || ''} key={index} type="text" onChange={(e) => { handleChangeDescription(e, index) }} placeholder='Blog Description' className="peer mt-[5px] border-gray-600 focus:border-none border-[1px] h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400" />
            ))
          }
          <button className="m-[10px] focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900" onClick={handleAddInput}>+</button>
        </div>

        <div className="group relative w-72 md:w-80 lg:w-96 pt-[30px]">
          <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">Links url</label>
          {
            newLinkUrl &&
            newLinkUrl.map((oneMap, index) => (
              <div className='mt-[5px] py-[25px] px-[50px] rounded-lg border-[1px] border-black' key={index}>
                <input value={oneMap.Name} name='Name' onChange={(e) => handleChangenewLinkUrl(e, index)} placeholder='name 1' type="text" className="peer border-gray-600 focus:border-none border-[1px] h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400" />
                <input value={oneMap.links} name='links' onChange={(e) => handleChangenewLinkUrl(e, index)} placeholder='Links 1' type="text" className="peer mt-[5px] border-gray-600 focus:border-none border-[1px] h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400" />
              </div>
            ))
          }
          {
            [...Array(inputCountLink)].map((_, index) => (
              <div className='mt-[5px] py-[25px] px-[50px] rounded-lg border-[1px] border-black' key={index}>
                <input name='Name' onChange={(e) => handleChangeLinkUrl(e, index)} placeholder={`name ${index + 1}`} type="text" className="peer mt-[5px] border-gray-600 focus:border-none border-[1px] h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400" />
                <input name='links' onChange={(e) => handleChangeLinkUrl(e, index)} placeholder={`Links ${index + 1}`} type="text" className="peer mt-[5px] border-gray-600 focus:border-none border-[1px] h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400" />
              </div>
            ))

          }
          <button onClick={handleAddInputLink} className="m-[10px] focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900" >+</button>

        </div>

        <div className="group relative w-72 md:w-80 lg:w-96 pt-[30px]">
          <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">Name</label>
          <input value={blogFormInput.Name} onChange={handleChangeblogFormInput} name='Name' placeholder='Name' type="text" className="peer border-gray-600 focus:border-none border-[1px] h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400" />
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
            olddescriptionImg.length > 0 ?
              <div className='flex flex-col justify-center items-center'>
                <p className='text-red-500 text-[22px] py-[15px]'>Selection Img</p>
                {olddescriptionImg.map((item, index) => (
                  <div className='flex items-center' key={index}>
                    <p>{item.secure_url}</p>
                    <button onClick={() => deleteImgDescriptionOld(item.secure_url)} className='text-red-500 pl-[20px]  text-[32px] font-thin'>-</button>
                  </div>
                ))}
              </div> : ''
          }
          {
            descriptionImg.length > 0 ?
              <div className='flex flex-col justify-center items-center'>
                {descriptionImg.map((item, index) => (
                  <div className='flex items-center' key={index}>
                    <p>{item.name}</p>
                    <button onClick={() => deleteImgDescriptionNew(item.name)} className='text-red-500 pl-[20px]  text-[32px] font-thin'>-</button>
                  </div>
                ))}
              </div> : ''
          }
        </div>

        <button onClick={handleSubmit} className="bg-blue-500 mt-[50px] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Updata Project
        </button>
      </div>
    )
  }
}


export default FormBlogUpdate