import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { fetchConfig, Configs, ConfigEntry } from "../services";

export const UpdateEntry: React.FC<{
    value: ConfigEntry;
    onUpdate: (newValue: ConfigEntry["value"]) => void;
}> = ({ value, onUpdate }) => {
    switch (typeof value.value) {
        case "string":
            return (
                <input
                    type="text"
                    value={value.value as string}
                    onChange={(e) => onUpdate(e.target.value)}
                />
            );
        case "number":
            return (
                <input
                    type="number"
                    value={value.value as number}
                    onChange={(e) => onUpdate(Number(e.target.value))}
                />
            );
        case "boolean":
            return (
                <input
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

    const fetchData = useCallback(() => {
        fetchConfig()
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setData(data.data as Configs);
                    console.log(Object.entries(data.data.hh5p));
                }
            });
    }, []);

    const onUpdate = useCallback((key: string, value: ConfigEntry["value"]) => {
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
    }, []);

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
                                            value={value}
                                            onUpdate={(newValue) =>
                                                onUpdate(key, newValue)
                                            }
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
