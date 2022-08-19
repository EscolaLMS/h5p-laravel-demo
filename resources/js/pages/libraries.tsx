import React, { useEffect, useState, useCallback } from "react";
import { libraries, H5PLibrary, deleteLibrary } from "../services";

type H5PLibraryWithDeps = H5PLibrary & { deps: H5PLibrary[] };

const DeleteButton: React.FC<{ lib: H5PLibrary; onClick: () => void }> = ({
    lib,
    onClick,
}) => {
    const [showTooltip, setShowTooltip] = useState(false);

    const canDelete = lib.runnable && lib.contentsCount === 0;
    let deleteReason = "Click to delete library";
    if (!lib.runnable) {
        deleteReason = `This library cannot be deleted, because it is used in ${lib.requiredLibrariesCount} other library`;
    }
    if (lib.contentsCount > 0) {
        deleteReason = `This library cannot be deleted, because it is used in ${lib.contentsCount} content`;
    }

    return (
        <span
            style={{ position: "relative" }}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            {showTooltip && !canDelete && (
                <span
                    style={{
                        position: "absolute",
                        left: "110%",
                        fontSize: "10px",
                        minWidth: "100px",
                    }}
                >
                    {deleteReason}
                </span>
            )}
            <button
                onClick={onClick}
                disabled={!canDelete}
                className="pure-button"
                title={deleteReason}
            >
                delete
            </button>
        </span>
    );
};

export const page = () => {
    const [data, setData] = useState<H5PLibraryWithDeps[]>();
    const [filter, setFilter] = useState<"all" | "runnable">("all");

    const fetchData = useCallback(() => {
        libraries()
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setData(data.data);
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
                            <th># dependencies</th>
                            <th># of content</th>
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
                            .map((h5p) => {
                                return (
                                    <tr key={h5p.id}>
                                        <td>{h5p.name}</td>
                                        <td>{h5p.title}</td>
                                        <td>
                                            {h5p.runnable ? "TRUE" : "FALSE"}
                                        </td>
                                        <td>{h5p.major_version}</td>
                                        <td>{h5p.minor_version}</td>
                                        <td>{h5p.requiredLibrariesCount}</td>
                                        <td>{h5p.contentsCount}</td>

                                        <td>
                                            <DeleteButton
                                                lib={h5p}
                                                onClick={() => onDelete(h5p.id)}
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        );
    }

    return <p>loading</p>;
};

export default page;
