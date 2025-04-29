import { NextResponse } from "next/server";

const users = []

export async function GET(){
    return NextResponse.json(users)
}

export async function POST(request){
    const { name } = await request.json();
    const user = users.find((user) => user.name === name);

    if(user){
        return NextResponse.json({ message: "Artista já cadastrado"}, { status: 400 } );
    }

    users.push({ id: users.length + 1, name });
    return NextResponse.json({ message: "Artista cadastrado com sucesso" });
}

export async function DELETE(request){
    const { id } = await request.json();
    const numberId = Number(id);
    const user = users.find((user) => user.id === numberId);

    if(!user){
        return NextResponse.json({ message: "Artista não encontrado"}, { status: 404 } );
    }

    const index = users.findIndex((user) => user.id === numberId);
    users.splice(index, 1);
    return NextResponse.json({ message: "Artista deletado com sucesso" });
}

export async function PUT(request){
    const { id, name } = await request.json();
    const numberId = Number(id);
    const user = users.find((user) => user.id === numberId);

    if(!user){
        return NextResponse.json({ message: "Artista não encontrado"}, { status: 404 } );
    }

    user.name = name;
    return NextResponse.json({ message: "Cadastro do artista atualizado com sucesso" });
}