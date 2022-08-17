import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import {
    listContent,
    PaginatedMetaList,
    H5PContent,
    deleteContent,
} from "../services";

export const page = () => {
    const [page, setPage] = useState<number>(1);
    const [data, setData] = useState<PaginatedMetaList<H5PContent>>();

    const fetchData = useCallback((page: number) => {
        listContent(page)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setData(data);
                }
            });
    }, []);

    useEffect(() => {
        fetchData(page);
    }, [page]);

    const onDelete = useCallback(
        (id: number) => {
            if (confirm("Are you sure?")) {
                deleteContent(id)
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.success) {
                            fetchData(page);
                        }
                    });
            }
        },
        [page]
    );

    if (data) {
        return (
            <div>
                <table className="pure-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>uuid</th>
                            <th>Title</th>
                            <th>Library</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.data.length === 0 && (
                            <tr>
                                <td colSpan={5}>empty</td>
                            </tr>
                        )}
                        {data.data.map((h5p) => (
                            <tr key={h5p.id}>
                                <td>{h5p.id}</td>
                                <td>{h5p.uuid}</td>
                                <td>{h5p.title}</td>
                                <td>{h5p.library.title}</td>
                                <td>
                                    <Link
                                        className="pure-button"
                                        to={`/editor/${h5p.id}`}
                                    >
                                        edit
                                    </Link>{" "}
                                    <Link
                                        className="pure-button"
                                        to={`/player/${h5p.uuid}`}
                                    >
                                        preview
                                    </Link>{" "}
                                    <button
                                        className="pure-button"
                                        onClick={() => onDelete(h5p.id)}
                                    >
                                        delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div>
                    page:
                    <select onChange={(e) => setPage(Number(e.target.value))}>
                        {Array.from({ length: data.meta.last_page }).map(
                            (el, i) => (
                                <option key={i} value={i + 1}>
                                    {i + 1}
                                </option>
                            )
                        )}
                    </select>
                </div>
            </div>
        );
    }

    return <p>loading</p>;
};

export default page;
