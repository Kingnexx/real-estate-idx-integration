// frontend/src/App.jsx
import { useState, useEffect } from "react";
import PropertyCard from "./components/PropertyCard";
import SearchFilter from "./components/SearchFilter";

export default function App() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    city: "",
    minPrice: "",
    maxPrice: "",
    minBeds: ""
  });

  useEffect(() => {
    async function fetchProperties() {
      try {
        setLoading(true);
        setError(null);

        // Build query string from active filters only
        const params = new URLSearchParams();
        if (filters.city) params.append("city", filters.city);
        if (filters.minPrice) params.append("minPrice", filters.minPrice);
        if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
        if (filters.minBeds) params.append("minBeds", filters.minBeds);

        const response = await fetch(`http://localhost:4000/api/properties?${params}`);

        if (!response.ok) {
          throw new Error(`Server responded with status ${response.status}`);
        }

        const data = await response.json();
        setProperties(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, [filters]);

  return (
    <div style={{ fontFamily: "sans-serif", padding: "30px", maxWidth: "1000px", margin: "0 auto" }}>
      <h1>Real Estate Listings</h1>

      <SearchFilter filters={filters} setFilters={setFilters} />

      {loading && <p>Loading properties...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {!loading && !error && (
        <>
          <p>{properties.length} properties found</p>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {properties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
          {properties.length === 0 && <p>No properties match your search.</p>}
        </>
      )}
    </div>
  );
}