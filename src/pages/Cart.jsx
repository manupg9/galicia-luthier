import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function Cart() {
  const { cart, removeFromCart, updateQuantity, total } = useCart();

  if (cart.length === 0) return (
    <main style={{ padding: 40, textAlign: "center" }}>
      <h1>Tu carrito está vacío</h1>
      <Link to="/products">Ver productos</Link>
    </main>
  );

  return (
    <main style={{ maxWidth: 800, margin: "40px auto", padding: "0 24px" }}>
      <h1>🛒 Carrito</h1>
      {cart.map(item => (
        <div key={item.id} style={{ display: "flex", gap: 16, alignItems: "center", borderBottom: "1px solid #eee", padding: "16px 0" }}>
          <img src={item.image} alt={item.name} style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 6 }} />
          <div style={{ flex: 1 }}>
            <h3 style={{ margin: "0 0 4px" }}>{item.name}</h3>
            <p style={{ margin: 0, color: "#666" }}>{item.price} €/ud</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ padding: "4px 10px", cursor: "pointer" }}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ padding: "4px 10px", cursor: "pointer" }}>+</button>
          </div>
          <p style={{ fontWeight: "bold", minWidth: 70, textAlign: "right" }}>{(item.price * item.quantity).toFixed(2)} €</p>
          <button onClick={() => removeFromCart(item.id)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#c0392b" }}>🗑️</button>
        </div>
      ))}
      <div style={{ textAlign: "right", marginTop: 24 }}>
        <h2>Total: {total.toFixed(2)} €</h2>
        <Link to="/checkout" style={{ display: "inline-block", padding: "12px 32px", background: "#1a1a2e", color: "white", borderRadius: 6, textDecoration: "none", marginTop: 12 }}>
          Proceder al pago
        </Link>
      </div>
    </main>
  );
}

export default Cart;