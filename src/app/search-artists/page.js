'use client';
import Layout from '@/components/Layout/Layout';
import { useState, useEffect } from 'react';

export default function ArtistsList() {
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        async function fetchArtists() {
            const response = await fetch('/api/artists');
            const data = await response.json();
            setArtists(data);
        }
        fetchArtists();
    }, []);

    return (
        <Layout>
            <h1>Artistas</h1>
            <ul>
                {artists.map(artist => (
                    <li key={artist.id}>{artist.name}</li>
                ))}
            </ul>
        </Layout>
    );
}