import React, { useState } from 'react';

export const ContactPage = () => {
  const [contactForm, setContactForm] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    console.log('Mensaje de contacto:', contactForm);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="text-green-500 text-6xl mb-4">✓</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">¡Mensaje Enviado!</h2>
        <p className="text-gray-600 mb-6">
          Gracias por contactarnos. Te responderemos en las próximas 24 horas.
        </p>
        <button
          onClick={() => {
            setIsSubmitted(false);
            setContactForm({
              nombre: '',
              email: '',
              mensaje: ''
            });
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
        >
          Enviar Otro Mensaje
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Contacto</h2>
        <p className="text-gray-600 text-lg">
          Estamos aquí para ayudarte. Contáctanos para cualquier consulta sobre nuestros libros.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Información de Contacto */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Información de Contacto</h3>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Dirección</h4>
                <p className="text-gray-600">Calle Falsa 123, Ciudad de la Ficción, F.C.</p>
                <p className="text-gray-600">Código Postal: 12345</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-green-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Teléfonos</h4>
                <p className="text-gray-600">(555) 123-4567</p>
                <p className="text-gray-600">(555) 987-6543</p>
                <p className="text-sm text-gray-500">Lunes a Viernes: 9:00 - 18:00</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Email</h4>
                <p className="text-gray-600">contacto@libreriaelsaber.com</p>
                <p className="text-gray-600">ventas@libreriaelsaber.com</p>
                <p className="text-sm text-gray-500">Respuesta en 24 horas</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-yellow-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Horarios de Atención</h4>
                <p className="text-gray-600">Lunes a Viernes: 9:00 - 18:00</p>
                <p className="text-gray-600">Sábados: 9:00 - 14:00</p>
                <p className="text-gray-600">Domingos: Cerrado</p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h4 className="font-semibold text-gray-800 mb-3">Síguenos en Redes Sociales</h4>
            <div className="flex space-x-4">
              {[
                { name: 'Facebook', color: 'bg-blue-600 hover:bg-blue-700' },
                { name: 'Twitter', color: 'bg-sky-500 hover:bg-sky-600' },
                { name: 'Instagram', color: 'bg-pink-600 hover:bg-pink-700' },
                { name: 'YouTube', color: 'bg-red-600 hover:bg-red-700' }
              ].map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className={`${social.color} text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium`}
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Formulario de Contacto */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Envíanos un Mensaje</h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="contact-nombre" className="block text-sm font-medium text-gray-700 mb-2">
                Nombre Completo *
              </label>
              <input
                type="text"
                id="contact-nombre"
                name="nombre"
                required
                value={contactForm.nombre}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Tu nombre completo"
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                id="contact-email"
                name="email"
                required
                value={contactForm.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label htmlFor="contact-mensaje" className="block text-sm font-medium text-gray-700 mb-2">
                Mensaje *
              </label>
              <textarea
                id="contact-mensaje"
                name="mensaje"
                rows="6"
                required
                value={contactForm.mensaje}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Cuéntanos en qué podemos ayudarte..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Enviar Mensaje
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">¿Necesitas Ayuda Inmediata?</h4>
            <p className="text-blue-700 text-sm">
              Para consultas urgentes, llámanos directamente al (555) 123-4567 o 
              envíanos un WhatsApp al mismo número.
            </p>
          </div>
        </div>
      </div>

      {/* Mapa o Información Adicional */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Ubicación</h3>
        <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
          <div className="text-center text-gray-500">
            <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <p className="text-lg">Mapa Interactivo</p>
            <p className="text-sm">Aquí se mostraría un mapa de Google Maps</p>
          </div>
        </div>
        <div className="mt-4 text-center text-gray-600">
          <p>Estamos ubicados en el centro de la ciudad, cerca de la plaza principal</p>
          <p className="text-sm">Estacionamiento gratuito disponible</p>
        </div>
      </div>
    </div>
  );
}; 