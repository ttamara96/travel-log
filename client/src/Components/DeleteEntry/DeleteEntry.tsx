import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { deleteLogEntry } from '../../API';
import Popup from 'reactjs-popup';
import "./DeleteEntry.scss"

interface DeleteEntryProps {
  entry: LogEntry;
  showPopup: ShowPopup;
  setShowPopup: React.Dispatch<React.SetStateAction<ShowPopup>>;
  deleteEntryCallback?: Function;
}
 
export const DeleteEntry: React.FC<DeleteEntryProps> = ({ entry, showPopup, setShowPopup, deleteEntryCallback }) => {
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);

  const deleteEntry = async() => {
    const response = await deleteLogEntry(entry._id);
     if(deleteEntryCallback) {
         deleteEntryCallback(entry._id);
     }
     setShowPopup({
         ...showPopup,
         [entry._id]: false
     })
 }

  const closeConfirmPopup = () => {
    setShowConfirmPopup(false)
  }

  return (
    <>
        <button className="flex-none text-base p-1 bg-red-700 hover:bg-red-900 rounded mr-4" onClick={() => setShowConfirmPopup(true)}>
          <FontAwesomeIcon icon={faTrash} className='p-2' />
        </button>
        <Popup
          position="center center"
          modal={true}
          arrow={false}
          open={showConfirmPopup}
          onClose={closeConfirmPopup}
          closeOnDocumentClick >
          <div className="confirm-popup-content bg-slate-100 rounded-md flex flex-col shadow-lg">
            <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
            <p className="mb-4">Are you sure you want to delete Log Entry <b>"{entry.title}"</b>?</p>
            <div className="w-full flex justify-end">
              <button className="confirm-action-button bg-slate-200 hover:bg-slate-300 mr-4"
                      onClick={closeConfirmPopup}>
                No, cancel
              </button>
              <button className="confirm-action-button bg-red-700 hover:bg-red-900 text-white"
                      onClick={deleteEntry}>
                Yes, delete
              </button>
            </div>
          </div>
        </Popup>
    </>
  );
}