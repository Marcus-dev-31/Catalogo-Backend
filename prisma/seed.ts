import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const products = [
  // Ropa
  {
    name: "Remera oversize estampada",
    price: 4500,
    categoryId: 1,
    image: "https://picsum.photos/400/400?random=1",
    description:
      "Tela de algodón suave. Diseño exclusivo de temporada. Disponible en talle S al XL.",
  },
  {
    name: "Buzo canguro afelpado",
    price: 8900,
    categoryId: 1,
    image: "https://picsum.photos/400/400?random=2",
    description:
      "Interior afelpado. Con capucha y bolsillo canguro. Talles S al XXL. Lavado a máquina.",
  },
  {
    name: "Jean recto tiro alto",
    price: 12500,
    categoryId: 1,
    image: "https://picsum.photos/400/400?random=3",
    description:
      "Jean elastizado de alta calidad. Corte recto moderno. Color índigo. Talles 36 al 44.",
  },
  {
    name: "Vestido floral manga corta",
    price: 7800,
    categoryId: 1,
    image: "https://picsum.photos/400/400?random=4",
    description:
      "Vestido midi con estampado floral primaveral. Tejido liviano y fresco. Cierre en la espalda.",
  },
  // Juguetes
  {
    name: "Set de bloques coloridos 50p",
    price: 3200,
    categoryId: 2,
    image: "https://picsum.photos/400/400?random=5",
    description:
      "50 bloques de colores. Estimula la creatividad y la motricidad fina. Apto +3 años.",
  },
  {
    name: "Muñeca articulada fashion",
    price: 5600,
    categoryId: 2,
    image: "https://picsum.photos/400/400?random=6",
    description:
      "Completamente articulada con 3 outfits intercambiables y accesorios incluidos.",
  },
  {
    name: "Auto a fricción metálico",
    price: 1800,
    categoryId: 2,
    image: "https://picsum.photos/400/400?random=7",
    description:
      "Auto de metal con tracción a fricción. Colores surtidos. Resistente. Apto desde 3 años.",
  },
  {
    name: "Puzzle 100 piezas animales",
    price: 2900,
    categoryId: 2,
    image: "https://picsum.photos/400/400?random=8",
    description:
      "Puzzle educativo con animales del mundo. Incluye caja organizadora. Apto desde 5 años.",
  },
  // Bijouterie
  {
    name: "Aros argolla dorados XL",
    price: 1500,
    categoryId: 3,
    image: "https://picsum.photos/400/400?random=9",
    description:
      "Argollas bañadas en oro 18k. Cierre a presión. Diámetro 5cm. Hipoalergénicas, sin níquel.",
  },
  {
    name: "Collar delicado con dije",
    price: 2200,
    categoryId: 3,
    image: "https://picsum.photos/400/400?random=10",
    description:
      "Cadena fina bañada en plata 925 con dije corazón. Largo 45cm regulable. Cierre de langosta.",
  },
  {
    name: "Pulsera triple cadena",
    price: 1800,
    categoryId: 3,
    image: "https://picsum.photos/400/400?random=11",
    description:
      "Tres cadenas entrelazadas. Cierre de palanca ajustable. Bañado en oro rosa. Talle único.",
  },
  {
    name: "Set de anillos ajustables x5",
    price: 2600,
    categoryId: 3,
    image: "https://picsum.photos/400/400?random=12",
    description:
      "5 anillos con diseños variados. Talla ajustable. Bañados en plata. Hipoalergénicos.",
  },
  // Regalería
  {
    name: "Marco portarretrato madera",
    price: 3500,
    categoryId: 4,
    image: "https://picsum.photos/400/400?random=13",
    description:
      "Marco de madera natural 15×20cm. Diseño rústico-moderno. Con soporte para mesa.",
  },
  {
    name: "Set 3 velas aromáticas",
    price: 4800,
    categoryId: 4,
    image: "https://picsum.photos/400/400?random=14",
    description:
      "Set de 3 velas de soja: lavanda, vainilla y cítrico. 30 horas de quema cada una.",
  },
  {
    name: "Caja decorativa con tapa",
    price: 2900,
    categoryId: 4,
    image: "https://picsum.photos/400/400?random=15",
    description:
      "Caja organizadora de cartón rígido con tapa. Perfecta para accesorios o como regalo.",
  },
  {
    name: "Taza diseño exclusivo",
    price: 1900,
    categoryId: 4,
    image: "https://picsum.photos/400/400?random=16",
    description:
      "Cerámica 350ml. Apta microondas y lavavajillas. Varios diseños disponibles.",
  },
  // Bazar
  {
    name: "Juego de vasos x6 vidrio",
    price: 6500,
    categoryId: 5,
    image: "https://picsum.photos/400/400?random=17",
    description:
      "Set de 6 vasos de vidrio templado 300ml. Aptos lavavajillas. Diseño moderno y resistente.",
  },
  {
    name: "Tabla de madera para picar",
    price: 3800,
    categoryId: 5,
    image: "https://picsum.photos/400/400?random=18",
    description:
      "Madera maciza 30×20cm. Con canal para jugos y manija de agarre integrada.",
  },
  {
    name: "Set cocina antiadherente 5p",
    price: 8900,
    categoryId: 5,
    image: "https://picsum.photos/400/400?random=19",
    description:
      "Sartén, cacerola y olla con tapas. Revestimiento reforzado. Compatible con inducción.",
  },
  {
    name: "Organizador escritorio bambú",
    price: 4200,
    categoryId: 5,
    image: "https://picsum.photos/400/400?random=20",
    description:
      "6 compartimentos de bambú natural. Ideal home office. Material ecológico y resistente.",
  },
  // Varios
  {
    name: "Juego de vasos x6 vidrio",
    price: 6500,
    categoryId: 6,
    image: "https://picsum.photos/400/400?random=21",
    description:
      "Set de 6 vasos de vidrio templado 300ml. Aptos lavavajillas. Diseño moderno y resistente.",
  },
  {
    name: "Tabla de madera para picar",
    price: 3800,
    categoryId: 6,
    image: "https://picsum.photos/400/400?random=22",
    description:
      "Madera maciza 30×20cm. Con canal para jugos y manija de agarre integrada.",
  },
];

