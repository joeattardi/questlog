import { useEffect, useState } from 'react';

export function App() {
    const [message, setMessage] = useState<string>('Loading...');

    useEffect(() => {
        fetch('/api/hello')
            .then((res) => res.json() as Promise<{ message: string }>)
            .then((data) => setMessage(data.message))
            .catch(() => setMessage('Failed to reach backend'));
    }, []);

    return (
        <main>
            <h1>Questlog</h1>
            <p>Backend says: {message}</p>
        </main>
    );
}
