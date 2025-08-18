import React, { useState, useEffect } from 'react';
import style from './ImageCarousel.module.css';

// ImageCarousel component

interface ImageCarouselProps {
    images: string[];
    interval?: number;
    className?: string;
}

export const ImageCarouselComponent: React.FC<ImageCarouselProps> = ({
    images,
    interval,
    className,
}) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [autoPlay, setAutoPlay] = useState(true);
    const autoPlayInterval = interval || 3000;

    const nextImage = () => {
        setCurrentImage(state => (state + 1) % images.length);
    };
    const prevImage = () => {
        setCurrentImage(state => (state - 1 + images.length) % images.length);
    };


    useEffect(() => {
        if (!autoPlay) return;

        const timer = setInterval(() => {
            setCurrentImage(state => (state + 1) % images.length);
        }, autoPlayInterval);

        return () => clearInterval(timer);
    }, [autoPlay, autoPlayInterval, images.length]);


    return (
        <div 
            className={`${style.ImageCarouselComponentCarousel} ${className}`}
            onMouseEnter={() => setAutoPlay(false)}
            onMouseLeave={() => setAutoPlay(true)}
            >
            <img
                src={images[currentImage]}
                alt={`Slide ${currentImage + 1}`}
                className={style.ImageCarouselComponentCarouselImage}
            />
            <div className={style.controls}>
                <button
                    onClick={nextImage}
                    className={style.ImageCarouselComponentPrevButton}
                >
                    {'<'}
                </button>
                <button
                    onClick={prevImage}
                    className={style.ImageCarouselComponentNextButton}
                >
                    {'>'}
                </button>
            </div>
        </div>
    )
}

/*

USE EXAMPLE:

// 1. Photo import:
// import img1 from './assets/images/photo1.jpg';
// import img2 from './assets/images/photo2.jpg';
// import img3 from './assets/images/photo3.jpg';
// 
// export const LocalCarousel = () => {
//   const images = [img1, img2, img3];
// 
//   return (
//     <div style={{ maxWidth: '600px', margin: '0 auto' }}>
//       <h2>Local Images Carousel</h2>
//       <ImageCarouselComponent images={images} interval={3000} />
//     </div>
//   );
// };

// 2. URL import: 
// export const UrlCarousel = () => {
//   const images = [
//     'https://www.placecats.com/400/300?1',
//     'https://www.placecats.com/400/300?2',
//     'https://www.placecats.com/400/300?3',
//   ];
// 
//   return (
//     <div style={{ maxWidth: '600px', margin: '0 auto' }}>
//       <h2>URL Images Carousel</h2>
//       <ImageCarouselComponent images={images} interval={2500} />
//     </div>
//   );
// };

// 3. Api fetch:
// export const ApiCarousel = () => {
//   const [images, setImages] = useState<string[]>([]);
// 
//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         const res = await fetch('https://example.com/api/images');
//         const data = await res.json();
//         const urls = data.map((item: { url: string }) => item.url);
//         setImages(urls);
//       } catch (err) {
//         console.error('Failed to fetch images', err);
//       }
//     };
// 
//     fetchImages();
//   }, []);
// 
//   if (images.length === 0) return <p>Loading images...</p>;
// 
//   return (
//     <div style={{ maxWidth: '600px', margin: '0 auto' }}>
//       <h2>API Images Carousel</h2>
//       <ImageCarouselComponent images={images} interval={3000} />
//     </div>
//   );
// };

*/