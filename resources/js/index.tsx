import React from "react";
import ReactDOM from "react-dom/client";
//import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import IndexPage from "./pages/index";
import LoginPage from "./pages/login";
import EditorPage from "./pages/editor";
import PlayerPage from "./pages/player";
import HomePage from "./pages/home";

import Navigation from "./components/navigation";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <BrowserRouter>
        <div className="pure-u">
            <Navigation />
            <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/index" element={<IndexPage />}></Route>
                <Route path="/login" element={<LoginPage />}></Route>
                <Route path="/editor/:id" element={<EditorPage />}></Route>
                <Route path="/player/:id" element={<PlayerPage />}></Route>
            </Routes>
        </div>
    </BrowserRouter>
);
