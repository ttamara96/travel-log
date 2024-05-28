import React, {useState}  from 'react';
import { useForm, SubmitHandler } from "react-hook-form"

import { createLogEntry } from '../API';

interface LogEntryFormProps {
    location: MarkerLocation,
    onClose: Function
  }

const LogEntryForm: React.FC<LogEntryFormProps> = ({ location, onClose }) => {
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

    return (
        <form className="entry-form" onSubmit={handleSubmit(onSubmit)}>
            { error &&  <h3 className='error'>{error}</h3> }

            <label htmlFor="title">Title</label>
            <input  {...register('title', { required: true })} name="title"  />

            <label htmlFor="comments">Comments</label>
            <textarea rows={3} {...register('comments')} name="comments" />

            <label htmlFor="description">Description</label>
            <textarea rows={3}  {...register('description')} name="description" />

            <label htmlFor="image">Image</label>
            <input {...register('image')} name="image"/>

            <label htmlFor="visitDate">Visit Date</label>
            <input type='date'  {...register('visitDate', { required: true })} name="visitDate" />
            <button disabled={loading}>{loading ? "Loading..." : "Create Entry"}</button>
        </form>
    )
}

export default LogEntryForm;