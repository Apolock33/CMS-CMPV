import { useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import useWindowSize from "../../hooks/useWindowSize";
import { generateContactEmailHTML } from "../../utils/emailTemplates";
import { sendEmail } from "../../services/brevo";

const ContactForm = () => {
  const { width } = useWindowSize();
  const toast = useRef(null);
  const DESTINATARIO_FIXO = "carlosammgomes@gmail.com";
  
  const formik = useFormik({
    initialValues: { fullName: "", senderEmail: "", subject: "", content: "" },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Nome obrigatório"),
      senderEmail: Yup.string().email("Email inválido").required("Email obrigatório"),
      subject: Yup.string().required("Assunto obrigatório"),
      content: Yup.string().required("Mensagem obrigatória"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const emailHTML = generateContactEmailHTML(values);
        await sendEmail({
          toName: "Equipe de Contato",
          to: DESTINATARIO_FIXO,
          subject: `Contato Site CMPV: ${values.subject}`,
          htmlContent: emailHTML,
          sender: { name: values.fullName, email: values.senderEmail },
        });
        console.log("Email enviado com sucesso");
        toast.current?.show({ severity: "success", summary: "Sucesso!", detail: "Sua mensagem foi enviada. Entraremos em contato em breve!" });
        formik.resetForm();
      } catch (error) {
        console.error("Erro ao enviar o formulário:", error);
        toast.current?.show({ severity: "error", summary: "Erro!", detail: `Houve um problema ao enviar sua mensagem. Tente novamente mais tarde.` });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="grid mt-2">
      <form onSubmit={formik.handleSubmit} className={`bg-white border-round-xl ${width < 769 ? "col-12" : "col-6"}`} style={{ borderWidth: "1px", borderColor: "var(--primary-color)" }}>
        <div>
          <div className="mb-3">
            <h2 style={{ color: "var(--primary-color)" }}>Nos envie uma mensagem!</h2>
          </div>
          <div className="mb-3">
            <label htmlFor="name">Nome</label>
            <InputText id="name" name="fullName" value={formik.values.fullName} onChange={(e) => formik.setFieldValue("fullName", e.target.value)} className={`w-full border-round-md ${formik.touched.fullName && formik.errors.fullName ? "p-invalid" : ""}`} />
            {formik.touched.fullName && formik.errors.fullName && <small className="p-error ml-1">{formik.errors.fullName}</small>}
          </div>
          <div className="mb-3">
            <label htmlFor="email">Seu E-mail</label>
            <InputText id="email" name="senderEmail" value={formik.values.senderEmail} onChange={(e) => formik.setFieldValue("senderEmail", e.target.value)} className={`w-full border-round-md ${formik.touched.senderEmail && formik.errors.senderEmail ? "p-invalid" : ""}`} />
            {formik.touched.senderEmail && formik.errors.senderEmail && <small className="p-error ml-1">{formik.errors.senderEmail}</small>}
          </div>
          <div className="mb-3">
            <label htmlFor="subject">Assunto</label>
            <InputText id="subject" name="subject" value={formik.values.subject} onChange={(e) => formik.setFieldValue("subject", e.target.value)} className={`w-full border-round-md ${formik.touched.subject && formik.errors.subject ? "p-invalid" : ""}`} />
            {formik.touched.subject && formik.errors.subject && <small className="p-error ml-1">{formik.errors.subject}</small>}
          </div>
          <div className="mb-3">
            <label htmlFor="content">Conteúdo</label>
            <InputTextarea rows={5} id="content" name="content" value={formik.values.content} onChange={(e) => formik.setFieldValue("content", e.target.value)} className={`w-full border-round-md ${formik.touched.content && formik.errors.content ? "p-invalid" : ""}`} />
            {formik.touched.content && formik.errors.content && <small className="p-error ml-1">{formik.errors.content}</small>}
          </div>
          <Button type="submit" label="Enviar" className="w-full border-round-md mb-3" style={{ backgroundColor: "var(--primary-color)" }} disabled={formik.isSubmitting} />
        </div>
      </form>
      <div className={`${width < 769 ? "col-12" : "col-6 pl-5"}`}>
        <h2 style={{ color: "var(--primary-color)" }}>Informações Extras de Contato:</h2>
        <h3 className="mt-3" style={{ color: "var(--primary-color)" }}>Telefones:</h3>
        <p>WhatsApp: +55 (21)96865-5554</p>
        <h3 className="mt-3" style={{ color: "var(--primary-color)" }}>Endereço:</h3>
        <p>Praça General Tibúrcio, s/nº, Praia Vermelha – Urca - CEP: 22290-270</p>
        <h3 className="mt-5" style={{ color: "var(--primary-color)" }}>Atendimento na Secretaria:</h3>
        <p className="mb-0">Segunda à Sexta: 8h às 18h</p>
        <p className="my-0">Sábado: 9h às 13h</p>
        <p className="my-0">Fechado aos Domingos e Feriados</p>
      </div>
      <Toast ref={toast} />
    </div>
  );
};

export default ContactForm;