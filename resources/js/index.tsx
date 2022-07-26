import React from "react";
import ReactDOM from "react-dom/client";
//import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import IndexPage from "./pages/index";
import LoginPage from "./pages/login";
import EditorPage from "./pages/editor";
import PlayerPage from "./pages/player";
import HomePage from "./pages/home";
import LibrariesPage from "./pages/libraries";
import ConfigPage from "./pages/config";
import UploadPage from "./pages/upload";

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
                <Route path="/player/:uuid" element={<PlayerPage />}></Route>
                <Route path="/libraries" element={<LibrariesPage />}></Route>
                <Route path="/config" element={<ConfigPage />}></Route>
                <Route path="/upload" element={<UploadPage />}></Route>
            </Routes>
        </div>
    </BrowserRouter>
);
