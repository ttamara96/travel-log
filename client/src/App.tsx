import React, {useState, useEffect, Fragment }  from 'react';
import Map, {Marker, Popup} from 'react-map-gl';
import { listLogEntries } from './API';
import "mapbox-gl/dist/mapbox-gl.css";
import { DetailsPopup, LogEntryForm } from './Components';

function App() {
  const [logEntries, setLogEntries] = useState<LogEntry[]>([]);
  const [showPopup, setShowPopup] = useState<ShowPopup>({});
  const [addEntryLocation, setAddEntryLocation] = useState<MarkerLocation | null>();

  const getEntries = async () => {
    const logEntries: LogEntry[] = await listLogEntries();
    setLogEntries(logEntries);
  }

  const updateLogEntry = (updatedEntry: LogEntry) => {
    setLogEntries(prevEntries =>
      prevEntries.map(entry => 
          entry._id === updatedEntry._id ? updatedEntry : entry
      )
    );
  }

  
  const deleteLogEntry = (deletedEntryId: String) => {
    const LogEntriesWithoutDeleted = logEntries.filter((entry) => entry._id !== deletedEntryId)
    setLogEntries(LogEntriesWithoutDeleted);
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
                <DetailsPopup  
                  entry={entry} 
                  showPopup={showPopup} 
                  setShowPopup={setShowPopup}
                  updateEntryCallback={updateLogEntry}
                  deleteEntryCallback={deleteLogEntry}/>
              )
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