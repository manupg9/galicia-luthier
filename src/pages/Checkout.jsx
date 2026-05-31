import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51TdDw8QokqvcGTDp8uORlQ5wyKF1lRHpwwPNmeykikYUjgY7H8dg5Q1XUvaG7JoDHVt6AXJQJmRxI8eM1guGzrV500amNgJnao");

function CheckoutForm() {
  const { cart, total, clearCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!stripe || !elements) return;
    if (!currentUser) return setError("Debes iniciar sesión para comprar.");
    if (cart.length === 0) return setError("Tu carrito está vacío.");

    setLoading(true);
    setError("");

    const card = elements.getElement(CardElement);
    const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (stripeError) {
      setError(stripeError.message);
      setLoading(false);
      return;
    }

    try {
      await addDoc(collection(db, "orders"), {
        userId: currentUser.uid,
        email: currentUser.email,
        items: cart,
        total,
        status: "pagado",
        paymentMethodId: paymentMethod.id,
        createdAt: new Date()
      });
      clearCart();
      navigate("/order-success");
    } catch (err) {
      setError("Error al guardar el pedido: " + err.message);
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Resumen del pedido</h2>
      {cart.map(item => (
        <div key={item.id} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #eee" }}>
          <span>{item.name} x{item.quantity}</span>
          <span>{(item.price * item.quantity).toFixed(2)} €</span>
        </div>
      ))}
      <h3 style={{ textAlign: "right" }}>Total: {total.toFixed(2)} €</h3>

      <h2>Datos de pago</h2>
      <div style={{ border: "1px solid #ddd", borderRadius: 6, padding: 12, marginBottom: 16 }}>
        <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit" disabled={loading} style={{ width: "100%", padding: 14, background: "#1a1a2e", color: "white", border: "none", borderRadius: 6, fontSize: 16, cursor: "pointer" }}>
        {loading ? "Procesando..." : `✅ Pagar ${total.toFixed(2)} €`}
      </button>
      <p style={{ fontSize: 12, color: "#999", marginTop: 8, textAlign: "center" }}>
        Modo de prueba: usa la tarjeta 4242 4242 4242 4242, cualquier fecha futura y cualquier CVC
      </p>
    </form>
  );
}

function Checkout() {
  return (
    <main style={{ maxWidth: 600, margin: "40px auto", padding: "0 24px" }}>
      <h1>💳 Checkout</h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </main>
  );
}

export default Checkout;