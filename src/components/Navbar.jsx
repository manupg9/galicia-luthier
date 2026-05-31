import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <nav style={{ display: "flex", gap: 16, padding: "12px 24px", background: "#1a1a2e", flexWrap: "wrap", alignItems: "center" }}>
      <Link to="/" style={{ color: "#e2b96f", fontWeight: "bold", fontSize: 18, textDecoration: "none" }}>🎸 Galicia-Luthier</Link>
      <Link to="/products" style={{ color: "white", textDecoration: "none" }}>Productos</Link>
      <Link to="/cart" style={{ color: "white", textDecoration: "none" }}>🛒 Carrito</Link>
      <Link to="/favorites" style={{ color: "white", textDecoration: "none" }}>❤️ Favoritos</Link>
      <Link to="/wishlist" style={{ color: "white", textDecoration: "none" }}>⭐ Lista de deseos</Link>
      {currentUser ? (
        <>
          <span style={{ color: "#aaa", marginLeft: "auto" }}>{currentUser.email}</span>
          {currentUser.email === "admin@galicialuthier.com" && (
            <Link to="/admin" style={{ color: "#e2b96f", textDecoration: "none" }}>Admin</Link>
          )}
          <button onClick={handleLogout} style={{ background: "transparent", color: "white", border: "1px solid white", padding: "4px 10px", cursor: "pointer" }}>Salir</button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ color: "white", textDecoration: "none", marginLeft: "auto" }}>Login</Link>
          <Link to="/register" style={{ color: "white", textDecoration: "none" }}>Registro</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;