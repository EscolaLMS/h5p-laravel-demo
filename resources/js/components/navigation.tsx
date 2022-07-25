import React, { useState, useEffect, useCallback } from "react";

import { Routes, Route, NavLink, Outlet } from "react-router-dom";

const navlinkStyle = ({ isActive }) =>
    isActive ? { textDecoration: "underline" } : {};

export const Navigation = () => {
    const [loggedIn, setLoggedIn] = useState(
        window.localStorage.getItem("token") !== null
    );
    const [lang, setLang] = useState(
        window.localStorage.getItem("lang") || "en"
    );

    const logout = () => {
        window.localStorage.removeItem("token");
        window.dispatchEvent(new Event("storageLocal"));
    };

    const changeLang = useCallback((lang: string) => {
        setLang(lang);
        window.localStorage.setItem("lang", lang);
    }, []);

    useEffect(() => {
        const onStorage = () => {
            if (window.localStorage.getItem("token") !== null) {
                setLoggedIn(true);
            } else {
                setLoggedIn(false);
            }
        };
        window.addEventListener("storage", onStorage);
        window.addEventListener("storageLocal", onStorage);
        return () => {
            window.removeEventListener("storage", onStorage);
            window.removeEventListener("storageLocal", onStorage);
        };
    }, []);
    return (
        <header className="pure-u-1-1">
            <h1>Welcome to the h5p demo</h1>

            <form className="pure-form">
                <label>Lang of h5p interface: </label>

                <select
                    value={lang}
                    onChange={(e) => changeLang(e.target.value)}
                >
                    <option value="en">en</option>
                    <option value="pl">pl</option>
                </select>
            </form>
            <h2>Menu:</h2>
            {loggedIn ? (
                <nav className="pure-menu pure-menu-horizontal">
                    <ul className="pure-menu-list">
                        <li className="pure-menu-item">
                            <NavLink
                                style={navlinkStyle}
                                className="pure-menu-link"
                                to="/"
                                onClick={logout}
                            >
                                Logout
                            </NavLink>
                        </li>
                        <li className="pure-menu-item">
                            <NavLink
                                style={navlinkStyle}
                                className="pure-menu-link"
                                to="index"
                            >
                                List
                            </NavLink>
                        </li>
                        <li className="pure-menu-item">
                            <NavLink
                                style={navlinkStyle}
                                className="pure-menu-link"
                                to="editor/new"
                            >
                                Create new element
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            ) : (
                <nav className="pure-menu pure-menu-horizontal">
                    <li className="pure-menu-item">
                        <NavLink
                            className="pure-menu-link"
                            style={navlinkStyle}
                            to="login"
                        >
                            Login
                        </NavLink>
                    </li>
                </nav>
            )}
            <hr />
        </header>
    );
};

export default Navigation;
