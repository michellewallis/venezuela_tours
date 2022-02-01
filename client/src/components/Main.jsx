import { useEffect, useState } from 'react';
import axios from 'axios';
import TourList from "./TourList";

const Main = () => {
//States 
const [tours, setTours] = useState([]);

    // useEffect hook
    useEffect(()=>{
        const getTours = async () =>{
            const url = '/api/v1/tours';
            const results = await axios.get(url);
            console.log(results.data.data.tours)

            setTours(results.data.data.tours)
        };
        getTours();
    }, []);



    return (
        <main className="main">
            <h2>Tours</h2>
            <section className="tour__container">
                <TourList/>
            </section>
        </main>
    );
};

export default Main;
