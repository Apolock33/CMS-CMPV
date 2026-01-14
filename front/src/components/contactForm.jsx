import { Button } from 'primereact/button';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useEffect, useRef, useState } from 'react';
import useWindowSize from '../hooks/useWindowSize';
import emailjs from '@emailjs/browser';
import { Toast } from 'primereact/toast';

const ContactForm = () => {
  const { width } = useWindowSize();
  const form = useRef(null);
  const toast = useRef(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');

  const show = () => {
    toast.current.show({ severity: 'success', summary: 'Sucesso!', detail: 'Solicitação Enviada' });
  };

  const showError = (e) => {
    toast.current.show({ severity: 'error', summary: 'Erro!', detail: `Houve um problema ao enviar a Solicitação. \n${e}` });
  };

  const sendEmail = (e) => {
    e.preventDefault(); // Previne o comportamento padrão de envio

    emailjs
      .sendForm(
        'service_xkniaxc',
        'template_xivr02l',
        form.current,
        { publicKey: 'qFx9bY49rYLEeRGzw' }
      )
      .then(
        () => {
          form.current.reset();
          show();
          setFullName('');
          setEmail('');
          setSubject('');
          setContent('');
        },
        (error) => {
          showError(error);
          console.error('Erro ao enviar:', error);
        }
      );
  };

  return (
    <div className="grid mt-2 pl-3">
      <form
        ref={form}
        onSubmit={sendEmail}
        className={`bg-white shadow-1 border-round-xl p-3 ${width < 769 ? 'col-12' : 'col-6'}`}
      >
        <div className='mt-3'>
          <FloatLabel className="field">
            <InputText
              id="name"
              name="user_name" // Deve bater com a variável do template
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border-round-md"
              required
            />
            <label htmlFor="name">Nome</label>
          </FloatLabel>

          <FloatLabel className="field mt-5">
            <InputText
              id="email"
              name="user_email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-round-md"
              required
            />
            <label htmlFor="email">E-mail</label>
          </FloatLabel>

          <FloatLabel className="field mt-5">
            <InputText
              id="subject"
              name="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full border-round-md"
              required
            />
            <label htmlFor="subject">Assunto</label>
          </FloatLabel>

          <FloatLabel className="field mt-5">
            <InputTextarea
              rows={5}
              id="content"
              name="message"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border-round-md"
              required
            />
            <label htmlFor="content">Conteúdo</label>
          </FloatLabel>

          <Button
            type="submit"
            label="Enviar"
            className="w-full border-round-md"
            style={{ backgroundColor: 'var(--primary-color)' }}
          />
        </div>
      </form>
      <Toast ref={toast} />

      <div className={`${width < 769 ? 'col-12' : 'col-6 pl-5'}`}>
        <h2 style={{ color: 'var(--primary-color)' }}>Informações Extras de Contato:</h2>

        <h3 className="mt-3" style={{ color: 'var(--primary-color)' }}>Telefone:</h3>
        <p>WhatsApp: +55 (21)96865-5554</p>

        <h3 className="mt-3" style={{ color: 'var(--primary-color)' }}>Endereço:</h3>
        <p>Praça General Tibúrcio, s/nº, Praia Vermelha – Urca / Rio de Janeiro – RJ</p>
        <p>CEP: 22290-270</p>

        <h3 className="mt-5" style={{ color: 'var(--primary-color)' }}>Atendimento na Secretaria:</h3>
        <p>Segunda à Sexta: 8h às 18h</p>
        <p>Sábado: 9h às 13h</p>
        <p>Fechado aos Domingos e Feriados</p>
      </div>
    </div>
  );
};

export default ContactForm;
