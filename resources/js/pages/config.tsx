import React, { useEffect, useState, useCallback } from "react";
import { fetchConfig, Configs, ConfigEntry, updateConfig } from "../services";

export const UpdateEntry: React.FC<{
    value: ConfigEntry;
    onUpdate: (newValue: ConfigEntry["value"]) => void;
    loading: boolean;
}> = ({ value, onUpdate, loading = false }) => {
    switch (typeof value.value) {
        case "string":
            return (
                <input
                    disabled={loading}
                    type="text"
                    value={value.value as string}
                    onChange={(e) => onUpdate(e.target.value)}
                />
            );
        case "number":
            return (
                <input
                    disabled={loading}
                    type="number"
                    value={value.value as number}
                    onChange={(e) => onUpdate(Number(e.target.value))}
                />
            );
        case "boolean":
            return (
                <input
                    disabled={loading}
                    type="checkbox"
                    checked={value.value as boolean}
                    onChange={(e) => onUpdate(e.target.checked)}
                />
            );
        default:
            return <React.Fragment />;
    }
    return <React.Fragment />;
};

export const page = () => {
    const [data, setData] = useState<Configs>();
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = useCallback(() => {
        setLoading(true);
        fetchConfig()
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setData(data.data as Configs);
                }
            })
            .finally(() => setLoading(false));
    }, []);

    const onUpdate = useCallback(
        (key: string, value: ConfigEntry["value"]) => {
            setData((prevData) => {
                if (prevData) {
                    return {
                        ...prevData,
                        hh5p: {
                            ...prevData.hh5p,

                            [key]: {
                                ...prevData.hh5p[key],
                                value: value,
                            },
                        },
                    };
                }
            });
            if (data) {
                const full_key = data.hh5p[key].full_key;
                setLoading(true);
                updateConfig({ key: full_key, value }).finally(() =>
                    setLoading(false)
                );
            }
        },
        [data]
    );

    useEffect(() => {
        fetchData();
    }, []);

    if (data) {
        return (
            <div>
                <table className="pure-table">
                    <thead>
                        <tr>
                            <th>key</th>
                            <th>value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.hh5p &&
                            Object.entries(data.hh5p).map(([key, value]) => (
                                <tr key={key}>
                                    <td>{key}</td>
                                    <td>
                                        <UpdateEntry
                                            loading={loading}
                                            value={value}
                                            onUpdate={(newValue) => {
                                                onUpdate(key, newValue);
                                            }}
                                        />
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        );
    }

    return <p>loading</p>;
};

export default page;
