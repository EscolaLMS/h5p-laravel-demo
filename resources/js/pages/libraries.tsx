import { link } from "fs/promises";
import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import {
    listContent,
    PaginatedMetaList,
    H5PContent,
    libraries,
    H5PLibrary,
    deleteLibrary,
} from "../services";

type H5PLibraryWithDeps = H5PLibrary & { deps: H5PLibrary[] };

const getDependencies = (libraries: H5PLibrary[]) => {
    return libraries.map((lib) => {
        const deps = libraries.filter((l) => {
            return !!l.children.find(
                (sl) => sl.machineName === lib.machineName
            );
        });
        return {
            ...lib,
            deps,
        };
    });
};

export const page = () => {
    const [data, setData] = useState<H5PLibraryWithDeps[]>();
    const [filter, setFilter] = useState<"all" | "runnable">("all");

    const fetchData = useCallback(() => {
        libraries()
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setData(getDependencies(data.data));
                }
            });
    }, []);

    const onFilter = useCallback((filter: "all" | "runnable") => {
        setFilter(filter);
    }, []);

    const onDelete = useCallback((id: number) => {
        if (confirm("Are you sure?")) {
            deleteLibrary(id)
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        fetchData();
                    }
                });
        }
    }, []);

    useEffect(() => fetchData(), []);

    if (data) {
        return (
            <div>
                <form className="pure-form">
                    <fieldset>
                        <legend>Filter</legend>
                        <label>
                            <input
                                type="checkbox"
                                onChange={(e) =>
                                    onFilter(
                                        e.target.checked ? "runnable" : "all"
                                    )
                                }
                            />{" "}
                            Show only `runnable` Libraries
                        </label>
                    </fieldset>
                </form>
                <table className="pure-table">
                    <thead>
                        <tr>
                            <th>name</th>
                            <th>title</th>
                            <th>runnable</th>
                            <th>major_version</th>
                            <th>minor_version</th>
                            <th>children</th>
                            <th>dependencies</th>
                            <th>actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length === 0 && (
                            <tr>
                                <td colSpan={8}>empty</td>
                            </tr>
                        )}
                        {data
                            .filter((lib) => {
                                if (filter === "runnable") {
                                    return lib.runnable;
                                }
                                return true;
                            })
                            .map((h5p) => (
                                <tr key={h5p.id}>
                                    <td>{h5p.name}</td>
                                    <td>{h5p.title}</td>
                                    <td>{h5p.runnable}</td>
                                    <td>{h5p.major_version}</td>
                                    <td>{h5p.minor_version}</td>
                                    <td>
                                        {h5p.children && (
                                            <ul>
                                                {" "}
                                                {h5p.children.map((child) => (
                                                    <li key={child.id}>
                                                        <small>
                                                            {child.uberName}
                                                        </small>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </td>

                                    <td>
                                        {h5p.deps && (
                                            <ul>
                                                {" "}
                                                {h5p.deps.map((child) => (
                                                    <li key={child.id}>
                                                        <small>
                                                            {child.uberName}
                                                        </small>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </td>

                                    <td>
                                        <button
                                            onClick={() => onDelete(h5p.id)}
                                            disabled={h5p.deps.length > 0}
                                            className="pure-button"
                                            title={
                                                h5p.deps.length > 0
                                                    ? "This library cannot be deleted, because it is used in 1 other library"
                                                    : "Click to delete library"
                                            }
                                        >
                                            delete
                                        </button>
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
