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
    return (
        <ContextBlog.Provider value={{
            env,
            handleChangeLogin,
            LoginBtn,
            loading
        }}>
            {children}
        </ContextBlog.Provider>
    )
}

export default Context