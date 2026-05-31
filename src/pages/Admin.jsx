import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { seedProducts } from "../seedProducts";

const empty = { name: "", description: "", price: "", stock: "", category: "", image: "" };
const inputStyle = { width: "100%", padding: 8, marginBottom: 12, boxSizing: "border-box" };

function Admin() {
  const [form, setForm] = useState(empty);
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [msg, setMsg] = useState("");

  async function fetchProducts() {
    const snap = await getDocs(collection(db, "products"));
    setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  }

  useEffect(() => { fetchProducts(); }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const data = { ...form, price: parseFloat(form.price), stock: parseInt(form.stock) };
    try {
      if (editing) {
        await updateDoc(doc(db, "products", editing), data);
        setMsg("✅ Producto actualizado");
        setEditing(null);
      } else {
        await addDoc(collection(db, "products"), { ...data, createdAt: new Date() });
        setMsg("✅ Producto añadido");
      }
      setForm(empty);
      fetchProducts();
    } catch (err) {
      setMsg("❌ Error: " + err.message);
    }
  }

  function handleEdit(product) {
    setEditing(product.id);
    setForm({ name: product.name, description: product.description, price: product.price, stock: product.stock, category: product.category, image: product.image });
    window.scrollTo(0, 0);
  }

  async function handleDelete(id) {
    if (!confirm("¿Eliminar este producto?")) return;
    await deleteDoc(doc(db, "products", id));
    setMsg("🗑️ Producto eliminado");
    fetchProducts();
  }

  async function handleSeed() {
    await seedProducts();
    setMsg("✅ Productos de prueba cargados");
    fetchProducts();
  }

  return (
    <main style={{ maxWidth: 900, margin: "40px auto", padding: "0 24px" }}>
      <h1>Panel de Administración</h1>
      <button onClick={handleSeed} style={{ padding: "8px 16px", marginBottom: 24, cursor: "pointer" }}>
        🌱 Cargar productos de prueba
      </button>

      <h2>{editing ? "✏️ Editar producto" : "➕ Añadir producto"}</h2>
      {msg && <p>{msg}</p>}
      <form onSubmit={handleSubmit}>
        <label>Nombre</label>
        <input name="name" value={form.name} onChange={handleChange} required style={inputStyle} />
        <label>Descripción</label>
        <textarea name="description" value={form.description} onChange={handleChange} required style={inputStyle} />
        <label>Precio (€)</label>
        <input name="price" type="number" step="0.01" value={form.price} onChange={handleChange} required style={inputStyle} />
        <label>Stock</label>
        <input name="stock" type="number" value={form.stock} onChange={handleChange} required style={inputStyle} />
        <label>Categoría</label>
        <input name="category" value={form.category} onChange={handleChange} required style={inputStyle} />
        <label>URL de imagen</label>
        <input name="image" value={form.image} onChange={handleChange} style={inputStyle} />
        <div style={{ display: "flex", gap: 12 }}>
          <button type="submit" style={{ padding: "10px 20px", background: "#1a1a2e", color: "white", border: "none", borderRadius: 6, cursor: "pointer" }}>
            {editing ? "Guardar cambios" : "Añadir producto"}
          </button>
          {editing && <button type="button" onClick={() => { setEditing(null); setForm(empty); }} style={{ padding: "10px 20px", cursor: "pointer" }}>Cancelar</button>}
        </div>
      </form>

      <h2 style={{ marginTop: 48 }}>📦 Productos existentes</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#1a1a2e", color: "white" }}>
            <th style={{ padding: 10, textAlign: "left" }}>Nombre</th>
            <th style={{ padding: 10 }}>Precio</th>
            <th style={{ padding: 10 }}>Stock</th>
            <th style={{ padding: 10 }}>Categoría</th>
            <th style={{ padding: 10 }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: 10 }}>{p.name}</td>
              <td style={{ padding: 10, textAlign: "center" }}>{p.price} €</td>
              <td style={{ padding: 10, textAlign: "center", color: p.stock > 0 ? "green" : "red" }}>{p.stock}</td>
              <td style={{ padding: 10, textAlign: "center" }}>{p.category}</td>
              <td style={{ padding: 10, textAlign: "center", display: "flex", gap: 8, justifyContent: "center" }}>
                <button onClick={() => handleEdit(p)} style={{ padding: "4px 12px", cursor: "pointer" }}>✏️ Editar</button>
                <button onClick={() => handleDelete(p.id)} style={{ padding: "4px 12px", background: "#c0392b", color: "white", border: "none", borderRadius: 4, cursor: "pointer" }}>🗑️ Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default Admin;