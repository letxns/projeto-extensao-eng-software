import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(){
    const artists = await prisma.user.findMany();
    return NextResponse.json(artists)
}

export async function POST(request){
    const { name, email, disponibilidade } = await request.json();
    if(!name || !email){
        return NextResponse.json({ message: "Nome e email são obrigatórios"}, { status: 400 } );
    }

    const artist = await prisma.user.findUnique({
        where: { email },
    })

    if(artist){
        return NextResponse.json({ message: "Artista já cadastrado"}, { status: 400 } );
    }
    
    await prisma.user.create({
        data: {
            name,
            email,
            disponibilidade
        }
    })

    return NextResponse.json({ message: "Artista cadastrado com sucesso"} );
}

export async function DELETE(request){
    const { id } = await request.json();

    const artist = await prisma.user.findUnique({
        where: { id },
    })

    if(!artist){
        return NextResponse.json({ message: "Artista não encontrado"}, { status: 404 } );
    }
    
    await prisma.user.delete({
        where: { id },
    })

    return NextResponse.json({ message: "Artista deletado com sucesso" });
}

export async function PUT(request){
    const { id, name, email } = await request.json();

    const artist = await prisma.user.findUnique({
        where: { id },
    })

    if(!artist){
        return NextResponse.json({ message: "Email não pode ser vazio"}, { status: 400 } );
    }

    await prisma.user.update({
        where: { id },
        data: {
            name,
            email
        }
    })

    return NextResponse.json({ message: "Cadastro do artista atualizado com sucesso" });
}