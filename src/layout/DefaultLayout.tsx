
import React from "react";
import { Header }  from "../components/Header";
import Footer from "../components/Footer";


interface DefaultLayoutProps {
    children: React.ReactNode,
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
    return (
        <>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </>
    )

}