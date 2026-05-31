import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

const products = [
  {
    name: "Guitarra Flamenca",
    description: "Guitarra flamenca tradicional con tapa de abeto y fondo de ciprés",
    price: 450,
    stock: 3,
    category: "Guitarras",
    image: "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=500",
    createdAt: new Date()
  },
  {
    name: "Laúd Medieval",
    description: "Laúd medieval artesanal con cuerdas de nylon, ideal para música antigua",
    price: 680,
    stock: 2,
    category: "Laúdes",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500",
    createdAt: new Date()
  },
  {
    name: "Ukulele Soprano",
    description: "Ukulele soprano de caoba con acabado satinado y clavijero de madera",
    price: 120,
    stock: 0,
    category: "Ukuleles",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500",
    createdAt: new Date()
  },
  {
    name: "Bandurria",
    description: "Bandurria artesanal de madera de palo santo con 12 cuerdas metálicas",
    price: 320,
    stock: 4,
    category: "Bandurrias",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500",
    createdAt: new Date()
  },
  {
    name: "Violín Artesanal",
    description: "Violín fabricado a mano con madera de arce y abeto seleccionado",
    price: 890,
    stock: 1,
    category: "Violines",
    image: "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?w=500",
    createdAt: new Date()
  }
];

export async function seedProducts() {
  for (const product of products) {
    await addDoc(collection(db, "products"), product);
  }
  console.log("✅ Productos añadidos correctamente");
}