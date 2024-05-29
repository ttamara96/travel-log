import React, {useState}  from 'react';
import { useForm, SubmitHandler } from "react-hook-form"

import { createLogEntry } from '../../API';
import { FormInput, FormTextArea }from '..';
import './LogEntryForm.scss';

interface LogEntryFormProps {
    location: MarkerLocation,
    onClose: Function
  }

export const LogEntryForm: React.FC<LogEntryFormProps> = ({ location, onClose }) => {
    const [loading, setLoading ] = useState(false);
    const [error, setError ] = useState("");

    const {
        register,
        handleSubmit
    } = useForm();
    async function onSubmit(data: any) {
        try {
            setLoading(true);
            data.latitude = location.latitude;
            data.longitude = location.longitude;
            const created = await createLogEntry(data);
            onClose();
        } catch (error: any) {
            console.error(error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    function onFormSubmitError(error: any) { 
        console.error(error);
    }

    return (
        <form className="entry-form w-full flex flex-col h-[calc(100%-1.875rem-2rem)]" onSubmit={handleSubmit(onSubmit, onFormSubmitError)}>
            { error &&  <h3 className='error'>{error}</h3> }
            <section>
                <label className="block text-gray-500 font-bold">Selected location</label>
                <p>Latitude: {location.latitude}</p>
                <p className="mb-4" >Longitude: {location.longitude}</p>

                <FormInput  register={register} 
                            inputKey="title"
                            label="Title"
                            required={true}  />

                <FormTextArea  register={register} 
                            inputKey="comments"
                            rows={5}
                            label="Comments"  />

                <FormTextArea  register={register} 
                            inputKey="description"
                            rows={5}
                            label="Description"  />

                <FormInput  register={register} 
                            inputKey="image"
                            label="Image Link"  />

                <FormInput  register={register} 
                            inputKey="visitDate"
                            label="Visit Date"
                            type='date'
                            required={true}  />
            </section>
            <section className='mt-auto'>
                <button className='action-button w-full text-base p-1 bg-cyan-500 hover:bg-cyan-600 rounded' 
                    disabled={loading}>{loading ? "Loading..." : "Create Entry"}</button>
            </section>
        </form>
    )
}
