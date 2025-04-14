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
                         <h2>Hotel List</h2>
            <ul>
                {places.map((place) => (
                    
                    <div className='max-w-screen grid grid-cols-4 p-4 '>
                    <li key={place.id}>{place.tile}</li> 
                    <img src={place.image_url} className='w-[200px] h-[150px]'></img>
                    </div>
                ))}
            </ul>
                        
                </div>
        );
};

export default Home;