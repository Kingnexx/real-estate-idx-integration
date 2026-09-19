// backend/mapper.js

// Converts one RESO-style raw MLS record into our app's simplified format
function mapListing(raw) {
  return {
    id: raw.ListingKey,
    price: raw.ListPrice,
    beds: raw.BedroomsTotal,
    baths: raw.BathroomsTotalInteger,
    sqft: raw.LivingArea,
    city: raw.City,
    state: raw.StateOrProvince,
    address: `${raw.StreetNumber} ${raw.StreetName}`,
    remarks: raw.PublicRemarks,
    status: raw.StandardStatus,
    image: raw.Media && raw.Media.length > 0 ? raw.Media[0] : null
  };
}

// Maps an entire array of raw MLS records
function mapListings(rawArray) {
  return rawArray.map(mapListing);
}

module.exports = { mapListing, mapListings }; 