class User {
    static URL = `${process.env.API_URL || "http://localhost:4000"}/users`;
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
                console.log("User created successfully");
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
                console.log("User logged in successfully");
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

    static async getUserById(id) {
        try {
            const response = await fetch(`${User.URL}/${id}`);
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
}

export default User;
