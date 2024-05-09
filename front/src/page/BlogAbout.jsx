import React, { useContext, useEffect, useState, useRef } from 'react'
import { ContextBlog } from '../context/Context'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import DisqusComments from '../components/DisqusComments';
const BlogAbout = () => {
    const { id } = useParams()
    const context = useContext(ContextBlog)

    const [data, setdata] = useState()
    const [loading, setloading] = useState(false)

    const GetPost = async () => {
        setloading(true)
        try {
            const result = await axios.get(`${context.env.REACT_APP_BACKEND_HOST}/Blog/BlogGet/${id}`)
            setdata(result.data)
            setloading(false)
        } catch (error) {
            console.log(error)
            setloading(false)
        }
    }

    useEffect(() => {
        GetPost()
    }, [])

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    if (loading) {
        return (
            <div className='flex justify-center items-center w-full h-[100vh]' role="status ">
                <svg aria-hidden="true" className="w-[50px] h-[50px] text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
            </div>
        )
    } else {
        return (
            data &&
            <section className='pb-[60px]'>
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
                    <section className='flex max-[768px]:flex-col py-[60px]'>
                        <div className='basis-2/4'>
                            {
                                data.img.length > 1 ?
                                    <Carousel autoPlay interval={5000} showArrows={true}>
                                        {data.img.map((image, index) => (
                                            <div key={index}>
                                                <img className='!w-full !h-full object-cover object-center' src={`${image.url}`} alt="" />
                                            </div>
                                        ))}
                                    </Carousel> : <img className='w-full h-full object-cover object-center' src={`${data.img.length > 1 ? data.img[1].url : data.img[0].url}`} alt="" />
                            }
                        </div>
                        <div className='basis-2/4 flex justify-center items-center max-[768px]:pt-[60px]'>
                            <p className='text-[26px] font-thin font-semibold text-center max-[1024px]:w-full w-[100%]'>
                                {data.title}
                            </p>
                        </div>
                    </section>

                    <section className='flex-col py-[60px]'>
                        <div className=' flex-col justify-center items-center max-[768px]:pt-[60px]'>
                            <p className="text-[18px] max-w-[1000px] mx-auto leading-[30px]  font-bold text-center pb-[30px] max-[768px]:text-[17px] text-gray-600">{data.descriptionTitle}</p>
                            {
                                data.descriptionImg.length > 0 ?
                                    data.descriptionImg.length > 1 ?
                                        <Slider  {...settings}>
                                            {data.descriptionImg.map((image, index) => (
                                                <div key={index}>
                                                    <img className='w-[100%] mx-auto h-full object-cover object-center  transform transition duration-500 hover:scale-105' src={image.url} alt={`Slide ${index}`} />
                                                </div>
                                            ))}
                                        </Slider>
                                        : <img className='w-[600px] mx-auto h-full object-cover object-center  transform transition duration-500 group-hover:scale-105' src={`${data.descriptionImg.length > 1 ? data.descriptionImg[1].url : data.descriptionImg[0].url}`} alt="" />
                                    : ''
                            }
                            <ul className='pt-[60px] list-disc'>
                                {
                                    data.description.map((item, index) => (
                                        <li key={index} className="text-[17px] max-[768px]:text-[16px] w-[700px] max-[768px]:w-[500px] max-[641px]:w-[300px]  py-[15px] border-b-[1px]  text-black">
                                            {item}
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </section>

                    <section className='w-[300px] pb-[20px]'>
                        <p className='text-center text-[17px] font-thin text-gray-500'>{data.Name}</p>
                    </section>

                    <section className='flex max-[548px]:flex-col items-center'>
                        {
                            data.links.length > 0 ?
                                data.links.map((oneMap) => (
                                    <Link to={`${oneMap.links}`} class="bg-blue-500 max-[548px]:my-[5px] mx-[5px] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        {oneMap.Name}
                                    </Link>
                                ))
                                :
                                ''
                        }
                    </section>


                    <Link to="/" className='text-[28px] bg-blue-500 w-[60px] h-[60px] rounded-[50%] flex justify-center items-center text-white fixed right-[30px]  bottom-[30px]'><i className="fa-solid fa-left-long fa-fade"></i></Link>

                    <div>
                        <DisqusComments />
                    </div>
                </div >
            </section >
        )
    }
}

export default BlogAbout