import {  Popup } from 'react-map-gl';
import { LogEntryForm, Rating, DeleteEntry } from '..';
import { useState } from 'react';
import "./DetailsPopup.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

interface DetailsPopupProps {
    entry: LogEntry;
    showPopup: ShowPopup;
    setShowPopup: React.Dispatch<React.SetStateAction<ShowPopup>>;
    updateEntryCallback?: Function;
    deleteEntryCallback?: Function;
}

export const DetailsPopup: React.FC<DetailsPopupProps> = ({ entry, showPopup, setShowPopup, updateEntryCallback, deleteEntryCallback }) => {
    const [editMode, setEditMode] = useState<boolean>(false);

    return (
        <Popup
            key={`${entry._id}_${entry.longitude}_${entry.latitude}_`}
            longitude={entry.longitude}
            latitude={entry.latitude}
            closeOnClick={false}
            onClose={() => {
                setShowPopup({
                    ...showPopup,
                    [entry._id]: false
                })
                setEditMode(false)
            }}
        >

            {
                editMode ? 
                <div className='details-popup flex flex-col'>
                    <div className='popup-body'>
                        <h1 className="text-3xl font-bold my-5">Edit {entry.title}</h1>
                        <LogEntryForm   location={{latitude: entry.latitude, longitude: entry.longitude}} 
                                        entry={entry}
                                        onClose={() => {
                                            setShowPopup({
                                                ...showPopup,
                                                [entry._id]: false
                                            })
                                            setEditMode(false)
                                        }}
                                        updateEntryCallback={updateEntryCallback}/>
                    </div>
                </div>
                :
                <div className='details-popup flex flex-col'>
                    {entry.image &&
                        <div className='image-container'>
                            <img src={entry.image} alt={entry.title} />
                        </div>}
                    <section className='popup-header'>
                        <h1 className="text-3xl font-bold my-5">{entry.title}</h1>
                        <section className='flex flex-row justify-between'>
                            <div className='mb-2'>
                                <Rating rating={entry.rating ?? 0} />
                            </div>
                            <p className='my-auto'>Visited: {new Date(entry.visitDate).toLocaleDateString()}</p>
                        </section>
                    </section>
                    <section className='popup-body flex flex-col' >
                        <h2 className="text-xl font-bold mt-4">Description</h2>
                        <section className='min-h-12 overflow-y-auto mb-4'>
                            <p>{entry.description ? entry.description : "-"}</p>
                        </section>
                        <h2 className="text-xl font-bold my-2">Comments</h2>
                        <section className='min-h-12 overflow-y-auto mb-4'>
                            <p>{entry.comments ? entry.comments : "-"}</p>
                        </section>
                        <section className='action-button-container flex'>
                            <DeleteEntry            
                                entry={entry} 
                                showPopup={showPopup} 
                                setShowPopup={setShowPopup}
                                deleteEntryCallback={deleteEntryCallback} />
                            <button className="flex-1 text-base p-1 bg-cyan-500 hover:bg-cyan-600 rounded"  
                                    onClick={() => { setEditMode(true) }}>
                                    <FontAwesomeIcon icon={faEdit} /> Edit
                            </button>
                        </section>

                    </section>
                </div>
            }
        </Popup>
    )
}