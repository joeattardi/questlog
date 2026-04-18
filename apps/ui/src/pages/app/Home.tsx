import { useEffect } from 'react';
import classes from './Home.module.css';

export default function Home() {
    useEffect(() => {
        fetch('/api/games')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error('Error fetching games:', error);
            });
    }, []);

    return (
        <div className={classes.container}>
           
        </div>
    );
}
