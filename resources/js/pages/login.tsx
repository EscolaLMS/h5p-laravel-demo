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
            <form onSubmit={onSubmit} className="pure-form">
                <fieldset>
                    <legend>Login form</legend>

                    <input
                        placeholder="email"
                        title="email"
                        type="text"
                        name="email"
                        value={state.email}
                        onChange={(e) =>
                            setState((prev) => ({
                                ...prev,
                                [e.target.name]: e.target.value,
                            }))
                        }
                    />
                    <input
                        placeholder="password"
                        title="password"
                        type="text"
                        name="password"
                        value={state.password}
                        onChange={(e) =>
                            setState((prev) => ({
                                ...prev,
                                [e.target.name]: e.target.value,
                            }))
                        }
                    />
                    <button
                        type="submit"
                        className="pure-button pure-button-primary"
                    >
                        submit
                    </button>
                </fieldset>
            </form>
        </div>
    );
};

export default page;
