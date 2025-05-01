'use client';

import { useState } from 'react';
import Layout from './Layout/Layout';

export default function ArtistForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        disponibilidade: '3'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        console.log(e);
        
        try {
            const response = await fetch('/api/artists', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Artista cadastrado com sucesso!');
            } else {
                const data = await response.json();
                alert(data.message || 'Erro ao cadastrar artista');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao cadastrar artista');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <Layout>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Cadastro de Artista</h2>
                
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                        Nome
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label 
                        htmlFor="email" 
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                        Disponibilidade
                    </label>
                    <select
                        type="disponibilidade"
                        htmlFor="disponibilidade"
                        name="disponibilidade"
                        value={formData.disponibilidade}
                        onChange={handleChange}
                        required
                    >
                        <option value="1">Sim</option>
                        <option value="2">Não</option>
                        <option value="3" defaultValue>A confirmar</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Cadastrar
                </button>
            </form>
        </Layout>
    );
} 