import React, { useContext } from 'react'
import { ContextBlog } from '../context/Context'

const Blog = () => {
    const context = useContext(ContextBlog)
    console.log(context.env.REACT_APP_BACKEND_HOST)
    return (
        <div>Blog</div>
    )
}

export default Blog