export default function Landing() {
  return (
    <div>
      <section className="bg-[#002855] text-white p-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Topater Don Bosco</h1>
        <p className="text-lg">
          Una institución con formación técnica, humana y salesiana.
        </p>
      </section>
      <section className="p-4" id="inicio">
        <h2 className="text-2xl font-semibold mb-2">Inicio</h2>
        <p>Bienvenido a nuestro sistema académico.</p>
      </section>
      <section className="p-4" id="nosotros">
        <h2 className="text-2xl font-semibold mb-2">Quiénes Somos</h2>
        <p>Institución educativa con más de 50 años de experiencia.</p>
      </section>
      <section className="p-4" id="noticias">
        <h2 className="text-2xl font-semibold mb-2">Noticias</h2>
        <p>Próximamente compartiremos novedades.</p>
      </section>
      <section className="p-4" id="contacto">
        <h2 className="text-2xl font-semibold mb-2">Contacto</h2>
        <p>Escríbenos a nuestro correo o redes sociales.</p>
      </section>
      <footer className="p-4 flex justify-center space-x-4 bg-gray-100">
        <a href="#" className="text-blue-600" aria-label="Facebook">
          Facebook
        </a>
        <a href="#" className="text-green-600" aria-label="WhatsApp">
          WhatsApp
        </a>
        <a href="#" className="text-black" aria-label="TikTok">
          TikTok
        </a>
      </footer>
    </div>
  );
}
