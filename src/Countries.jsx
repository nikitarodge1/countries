import { useState, useEffect } from "react";

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
    <img src={FlagUrl} alt={altFlagName} style={{ width: "100px", height: "100px" }} />
    <h2>{countryName}</h2>
  </div>
);

function Countries() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch countries data");
        }
        return response.json();
      })
      .then((data) => setCountries(data))
      .catch((error) => {
        console.error("Error occurred:", error); 
        setError(error.message);
      });
  }, []);

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        id="searchBar"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "10px", padding: "8px", fontSize: "16px",border: "1px solid grey", display: "block", margin: "0 auto", width: "60%",borderRadius:"5px" }} 
      />
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px" }}>
        {filteredCountries.length > 0 && filteredCountries.map((country) => (
          <Tile
            key={country.cca3}
            FlagUrl={country.flags.png}
            countryName={country.name.common}
            altFlagName={country.flags.alt || `Flag of ${country.name.common}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Countries;
