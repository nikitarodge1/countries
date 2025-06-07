import React, { useEffect, useState } from "react";

// Reusable Tile component with your styles
const Tile = ({ FlagUrl, countryName, altFlagName }) => (
  <div
    className="countryCard"
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: "10px",
      padding: "10px",
      border: "1px solid grey",
      borderRadius: "8px",
      flexDirection: "column",
      width: "200px",
    }}
  >
    <img
      src={FlagUrl}
      alt={altFlagName}
      style={{ width: "100px", height: "100px", objectFit: "cover" }}
    />
    <h2>{countryName}</h2>
  </div>
);

function Countries() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries"
    )
      .then((response) => {
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        setCountries(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Filter by 'common' field (country name)
  const filteredCountries = countries.filter((country) => {
    const name = country.common || "";
    return name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (loading) return <p>Loading countries...</p>;
  if (error) return <p>Error occurred: {error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Countries</h1>
      <input
        type="text"
        placeholder="Search countries..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: "8px",
          width: "60%",
          margin: "0 auto 20px auto",
          display: "block",
          fontSize: "16px",
          border: "1px solid grey",
          borderRadius: "5px",
        }}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country, index) => (
            <Tile
              key={index}
              FlagUrl={country.png}
              countryName={country.common}
              altFlagName={`Flag of ${country.common}`}
            />
          ))
        ) : (
          <p style={{ textAlign: "center" }}>No countries found.</p>
        )}
      </div>
    </div>
  );
}

export default Countries;
