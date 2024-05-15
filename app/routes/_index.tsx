import { TypewriterEffect } from "~/components/TypeEffect";
import { Vortex } from "~/components/vortex";


export default function Home() {
  
  const words = [
    {
      text: "Discover",
    },
    {
      text: "Tools",
    },
    {
      text: "that",
    },
    {
      text: "Empowers",

    },
    
    {
      text: "You.",
      className: "text-black-500 dark:text-black-500",

    },
  ];
  return (
    <>
<div className="relative   overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/examples/polygon-bg-element.svg')] before:bg-no-repeat before:bg-top before:bg-cover before:size-full before:-z-[1] before:transform before:-translate-x-1/2 dark:before:bg-[url('https://preline.co/assets/svg/examples-dark/polygon-bg-element.svg')]">
<div className="w-[calc(100%)] mx-auto rounded-md  h-[100vh] overflow-hidden">
      <Vortex
      baseRadius={4}
      baseHue={100}
        backgroundColor="transparent"
        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
      >  <div className="flex flex-col items-center justify-center h-[40rem] ">
      <p className="text-white dark:text-white text-base  mb-10">
        The road to freedom starts from here
      </p>
      <TypewriterEffect words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10">
        <button className="w-40 h-10 rounded-xl bg-[#04E6E6] border dark:border-white border-transparent text-black text-sm">
          Join now
        </button>
      </div>
    </div>
      </Vortex>
    </div>




<div className="max-w-[85rem] px-4 py-0 sm:px-6 lg:px-8 lg:py-14 mx-auto">
  <div className="mt-0 grid gap-6 grid-cols-2 sm:gap-12 lg:grid-cols-3 lg:gap-8">
    <div>
      <h4 className="text-lg sm:text-xl font-semibold  text-white dark:text-gray-200">Precisión en Asesoría</h4>
      <p className="mt-2 sm:mt-3 text-4xl sm:text-6xl font-bold text-blue-600">99%</p>
      <p className="mt-1  text-white">de satisfacción en consultas resueltas</p>
    </div>

    <div>
      <h4 className="text-lg sm:text-xl font-semibold  text-white dark:text-gray-200">Consultas realizadas</h4>
      <p className="mt-2 sm:mt-3 text-4xl sm:text-6xl font-bold text-blue-600">+10.000</p>
      
    </div>

    <div>
      <h4 className="text-lg sm:text-xl font-semibold  text-white dark:text-gray-200">Usuarios usando nuestra plataforma</h4>
      <p className="mt-2 sm:mt-3 text-4xl sm:text-6xl font-bold text-blue-600">+14.000</p>
    </div>
  </div>
</div>


<div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
  <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
    <h2 className="text-2xl text-black font-bold md:text-4xl md:leading-tight text-white">Perspectivas Laborales</h2>
    <p className="mt-1 text-white">Adéntrate en el conocimiento con los expertos en el campo laboral.</p>
  </div>

  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <a className="group focus:outline-none focus:ring-1 focus:ring-gray-600" href="/comming">
      <div className="relative pt-[50%] sm:pt-[70%] rounded-xl overflow-hidden">
        <img className="size-full  absolute top-0 start-0 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-xl" src="https://res.cloudinary.com/dug5cohaj/image/upload/v1713116234/u6xobg2ggrrv5iqrjtzg.png" alt="Image Description"/>
        <span className="absolute top-0 end-0 rounded-se-xl rounded-es-xl text-xs font-medium bg-gray-800 text-white py-1.5 px-3 dark:bg-gray-900">
          Sponsored
        </span>
      </div>

      <div className="mt-7">
        <h3 className="text-xl font-semibold text-white group-hover:text-gray-600 dark:text-gray-200">
        Experiencia Onsite Dai Off</h3>
        <p className="mt-3  text-white">
        Maximiza la eficacia de tus eventos con herramientas de registro y seguimiento de asistencia impulsadas por IA.</p>
        <p   className="mt-5 inline-flex items-center gap-x-1 text-blue-600 decoration-2 group-hover:underline font-medium">
          Leer Mas
          <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </p>
      </div>
    </a>

    <a className="group dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="/comming">
      <div className="relative pt-[50%] sm:pt-[70%] rounded-xl overflow-hidden">
        <img className="size-full absolute top-0 start-0 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-xl" src="https://res.cloudinary.com/dug5cohaj/image/upload/v1713116274/ag9clthpzsz6ejkyh1bd.png" alt="Image Description"/>
      </div>

      <div className="mt-7">
        <h3 className="text-xl font-semibold text-white group-hover:text-gray-600 dark:text-gray-200">
        Editorial Dai Off
        </h3>
        <p className="mt-3 text-white">
        Innova en tu comprensión sobre el trabajo del mañana con publicaciones sobre avances económicos y tecnológicos.</p>
        <p className="mt-5 inline-flex items-center gap-x-1 text-blue-600 decoration-2 group-hover:underline font-medium">
         Leer Mas
          <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </p>
      </div>
    </a>

    <a className="group relative flex flex-col w-full min-h-60 bg-center bg-cover rounded-xl hover:shadow-lg transition bg-[url('https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3000&q=80')] dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#">
      <div className="flex-auto p-4 md:p-6">
        <h3 className="text-xl text-white/[.9] group-hover:text-white"><span className="font-bold">DAIOFF</span> Descubre herramientas esenciales que delinean el futuro del trabajo, explorando la leyes laborales.</h3>
      </div>
      <div className="pt-0 p-4 md:p-6">
        <div className="inline-flex items-center gap-2 text-sm font-medium text-white group-hover:text-white/[.7]">
          Visitar
          <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </div>
      </div>
    </a>
  </div>
</div>
</div>

<div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
  <div className="max-w-2xl lg:max-w-5xl mx-auto">
    <div className="text-center">
      <h1 className="text-3xl font-bold text-white sm:text-4xl dark:text-white">
      Contáctanos
      </h1>
      <p className="mt-1  text-white dark:text-gray-400">
      Nos encantaría conversar sobre cómo podemos asistirte.</p>
    </div>

    <div className="mt-12 grid items-center lg:grid-cols-2 gap-6 lg:gap-16">
      <div className="flex flex-col border rounded-xl p-4 sm:p-6 lg:p-8 dark:border-gray-700">
        <h2 className="mb-8 text-xl font-semibold  text-white dark:text-gray-200">
        Completa el Formulario
</h2>

        <form>
          <div className="grid gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label id="hs-firstname-contacts-1" className="sr-only">Nombre</label>
                <input type="text" name="hs-firstname-contacts-1" id="hs-firstname-contacts-1" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Nombre"/>
              </div>

              <div>
                <label id="hs-lastname-contacts-1" className="sr-only">Apelldio</label>
                <input type="text" name="hs-lastname-contacts-1" id="hs-lastname-contacts-1" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Apellido"/>
              </div>
            </div>

            <div>
              <label id="hs-email-contacts-1" className="sr-only">Correo</label>
              <input type="email" name="hs-email-contacts-1" id="hs-email-contacts-1" autoComplete="email" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Correo"/>
            </div>

            <div>
              <label id="hs-phone-number-1" className="sr-only">Telefono</label>
              <input type="text" name="hs-phone-number-1" id="hs-phone-number-1" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Telefono"/>
            </div>

            <div>
              <label id="hs-about-contacts-1" className="sr-only">Detalles</label>
              <textarea id="hs-about-contacts-1" name="hs-about-contacts-1" rows={4} className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Detalles"></textarea>
            </div>
          </div>

          <div className="mt-4 grid">
            
<div className="flex">
  <input type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-checked-checkbox"/>
  <label id="hs-checked-checkbox" className="text-sm text-white ms-3 mb-6 dark:text-neutral-400">Por la presente acepto que estos datos se almacenen y procesen con el fin de establecer contacto. Soy Consciente de que puedo revocar mi consentimiento en cualquier momento</label>
</div>
            <button type="submit" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">Enviar</button>
          </div>

          <div className="mt-3 text-center">
            <p className="text-sm text-white">
            Te responderemos en 1-2 días hábiles.</p>
          </div>
        </form>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-800">
        <div className="flex gap-x-7 py-6">
          <svg className="flex-shrink-0 size-6 mt-1.5 text-white dark:text-gray-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
          <div className="grow">
            <h3 className="font-semibold  text-white dark:text-gray-200"> Conocimientos</h3>
            <p className="mt-1 text-sm  text-white">Estamos aquí para ayudarte con cualquier pregunta legal o procedimiento.</p>
           
          </div>
        </div>

        <div className="flex gap-x-7 py-6">
          <svg className="flex-shrink-0 size-6 mt-1.5 text-white dark:text-gray-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"/><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/></svg>
          <div className="grow">
            <h3 className="font-semibold  text-white dark:text-gray-200">Preguntas  </h3>
            <p className="mt-1 text-sm  text-white">Consulta nuestro FAQ para solucionar dudas comunes.</p>
            
          </div>
        </div>

       

        <div className=" flex gap-x-7 py-6">
          <svg className="flex-shrink-0 size-6 mt-1.5 text-white dark:text-gray-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z"/><path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10"/></svg>
          <div className="grow">
            <h3 className="font-semibold text-white dark:text-gray-200">Contactanos </h3>
            <p className="mt-1 text-sm text-white">Si prefieres escribirnos un correo, por favor usa:</p>
            <a className="mt-2 inline-flex items-center gap-x-2 text-sm font-medium text-white hover:text-white dark:text-gray-400 dark:hover:text-gray-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-white" href="#">
            adiez@daioff.com
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
  <div className="grid md:grid-cols-5 gap-10">
    <div className="md:col-span-2">
      <div className="max-w-xs">
        <h2 className="text-2xl font-bold md:text-4xl md:leading-tight text-white">Preguntas Frecuentes</h2>
        <p className="mt-1 hidden md:block text-gray-600 dark:text-gray-400   text-white">Respuestas a las preguntas más frecuentes..</p>
      </div>
    </div>

    <div className="md:col-span-3">
      <div className="hs-accordion-group divide-y divide-gray-200 dark:divide-gray-700">
        <div className="hs-accordion pb-3 active" id="hs-basic-with-title-and-arrow-stretched-heading-one">
          <button className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start  text-white rounded-lg transition hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-one">

          ¿Qué servicios ofrece su aplicación de asesoramiento legal laboral a través de inteligencia artificial?
            <svg className="hs-accordion-active:hidden block flex-shrink-0 size-5 text-gray-600 group-hover:text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            <svg className="hs-accordion-active:block hidden flex-shrink-0 size-5 text-gray-600 group-hover:text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>
          </button>
          <div id="hs-basic-with-title-and-arrow-stretched-collapse-one" className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-one">
            <p className=" text-white dark:text-gray-400">
            Nuestra aplicación ofrece una amplia gama de servicios para asesorar en cuestiones laborales, incluyendo la interpretación de leyes laborales, la resolución de consultas específicas sobre contratos, despidos, vacaciones, y otros aspectos relacionados con el empleo. Además, proporcionamos actualizaciones automáticas sobre cambios en la legislación laboral para mantener a nuestros usuarios informados en todo momento.              </p>
          </div>
        </div>

        <div className="hs-accordion pt-6 pb-3" id="hs-basic-with-title-and-arrow-stretched-heading-two">
          <button className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start  text-white rounded-lg transition hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-two">
          ¿Cómo funciona el modelo de suscripción para acceder a la aplicación?            <svg className="hs-accordion-active:hidden block flex-shrink-0 size-5 text-gray-600 group-hover:text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            <svg className="hs-accordion-active:block hidden flex-shrink-0 size-5 text-gray-600 group-hover:text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>
          </button>
          <div id="hs-basic-with-title-and-arrow-stretched-collapse-two" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-two">
            <p className=" text-white dark:text-gray-400">
            Ofrecemos un modelo de suscripción flexible que se adapta a las necesidades de despachos de abogados, sindicatos y empresas de todos los tamaños. Nuestro modelo de suscripción proporciona acceso completo a todas las funcionalidades de la aplicación, incluyendo consultas ilimitadas a nuestra inteligencia artificial, actualizaciones regulares de la legislación laboral y soporte técnico especializado.
</p>
          </div>
        </div>

        <div className="hs-accordion pt-6 pb-3" id="hs-basic-with-title-and-arrow-stretched-heading-three">
          <button className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3  w-full md:text-lg font-semibold text-start  text-white rounded-lg transition hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-three">
         {" ¿Cómo puede beneficiar nuestra empresa de utilizar su aplicación de asesoramiento legal laboral?"}          </button>

              <div id="hs-basic-with-title-and-arrow-stretched-collapse-three" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-three">
            <p className=" text-white dark:text-gray-400">
            Nuestra aplicación permite a las empresas optimizar sus recursos legales al proporcionar respuestas rápidas y precisas a consultas laborales comunes. Esto no solo ahorra tiempo y dinero, sino que también ayuda a garantizar el cumplimiento normativo y reduce el riesgo de litigios laborales. Además, nuestro servicio de actualización constante asegura que los usuarios estén siempre al tanto de los cambios legales relevantes.</p>
          </div>
        </div>


        <div className="hs-accordion pt-6 pb-3" id="hs-basic-with-title-and-arrow-stretched-heading-five">
          <button className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start  text-white rounded-lg transition hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-five">
          ¿Qué nivel de personalización ofrece su aplicación para adaptarse a las necesidades específicas de nuestra empresa o despacho?            <svg className="hs-accordion-active:hidden block flex-shrink-0 size-5 text-gray-600 group-hover:text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            <svg className="hs-accordion-active:block hidden flex-shrink-0 size-5 text-gray-600 group-hover:text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>
          </button>
          <div id="hs-basic-with-title-and-arrow-stretched-collapse-five" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-five">
            <p className=" text-white dark:text-gray-400">
            Nuestra aplicación ofrece un alto nivel de personalización para satisfacer las necesidades individuales de cada cliente. Podemos adaptar la configuración de la aplicación según los requisitos específicos de su empresa o despacho, incluyendo la integración con sistemas existentes, la creación de flujos de trabajo personalizados y la personalización de la interfaz de usuario para reflejar la marca de su empresa. Además, nuestro equipo de soporte técnico está disponible para proporcionar asistencia personalizada en cualquier momento.
</p>
          </div>
        </div>

      </div>
    </div>
  </div>
</div>



    </>
  );
}