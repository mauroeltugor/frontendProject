
import React from "react";
// import { Header } from "../components/Header.jsx"; // Assuming Header is in a .jsx file

interface DefaultLayoutProps {
    children: React.ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
    return (
        <>
            {/* <Header /> */}
            <main>
                {children}
            </main>
        </>
    );
};

export default DefaultLayout;

