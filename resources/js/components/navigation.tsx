import React, { useState, useEffect, useCallback } from "react";

import { Routes, Route, Link, Outlet } from "react-router-dom";

export const Navigation = () => {
    const [loggedIn, setLoggedIn] = useState(
        window.localStorage.getItem("token") !== null
    );
    const [lang, setLang] = useState(
        window.localStorage.getItem("lang") || "en"
    );

    const logout = () => {
        window.localStorage.removeItem("token");
    };

    const changeLang = useCallback((lang: string) => {
        setLang(lang);
        window.localStorage.setItem("lang", lang);
    }, []);

    useEffect(() => {
        const onStorage = () => {
            if (window.localStorage.getItem("token") !== null) {
                setLoggedIn(true);
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
        <div>
            <h1>Welcome to the h5p demo</h1>
            Lang:{" "}
            <select value={lang} onChange={(e) => changeLang(e.target.value)}>
                <option value="en">en</option>
                <option value="pl">pl</option>
            </select>
            {loggedIn ? (
                <nav>
                    <ul>
                        <li>
                            <a href="!logout" onClick={logout}>
                                Logout
                            </a>
                        </li>
                        <li>
                            <Link to="index">List</Link>
                        </li>
                        <li>
                            <Link to="editor/new">Create new element</Link>
                        </li>
                    </ul>
                </nav>
            ) : (
                <nav>
                    <li>
                        <Link to="login">Login</Link>
                    </li>
                </nav>
            )}
        </div>
    );
};

export default Navigation;
