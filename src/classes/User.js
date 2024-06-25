class User {
    static URL = `${process.env.API_URL || "http://localhost:4000"}/users`;
    static #URL_LOCATIONS = `${process.env.API_URL || "http://localhost:4000"}/locations`;
    static #URL_ADMIN = `${process.env.API_URL || "http://localhost:4000"}/admin`;
    constructor(name, role) {
        this.name = name;
        this.role = role;
    }

    //this is only for admin
    static async adminGetAllUsers(token, role) {
        try {
            const response = await fetch(User.URL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": process.env.API_KEY,
                    authorization: `Bearer ${token}`,
                    "role": role,
                },
            });

            if (response.ok) {
                return response.json();
            } else {
                console.log("Failed to get users");
                return null;
            }
        }
        catch (error) {
            console.error("An error occurred:", error);
            return null;
        }
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

    //this is only for active provinces
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

    //the following are only for admin
    static async adminGetProvinces(token, role) {
        try {
            const response = await fetch(`${User.#URL_ADMIN}/provinces`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": process.env.API_KEY,
                    authorization: `Bearer ${token}`,
                    'role': role,
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

    static async adminGetLocations(token, role) {
        try {
            const response = await fetch(`${User.#URL_ADMIN}/locations`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": process.env.API_KEY,
                    authorization: `Bearer ${token}`,
                    "role": role,
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

    static async adminPostLocation(token, role, location) {
        try {
            const response = await fetch(`${User.#URL_ADMIN}/locations`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": process.env.API_KEY,
                    authorization: `Bearer ${token}`,
                    "role": role,
                },
                body: JSON.stringify(location),
            });

            if (response.ok) {
                return true;
            } else {
                console.log("Failed to create location");
                return false;
            }
        } catch (error) {
            console.error("An error occurred:", error);
            return false;
        }
    }

    static async adminPutActivateProvince(token, role, provinceId, newStatus) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`${User.#URL_ADMIN}/provinces/${provinceId}/activate`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "x-api-key": process.env.API_KEY,
                        authorization: `Bearer ${token}`,
                        "role": role,
                    },
                    body: JSON.stringify({ active: newStatus }),
                });

                if (response.ok) {
                    resolve(response);
                } else {
                    throw new Error("Failed to activate province");
                }
            } catch (error) {
                console.error("An error occurred:", error);
                reject(error);
            }
        }
        );
    }

    static async adminPutEditLocation(token, role, location) {
        try {
            const response = await fetch(`${User.#URL_ADMIN}/locations/${location._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": process.env.API_KEY,
                    authorization: `Bearer ${token}`,
                    "role": role,
                },
                body: JSON.stringify(location),
            });

            if (response.ok) {
                return true;
            } else {
                console.log("Failed to edit location");
                return false;
            }
        } catch (error) {
            console.error("An error occurred:", error);
            return false;
        }
    }

    static adminPutActivateLocation(token, role, locationId, newStatus) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`${User.#URL_ADMIN}/locations/${locationId}/activate`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "x-api-key": process.env.API_KEY,
                        authorization: `Bearer ${token}`,
                        "role": role,
                    },
                    body: JSON.stringify({ active: newStatus }),
                });

                if (response.ok) {
                    resolve(response);
                } else {
                    console.log("Failed to activate location");
                    reject(response);
                }
            } catch (error) {
                reject(error);
                console.error("An error occurred:", error);
            }
        });
    }
}

export default User;
