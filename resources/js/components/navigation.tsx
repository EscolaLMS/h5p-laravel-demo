import React, { useState, useEffect, useCallback } from "react";

import { Routes, Route, NavLink, Outlet, useNavigate } from "react-router-dom";
import { userMe } from "../services";

const LANGS = {
    en: {
        logout: "Logout",
        welcome: "h5p-laravel demo",
        login: "Login",
        contentList: "Content List",
        createNewElement: "Create New Element",
        libraries: "Libraries",
        config: "Config",
        uploadNew: "Upload New",
    },
    pl: {
        login: "Zaloguj",
        contentList: "Lista zawartości",
        createNewElement: "Utwórz nowy element",
        libraries: "Biblioteki",
        config: "Konfiguracja",
        uploadNew: "Wgraj nowy",
    },
};

const getLangItem = (key: string) => {
    const lang = localStorage.getItem("lang") || "en";
    return LANGS[lang][key] || LANGS["en"][key];
};

const navlinkStyle = ({ isActive }) =>
    isActive ? { textDecoration: "underline" } : {};

export const Navigation = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(false);
    const [loggedIn, setLoggedIn] = useState(
        window.localStorage.getItem("token") !== null
    );
    const [lang, setLang] = useState(
        window.localStorage.getItem("lang") || "en"
    );

    const logout = () => {
        window.localStorage.removeItem("token");
        window.dispatchEvent(new Event("storageLocal"));
        navigate("/", { replace: true });
    };

    const changeLang = useCallback((lang: string) => {
        setLang(lang);
        window.localStorage.setItem("lang", lang);
        window.location.reload();
    }, []);

    useEffect(() => {
        const onStorage = () => {
            if (window.localStorage.getItem("token") !== null) {
                setLoading(true);
                userMe()
                    .then((response) => {
                        if (response.ok) {
                            setLoggedIn(true);
                        } else {
                            logout();
                        }
                    })
                    .catch((error) => {
                        logout();
                    })
                    .finally(() => {
                        setLoading(false);
                    });
                setLoggedIn(true);
            } else {
                setLoggedIn(false);
            }
        };
        window.addEventListener("storage", onStorage);
        window.addEventListener("storageLocal", onStorage);
        onStorage();
        return () => {
            window.removeEventListener("storage", onStorage);
            window.removeEventListener("storageLocal", onStorage);
        };
    }, []);
    return (
        <header className="pure-u-1-1">
            <h1>{getLangItem("welcome")}</h1>

            {loading && <p>loading...</p>}
            {loggedIn ? (
                <nav
                    className="pure-menu pure-menu-horizontal"
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <ul className="pure-menu-list">
                        <li className="pure-menu-item">
                            <NavLink
                                style={navlinkStyle}
                                className="pure-menu-link"
                                to="index"
                            >
                                {getLangItem("contentList")}
                            </NavLink>
                        </li>
                        <li className="pure-menu-item">
                            <NavLink
                                style={navlinkStyle}
                                className="pure-menu-link"
                                to="editor/new"
                            >
                                {getLangItem("createNewElement")}
                            </NavLink>
                        </li>
                        <li className="pure-menu-item">
                            <NavLink
                                style={navlinkStyle}
                                className="pure-menu-link"
                                to="libraries"
                            >
                                {getLangItem("libraries")}
                            </NavLink>
                        </li>
                        <li className="pure-menu-item">
                            <NavLink
                                style={navlinkStyle}
                                className="pure-menu-link"
                                to="config"
                            >
                                {getLangItem("config")}
                            </NavLink>
                        </li>
                        <li className="pure-menu-item">
                            <NavLink
                                style={navlinkStyle}
                                className="pure-menu-link"
                                to="upload"
                            >
                                {getLangItem("uploadNew")}
                            </NavLink>
                        </li>
                        <li className="pure-menu-item">
                            <NavLink
                                style={navlinkStyle}
                                className="pure-menu-link"
                                to="/"
                                onClick={logout}
                            >
                                {getLangItem("logout")}
                            </NavLink>
                        </li>
                    </ul>
                    <form className="pure-form">
                        <label>Lang: </label>

                        <select
                            value={lang}
                            onChange={(e) => changeLang(e.target.value)}
                        >
                            <option value="en">en</option>
                            <option value="pl">pl</option>
                        </select>
                    </form>
                </nav>
            ) : (
                <nav className="pure-menu pure-menu-horizontal">
                    <li className="pure-menu-item">
                        <NavLink
                            className="pure-menu-link"
                            style={navlinkStyle}
                            to="login"
                        >
                            {getLangItem("login")}
                        </NavLink>
                    </li>
                </nav>
            )}
            <hr />
        </header>
    );
};

export default Navigation;
