import React, { useState } from "react"; 
import style from "./StarRating.module.css";

interface StarRatingProps {
    starRating?: number;
    className?: string; 
    disabled: boolean;
}

export const StarRatingComponent: React.FC<StarRatingProps> = ({
    starRating,
    className,
    disabled,
}) => {
    const [rating, setRating] = useState<number>(starRating || 0)
    const [hover, setHover] = useState(0);

    return(
        <div className={`${style.StarRatingComponentWrapperDiv} ${className}`}>
           {[1, 2, 3, 4, 5].map(i => (
            <button
                key={i}
                onClick={() => !disabled && setRating(i)}
                onMouseEnter={() => setHover(i)}       
                onMouseLeave={() => setHover(0)} 
                className={i <= (hover || rating) ? style.StarRatingComponentHighlight : style.StarRatingComponentNormal}
                disabled={disabled}
            >
                ★
            </button>
            ))}
        </div>
    )
}

/*
USE EXAMPLES:

// 1. Simple standalone rating:
// <StarRatingComponent/>
// 
// 2. Product review system (parent-controlled rating):
// interface Product {
//   id: number;
//   name: string;
//   userRating: number;
// }

// const ProductReview = () => {
//   const [product, setProduct] = useState<Product>({ id: 1, name: "Coffee Maker", userRating: 0 });
// 
//   return (
//     <div>
//       <h3>{product.name}</h3>
//       <StarRatingComponent
//         starRating={product.userRating}
//         className="my-star-rating"
//         onRatingChange={(newRating) => setProduct(prev => ({ ...prev, userRating: newRating }))}
//       />
//       <p>Your rating: {product.userRating}</p>
//     </div>
//   );
// }

// 3. Display average rating:
// const averageRating = 4.2;
// <StarRatingComponent starRating={Math.round(averageRating)} disabled={true} />

*/
