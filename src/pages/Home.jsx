import { Link } from 'react-router-dom'

// IMÁGENES EXACTAS (Según lo que me enviaste)
import imgKutchen from '../assets/img/kutchenDeManzana.jpg'
import imgPie from '../assets/img/pieDeLimon.jpg'
import imgTorta from '../assets/img/tortaCremaPiña.jpg'

function Home() {
  return (
    <main>
      <h1>Bienvenido a Pastelería My Dreams</h1>
      <p className="subtitulo">
        Somos un emprendimiento familiar que te entrega sabores que iluminan tus sueños.
      </p>

      <section className="productos">
        <h2>Favoritos de la Casa</h2>

        <div className="vitrina">
          {/* Producto 1 */}
          <div className="producto">
            <img src={imgKutchen} alt="Kuchen de Manzana" />
            <h3>Kuchen de Manzana</h3>
          </div>

          {/* Producto 2 */}
          <div className="producto">
            <img src={imgPie} alt="Pie de Limón" />
            <h3>Pie de Limón</h3>
          </div>

          {/* Producto 3 */}
          <div className="producto">
            <img src={imgTorta} alt="Torta de Piña" />
            <h3>Torta Crema Piña</h3>
          </div>
        </div>
        
        <div style={{ marginTop: '2rem' }}>
            <Link to="/delicias" className="boton">Ver todo el menú</Link>
        </div>
      </section>
    </main>
  )
}

export default Home