import Link from "next/link"
import {
    MagnifyingGlassIcon,
    CubeIcon,
    UserIcon,
  } from "@heroicons/react/24/solid";

export default function  SiderMenu() {

    const menuItems = [
        { icon: MagnifyingGlassIcon, text: "Procurar artistas", url: "/search-artists" },
        { icon: UserIcon, text: "Cadastrar artista", url: "/artists" },
    ];

    return (
        <menu className="flex min-h-screen">
            <nav className="bg-blue-900 flex flex-col justify-between w-16 lg:w-64 p-2 lg:p-4 transition-all duration-300 fixed h-full">
                <div className="m-2 p-2 border-b-2 border-solid border-white">
                    <Link id="sidebar-logo" href="/" className="flex items-center text-white">
                        <CubeIcon className="w-6 h-6" />
                        <span className="hidden lg:inline-block ml-2">app logo</span>
                    </Link>
                </div>
                <ul className="flex flex-col gap-2 lg:gap-4 flex-1 items-justify m-5">
                    {menuItems.map((item, index) => (
                        <li key={index} className="p-1">
                            <Link href={item.url} className="flex items-center p-1 text-white rounded hover:bg-stone-800 p-2 transition-colors">
                                <item.icon className="w-4 h-4 lg:w-6 lg:h-6" />
                                <span className="hidden lg:inline-block ml-2">
                                    {item.text}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
                <footer className="flex flex-col text-center text-white mt-auto pt-4">
                    <div className="text-sm">{new Date().getFullYear()}</div>
                    <a href="https://github.com/letxns" target="_blank" className="text-xs hover:text-slate-950">
                        Developed by @letxns
                    </a>
                </footer>
            </nav>
        </menu>
    )
}