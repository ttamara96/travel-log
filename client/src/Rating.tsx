import React, {Fragment} from 'react';

interface RatingProps {
  rating: number;
}

const Rating: React.FC<RatingProps> = ({ rating }) => {
  const validRating = Math.min(Math.max(rating, 0), 10);

  return (
    <section className="flex flex-row my-4">
      {[...Array(10)].map((_, index) => (
        <svg className="inline" key={`rating_${index}`} viewBox="0 0 24 24" width="24" height="24" stroke="#f8c102" strokeWidth="2" fill={index < validRating ? '#f8c102' : 'none'} strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      ))}
    </section>
  );
};

export default Rating;