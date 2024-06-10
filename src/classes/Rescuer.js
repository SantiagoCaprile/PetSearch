class Rescuer {
    static #URL = `${process.env.API_URL || "http://localhost:4000"}/rescuers`;
    constructor(name, instagram, facebook, bio) {
        this.name = name;
        this.instagram = instagram;
        this.facebook = facebook;
        this.bio = bio;
    }

    //fetch all the rescuers
    static async getAll() {
        try {
            const response = await fetch(Rescuer.#URL, {
                headers: {
                    "x-api-key": process.env.API_KEY,
                },
            });
            if (response.ok) {
                const rescuers = await response.json();
                return rescuers;
            } else {
                console.log("Failed to get rescuers");
                return [];
            }
        } catch (error) {
            console.error("An error occurred:", error);
            return [];
        }
    }

    static async getRescuerById(rescuerId) {
        try {
            const response = await fetch(`${Rescuer.#URL}/${rescuerId}`, {
                headers: {
                    "x-api-key": process.env.API_KEY,
                },
            });
            if (response.ok) {
                const rescuer = await response.json();
                return rescuer;
            } else {
                console.log("Failed to get rescuer");
                return null;
            }
        } catch (error) {
            console.error("An error occurred:", error);
            return null;
        }
    }

    static async updateRescuer(rescuerId, data, token) {
        try {
            if (!token) {
                throw new Error("Token is required");
            }
            const response = await fetch(`${Rescuer.#URL}/${rescuerId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": process.env.API_KEY,
                    "authorization": "Bearer " + token,
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const updatedRescuer = await response.json();
                return updatedRescuer;
            } else {
                console.log("Failed to update rescuer");
                return null;
            }
        } catch (error) {
            console.error("An error occurred:", error);
            return null;
        }
    }
}

export default Rescuer;