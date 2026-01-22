// Importamos todas tus imágenes
import imgMerengue from "../assets/img/tortaMerengueFrambueza.jpg";
import imgSelva from "../assets/img/tortaSelvaNegra.jpg";
import imgLucuma from "../assets/img/tortaManjarLucuma.jpg";
import imgPina from "../assets/img/tortaCremaPiña.jpg";
import imgManjar from "../assets/img/tortaManjarNuez.jpg";
import imgMarmol from "../assets/img/quequeMarmoladoVainilla.jpg";
import imgVainilla from "../assets/img/quequeVainilla.jpg";
import imgArandano from "../assets/img/quequeArandano.jpg";
import imgFrutas from "../assets/img/tartaletaFrutas.jpg";
import imgYogurt from "../assets/img/tartaYogurth.jpg";
import imgPie from "../assets/img/pieDeLimon.jpg";
import imgKuchen from "../assets/img/kutchenDeManzana.jpg";
import imgMuffins from "../assets/img/muffinsPlatanoArandano.jpg";
import imgRollos from "../assets/img/rollosDeCanela.jpg";
import imgCupcakes from "../assets/img/cupcakesVariedades.jpg";
import imgBrownie from "../assets/img/brownieChocolateNuez.jpg";
import imgDonas from "../assets/img/donasGlaseadas.jpg";

export const inventario = {
  tortas: [
    { id: 1, nombre: "Merengue Frambuesa", img: imgMerengue, desc: "Nube de dulzura con discos de merengue, crema chantilly y frambuesas frescas." },
    { id: 2, nombre: "Selva Negra", img: imgSelva, desc: "Clásico bizcocho de chocolate, licor de cereza, crema y guindas." },
    { id: 3, nombre: "Manjar Lúcuma", img: imgLucuma, desc: "Tradición chilena: bizcocho suave con manjar y crema de lúcuma natural." },
    { id: 4, nombre: "Torta Crema Piña", img: imgPina, desc: "Frescura tropical con bizcocho mojadito, crema suave y trozos de piña." },
    { id: 5, nombre: "Manjar Nuez", img: imgManjar, desc: "La favorita: capas de bizcocho unidas por abundante manjar y nueces picadas." }
  ],
  queques: [
    { id: 6, nombre: "Queque Marmoleado", img: imgMarmol, desc: "Lo mejor de dos mundos: una hermosa mezcla de vainilla y cacao puro." },
    { id: 7, nombre: "Queque Vainilla", img: imgVainilla, desc: "Sencillo y perfecto. Ideal para la hora del té, con esencia natural de vainilla." },
    { id: 8, nombre: "Queque Arándano", img: imgArandano, desc: "Explosión de sabor con masa húmeda cargada de arándanos frescos del huerto." }
  ],
  tartas: [
    { id: 9, nombre: "Tartaleta Frutal", img: imgFrutas, desc: "Base crujiente, crema pastelera suave y un mix de frutas de la estación." },
    { id: 10, nombre: "Tarta de Yogurt", img: imgYogurt, desc: "Ligera y refrescante. Mousse de yogurt con capa brillante de frambuesa." },
    { id: 11, nombre: "Pie de Limón", img: imgPie, desc: "Ácido y dulce. Crema de limón sobre base de galleta y merengue tostado." },
    { id: 12, nombre: "Kuchen de Manzana", img: imgKuchen, desc: "Receta casera: con manzanas frescas, masa suave y un toque de canela." }
  ],
  personales: [
    { id: 13, nombre: "Muffins Plátano Arándano", img: imgMuffins, desc: "Energía saludable en formato individual con plátano maduro y arándanos." },
    { id: 14, nombre: "Rollos de Canela", img: imgRollos, desc: "Espirales de masa suave, canela intensa y un glaseado irresistible." },
    { id: 15, nombre: "Cupcakes Surtidos", img: imgCupcakes, desc: "Coloridos, esponjosos y con el frosting más dulce para alegrar tu día." },
    { id: 16, nombre: "Brownie Chocolate Nuez", img: imgBrownie, desc: "La perfección del chocolate: interior húmedo, cubierta crujiente y nueces." },
    { id: 17, nombre: "Donas Glaseadas", img: imgDonas, desc: "El capricho perfecto. Esponjosas, con un glaseado suave y llenas de color." }
  ]
};