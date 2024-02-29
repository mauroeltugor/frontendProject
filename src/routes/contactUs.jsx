import DefaultLayout from "../layout/DefaultLayout";
import emailjs from '@emailjs/browser';
import React, { useRef } from "react";
import '../assets/contactUs.css'

const ContactUs = () => {
  const refForm = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const serviceId = "service_ghhs3xh";
    const templateId = "template_qjyqutf";
    const apiKey = "y8ZnVdPiGF3qDQgh5";

    emailjs.sendForm(serviceId, templateId,refForm.current, apiKey)
      .then(result => console.log(result.text))
      .catch(error => console.error(error));
  };

  return (
<div>
      <DefaultLayout>
        <div className="formContainer">
        <form ref={refForm} onSubmit={handleSubmit} className="formulario-contactos">
          <div  class="titles">
            <h2>Envio peticiones o reclamos a parkingLocation</h2>
            <p>Llenar formulario completo</p>
          </div>
          <fieldset className="field-name">
            <label htmlFor="username" className="symbol-required name">Name</label>
            <input name="username" type="text" className="log-input" placeholder="Nombre" required />
          </fieldset>
          <fieldset className="field-email">
            <label htmlFor="email" className="symbol-required">Email</label>
            <input type="email" className="log-input" placeholder="Email" name="email" required />
          </fieldset>
          <fieldset className="field-message">
            <label className="symbol-required">Mensaje</label>
            <textarea maxLength={500} placeholder="Escribe tu mensaje" className="log-input" name="message" id="" cols={30} rows={10}></textarea>
          </fieldset>
          <button className="crear" type="submit">Enviar</button>
        </form>

        </div>
      </DefaultLayout>
    </div>
  );
};

export default ContactUs;