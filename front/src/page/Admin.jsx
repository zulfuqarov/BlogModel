import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import LogoutButton from '../components/LogoutButton'
import FormBlog from '../components/FormBlog'
import FilteringBlogAdmin from '../components/FilteringBlogAdmin'

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
    <div className='w-full h-full pb-[60px] container mx-auto'>

      <LogoutButton Logout={Logout} />
      <div className='flex justify-between max-[1280px]:flex-col  pt-[60px]'>
        <FilteringBlogAdmin />
        <Outlet />
      </div>
    </div>
  )
}

export default Admin