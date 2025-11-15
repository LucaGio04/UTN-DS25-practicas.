import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...');

  // Limpiar datos existentes
  await prisma.book.deleteMany();
  console.log('🗑️  Datos anteriores eliminados');

  // Datos iniciales
  const booksData = [
    // Ficción
    { title: 'El Legado del Héroe', author: 'Sofía Ríos', cover: '/img/ficcion-portada.jpg', category: 'ficcion', price: 2500, featured: true },
    { title: 'Crónica del asesino de reyes: El nombre del viento', author: 'Patrick Rothfuss', cover: '/img/ficcion-1.jpg', category: 'ficcion', price: 3200, featured: false },
    { title: 'La Rueda del Tiempo: El ojo del mundo', author: 'Robert Jordan', cover: '/img/ficcion-2.jpg', category: 'ficcion', price: 2800, featured: false },
    { title: 'Canción de hielo y fuego: Juego de tronos', author: 'George R.R. Martin', cover: '/img/ficcion-3.jpg', category: 'ficcion', price: 3500, featured: false },
    { title: 'La historia interminable', author: 'Michael Ende', cover: '/img/ficcion-4.jpg', category: 'ficcion', price: 2200, featured: false },
    { title: 'El Hobbit', author: 'J.R.R. Tolkien', cover: '/img/ficcion-5.jpg', category: 'ficcion', price: 2400, featured: false },
    
    // Ciencia
    { title: 'El Cosmos en Nuestras Manos', author: 'Laura Gómez', cover: '/img/ciencia-portada.jpg', category: 'ciencia', price: 2900, featured: true },
    { title: 'El gen egoísta', author: 'Richard Dawkins', cover: '/img/ficcion-1.jpg', category: 'ciencia', price: 3100, featured: false },
    { title: 'Cosmos', author: 'Carl Sagan', cover: '/img/ficcion-2.jpg', category: 'ciencia', price: 3300, featured: false },
    { title: 'Sapiens: De animales a dioses', author: 'Yuval Noah Harari', cover: '/img/ficcion-3.jpg', category: 'ciencia', price: 3600, featured: false },
    { title: 'Breve historia del tiempo', author: 'Stephen Hawking', cover: '/img/ficcion-4.jpg', category: 'ciencia', price: 2800, featured: false },
    { title: 'El origen de las especies', author: 'Charles Darwin', cover: '/img/ficcion-5.jpg', category: 'ciencia', price: 2700, featured: false },
    
    // Historia
    { title: 'Imperios Olvidados', author: 'Javier Torres', cover: '/img/historia-portada.jpg', category: 'historia', price: 3000, featured: true },
    { title: 'La Segunda Guerra Mundial', author: 'Antony Beevor', cover: '/img/ficcion-1.jpg', category: 'historia', price: 3400, featured: false },
    { title: 'Imperiofobia y Leyenda Negra', author: 'Elvira Roca Barea', cover: '/img/ficcion-2.jpg', category: 'historia', price: 3200, featured: false },
    { title: 'Homo Deus: Breve historia del mañana', author: 'Yuval Noah Harari', cover: '/img/ficcion-3.jpg', category: 'historia', price: 3500, featured: false },
    { title: 'Armas, gérmenes y acero', author: 'Jared Diamond', cover: '/img/ficcion-4.jpg', category: 'historia', price: 3100, featured: false },
    { title: 'La guerra de los 30 años', author: 'C.V. Wedgwood', cover: '/img/ficcion-5.jpg', category: 'historia', price: 2900, featured: false },
    
    // Biografías
    { title: 'La biografía de Steve Jobs', author: 'Walter Isaacson', cover: '/img/ficcion-1.jpg', category: 'biografias', price: 3800, featured: false },
    { title: 'Einstein: Su vida y su universo', author: 'Walter Isaacson', cover: '/img/ficcion-2.jpg', category: 'biografias', price: 3700, featured: false },
    { title: 'El diario de Ana Frank', author: 'Ana Frank', cover: '/img/ficcion-4.jpg', category: 'biografias', price: 2100, featured: false },
    { title: 'Yo soy Malala', author: 'Malala Yousafzai', cover: '/img/ficcion-5.jpg', category: 'biografias', price: 2600, featured: false },
    { title: 'Nelson Mandela: Conversaciones conmigo mismo', author: 'Nelson Mandela', cover: '/img/ficcion-6.jpg', category: 'biografias', price: 3000, featured: false },
    { title: 'Leonardo da Vinci', author: 'Walter Isaacson', cover: '/img/ficcion-1.jpg', category: 'biografias', price: 3900, featured: false },
    
    // Libro destacado adicional
    { title: 'El Camino a la Creatividad', author: 'Daniel Pérez', cover: '/img/no-ficcion-portada.jpg', category: 'no-ficcion', price: 2500, featured: true },
  ];

  // Insertar libros
  for (const book of booksData) {
    await prisma.book.create({
      data: book
    });
  }

  console.log(`✅ ${booksData.length} libros insertados exitosamente`);
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

