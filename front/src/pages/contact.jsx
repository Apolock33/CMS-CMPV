import useWindowSize from '../hooks/useWindowSize'
import PageTitle from '../components/designSystem/pageTitle';
import ContactForm from '../components/formularios/contactForm';

const Contact = () => {
  const { width } = useWindowSize();

  const path = [
    { label: 'Home', url: '/' },
    { label: 'Contatos', url: '/contatos' }
  ];

  return (
    <section>
      <div className='px-5 mt-2'>
        <div className={`${width < 769 ? 'flex flex-column' : 'flex align-items-center justify-content-between'} px-1`}>
          <PageTitle titulo="Contatos" caminho={path} />
        </div>

        <ContactForm />

      </div>
    </section>
  )
}

export default Contact