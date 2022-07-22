import React, { useState, useCallback } from "react";
import { login } from "../services";
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
    const onSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            login(state.email, state.password)
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        localStorage.setItem("token", data.data.token);
                        window.dispatchEvent(new Event("storageLocal"));
                    }
                })
                .catch((er) => console.error(er));
        },
        [state]
    );
    return (
        <div>
            <h1>login</h1>
            <form onSubmit={onSubmit}>
                <label>
                    Username:
                    <input
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
                </label>
                <label>
                    Password:
                    <input
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
                </label>
                <button type="submit">submit</button>
            </form>
        </div>
    );
};

export default page;
