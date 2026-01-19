import { Link } from "react-router-dom";

// =====================================================
// IMPORT: Trae la imagen de la carpeta y le pone un nombre
// corto para que React la pueda mostrar abajo.
// =====================================================

/* 1. TORTAS */
import imgMerengue from "../assets/img/tortaMerengueFrambueza.jpg";
import imgSelva from "../assets/img/tortaSelvaNegra.jpg";
import imgLucuma from "../assets/img/tortaManjarLucuma.jpg";
import imgPina from "../assets/img/tortaCremaPiña.jpg";
import imgManjar from "../assets/img/tortaManjarNuez.jpg";

/* 2. QUEQUES FAMILIARES */
import imgMarmol from "../assets/img/quequeMarmoladoVainilla.jpg";
import imgVainilla from "../assets/img/quequeVainilla.jpg";
import imgArandano from "../assets/img/quequeArandano.jpg";

/* 3. TARTAS Y KUCHEN */
import imgFrutas from "../assets/img/tartaletaFrutas.jpg";
import imgYogurt from "../assets/img/tartaYogurth.jpg";
import imgPie from "../assets/img/pieDeLimon.jpg";
import imgKuchen from "../assets/img/kutchenDeManzana.jpg";

/* 4. DELICIAS PERSONALES */
import imgMuffins from "../assets/img/muffinsPlatanoArandano.jpg";
import imgRollos from "../assets/img/rollosDeCanela.jpg";
import imgCupcakes from "../assets/img/cupcakesVariedades.jpg";
import imgBrownie from "../assets/img/brownieChocolateNuez.jpg";
import imgDonas from "../assets/img/donasGlaseadas.jpg";

function Delicias() {
  return (
    <main>
      <h1>Nuestro Catálogo</h1>
      <p className="subtitulo">
        Descubre la dulzura hecha en casa y transforma tu día en un momento
        inolvidable.
      </p>

      {/* SECCIÓN 1: TORTAS */}
      <h2 className="categoria-titulo">Tortas</h2>
      <div className="vitrina">
        <div className="producto">
          <img src={imgMerengue} alt="Merengue Frambuesa" />
          <h3>Merengue Frambuesa</h3>
          <p>
            Nube de dulzura con discos de merengue, crema chantilly y frambuesas
            frescas.
          </p>
        </div>

        <div className="producto">
          <img src={imgSelva} alt="Selva Negra" />
          <h3>Selva Negra</h3>
          <p>
            Clásico bizcocho de chocolate, licor de cereza, crema y guindas.
          </p>
        </div>

        <div className="producto">
          <img src={imgLucuma} alt="Manjar Lúcuma" />
          <h3>Manjar Lúcuma</h3>
          <p>
            Tradición chilena: bizcocho suave con manjar y crema de lúcuma
            natural.
          </p>
        </div>

        <div className="producto">
          <img src={imgPina} alt="Crema Piña" />
          <h3>Crema Piña</h3>
          <p>
            Frescura tropical con bizcocho mojadito, crema suave y trozos de
            piña.
          </p>
        </div>

        <div className="producto">
          <img src={imgManjar} alt="Manjar Nuez" />
          <h3>Manjar Nuez</h3>
          <p>
            La favorita: capas de bizcocho unidas por abundante manjar y nueces
            picadas.
          </p>
        </div>
      </div>

      {/* SECCIÓN 2: QUEQUES FAMILIARES */}
      <h2 className="categoria-titulo">Queques Familiares</h2>
      <div className="vitrina">
        <div className="producto">
          <img src={imgMarmol} alt="Queque Marmoleado" />
          <h3>Queque Marmoleado</h3>
          <p>Lo mejor de dos mundos: una hermosa mezcla de vainilla y cacao.</p>
        </div>

        <div className="producto">
          <img src={imgVainilla} alt="Queque Vainilla" />
          <h3>Queque Vainilla</h3>
          <p>
            Sencillo y perfecto. Ideal para la hora del té, con esencia natural.
          </p>
        </div>

        <div className="producto">
          <img src={imgArandano} alt="Queque Arándano" />
          <h3>Queque Arándano</h3>
          <p>
            Explosión de sabor con masa húmeda cargada de arándanos frescos.
          </p>
        </div>
      </div>

      {/* SECCIÓN 3: TARTAS, PIES Y KUCHEN */}
      <h2 className="categoria-titulo">Tartas, Pies y Kuchen</h2>
      <div className="vitrina">
        <div className="producto">
          <img src={imgFrutas} alt="Tartaleta Frutal" />
          <h3>Tartaleta Frutal</h3>
          <p>
            Base crujiente, crema pastelera suave y un mix de frutas de la
            estación.
          </p>
        </div>

        <div className="producto">
          <img src={imgYogurt} alt="Tarta de Yogurt" />
          <h3>Tarta de Yogurt</h3>
          <p>
            Ligera y refrescante. Mousse de yogurt con capa brillante de
            frambuesa.
          </p>
        </div>

        <div className="producto">
          <img src={imgPie} alt="Pie de Limón" />
          <h3>Pie de Limón</h3>
          <p>
            Ácido y dulce. Crema de limón sobre base de galleta y merengue
            tostado.
          </p>
        </div>

        <div className="producto">
          <img src={imgKuchen} alt="Kuchen Manzana" />
          <h3>Kuchen Manzana</h3>
          <p>
            Receta casera de la abuela: con manzanas frescas, masa suave y un
            toque de canela.
          </p>
        </div>
      </div>

      {/* SECCIÓN 4: DELICIAS PERSONALES */}
      <h2 className="categoria-titulo">Delicias Personales</h2>
      <div className="vitrina">
        <div className="producto">
          <img src={imgMuffins} alt="Muffins Plátano" />
          <h3>Muffins Plátano Arándano</h3>
          <p>
            Energía saludable en formato individual. Plátano maduro y arándanos.
          </p>
        </div>

        <div className="producto">
          <img src={imgRollos} alt="Rollos de Canela" />
          <h3>Rollos de Canela</h3>
          <p>
            Espirales de masa suave, canela intensa y un glaseado irresistible.
          </p>
        </div>

        <div className="producto">
          <img src={imgCupcakes} alt="Cupcakes Variedades" />
          <h3>Cupcakes Surtidos</h3>
          <p>
            Coloridos, esponjosos y con el frosting más dulce para alegrar tu
            día.
          </p>
        </div>

        <div className="producto">
          <img src={imgBrownie} alt="Brownie Chocolate Nuez" />
          <h3>Brownie Chocolate Nuez</h3>
          <p>
            La perfección del chocolate: interior húmedo, cubierta crujiente y
            nueces.
          </p>
        </div>

        <div className="producto">
          <img src={imgDonas} alt="Donas Glaseadas" />
          <h3>Donas Glaseadas</h3>
          {/* OPCIÓN 3 SELECCIONADA: */}
          <p>
            El capricho perfecto. Esponjosas, con un glaseado suave y llenas de
            color.
          </p>
        </div>
      </div>
    </main>
  );
}

export default Delicias;
