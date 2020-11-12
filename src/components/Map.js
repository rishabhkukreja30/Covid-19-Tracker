import React from 'react'
import { Map as LeafletMap, TileLayer , Circle, Popup} from "react-leaflet";
// import '../Map.css'
import numeral from 'numeral'

const casesTypeColors = {
    cases: {
      hex: "#CC1034",
      multiplier: 800,
    },
    recovered: {
      hex: "#7dd71d",
      multiplier: 1200,
    },
    deaths: {
      hex: "#fb4443",
      multiplier: 2000,
    },
  }



const Map = ({ countries, center, zoom}) => {

    const showDataOnMap = (data ,casesType='cases') => (
        data.map(country => (
            <Circle
            center={[country.countryInfo.lat, country.countryInfo.long ]}
            fillOpacity={0.4}
            color={casesTypeColors[casesType].hex}
            fillColor={casesTypeColors[casesType].hex}
            radius={Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier}
            >
                <Popup>
                    <div className='info-container'>
                        <div
                        className='info-flag'
                        style={{backgroundImage: `url(${country.countryInfo.flag})`}} />
                        <div 
                        className='info-name'>{country.country}</div>
                        <div
                        className='info-confirmed'>Cases: {numeral(country.cases).format('0,0')}</div>
                        <div className='info-recovered'>Recovered: {numeral(country.recovered).format('0,0')}</div>
                        <div 
                        className='info-deaths'>Deaths: {numeral(country.deaths).format('0,0')}</div>
                    </div>


                </Popup>
            </Circle>
        ))
    )

    return (
        <div className='map'>
            <LeafletMap center={center} zoom={zoom}>
                <TileLayer 
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                attributeion='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {showDataOnMap(countries)}
            </LeafletMap>
        </div>
    )
}

export default Map
