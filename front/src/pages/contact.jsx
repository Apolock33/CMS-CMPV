import useWindowSize from '../hooks/useWindowSize'
import PageTitle from '../components/designSystem/pageTitle';

const Contact = () => {
  const { width } = useWindowSize();

  const path = [
    { label: 'Home', url: '/' },
    { label: 'Contatos', url: '/contatos' }
  ];

  return (
    <section>
      <div className='p-6'>
        <div className={`${width < 769 ? 'flex flex-column' : 'flex align-items-center justify-content-between'} px-1`}>
          <PageTitle titulo="Contatos" caminho={path} />
        </div>

        {/* <ContactForm /> */}

      </div>
    </section>
  )
}

export default Contact