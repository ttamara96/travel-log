import React, {useState}  from 'react';
import { useForm } from "react-hook-form"

import { createLogEntry, updateLogEntry } from '../../API';
import { FormInput, FormTextArea, Rating } from '..';
import './LogEntryForm.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

interface LogEntryFormProps {
    location: MarkerLocation,
    onClose: Function,
    entry?: LogEntry,
    updateEntryCallback?: Function
  }

export const LogEntryForm: React.FC<LogEntryFormProps> = ({ location, onClose, entry, updateEntryCallback }) => {
    const [loading, setLoading ] = useState(false);
    const [error, setError ] = useState("");

    const {
        register,
        setValue,
        handleSubmit
    } = useForm();
    async function onSubmit(data: any) {
        try {
            setLoading(true);
            data.latitude = location.latitude;
            data.longitude = location.longitude;
            if(entry && updateEntryCallback) {                                   //EDIT
                const updated = await updateLogEntry(entry._id, data);
                updateEntryCallback(updated);
            } else {                                            //CREATE 
                const created = await createLogEntry(data);
            }
            onClose();
        } catch (error: any) {
            console.error(error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    function getSubmitButtonLabel(): string {
        if(loading) {
            return "Loading...";
        } else if(entry) {
            return `Save Changes for ${entry.title}`;
        } else {
            return "Create Entry";
        }
    }

    function onFormSubmitError(error: any) { 
        console.error(error);
    }

    function formatDateStringForInput(dateString: string): string {
        if(entry?.visitDate) {
            return new Date(entry?.visitDate).toISOString().slice(0, 10)
        } else {
            return "";
        }
    }

    return (
        <form className="entry-form w-full flex flex-col h-[calc(100%-1.875rem-2.5rem)]" onSubmit={handleSubmit(onSubmit, onFormSubmitError)}>
            { error &&  <h3 className='error'>{error}</h3> }
            <section>
                <label className="block text-gray-500 font-bold">Selected location</label>
                <p>Latitude: {location.latitude}</p>
                <p className="mb-4" >Longitude: {location.longitude}</p>

                <FormInput  register={register} 
                            inputKey="title"
                            label="Title"
                            required={true} 
                            value={entry && entry?.title}
                            setValue={setValue} />

                <section className='my-4'>
                    <Rating rating={entry?.rating ?? 0}
                            formRatingProps={{
                                "register": register,
                                "setValue": setValue,
                                "inputKey": "rating",
                                "label": "Rating"  }}  />
                </section>


                <FormTextArea   register={register} 
                                inputKey="description"
                                rows={5}
                                label="Description"
                                value={entry && entry?.description}
                                setValue={setValue}  />

                <FormTextArea   register={register} 
                                inputKey="comments"
                                rows={5}
                                label="Comments"
                                value={entry && entry?.comments} 
                                setValue={setValue} />

                <FormInput  register={register} 
                            inputKey="image"
                            label="Image Link"
                            value={entry && entry?.image}
                            setValue={setValue}  />

                <FormInput  register={register} 
                            inputKey="visitDate"
                            label="Visit Date"
                            type='date'
                            required={true}
                            value={entry?.visitDate && formatDateStringForInput(entry?.visitDate)}
                            setValue={setValue}  />
            </section>
            <section className='mt-auto'>
                <button className='action-button w-full text-base p-3 bg-cyan-500 hover:bg-cyan-600 rounded' 
                        disabled={loading}>
                    <FontAwesomeIcon icon={faSave} />  {getSubmitButtonLabel()}
                </button>
            </section>
        </form>
    )
}
