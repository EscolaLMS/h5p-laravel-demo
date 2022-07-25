import { H5PEditorContent } from "@escolalms/h5p-react";

export type H5PLibrary = {
    id: number;
    created_at: string;
    updated_at: string;
    name: string;
    title: string;
    runnable: number;
    restricted: number;
    fullscreen: number;
    embed_types: string;
    semantics: object;
    machineName: string;
    uberName: string;
    majorVersion: string;
    minorVersion: string;
    patchVersion: string;
    preloadedJs: string;
    preloadedCss: string;
    dropLibraryCss: string;
    tutorialUrl: string;
    hasIcon: string;
    libraryId: number;
};

export type H5PContent = {
    id: number;
    created_at: string;
    updated_at: string;
    user_id: string | number;
    title: string;
    library_id: string;
    parameters: string;
    filtered: string;
    slug: string;
    embed_type: string;
    params: object;
    metadata: object;
    library: H5PLibrary;
    nonce: string;
};
export type PaginatedMetaList<Model> = {
    data: Model[];
    meta: {
        current_page: number;
        next_page_url: string;
        last_page: number;
        path: string;
        per_page: number | string;
        prev_page_url: string | null;
        to: number;
        total: number;
        links:
            | {
                  first: string;
                  last: string;
                  next: string;
                  prev: string;
              }
            | { url: string | null; label: string; active: boolean }[];
    };
};

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

export const contentSettings = (id?: string | number, lang: string = "en") => {
    let url: string = `${API_URL}/hh5p/content/${id}`;
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

export const listContent = (page: number | undefined = 1) => {
    return fetch(
        page
            ? `${API_URL}/admin/hh5p/content?page=${page}`
            : `${API_URL}/admin/hh5p/content`,
        {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
};
