import React, { useState, useCallback } from "react";
import { uploadH5P } from "../services";
import { useNavigate } from "react-router-dom";

export const page = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(false);
    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setLoading(true);
        e.target.files &&
            e.target.files[0] &&
            uploadH5P(e.target.files[0])
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        navigate(`/player/${data.data.uuid}`, {
                            replace: true,
                        });
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
    }, []);
    return (
        <form className="pure-form">
            {loading && <p>Uploading...</p>}
            <input
                disabled={loading}
                onChange={onChange}
                accept=".h5p"
                type="file"
                placeholder="upload new h5p file"
            />
        </form>
    );
};

export default page;
