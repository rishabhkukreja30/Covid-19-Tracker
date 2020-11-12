import './App.css'
import React, {useState, useEffect} from 'react'
import {Card, Form} from 'react-bootstrap'
import InfoBox from './components/InfoBox'
import Map from './components/Map'
import Table from './components/Table'
import LineGraph from './components/LineGraph'
import 'leaflet/dist/leaflet.css'


function App() {

  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('worldwide')
  const [countryInfo , setCountryInfo] = useState({})
  const [tableData , setTableData] = useState([])
  const [mapCenter, setMapCenter] = useState({lat: 34.80746, lng: -40.4796})
  const [mapZoom , setMapZoom] = useState(3)
  const [mapCountries, setMapCountries] = useState([])

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
    .then((res) => res.json())
    .then((data) => {
      setCountryInfo(data)
    })
  }, [])


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
          setTableData(data)
          setCountries(countries)
          setMapCountries(data)

      })
    }
    getCountriesData()
  }, [] )

  const onCountryChange = (e) => {
    const countryCode = e.target.value
    setCountry(countryCode)

    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    fetch(url)
    .then((res) => res.json())
    .then((data) => {
      setCountryInfo(data)
      setMapCenter([data.countryInfo.lat, data.countryInfo.long])
      setMapZoom(4)
    }) 

 
  }

  return (
    <div className="app">
      <div className='app-left'>
      <div className='app-header'>

      <h1>COVID-19 TRACKER</h1>

      <Form.Control as="select" className='form-class' value={country} onChange={onCountryChange}>
        <option value='worldwide'>Worldwide</option>
        {countries.map(country => (
              <option  value={country.value}>{country.name}</option>
        ))}
      </Form.Control>

      </div>
      <div className='app-stats'>
      <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
      <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
      <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
      </div>
      <Map
      countries={mapCountries}
      center={mapCenter}
      zoom={mapZoom} 
      />
      </div>
      <Card className='app-right' style={{backgroundColor: '#e8e8e8'}} >
        <Card >
          <h3>Live Cases By Country</h3>
          <Table countries={tableData}/>
          </Card>
          <Card>
            <h3>Worldwide New Cases</h3>
            <LineGraph />
          </Card>
     
      </Card>
    </div>
  );
}

export default App;
