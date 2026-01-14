import React from 'react'
import { Outlet } from 'react-router-dom'
import WppButton from './wppButton'

const blankLayout = () => {
    return (
        <main>
            <Outlet />
            <WppButton />
        </main>
    )
}

export default blankLayout