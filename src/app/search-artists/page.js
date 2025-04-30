'use client';
import Layout from '@/components/Layout/Layout';
import { useState, useEffect } from 'react';
import {
    PencilIcon,
    TrashIcon
  } from "@heroicons/react/24/solid";

export default function ArtistsList() {
    const [artists, setArtists] = useState([]);

    const handleDelete = async (artistId) => {
        if (!confirm('Tem certeza que deseja excluir este artista?')) {
            return;
        }

        try {
            const response = await fetch('/api/artists', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: artistId }),
            });

            if (response.ok) {
                alert('Artista excluído com sucesso!');
                // Refresh the artists list
                const updatedResponse = await fetch('/api/artists');
                const updatedData = await updatedResponse.json();
                setArtists(updatedData);
            } else {
                const data = await response.json();
                alert(data.message || 'Erro ao excluir artista');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao excluir artista');
        }
    };

    const handleEdit = async (artistId) => {
        try {
            const response = await fetch('/api/artists', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: artistId,
                    name: prompt('Digite o novo nome do artista:')
                }),
            });

            if (response.ok) {
                alert('Artista atualizado com sucesso!');
                const updatedResponse = await fetch('/api/artists');
                const updatedData = await updatedResponse.json();
                setArtists(updatedData);
            } else {
                const data = await response.json();
                alert(data.message || 'Erro ao atualizar artista');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao atualizar artista');
        }
    };

    useEffect(() => {
        async function fetchArtists() {
            const response = await fetch('/api/artists');
            const data = await response.json();
            console.log(data);
            setArtists(data);
        }
        fetchArtists();
    }, []);

    return (
        <Layout>
            <h1>Artistas</h1>
            <ul>
                {artists.map(artist => (
                    <li key={artist.id} className="flex flex-row p-2">
                        <span>
                            {artist.name} - {artist.email} 
                        </span>
                        <span 
                            className="px-1 py-1 mx-2 cursor-pointer border-2 border-solid border-blue-900 rounded hover:bg-blue-100"
                            onClick={() => handleEdit(artist.id)}
                        >
                            <PencilIcon className="w-4 h-4 mx-1 lg:w-4 lg:h-4 text-blue-900  hover:text-blue-600 " />
                        </span>
                        <span 
                            className="px-1 py-1 mx-2 cursor-pointer border-2 border-solid border-blue-900 rounded hover:bg-blue-100"
                            onClick={() => handleDelete(artist.id)}
                        >
                            <TrashIcon className="w-4 h-4 mx-1 lg:w-4 lg:h-4 text-blue-900  hover:text-blue-600 " />
                        </span>

                    </li>
                    // <li key={artist.id}>{artist.name} - {artist.email} - <PencilIcon className="flex items-center w-2 h-4 lg:w-6 lg:h-6" /></li>
                ))}
            </ul>
        </Layout>
    );
}