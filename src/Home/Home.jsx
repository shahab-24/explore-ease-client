import React, { useEffect, useState } from 'react';

const Home = () => {
        const [places, setPlaces] = useState([])

        useEffect(() => {
                fetch('places.json')
                .then((res) => res.json())
                .then((data) => setPlaces(data))
        }, [])
        return (
                <div>
                        
                         <div className="w-full mx-auto mt-6">
      <div className="carousel w-full rounded-box">
        {places.map((place, index) => (
          <div
            id={`slide${index}`}
            className="carousel-item relative w-full"
            key={index}
          >
            <img
              src={place.image_url}
              className="w-full h-[500px] object-cover"
              alt={place.title}
            />
            <div className="absolute flex items-center h-full left-0 top-0 bg-gradient-to-r from-black to-transparent p-8">
              <div className="text-white space-y-4 max-w-lg">
                <h2 className="text-3xl md:text-4xl font-bold">{place.title}</h2>
                <p className="text-sm md:text-base">{place.description}</p>
              </div>
            </div>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-4 right-4 top-1/2">
              <a
                href={`#slide${(index - 1 + places.length) % places.length}`}
                className="btn btn-circle"
              >
                ❮
              </a>
              <a
                href={`#slide${(index + 1) % places.length}`}
                className="btn btn-circle"
              >
                ❯
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
                        
                </div>
        );
};

export default Home;