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
s
        </section>
    )
}

export default BlogAbout