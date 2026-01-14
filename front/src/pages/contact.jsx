import React from 'react'
import { BreadCrumb } from 'primereact/breadcrumb'
import useWindowSize from '../hooks/useWindowSize'

const Contact = () => {
  const { width } = useWindowSize();

  const breadcrumbItems = [
    { label: 'Home', url: '/' },
    { label: 'Contatos', url: '/contatos' }
  ];

  return (
    <section>
      <div className='p-6'>
        <div className={`${width < 769 ? 'flex flex-column' : 'flex align-items-center justify-content-between'} px-1`}>
          {width < 769 ? (
            <>
              <BreadCrumb model={breadcrumbItems} className='border-none text-medium' />
              <h1 className="text-3xl font-bold p-0" style={{ color: 'var(--primary-color)' }}>Contate-nos</h1>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold p-0" style={{ color: 'var(--primary-color)' }}>Contate-nos</h1>
              <BreadCrumb model={breadcrumbItems} className='border-none text-medium' />
            </>
          )}
        </div>

        {/* <ContactForm /> */}

      </div>
    </section>
  )
}

export default Contact