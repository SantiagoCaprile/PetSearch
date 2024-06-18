class User {
    static URL = `${process.env.API_URL || "http://localhost:4000"}/users`;
    static #URL_LOCATIONS = `${process.env.API_URL || "http://localhost:4000"}/locations`;
    constructor(name, role) {
        this.name = name;
        this.role = role;
    }

    async save() {
        try {
            const response = await fetch(User.URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(this),
            });

            if (response.ok) {
                return true;
            } else {
                console.log("Failed to create user");
                return false;
            }
        } catch (error) {
            console.error("An error occurred:", error);
            return false;
        }
    }

    static async createUser(user) {
        try {
            const response = await fetch(User.URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": process.env.API_KEY,
                },
                cors: true,
                body: JSON.stringify(user),
            });

            if (response.ok) {
                return true;
            } else {
                console.log("Failed to create user");
                return false;
            }
        } catch (error) {
            console.error("An error occurred:", error);
            return false;
        }
    }

    static async login(email, password) {
        try {
            const response = await fetch(User.URL + "/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                return true;
            } else {
                console.log("Failed to log in");
                return false;
            }
        } catch (error) {
            console.error("An error occurred:", error);
            return false;
        }
    }

    static async getUserById(id, token) {
        try {
            const response = await fetch(`${User.URL}/${id}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${token}`,
                    },
                });
            if (response.ok) {
                return response.json();
            } else {
                console.log("Failed to get user");
                return null;
            }
        } catch (error) {
            console.error("An error occurred:", error);
            return null;
        }
    }

    static async getProvinces() {
        try {
            const response = await fetch(`${User.#URL_LOCATIONS}/provinces`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": process.env.API_KEY,
                },
            });

            if (response.ok) {
                return response.json();
            } else {
                console.log("Failed to get provinces");
                return null;
            }
        } catch (error) {
            console.error("An error occurred:", error);
            return null;
        }
    }

    static async getLocations() {
        try {
            console.log("Getting locations")
            const response = await fetch(`${User.#URL_LOCATIONS}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": process.env.API_KEY,
                },
            });

            if (response.ok) {
                return response.json();
            } else {
                console.log("Failed to get locations");
                return null;
            }
        } catch (error) {
            console.error("An error occurred:", error);
            return null;
        }
    }

    static async getLocationsByProvince(province) {
        try {
            const response = await fetch(`${User.#URL_LOCATIONS}/${province}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": process.env.API_KEY,
                },
            });

            if (response.ok) {
                return response.json();
            } else {
                console.log("Failed to get locations");
                return null;
            }
        } catch (error) {
            console.error("An error occurred:", error);
            return null;
        }
    }
}

export default User;
