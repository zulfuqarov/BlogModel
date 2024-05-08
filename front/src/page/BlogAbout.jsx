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

    const settings = {
        dots: true, // Noktaları göster
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

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

            </div >
        </section >
    )
}

export default BlogAbout