class Pet {
    static #URL = `${process.env.API_URL || "http://localhost:4000"}/pets`;
    constructor(name, age, breed, description, specie) {
        this.name = name;
        this.age = age;
        this.breed = breed;
        this.description = description;
        this.specie = specie;
    }

    static async getRescuersPets(rescuerId) {
        try {
            const response = await fetch(`${Pet.#URL}/rescuer/${rescuerId}`);
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
            const response = await fetch(`${Pet.#URL}/${petId}`);
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
}

export default Pet;