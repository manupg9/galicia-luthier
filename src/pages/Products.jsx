import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useCart } from "../context/CartContext";
import { Link, useSearchParams } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useCart();

  const page = parseInt(searchParams.get("page") || "1");
  const PER_PAGE = 6;

  useEffect(() => {
    async function fetchProducts() {
      const snapshot = await getDocs(collection(db, "products"));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(data);
      const cats = [...new Set(data.map(p => p.category))];
      setCategories(cats);
    }
    fetchProducts();
  }, []);

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category ? p.category === category : true;
    return matchSearch && matchCat;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <main style={{ padding: 24 }}>
      <h1>Productos</h1>
      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        <input
          placeholder="Buscar producto..."
          value={search}
          onChange={e => { setSearch(e.target.value); setSearchParams({ page: 1 }); }}
          style={{ padding: 8, minWidth: 200 }}
        />
        <select value={category} onChange={e => { setCategory(e.target.value); setSearchParams({ page: 1 }); }} style={{ padding: 8 }}>
          <option value="">Todas las categorías</option>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 24 }}>
        {paginated.map(product => (
          <div key={product.id} style={{ border: "1px solid #ddd", borderRadius: 8, overflow: "hidden" }}>
            <img src={product.image} alt={product.name} style={{ width: "100%", height: 180, objectFit: "cover" }} />
            <div style={{ padding: 12 }}>
              <h3 style={{ margin: "0 0 8px" }}>{product.name}</h3>
              <p style={{ margin: "0 0 8px", color: "#666" }}>{product.category}</p>
              <p style={{ margin: "0 0 12px", fontWeight: "bold" }}>{product.price} €</p>
              <p style={{ margin: "0 0 12px", fontSize: 12, color: product.stock > 0 ? "green" : "red" }}>
                {product.stock > 0 ? `Stock: ${product.stock}` : "Sin stock"}
              </p>
              <div style={{ display: "flex", gap: 8 }}>
                <Link to={`/products/${product.id}`} style={{ flex: 1, textAlign: "center", padding: "6px 0", border: "1px solid #333", borderRadius: 4, textDecoration: "none", color: "#333" }}>Ver</Link>
                {product.stock > 0
                  ? <button onClick={() => addToCart(product)} style={{ flex: 1, padding: "6px 0", background: "#1a1a2e", color: "white", border: "none", borderRadius: 4, cursor: "pointer" }}>Añadir</button>
                  : <button disabled style={{ flex: 1, padding: "6px 0", background: "#ccc", border: "none", borderRadius: 4 }}>Sin stock</button>
                }
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8, marginTop: 32, justifyContent: "center" }}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setSearchParams({ page: i + 1 })}
            style={{ padding: "6px 12px", background: page === i + 1 ? "#1a1a2e" : "white", color: page === i + 1 ? "white" : "#333", border: "1px solid #333", borderRadius: 4, cursor: "pointer" }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </main>
  );
}

export default Products;