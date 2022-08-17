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
    const { uuid } = useParams<{ uuid: string }>();

    const [settings, setSettings] = useState<EditorSettings>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (uuid) {
            setLoading(true);
            contentSettings(uuid, localStorage.getItem("lang") || "en")
                .then((res) => res.json())
                .then((data) => {
                    setSettings(data.data);
                    setLoading(false);
                });
        }
    }, [uuid]);

    if (!settings) {
        return <p>loading...</p>;
    }

    if (!uuid) {
        return <p>error: uuid is not set</p>;
    }

    if (settings && uuid && uuid !== "") {
        return (
            <Player
                onXAPI={(e) => console.log("xAPI event", e)}
                state={settings}
                loading={loading}
            />
        );
    }

    return <pre>error</pre>;
};

export default page;
