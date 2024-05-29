import React, {useState, useEffect, Fragment }  from 'react';
import Map, {Marker, Popup} from 'react-map-gl';
import { listLogEntries } from './API';
import "mapbox-gl/dist/mapbox-gl.css";
import { LogEntryForm, Rating } from './Components';

interface ShowPopup {
  [_id: string]: boolean;
}

function App() {
  const [logEntries, setLogEntries] = useState<LogEntry[]>([]);
  const [showPopup, setShowPopup] = useState<ShowPopup>({});
  const [addEntryLocation, setAddEntryLocation] = useState<MarkerLocation | null>();

  const getEntries = async () => {
    const logEntries: LogEntry[] = await listLogEntries();
    setLogEntries(logEntries);
  }

  useEffect(() => {
    getEntries();
  }, []);  //empty dependency array, to only run once

  const showAddMarkerPopup = (event: any) => {
    setAddEntryLocation({
      latitude:  event.lngLat.lat,
      longitude: event.lngLat.lng

    })
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
                const tempShowPopup = Object.keys(showPopup).reduce((accumulator: ShowPopup, key: string) => {     //Close all other popups
                  accumulator[key] = false;
                  return accumulator;
                }, {});

                setShowPopup(
                  { ...tempShowPopup, 
                    [entry._id]: true
                  }
                )
              }
              }
            >
              <div>
                <svg
                 className={showPopup[entry._id] ? "marker blue" : "marker yellow"} viewBox="0 0 24 24" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">  
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
                closeOnClick={false}
                onClose={() => {
                  setShowPopup(  { ...showPopup, 
                    [entry._id]: false
                  })
                }
              }
                >
                <div className='details-popup flex flex-col'>
                  {entry.image &&
                  <div className='image-container'>
                    <img src={entry.image} alt={entry.title} />
                  </div> }
                  <h1 className="text-3xl font-bold mt-3 mb-5">{entry.title}</h1>
                  <p>Visited on: {new Date(entry.visitDate).toLocaleDateString()}</p>

                  <Rating rating={entry.rating ?? 0} />
                  
                  <h2 className="text-xl font-bold mt-4">Description</h2>
                  <p>{entry.description ?? "-" }</p> 
                  <h2 className="text-xl font-bold my-2">Comments</h2>
                  <p>{entry.comments ?? "-"}</p> 
                  <button className="action-button text-base p-1 bg-cyan-500 hover:bg-cyan-600 rounded">Edit</button>
                  
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
              <h1 className="text-3xl font-bold mt-3 mb-5">Add your new log entry</h1>
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