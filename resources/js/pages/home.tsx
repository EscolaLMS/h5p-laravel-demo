import React, { useState, useCallback } from "react";
import { login } from "../services";
import { useNavigate } from "react-router-dom";

export const page = () => {
    const [state, setState] = useState<{
        email: string;
        password: string;
        loading: boolean;
    }>({
        email: "admin@escolalms.com",
        password: "secret",
        loading: false,
    });
    const navigate = useNavigate();

    const onSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            login(state.email, state.password)
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        localStorage.setItem("token", data.data.token);
                        window.dispatchEvent(new Event("storageLocal"));
                        navigate("/index");
                    }
                })
                .catch((er) => console.error(er));
        },
        [state]
    );
    return (
        <div>
            <h3>
                Welcome to h5p laravel demo. Click login above to sign up and
                see the features.{" "}
            </h3>
        </div>
    );
};

export default page;
