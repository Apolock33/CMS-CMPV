import React from 'react'
import '../assets/css/index.css'
import { ProgressBar } from 'primereact/progressbar'
import useWindowSize from '../hooks/useWindowSize';

const Loading = () => {
    const { width } = useWindowSize();

    return (
        <main className='flex justify-content-center align-items-center w-screen h-screen overflow-hidden'>
            <ProgressBar
                mode="indeterminate"
                style={{
                    width: width < 426 ? '200px' : '300px',
                    height: '7px',
                    borderRadius: '10px',
                }}
                color='var(--primary-color)'
            />
        </main>
    )
}

export default Loading