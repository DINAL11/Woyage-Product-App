"use client";

import { useEffect, useState } from "react";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  thumbnail: string;
};

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const res = await fetch("https://dummyjson.com/products");
        const data = await res.json();
        setProducts(data.products);
        setFiltered(data.products);
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // filter + search
  useEffect(() => {
    let temp = [...products];

    if (category !== "all") {
      temp = temp.filter((p) => p.category === category);
    }
    if (search.trim() !== "") {
      const lower = search.toLowerCase();
      temp = temp.filter(
        (p) =>
          p.title.toLowerCase().includes(lower) ||
          p.description.toLowerCase().includes(lower)
      );
    }
    setFiltered(temp);
  }, [category, search, products]);

  if (loading) return <p className="p-4">Loading products...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  const categories = ["all", ...new Set(products.map((p) => p.category))];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Product Catalog</h1>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          className="border px-3 py-2 rounded w-full sm:w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border px-3 py-2 rounded w-full sm:w-1/4"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((p) => (
          <div
            key={p.id}
            className="border rounded-lg p-4 shadow hover:shadow-md transition"
          >
            <img
              src={p.thumbnail}
              alt={p.title}
              className="w-full h-40 object-cover rounded"
            />
            <h2 className="font-semibold mt-2">{p.title}</h2>
            <p className="text-sm text-gray-600 line-clamp-2">{p.description}</p>
            <p className="font-bold mt-1">${p.price}</p>
            <p className="text-xs text-gray-500">{p.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
