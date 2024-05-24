import React, {useState}  from 'react';
import { useForm, SubmitHandler } from "react-hook-form"

import { createLogEntry } from './API';

const LogEntryForm = ({ location, onClose }) => {
    const [loading, setLoading ] = useState(false);
    const [error, setError ] = useState("");

    const {
        register,
        handleSubmit
      } = useForm();
      const onSubmit = async (data) => {
        try {
            setLoading(true);
            data.latitude = location.latitude;
            data.longitude = location.longitude;
            const created = await createLogEntry(data);
            onClose();
        } catch (error) {
            console.error(error);
            setError(error.message);
            setLoading(false);
        }
    };

    return (
        <form className="entry-form" onSubmit={handleSubmit(onSubmit)}>
            { error &&  <h3 className='error'>{error}</h3> }

            <label htmlFor="title">Title</label>
            <input name="title"  {...register('title', { required: true })}/>

            <label htmlFor="comments">Comments</label>
            <textarea name="comments" rows={3} {...register('comments')}/>

            <label htmlFor="description">Description</label>
            <textarea name="description" rows={3}  {...register('description')} />

            <label htmlFor="image">Image</label>
            <input name="image" {...register('image')}/>

            <label htmlFor="visitDate">Visit Date</label>
            <input name="visitDate" type='date'  {...register('visitDate', { required: true })} />
            <button disabled={loading}>{loading ? "Loading..." : "Create Entry"}</button>
        </form>
    )
}

export default LogEntryForm;