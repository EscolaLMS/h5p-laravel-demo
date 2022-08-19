import { H5PEditorContent } from "@escolalms/h5p-react";

export type H5PLibraryLanguage = {
    library_id: number;
    language_code: string;
    translation: {
        semantics: {
            default?: string;
            description?: string;
            label: string;
            fields: {
                entity?: string;
                widgets?: { label: string }[];
                label: string;
                description?: string;
                placeholder?: string;
                important?: {
                    description?: string;
                    example?: string;
                };
            }[];
        }[];
    };
};

export type H5PLibrary = {
    contentsCount: number;
    requiredLibrariesCount: number;
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
    major_version: number;
    minorVersion: string;
    minor_version: number;
    patchVersion: string;
    patch_version: number;
    preloaded_js: string;
    preloadedJs: string;
    preloaded_css: string;
    preloadedCss: string;
    dropLibraryCss: string;
    drop_library_css: string;
    has_icon: string;
    tutorialUrl: string;
    tutorial_url: string;
    hasIcon: string;
    libraryId: number;
    children: H5PLibrary[];
    languages: H5PLibraryLanguage[];
};

export type H5PContent = {
    id: number;
    uuid: string;
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

export type Configs = Record<string, Record<string, ConfigEntry>>;

//type ConfigsList = DefaultResponse<Configs>;

export type ConfigEntry = {
    key: keyof Configs;
    full_key: string;
} & Config;

export type Config = {
    rules: string[];
    public: boolean;
    readonly: boolean;
    value: string | string[] | boolean | number | object;
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

export const contentSettings = (
    uuid?: string | number,
    lang: string = "en"
) => {
    let url: string = `${API_URL}/hh5p/content/${uuid}`;
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

export const userMe = () => {
    return fetch(`${API_URL}/profile/me`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        method: "GET",
    });
};

export const libraries = () => {
    return fetch(`${API_URL}/admin/hh5p/library`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        method: "GET",
    });
};

export const deleteContent = (id: number) => {
    return fetch(`${API_URL}/admin/hh5p/content/${id}`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        method: "DELETE",
    });
};

export const deleteLibrary = (id: number) => {
    return fetch(`${API_URL}/admin/hh5p/library/${id}`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        method: "DELETE",
    });
};

export const fetchConfig = () => {
    return fetch(`${API_URL}/admin/config`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        method: "GET",
    });
};

export const updateConfig = ({
    key,
    value,
}: {
    key: string;
    value: ConfigEntry["value"];
}) => {
    return fetch(`${API_URL}/admin/config`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        method: "POST",
        body: JSON.stringify({
            config: [
                {
                    key,
                    value,
                },
            ],
        }),
    });
};

export const uploadH5P = (file: File) => {
    const formData = new FormData();
    formData.append("h5p_file", file);
    return fetch(`${API_URL}/admin/hh5p/content/upload`, {
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        method: "POST",
        body: formData,
    });
};
