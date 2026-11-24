import React, { useMemo, useState } from "react";
import {
  Star,
  MessageSquare,
  TrendingUp,
} from "lucide-react";

import PriestLayout from "../components/PriestLayout";
import { getPriestData } from "../utils/priestStore";

export default function PriestReviews() {
  const [data] = useState(getPriestData());

  const reviews = data.reviews;

  const averageRating = useMemo(() => {
    if (!reviews.length) return 0;

    return (
      reviews.reduce(
        (sum, review) => sum + review.rating,
        0
      ) / reviews.length
    ).toFixed(1);
  }, [reviews]);

  const ratingCounts = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter(
      (review) => review.rating === rating
    ).length,
  }));

  return (
    <PriestLayout
      title="Reviews & Ratings"
      subtitle="See customer feedback about your services"
      profile={data.profile}
    >
      <div className="review-summary-grid">
        <div className="rating-main-card">
          <span>Overall Rating</span>

          <strong>{averageRating}</strong>

          <div className="stars">
            {[1, 2, 3, 4, 5].map((item) => (
              <Star
                key={item}
                size={22}
                fill={
                  item <= Math.round(averageRating)
                    ? "currentColor"
                    : "none"
                }
              />
            ))}
          </div>

          <p>
            Based on {reviews.length} recent reviews
          </p>
        </div>

        <div className="priest-card rating-breakdown">
          <h2>Rating Breakdown</h2>

          {ratingCounts.map((item) => (
            <div
              className="rating-line"
              key={item.rating}
            >
              <span>{item.rating} ★</span>

              <div className="rating-bar">
                <div
                  style={{
                    width: `${
                      reviews.length
                        ? (item.count / reviews.length) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>

              <small>{item.count}</small>
            </div>
          ))}
        </div>

        <div className="priest-card review-performance">
          <TrendingUp size={30} />

          <h2>Great Performance</h2>

          <p>
            Keep maintaining your service quality to
            receive more bookings.
          </p>
        </div>
      </div>

      <div className="priest-card">
        <div className="priest-card-title">
          <div>
            <h2>Customer Reviews</h2>
            <p>Recent feedback from your customers.</p>
          </div>
        </div>

        <div className="reviews-list">
          {reviews.map((review) => (
            <div
              className="review-item"
              key={review.id}
            >
              <div className="review-avatar">
                {review.customer.charAt(0)}
              </div>

              <div className="review-content">
                <div className="review-top">
                  <div>
                    <strong>{review.customer}</strong>
                    <span>{review.service}</span>
                  </div>

                  <small>{review.date}</small>
                </div>

                <div className="review-stars">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <Star
                      key={item}
                      size={15}
                      fill={
                        item <= review.rating
                          ? "currentColor"
                          : "none"
                      }
                    />
                  ))}
                </div>

                <p>{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="review-tip">
        <MessageSquare size={19} />
        <span>
          Customer reviews help build trust and improve
          your visibility on PoojaMitra.
        </span>
      </div>
    </PriestLayout>
  );
}