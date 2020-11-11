import React,  {useState, useEffect} from 'react'
import {Form} from 'react-bootstrap'

const AppHeader = () => {

    const [countries, setCountries] = useState([])
    const [country, setCountry] = useState('worldwide')
  
    useEffect(() => {
      const getCountriesData = async () => {
        await fetch('https://disease.sh/v3/covid-19/countries')
        .then((res) => res.json())
        .then((data) => {
          const countries = data.map((country) => (
            {
              name: country.country,
              value: country.countryInfo.iso2
            }
          ))
            setCountries(countries)
  
        })
      }
      getCountriesData()
    }, [] )

    return (
        <div className='app-header'>
        <h1>COVID-19 TRACKER</h1>
      <Form.Control as="select" className='form-class' value={country} onChange={(e) => {
        setCountry(e.target.value)
      } }>
        <option value='worldwide'>Worldwide</option>
        {countries.map(country => (
              <option  value={country.value}>{country.name}</option>
        ))}
      </Form.Control>
      </div>
    )
}

export default AppHeader
