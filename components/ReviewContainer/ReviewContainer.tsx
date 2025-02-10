import { ReviewsTotal } from "@/app/movies/[id]/TitleTypes";
import React from "react";
import Review from "../Review/Review";

export default function ReviewContainer({
  reviews,
  showComments,
}: {
  reviews: ReviewsTotal;
  showComments: boolean;
}) {
  return (
    <ul
      className={`${
        showComments ? "flex" : "hidden"
      } h-auto w-full list-none flex-col items-center`}
    >
      {reviews.results?.map((review) => (
        <Review
          name={""}
          username={""}
          avatar_path={""}
          rating={null}
          key={review.id}
          {...review}
        />
      ))}
    </ul>
  );
}
