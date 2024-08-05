export default class Tag {
    static #URL = `${process.env.API_URL || "http://localhost:4000"}/tags`;

    //una ruta para ver si el tag esta registrado (todos) [GET]
    static isRegistered = async (tagId) => {
        try {
            const response = await fetch(`${Tag.#URL}/check/${tagId}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error en isRegistered:", error);
            return { error: error.message };
        }
    }

    // //una ruta para crear un tag vacio (solo admin) [POST]
    static createTag = async (token, role) => {
        const response = await fetch(Tag.#URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                "role": role,
            },
            body: JSON.stringify({}),
        });
        const data = await response.json();
        return data;
    }

    // //una ruta para registrar un usuario a un tag (debe estar loggueado) [PUT]
    static linkUserToTag = async (token, role, tagData, userId) => {
        const response = await fetch(`${Tag.#URL}/${tagData._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                "role": role,
            },
            body: JSON.stringify({ userId: userId, data: tagData }),
        });
        const data = await response.json();
        return data;
    }

    // //una ruta para ver la data de la mascota (todos) [GET]
    static getTagData = async (tagId) => {
        try {
            const response = await fetch(`${Tag.#URL}/${tagId}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error en getTagData:", error);
            return { error: error.message };
        }
    }

    // //una ruta para editar la data de la mascota (solo user) [PUT]
    static editTagData = async (token, role, tagId, data) => {
        try {
            const response = await fetch(`${Tag.#URL}/edit/${tagId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                    "role": role,
                },
                body: JSON.stringify(data),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error en editTagData:", error);
            return { error: error.message };
        }
    }

    // //una ruta para desvincular el tag de la mascota. (solo user) [PUT]
    static unlinkUserToTag = async (token, role, tagId) => {
        try {
            const response = await fetch(`${Tag.#URL}/unlink/${tagId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                    "role": role,
                },
                body: JSON.stringify({ userId: null }),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error en unlinkUserToTag:", error);
            return { error: error.message };
        }
    }

    static getTagsList = async () => {
        try {
            const response = await fetch(Tag.#URL);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error en getTagList:", error);
            return { error: error.message };
        }
    }

    static getUserTags = async (userId) => {
        try {
            const response = await fetch(`${Tag.#URL}/user/${userId}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error en getUserTags:", error);
            return { error: error.message };
        }
    }

    static addHistoryEntry = async (tagId, newEntry) => {
        try {
            const response = await fetch(`${Tag.#URL}/${tagId}/healthHistory`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newEntry),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error en addHistoryEntry:", error);
            return { error: error.message };
        }
    }

    static deleteHistoryEntry = async (tagId, entryId) => {
        try {
            const response = await fetch(`${Tag.#URL}/${tagId}/healthHistory/${entryId}`, {
                method: "DELETE",
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error en deleteHistoryEntry:", error);
            return { error: error.message };
        }
    }
}