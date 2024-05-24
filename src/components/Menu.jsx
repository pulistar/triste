import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
    return (
        <header className="flex justify-end mr-4">
            <div>
                <Link to='/'>
                    <h1 className="my-4 text-6xl font-extrabold  md:text-left">
                        <span className="hidden md:inline">Salud</span>
                        <span className="text-blue-600">Bienestar</span>
                    </h1>
                </Link>
            </div>
        </header>
    );
}

export default Menu;