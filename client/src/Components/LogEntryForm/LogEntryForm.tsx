import React, {useState}  from 'react';
import { useForm, SubmitHandler } from "react-hook-form"

import { createLogEntry } from '../../API';

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

                <label className="block text-gray-500 font-bold required" htmlFor="title">Title</label>
                <input className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:border-cyan-500' 
                        {...register('title', { required: true })} 
                        name="title"  />

                <label  className="block text-gray-500 font-bold" htmlFor="comments">Comments</label>
                <textarea   className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:border-cyan-500' 
                            rows={5} {...register('comments')} 
                            name="comments" />

                <label  className="block text-gray-500 font-bold" htmlFor="description">Description</label>
                <textarea   className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:border-cyan-500'  
                            rows={5}  {...register('description')} 
                            name="description" />

                <label  className="block text-gray-500 font-bold"  htmlFor="image">Image Link</label>
                <input  className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:border-cyan-500'  
                        {...register('image')} 
                        name="image"/>

                <label  className="block text-gray-500 font-bold required" htmlFor="visitDate">Visit Date</label>
                <input  className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:border-cyan-500'  
                        type='date'  {...register('visitDate', { required: true })}
                        name="visitDate" />
            </section>
            <section className='mt-auto'>
            <button className='action-button w-full text-base p-1 bg-cyan-500 hover:bg-cyan-600 rounded' 
                    disabled={loading}>{loading ? "Loading..." : "Create Entry"}</button>
            </section>
        </form>
    )
}
