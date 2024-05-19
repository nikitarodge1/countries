import { useState, useEffect } from "react";

const Tile = ({ FlagUrl, countryName, altFlagName }) => {
    return (
        <div
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

            }}>
            <img src={FlagUrl} alt={altFlagName} style={{ width: "100px", height: "100px" }} />
            <h2>{countryName}</h2>
        </div>
    );
}

function Countries() {
    const API_URL = "https://restcountries.com/v3.1/all";
    const [countries, setCountries] = useState([]);
    const [formData,setFormData] = useState('');
    const [filteredCountries,setFilteredCountries] =useState([]);

    useEffect(() => {
        fetch(API_URL)
            .then((response) => response.json())
            .then((data) => {
                setCountries(data);
                setFilteredCountries(data)
            })
            .catch((error)=> console.error("Error occured:",error));
    }, [])

    console.log({ countries });

    function handleChange (e){
        const countryName = e.target.value
        let filteredCountry = countries.filter(country => 'country.name.common'.con === "ind")
        console.log(filteredCountry)
    }
 
    
    return (
    <>
    
<input type="search" id="site-search" name="q" onChange={(e)=>handleChange(e)} value={formData}/> 
        <div
            style={{
                display: "flex",
                height: "100vh",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",

            }}>
            {filteredCountries.map((country) => (
                <Tile key={country.cca3} FlagUrl={country.flags.png} countryName={country.name.common} altFlagName={country.flags.alt} />
            ))}
        </div>
        </>
    );
}

export default Countries;
