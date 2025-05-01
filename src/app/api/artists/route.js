import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page')) || 1;
        const search = searchParams.get('search') || '';
        const itemsPerPage = 9;

        // Construir a query de busca
        const where = search ? {
            OR: [
                { name: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } }
            ]
        } : {};

        // Contar total de registros
        const total = await prisma.user.count({ where });

        // Buscar artistas com paginação
        const artists = await prisma.user.findMany({
            where,
            skip: (page - 1) * itemsPerPage,
            take: itemsPerPage,
            orderBy: { name: 'asc' }
        });

        return NextResponse.json({
            artists,
            total,
            currentPage: page,
            totalPages: Math.ceil(total / itemsPerPage)
        });
    } catch (error) {
        console.error('Erro ao buscar artistas:', error);
        return NextResponse.json(
            { message: "Erro ao buscar artistas" },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const { name, email, disponibilidade } = await request.json();
        
        if (!name || !email) {
            return NextResponse.json(
                { message: "Nome e email são obrigatórios" },
                { status: 400 }
            );
        }

        const artist = await prisma.user.findUnique({
            where: { email },
        });

        if (artist) {
            return NextResponse.json(
                { message: "Artista já cadastrado" },
                { status: 400 }
            );
        }
        
        const newArtist = await prisma.user.create({
            data: {
                name,
                email,
                disponibilidade
            }
        });

        return NextResponse.json(
            { message: "Artista cadastrado com sucesso", artist: newArtist }
        );
    } catch (error) {
        console.error('Erro ao criar artista:', error);
        return NextResponse.json(
            { message: "Erro ao criar artista" },
            { status: 500 }
        );
    }
}

export async function DELETE(request) {
    try {
        const { id } = await request.json();

        const artist = await prisma.user.findUnique({
            where: { id },
        });

        if (!artist) {
            return NextResponse.json(
                { message: "Artista não encontrado" },
                { status: 404 }
            );
        }
        
        await prisma.user.delete({
            where: { id },
        });

        return NextResponse.json(
            { message: "Artista deletado com sucesso" }
        );
    } catch (error) {
        console.error('Erro ao deletar artista:', error);
        return NextResponse.json(
            { message: "Erro ao deletar artista" },
            { status: 500 }
        );
    }
}

export async function PUT(request) {
    try {
        const { id, name } = await request.json();

        if (!name) {
            return NextResponse.json(
                { message: "Nome não pode ser vazio" },
                { status: 400 }
            );
        }

        const artist = await prisma.user.findUnique({
            where: { id },
        });

        if (!artist) {
            return NextResponse.json(
                { message: "Artista não encontrado" },
                { status: 404 }
            );
        }

        const updatedArtist = await prisma.user.update({
            where: { id },
            data: { name }
        });

        return NextResponse.json({
            message: "Cadastro do artista atualizado com sucesso",
            artist: updatedArtist
        });
    } catch (error) {
        console.error('Erro ao atualizar artista:', error);
        return NextResponse.json(
            { message: "Erro ao atualizar artista" },
            { status: 500 }
        );
    }
}