import { Link } from "react-router-dom";

function Home() {
  return (
    <main>
      <section style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        color: "white",
        padding: "80px 24px",
        textAlign: "center"
      }}>
        <h1 style={{ fontSize: 48, margin: "0 0 16px", color: "#e2b96f" }}>🎸 Galicia-Luthier</h1>
        <p style={{ fontSize: 20, color: "#e2b96f", marginBottom: 32 }}>
          Instrumentos artesanales elaborados en Galicia
        </p>
        <p style={{ maxWidth: 600, margin: "0 auto 40px", lineHeight: 1.7, color: "#ccc" }}>
          Descubre nuestra colección de guitarras, laúdes y instrumentos de cuerda
          fabricados a mano por maestros luthiers gallegos con materiales de la más alta calidad.
        </p>
        <Link to="/products" style={{
          display: "inline-block",
          padding: "14px 40px",
          background: "#e2b96f",
          color: "#1a1a2e",
          borderRadius: 6,
          textDecoration: "none",
          fontWeight: "bold",
          fontSize: 16
        }}>
          Ver productos
        </Link>
      </section>

      <section style={{ padding: "60px 24px", textAlign: "center", background: "#f9f9f9" }}>
        <h2 style={{ marginBottom: 40 }}>¿Por qué Galicia-Luthier?</h2>
        <div style={{ display: "flex", gap: 32, justifyContent: "center", flexWrap: "wrap" }}>
          {[
            { icon: "🪵", title: "Materiales nobles", desc: "Maderas seleccionadas de bosques sostenibles gallegos" },
            { icon: "🤲", title: "Hecho a mano", desc: "Cada instrumento es único, trabajado con técnicas tradicionales" },
            { icon: "🎵", title: "Sonido excepcional", desc: "Afinación y resonancia superior a instrumentos industriales" },
          ].map(({ icon, title, desc }) => (
            <div key={title} style={{ maxWidth: 240, padding: 24, background: "white", borderRadius: 8, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
              <div style={{ fontSize: 40 }}>{icon}</div>
              <h3 style={{ margin: "12px 0 8px" }}>{title}</h3>
              <p style={{ color: "#666", lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;