class Pet {
    static #URL = `${process.env.API_URL || "http://localhost:4000"}/pets`;
    static CHARACTERISTICS = {
        KIDS: "goodWithKids",
        DOGS: "goodWithDogs",
        CATS: "goodWithCats",
        NEUTERED: "neutered",
        VACCINATED: "vaccinated",
    };
    static SPECIES = {
        DOG: "dog",
        CAT: "cat",
        OTHER: "other",
    };
    static SIZES = {
        SMALL: "small",
        MEDIUM: "medium",
        LARGE: "large",
    };
    static SEXS = {
        MALE: "male",
        FEMALE: "female",
    };
    static AGES = {
        BABY: "baby",
        YOUNG: "young",
        ADULT: "adult",
        SENIOR: "senior",
    };

    constructor(name, age, breed, description, specie) {
        this.name = name;
        this.age = age;
        this.breed = breed;
        this.description = description;
        this.specie = specie;
    }

    static async getAllPets(specie, size, sex, age) {
        const params = new URLSearchParams(
            Object.entries({
                specie,
                size,
                sex,
            }).filter(([key, value]) => value).map(([key, value]) => [key, Array.isArray(value) ? value.join(",") : value])
        );
        age ? age.forEach(ageValue => params.append('age', ageValue)) : null;
        try {
            const response = await fetch(`${Pet.#URL}?${params}`, {
                method: "GET",
                headers: {
                    "x-api-key": process.env.API_KEY,
                },
            });
            if (response.ok) {
                const pets = await response.json();
                return pets;
            } else {
                return [];
            }
        } catch (error) {
            console.error("An error occurred:", error);
            return [];
        }
    }

    static async getRescuersPets(rescuerId) {
        try {
            const response = await fetch(`${Pet.#URL}/rescuer/${rescuerId}`, {
                method: "GET",
                headers: {
                    "x-api-key": process.env.API_KEY,
                },
            });
            if (response.ok) {
                const pets = await response.json();
                return pets;
            } else {
                console.log("Failed to get pets");
                return [];
            }
        } catch (error) {
            console.error("An error occurred:", error);
            return [];
        }
    }

    static async getPetById(petId) {
        try {
            const response = await fetch(`${Pet.#URL}/${petId}`, {
                method: "GET",
                headers: {
                    "x-api-key": process.env.API_KEY,
                },
            });
            if (response.ok) {
                const pet = await response.json();
                return pet;
            } else {
                console.log("Failed to get pet");
                return null;
            }
        } catch (error) {
            console.error("An error occurred:", error);
            return null;
        }
    }

    static async getRandomPets() {
        try {
            const response = await fetch(`${Pet.#URL}/random`, {
                method: "GET",
                headers: {
                    "x-api-key": process.env.API_KEY,
                },
            });
            if (response.ok) {
                const pets = await response.json();
                return pets;
            } else {
                console.log("Failed to get pets");
                return [];
            }
        } catch (error) {
            console.error("An error occurred:", error);
            return [];
        }
    }

    static async createPet(pet, user) {
        try {
            const response = await fetch(Pet.#URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": "Bearer " + user.token,
                    "role": user.role,
                },
                body: JSON.stringify(pet),
            });
            if (response.ok) {
                const pet = await response.json();
                return pet;
            } else {
                console.log("Failed to create pet");
                return null;
            }
        } catch (error) {
            console.error("An error occurred:", error);
            return null;
        }
    }

    static async updatePet(petId, pet, user) {
        try {
            const response = await fetch(`${Pet.#URL}/${petId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": "Bearer " + user.token,
                    "role": user.role,
                },
                body: JSON.stringify(pet),
            });
            if (response.ok) {
                const pet = await response.json();
                return pet;
            } else {
                console.log("Failed to update pet");
                return null;
            }
        } catch (error) {
            console.error("An error occurred:", error);
            return null;
        }
    }
}

export default Pet;
