import React, { useState } from 'react';
import { UseFormRegister, FieldValues, Path, UseFormSetValue } from "react-hook-form";
import './Rating.scss';

interface FormRatingProps {
  register: UseFormRegister<FieldValues>,
  setValue: UseFormSetValue<FieldValues>,
  inputKey: string,
  label: string;
  required?: boolean
}

interface RatingProps {
  rating: number;
  formRatingProps?: FormRatingProps,
}

export const Rating: React.FC<RatingProps> = ({ rating, formRatingProps }) => {
  const [currentRating, setCurrentRating] = useState(rating);
  const [selectedRating, setSelectedRating] = useState(rating);
  const validRating = Math.min(Math.max(currentRating, 0), 10);

  return (
    <>
      <label  className={"block text-gray-500 font-bold " + (formRatingProps?.required ? "required" : "")}  htmlFor={formRatingProps?.inputKey}>{formRatingProps?.label}</label>
      <section className="flex flex-row">
        {[...Array(10)].map((_, index) => (
          <div 
            key={`rating_container_${index}`}
            onMouseEnter={() => {
                if(formRatingProps) {
                  setCurrentRating(Math.min(Math.max(index+1, 0), 10))
              }}
            }
            onMouseLeave={() => {
              if(formRatingProps) {
                setCurrentRating(selectedRating ?? 0 );
              }}
            }
            onClick={() => {
              if(formRatingProps) {
                let clickedRating = Math.min(Math.max(index+1, 0), 10);
                setSelectedRating(clickedRating);
                formRatingProps.setValue(formRatingProps?.inputKey, clickedRating);
              }}
            } 
            name={formRatingProps?.inputKey}
            {...formRatingProps?.register(formRatingProps?.inputKey, { 
              required: formRatingProps?.required ?? false, 
               value: selectedRating,
               validate: {
                positive: v => parseInt(v) >= 0,
                lessOrEqualsToTen: v => parseInt(v) <= 10
              }})} >

            <svg 
              className="inline" 
              key={`rating_${index}`} 
              viewBox="0 0 24 24" 
              width="24" 
              height="24" 
              stroke={ (currentRating > 0) ? "#f8c102" : "#e3e3e3" } 
              strokeWidth="2" 
              fill={ index < validRating ? '#f8c102' : 'none'} 
              strokeLinecap="round" 
              strokeLinejoin="round" >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </div>
        ))}
      </section>
    </> 
  );
};
