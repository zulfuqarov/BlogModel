import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LogoutButton from '../components/LogoutButton'
import FormBlog from '../components/FormBlog'

const Admin = () => {
  const navigate = useNavigate()

  // Check and Logout start
  const CheckSign = () => {
    if (!localStorage.getItem('Adminurl')) {
      navigate("/Login")
    }
  }
  const Logout = () => {
    localStorage.removeItem("Adminurl")
    window.location.reload();
  }
  // Check and Logout start


  useEffect(() => {
    CheckSign()
  }, [])

  return (
    <div className=' w-full h-full pb-[60px]'>
      <LogoutButton Logout={Logout} />
      <FormBlog />
    </div>
  )
}

export default Admin