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
                const updatedResponse = await fetch('/api/artists');
                const updatedData = await updatedResponse.json();
                setArtists(updatedData.artists || []);
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
                setArtists(updatedData.artists || []);
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
            try {
                const response = await fetch('/api/artists');
                const data = await response.json();
                setArtists(data.artists || []);
            } catch (error) {
                console.error('Erro ao carregar artistas:', error);
                setArtists([]);
            }
        }
        fetchArtists();
    }, []);

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8 text-gray-800">Artistas</h1>
                <h1 className="text-md font-bold mb-8 text-gray-800">Evento de 16/05/2025</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {artists && artists.length > 0 ? (
                        artists.map(artist => (
                            <div key={artist.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                                <div className="flex flex-col space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-xl font-semibold text-gray-800">{artist.name}</h2>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleEdit(artist.id)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200"
                                                title="Editar"
                                            >
                                                <PencilIcon className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(artist.id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200"
                                                title="Excluir"
                                            >
                                                <TrashIcon className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="text-gray-600">
                                        <p className="flex items-center">
                                            <span className="font-medium">Email:</span>
                                            <span className="ml-2">{artist.email}</span>
                                        </p>
                                        <p className="flex items-center mt-2">
                                            <span className="font-medium">Disponibilidade:</span>
                                            <span className="ml-2">
                                                {artist.disponibilidade === "1" ? 'Sim' : 
                                                 artist.disponibilidade === "2" ? 'Não' :  'A confirmar'}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-500">
                            Nenhum artista encontrado
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}