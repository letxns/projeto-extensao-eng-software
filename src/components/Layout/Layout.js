import SiderMenu from "../SiderMenu/SiderMenu";

export default function Layout({ children }) {
    return (
        <main className="flex min-h-screen">
            <SiderMenu />
            <section className="flex-1 p-4 bg-gray-100 ml-16 lg:ml-64">
                {children}
            </section>
        </main>
    );
}