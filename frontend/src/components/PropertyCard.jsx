// frontend/src/components/PropertyCard.jsx
export default function PropertyCard({ property }) {
  return (
    <div style={styles.card}>
      <img src={property.image} alt={property.address} style={styles.image} />
      <div style={styles.body}>
        <h3 style={styles.price}>${property.price.toLocaleString()}</h3>
        <p style={styles.address}>{property.address}, {property.city}, {property.state}</p>
        <p>{property.beds} Beds | {property.baths} Baths | {property.sqft} sqft</p>
        <button style={styles.button}>View Property</button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    overflow: "hidden",
    width: "280px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
    fontFamily: "sans-serif"
  },
  image: { width: "100%", height: "180px", objectFit: "cover" },
  body: { padding: "12px" },
  price: { margin: "0 0 6px 0" },
  address: { color: "#555", fontSize: "14px" },
  button: {
    marginTop: "10px",
    padding: "8px 14px",
    border: "none",
    borderRadius: "6px",
    background: "#1F4B3F",
    color: "white",
    cursor: "pointer"
  }
};