export default function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((p) => (
        <div key={p.id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
          <img src={p.thumbnail || p.image} alt={p.title} className="w-full h-48 object-cover rounded-md" />
          <h2 className="font-bold mt-2">{p.title}</h2>
          <p className="text-gray-600">${p.price}</p>
          <p className="text-sm">{p.category}</p>
        </div>
      ))}
    </div>
  );
}