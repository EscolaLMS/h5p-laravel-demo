import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { contentSettings } from "../services";
import {
    EditorSettings,
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
            <div>
                <Player
                    onXAPI={(e) => console.log("xAPI event", e)}
                    state={settings}
                    loading={loading}
                />
                <hr />
                <p>
                    <pre>
                        Open Developer Tools Console to see xAPI events from
                        this content
                    </pre>
                </p>
            </div>
        );
    }

    return <pre>error</pre>;
};

export default page;
