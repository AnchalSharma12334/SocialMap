import React, { useState } from 'react';
import { Star, MessageSquare } from 'lucide-react';
import { Review } from '../types';

interface ReviewSectionProps {
  reviews: Review[];
  studioId: string;
  onAddReview: (review: Omit<Review, 'id' | 'date'>) => void;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ reviews, studioId, onAddReview }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddReview({
      studioId,
      userId: 'user-1', // In a real app, this would come from auth
      userName: 'Guest User', // In a real app, this would come from auth
      rating,
      comment
    });
    setRating(5);
    setComment('');
    setIsFormOpen(false);
  };
  
  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / reviews.length;
  };
  
  const getRatingCounts = () => {
    const counts = [0, 0, 0, 0, 0];
    reviews.forEach(review => {
      counts[review.rating - 1]++;
    });
    return counts.reverse(); // 5 to 1 stars
  };
  
  const averageRating = getAverageRating();
  const ratingCounts = getRatingCounts();
  
  return (
    <div className="my-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Reviews</h2>
        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="bg-[#FF5A5F] text-white py-2 px-4 rounded-md hover:bg-[#FF4045] transition duration-300"
        >
          Write a Review
        </button>
      </div>
      
      {/* Review Stats */}
      {reviews.length > 0 && (
        <div className="flex flex-col md:flex-row gap-8 mb-8 p-4 bg-gray-50 rounded-lg">
          <div className="flex flex-col items-center justify-center">
            <div className="text-5xl font-bold">{averageRating.toFixed(1)}</div>
            <div className="flex mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={18}
                  className={`${
                    star <= Math.round(averageRating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <div className="text-gray-600 mt-1">{reviews.length} reviews</div>
          </div>
          
          <div className="flex-1">
            {[5, 4, 3, 2, 1].map((star, index) => (
              <div key={star} className="flex items-center mb-1">
                <div className="text-sm w-10">{star} star</div>
                <div className="w-full mx-2 bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-yellow-500 h-2.5 rounded-full"
                    style={{
                      width: `${reviews.length > 0 ? (ratingCounts[index] / reviews.length) * 100 : 0}%`,
                    }}
                  ></div>
                </div>
                <div className="text-sm w-8 text-right">{ratingCounts[index]}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Review Form */}
      {isFormOpen && (
        <div className="mb-8 p-6 border border-gray-200 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="text-2xl focus:outline-none"
                  >
                    <Star
                      size={28}
                      className={`${
                        star <= rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-[#FF5A5F] text-white py-2 px-4 rounded-md hover:bg-[#FF4045] transition duration-300"
            >
              Submit Review
            </button>
          </form>
        </div>
      )}
      
      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-200 pb-6">
              <div className="flex justify-between">
                <div className="font-medium">{review.userName}</div>
                <div className="text-gray-500 text-sm">{review.date}</div>
              </div>
              <div className="flex items-center mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    className={`${
                      star <= review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="mt-2 text-gray-700">{review.comment}</p>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-gray-500">
            <MessageSquare size={48} />
            <p className="mt-2">No reviews yet. Be the first to leave a review!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;