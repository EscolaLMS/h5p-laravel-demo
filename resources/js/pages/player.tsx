import React, { useState, useEffect, useCallback } from "react";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
//import { Editor } from "@escolalms/h5p-react";
import { contentSettings } from "../services";
import {
    EditorSettings,
    H5PEditorContent,
    ContextlessPlayer as Player,
} from "@escolalms/h5p-react";

export const page = () => {
    const { id } = useParams<{ id: string }>();

    const [settings, setSettings] = useState<EditorSettings>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (id) {
            setLoading(true);
            contentSettings(id, localStorage.getItem("lang") || "en")
                .then((res) => res.json())
                .then((data) => {
                    setSettings(data.data);
                    setLoading(false);
                });
        }
    }, [id]);

    if (!settings) {
        return <p>loading...</p>;
    }

    if (!id) {
        return <p>error: id is not set</p>;
    }

    return (
        settings &&
        id && (
            <Player
                onXAPI={(e) => console.log("xAPI event", e)}
                contentId={id}
                state={settings}
                loading={loading}
            />
        )
    );
};

export default page;
