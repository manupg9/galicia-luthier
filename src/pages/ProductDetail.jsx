import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { currentUser } = useAuth();
  const [product, setProduct] = useState(null);
  const [isFav, setIsFav] = useState(false);
  const [isWish, setIsWish] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    async function fetch() {
      const snap = await getDoc(doc(db, "products", id));
      if (snap.exists()) setProduct({ id: snap.id, ...snap.data() });

      if (currentUser) {
        const favSnap = await getDoc(doc(db, "favorites", `${currentUser.uid}_${id}`));
        setIsFav(favSnap.exists());
        const wishSnap = await getDoc(doc(db, "wishlist", `${currentUser.uid}_${id}`));
        setIsWish(wishSnap.exists());
      }
    }
    fetch();
  }, [id, currentUser]);

  async function toggleFav() {
    if (!currentUser) return setMsg("Debes iniciar sesión");
    const ref = doc(db, "favorites", `${currentUser.uid}_${id}`);
    if (isFav) { await deleteDoc(ref); setIsFav(false); }
    else { await setDoc(ref, { userId: currentUser.uid, productId: id, ...product }); setIsFav(true); }
  }

  async function toggleWish() {
    if (!currentUser) return setMsg("Debes iniciar sesión");
    const ref = doc(db, "wishlist", `${currentUser.uid}_${id}`);
    if (isWish) { await deleteDoc(ref); setIsWish(false); }
    else { await setDoc(ref, { userId: currentUser.uid, productId: id, ...product }); setIsWish(true); }
  }

  if (!product) return <p style={{ padding: 24 }}>Cargando...</p>;

  return (
    <main style={{ maxWidth: 800, margin: "40px auto", padding: "0 24px", display: "flex", gap: 40, flexWrap: "wrap" }}>
      <img src={product.image} alt={product.name} style={{ width: 340, height: 300, objectFit: "cover", borderRadius: 8 }} />
      <div style={{ flex: 1, minWidth: 240 }}>
        <h1>{product.name}</h1>
        <p style={{ color: "#666" }}>{product.category}</p>
        <p>{product.description}</p>
        <p style={{ fontSize: 28, fontWeight: "bold" }}>{product.price} €</p>
        <p style={{ color: product.stock > 0 ? "green" : "red" }}>
          {product.stock > 0 ? `${product.stock} en stock` : "Sin stock"}
        </p>
        {msg && <p style={{ color: "red" }}>{msg}</p>}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 16 }}>
          {product.stock > 0
            ? <button onClick={() => addToCart(product)} style={{ padding: "10px 20px", background: "#1a1a2e", color: "white", border: "none", borderRadius: 6, cursor: "pointer" }}>🛒 Añadir al carrito</button>
            : <button onClick={toggleWish} style={{ padding: "10px 20px", background: isWish ? "#555" : "#e67e22", color: "white", border: "none", borderRadius: 6, cursor: "pointer" }}>
                {isWish ? "⭐ En lista de deseos" : "⭐ Añadir a lista de deseos"}
              </button>
          }
          <button onClick={toggleFav} style={{ padding: "10px 20px", background: isFav ? "#c0392b" : "#eee", color: isFav ? "white" : "#333", border: "none", borderRadius: 6, cursor: "pointer" }}>
            {isFav ? "❤️ En favoritos" : "🤍 Añadir a favoritos"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default ProductDetail;