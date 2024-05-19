import { useState, useEffect } from "react";

const Tile = ({ FlagUrl, countryName, altFlagName }) => (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "10px", padding: "10px", border: "1px solid grey", borderRadius: "8px", flexDirection: "column", width: "200px" }}>
        <img src={FlagUrl} alt={altFlagName} style={{ width: "100px", height: "100px" }} />
        <h2>{countryName}</h2>
    </div>
);

function Countries() {
    const [countries, setCountries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all")
            .then((response) => response.json())
            .then((data) => setCountries(data))
            .catch((error) => console.error("Error occurred:", error));
    }, []);

    const filteredCountries = countries.filter(country =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <input
                type="text"
                id="searchBar"
                placeholder="Search for a country..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ 
                    margin: '20px 0', 
                    padding: '10px', 
                    border: "1px solid grey",
                    width: '60%', 
                    borderRadius: '5px',   
                }}
            />
            <div style={{ display: "flex", height: "100vh", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "10px" }}>
                {filteredCountries.length > 0 && filteredCountries.map((country) => (
                    <Tile key={country.cca3} FlagUrl={country.flags.png} countryName={country.name.common} altFlagName={country.flags.alt || `Flag of ${country.name.common}`} />
                ))}
            </div>
        </div>
    );
}

export default Countries;
