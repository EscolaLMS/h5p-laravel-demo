import { H5PEditorContent } from "@escolalms/h5p-react";

const API_URL = "/api";

export const login = (email: string, password: string) =>
    fetch(`${API_URL}/auth/login`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ email, password, remember_me: 1 }),
    });

export const editorSettings = (id?: string | number, lang: string = "en") => {
    let url: string = id
        ? `${API_URL}/admin/hh5p/editor/${id}`
        : `${API_URL}/admin/hh5p/editor`;
    url = lang ? `${url}?lang=${lang}` : url;
    return fetch(url, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        method: "GET",
    });
};

export const updateContent = (data: H5PEditorContent, id?: string | number) => {
    return fetch(
        id
            ? `${API_URL}/admin/hh5p/content/${id}`
            : `${API_URL}/admin/hh5p/content`,
        {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
};
