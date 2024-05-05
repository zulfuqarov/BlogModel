import React from 'react'

const LogoutButton = ({ Logout }) => {
    return (
        <div className='pt-[20px] pr-[20px] flex justify-end'>
            <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={Logout}>Logout</button>
        </div>
    )
}

export default LogoutButton