async function main() {
  await prisma.category.createMany({
    skipDuplicates: true,
    data: [
      {
        name: "Ropa",
        emoji: "👗",
        slug: "ropa",
        color: "#FF4500",
        pale: "#FFF0EB",
        gradient: "linear-gradient(145deg, #FF4500, #FF7843)",
      },
      {
        name: "Juguetes",
        emoji: "🧸",
        slug: "juguetes",
        color: "#D49500",
        pale: "#FFFBE6",
        gradient: "linear-gradient(145deg, #D49500, #FFCC00)",
      },
      {
        name: "Bijouterie",
        emoji: "💍",
        slug: "bijouterie",
        color: "#8B1FAB",
        pale: "#F8F0FC",
        gradient: "linear-gradient(145deg, #8B1FAB, #C86DD8)",
      },
      {
        name: "Regaleria",
        emoji: "🎁",
        slug: "regaleria",
        color: "#C81455",
        pale: "#FFF0F5",
        gradient: "linear-gradient(145deg, #C81455, #EF5B8E)",
      },
      {
        name: "Bazar",
        emoji: "🏠",
        slug: "bazar",
        color: "#006E7A",
        pale: "#F0FBFC",
        gradient: "linear-gradient(145deg, #006E7A, #3DBED0)",
      },
      {
        name: "Varios",
        emoji: "🛍️",
        slug: "varios",
        color: "#006E7A",
        pale: "#EDFBF1",
        gradient: "linear-gradient(145deg, #2D6A4F, #52B788)",
      },
    ],
  });

  for (const { image, ...productData } of products) {
    const product = await prisma.product.create({ data: productData });
    await prisma.productImage.create({
      data: { url: image, order: 0, productId: product.id },
    });
  }

  console.log("Seed completado");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
