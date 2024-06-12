class HelpFormClass {
    static URL = `${process.env.API_URL || "http://localhost:4000"}/help-forms`;
    static TYPE = {
        'FOUND': 'found',
        'LOST': 'lost',
    };
    static STATUS = {
        'PENDING': 'pending',
        'RESOLVED': 'resolved',
        'INACTIVE': 'inactive',
    };
    constructor(user, type, date, lat, lng, city, description, image, status) {
        this.user = user;
        this.type = type;
        this.date = date;
        this.location = {
            lat: lat,
            lng: lng,
            city: city
        };
        this.description = description;
        this.image = image;
        this.status = status || HelpFormClass.STATUS.PENDING;
    }

    static async createHelpForm(data) {
        try {
            const response = await fetch(this.URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": process.env.API_KEY,
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            return result;
        } catch (error) {
            console.error("Error creating help form: ", error);
        }
    }

    static async getHelpFormsByUserId(userId) {
        try {
            const response = await fetch(`${this.URL}/${userId}`,
                {
                    method: "GET",
                    headers: {
                        "x-api-key": process.env.API_KEY,
                    },
                });
            const result = await response.json();
            return result;
        } catch (error) {
            console.error("Error getting help forms by user id: ", error);
        }
    }

    static async getHelpFormByCity(city) {
        try {
            const response = await fetch(`${this.URL}/city/${city}`,
                {
                    method: "GET",
                    headers: {
                        "x-api-key": process.env.API_KEY,
                    },
                });
            const result = await response.json();
            return result;
        } catch (error) {
            console.error("Error getting help forms by city: ", error);
        }
    }
}

export default HelpFormClass;
