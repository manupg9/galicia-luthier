import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <main style={{ textAlign: "center", padding: 80 }}>
      <h1>✅ ¡Pedido realizado!</h1>
      <p>Gracias por tu compra. Recibirás un email de confirmación.</p>
      <Link to="/products" style={{ display: "inline-block", marginTop: 24, padding: "12px 32px", background: "#1a1a2e", color: "white", borderRadius: 6, textDecoration: "none" }}>
        Seguir comprando
      </Link>
    </main>
  );
}

export default OrderSuccess;