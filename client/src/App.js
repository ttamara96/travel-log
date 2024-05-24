import React, {useState, useEffect, Fragment }  from 'react';
import Map, {Marker, Popup} from 'react-map-gl';
import { listLogEntries } from './API';
import "mapbox-gl/dist/mapbox-gl.css";
import LogEntryForm from './LogEntryForm';

const App = ()  => {
  const [logEntries, setLogEntries ] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addEntryLocation, setAddEntryLocation] = useState(null);

  const getEntries = async () => {
    const logEntries = await listLogEntries();
    setLogEntries(logEntries);
  }

  useEffect(() => {
    getEntries();
  }, []);  //empty dependency array, to only run once

  const showAddMarkerPopup = (event) => {
    console.log( event.lngLat);
    setAddEntryLocation({
      latitude:  event.lngLat.lat,
      longitude: event.lngLat.lng

    })
    console.log(addEntryLocation);
  }

  return (
    <Map
      initialViewState={{
        longitude: 7.91201324710674, 
        latitude: 46.59542870349515,
        zoom: 5
      }}
      style={{width: "100vw", height: "100vh", overflow: "hidden"}}
      mapStyle="mapbox://styles/mapbox/dark-v11"
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      onDblClick={showAddMarkerPopup}
    >
      { logEntries.map(entry => {
          return <Fragment key={entry._id}>
            <Marker 
              key={`marker_${entry._id}`}
              longitude={entry.longitude}
              latitude={entry.latitude}
              onClick={() => { 
                setShowPopup(
                  { ...showPopup, 
                    [entry._id]: true
                  }
                )
              }
              }
            >
              <div>
                <svg
                 className="marker yellow" viewBox="0 0 24 24" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">  
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3">
                  </circle>
                </svg>
              </div> 
            </Marker>
            {showPopup[entry._id] && (
              <Popup   
                key={`${entry._id}_${entry.longitude}_${entry.latitude}_`}
                longitude={entry.longitude}
                latitude={entry.latitude}
                anchor="bottom"
                closeOnClick={false}
                onClose={() => {
                  setShowPopup(  { ...showPopup, 
                    [entry._id]: false
                  })
                }
              }
                >
                <div className='details-popup'>
                  <h3>{entry.title}</h3>
                  <p>{entry.comments}</p> 
                  {entry.image && <img src={entry.image} alt={entry.title} /> }
                  <small>Visited on: {new Date(entry.visitDate).toLocaleDateString()}</small>
                </div>
              </Popup>)
            }
          </Fragment>
        })
      }
      {
        addEntryLocation && (
          <>
            <Marker 
              longitude={addEntryLocation.longitude}
              latitude={addEntryLocation.latitude}
            >
              <div>
                <svg
                 className="marker red" viewBox="0 0 24 24" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">  
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3">
                  </circle>
                </svg>
              </div> 
            </Marker>
            <Popup   
              longitude={addEntryLocation.longitude}
              latitude={addEntryLocation.latitude}
              anchor="bottom"
              closeOnClick={false}
              onClose={() => setAddEntryLocation(null)
            }
              >
              <div className='new-entry-popup'>
                <h3>Add your new log entry</h3>
                <LogEntryForm 
                  onClose={() =>{
                    setAddEntryLocation(null);
                    getEntries();
                  }} 
                  location={addEntryLocation} />
              </div>
            </Popup>

          </>
        )
      }
    </Map>
  );
}

export default App;