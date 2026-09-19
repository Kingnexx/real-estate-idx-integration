// frontend/src/components/SearchFilter.jsx
export default function SearchFilter({ filters, setFilters }) {
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div style={styles.bar}>
      <input
        type="text"
        name="city"
        placeholder="City"
        value={filters.city}
        onChange={handleChange}
        style={styles.input}
      />
      <input
        type="number"
        name="minPrice"
        placeholder="Min Price"
        value={filters.minPrice}
        onChange={handleChange}
        style={styles.input}
      />
      <input
        type="number"
        name="maxPrice"
        placeholder="Max Price"
        value={filters.maxPrice}
        onChange={handleChange}
        style={styles.input}
      />
      <input
        type="number"
        name="minBeds"
        placeholder="Min Beds"
        value={filters.minBeds}
        onChange={handleChange}
        style={styles.input}
      />
    </div>
  );
}

const styles = {
  bar: { display: "flex", gap: "10px", margin: "20px 0", flexWrap: "wrap" },
  input: { padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }
};