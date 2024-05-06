import React, { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
export const ContextBlog = createContext()

const env = import.meta.env

const Context = ({ children }) => {
    const navigate = useNavigate()


    const [loading, setloading] = useState(false)


    // Admin Login Start
    const [Admin, setAdmin] = useState({
        email: '',
        password: ''
    })


    const handleChangeLogin = (e) => {
        setAdmin({
            ...Admin,
            [e.target.name]: e.target.value
        })
    }

    const LoginBtn = async () => {
        setloading(true)
        try {
            const AdminLogin = await axios.post(`${env.REACT_APP_BACKEND_HOST}/Admin/Login`, Admin)
            console.log(AdminLogin.data)
            if (AdminLogin.status === 200) {
                localStorage.setItem("Adminurl", true)
                navigate("/Admin")
                setloading(false)
            }
        } catch (error) {
            setloading(false)
            console.log(error)
            alert(`${error.response.data.message}`)
        }
    }

    // Admin Login End


    // Get Blog Seacrh and all start
    const [searchData, setsearchData] = useState([])
    const [seacrhDataLoading, setseacrhDataLoading] = useState(false)
    const [searchError, setsearchError] = useState(false)
    const GetBlogSearch = async (Search) => {
        setseacrhDataLoading(true)
        setsearchError(false)
        try {
            const result = await axios.post(`${env.REACT_APP_BACKEND_HOST}/Blog/BlogSearch`, Search)
            setsearchData(result.data)
            setseacrhDataLoading(false)
        } catch (error) {
            setseacrhDataLoading(false)
            console.log(error)
            setsearchError(true)
        }
    }
    // Get Blog Seacrh and all end

    // Get all data start
    const GetAllData = async () => {
        try {
            const result = await axios.get(`${env.REACT_APP_BACKEND_HOST}/Blog/BlogAllData`)
            return result.data
        } catch (error) {
            console.log(error)
        }
    }
    // Get all data end

    return (
        <ContextBlog.Provider value={{
            env,
            handleChangeLogin,
            LoginBtn,
            loading,
            GetBlogSearch,
            searchData,
            seacrhDataLoading,
            searchError,
            GetAllData
        }}>
            {children}
        </ContextBlog.Provider>
    )
}

export default Context