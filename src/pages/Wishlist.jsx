import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function Wishlist() {
  const { currentUser } = useAuth();
  const { addToCart } = useCart();
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (!currentUser) return;
    async function fetchWish() {
      const q = query(collection(db, "wishlist"), where("userId", "==", currentUser.uid));
      const snap = await getDocs(q);
      setWishlist(snap.docs.map(d => ({ docId: d.id, ...d.data() })));
    }
    fetchWish();
  }, [currentUser]);

  async function removeWish(docId) {
    await deleteDoc(doc(db, "wishlist", docId));
    setWishlist(prev => prev.filter(w => w.docId !== docId));
  }

  if (!currentUser) return <main style={{ padding: 40 }}><p>Debes <Link to="/login">iniciar sesión</Link> para ver tu lista de deseos.</p></main>;

  return (
    <main style={{ maxWidth: 900, margin: "40px auto", padding: "0 24px" }}>
      <h1>⭐ Lista de deseos</h1>
      {wishlist.length === 0 && <p>No tienes productos en tu lista de deseos. <Link to="/products">Ver productos</Link></p>}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 24 }}>
        {wishlist.map(item => (
          <div key={item.docId} style={{ border: "1px solid #ddd", borderRadius: 8, overflow: "hidden" }}>
            <img src={item.image} alt={item.name} style={{ width: "100%", height: 160, objectFit: "cover" }} />
            <div style={{ padding: 12 }}>
              <h3 style={{ margin: "0 0 8px" }}>{item.name}</h3>
              <p style={{ fontWeight: "bold" }}>{item.price} €</p>
              <p style={{ color: "red", fontSize: 13 }}>Sin stock actualmente</p>
              <div style={{ display: "flex", gap: 8 }}>
                {item.stock > 0 && (
                  <button onClick={() => addToCart(item)} style={{ flex: 1, padding: "6px 0", background: "#1a1a2e", color: "white", border: "none", borderRadius: 4, cursor: "pointer" }}>🛒 Añadir</button>
                )}
                <button onClick={() => removeWish(item.docId)} style={{ flex: 1, padding: "6px 0", background: "#c0392b", color: "white", border: "none", borderRadius: 4, cursor: "pointer" }}>🗑️ Quitar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Wishlist;