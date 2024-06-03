import {  Popup } from 'react-map-gl';
import { Rating } from '..';
import { useState } from 'react';

interface DetailsPopupProps {
    entry: LogEntry;
    showPopup: ShowPopup;
    setShowPopup: React.Dispatch<React.SetStateAction<ShowPopup>>;
}

export const DetailsPopup: React.FC<DetailsPopupProps> = ({ entry, showPopup, setShowPopup }) => {


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
            }}
        >

            <div className='details-popup flex flex-col'>
                {entry.image &&
                    <div className='image-container'>
                        <img src={entry.image} alt={entry.title} />
                    </div>}
                <h1 className="text-3xl font-bold mt-3 mb-5">{entry.title}</h1>
                <p>Visited on: {new Date(entry.visitDate).toLocaleDateString()}</p>

                <Rating rating={entry.rating ?? 0} />

                <h2 className="text-xl font-bold mt-4">Description</h2>
                <p>{entry.description ? entry.description : "-"}</p>
                <h2 className="text-xl font-bold my-2">Comments</h2>
                <p>{entry.comments ? entry.comments : "-"}</p>
                <button className="action-button text-base p-1 bg-cyan-500 hover:bg-cyan-600 rounded" >
                    Edit
                </button>
            </div>
        </Popup>
    )
}