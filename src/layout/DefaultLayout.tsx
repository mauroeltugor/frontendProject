import { Link } from "react-router-dom";
import Signup from '../routes/signup';
import Home from '../routes/Home';
import React from "react";

interface DefaultLayoutProps {
    children: React.ReactNode,
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
    return (
        <>
            <header className="principal">
                <div className="container-pri">
                    <a href="#" className="inicio">
                        Parking<span className="span">Location.</span>{" "}
                    </a>
                </div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/Home">Home</Link>
                        </li>
                        <li>
                            <Link to="/signup">Signup</Link>
                        </li>
                        <li>
                            <Link to="/ContactUs">Contactos</Link>
                        </li>
                        <li>
                            <Link to="/dashboard">Login</Link>
                        </li>

                    </ul>
                </nav>
            </header>
            <main>
                {children}
            </main>

        </>
    )

}