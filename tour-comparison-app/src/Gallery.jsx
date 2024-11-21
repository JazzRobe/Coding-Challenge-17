import React, {useEffect,useState} from "react";

const Gallery = () => {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState([]);
    const [error, setError] = useState([]);
    //initializing states to be able to manage api data

    useEffect(() => {
        const fetchTours = async () => {
            try {
                const response = await fetch("https://course-api.com/react-tours-project");
                if (!response.ok) throw new Error("Response not ok");
                //fetching and checing for errors
                const data = await response.json();
                //convert to json format
                setTours(data);                
            } catch (error) {
                setError(true);
                //catch any errors, set error value to true
            } finally {
                setLoading(false);
                //at the end, set loading value to false
            }
        };
        fetchTours();
    }, []);

    const removeTour = (id) => setTours(tours.filter((tour) => tour.id !== id));
    //remove a tour if not interested using .filter 

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading tours.</p>;
    //set a loading screen using the previous setLoading and setError

    return (
        <div className="gallery">
            {tours.map((tour) => (
                <div className="tour-card" key={tour.id}>
                    <img src={tour.image} alt={tour.name} />
                    <h2>{tour.name}</h2>
                    <p>${tour.price}</p>
                    <p>
                        {tour.description.length > 100 ? (
                            <>
                               {tour.descripion.slice(0,100)}...
                               <button onClick={() => alert("Toggle descriptoin")}>
                                Read More
                               </button>
                            </>
                        ) : (
                            tour.descripion
                        )}
                    </p>
                    <button onClick={() => removeTour(tour.id)}>Not Interested</button>
                </div>
            ))}
        </div>
    );
}; 
//displays each tour using .map
//adds a read more button to toggle descriptions longer than 100 characters
//adds a not interested button to remove the tour, using id

export default Gallery;