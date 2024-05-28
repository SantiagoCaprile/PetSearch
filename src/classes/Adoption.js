
//this class will be used to create new Adoption objects
class Adoption {
    static #URL = `${process.env.API_URL || "http://localhost:4000"}/adoption-forms`;
    constructor(pet, user, rescuer, responsable, incomeMoney, homeType, allowed, alergies, hadPets, areSterilized, tellMoreAboutPets, inWorstCase, whyAdopt, result) {
        this.pet = pet;
        this.user = user;
        this.rescuer = rescuer;
        this.responsable = responsable;
        this.incomeMoney = incomeMoney;
        this.homeType = homeType;
        this.allowed = allowed;
        this.alergies = alergies;
        this.hadPets = hadPets;
        this.areSterilized = areSterilized;
        this.tellMoreAboutPets = tellMoreAboutPets;
        this.inWorstCase = inWorstCase;
        this.whyAdopt = whyAdopt;
        this.result = result;
    }

    static translateResult(result) {
        switch (result) {
            case 'pending':
                return 'Pendiente';
            case 'approved':
                return 'Aprobada';
            case 'rejected':
                return 'Rechazada';
            default:
                return 'Desconocido';
        }
    }

    //this method will be used to create a new adoption form and send it to the server
    static async createAdoptionForm(adoption) {
        try {
            const response = await fetch(Adoption.#URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(adoption),
            });
            if (response.ok) {
                const adoptionForm = await response.json();
                return adoptionForm;
            } else {
                console.log("Failed to create adoption form");
                return null;
            }
        } catch (error) {
            console.error("An error occurred:", error);
            return null;
        }
    }

    static async getAdoptionsForUser(userId) {
        try {
            const response = await fetch(`${Adoption.#URL}/user/${userId}`);
            if (response.ok) {
                const adoptions = await response.json();
                return adoptions;
            } else {
                console.log("Failed to get adoptions for rescuer");
                return null;
            }
        } catch (error) {
            console.error("An error occurred:", error);
            return null;
        }
    }

    static async getAdoptionsForRescuer(rescuerId) {
        try {
            const response = await fetch(`${Adoption.#URL}/rescuer/${rescuerId}`);
            if (response.ok) {
                const adoptions = await response.json();
                return adoptions;
            } else {
                console.log("Failed to get adoptions for rescuer");
                return null;
            }
        } catch (error) {
            console.error("An error occurred:", error);
            return null;
        }
    }

    static async getAdoptionById(id) {
        try {
            const response = await fetch(`${Adoption.#URL}/${id}`);
            if (response.ok) {
                const adoption = await response.json().then((res) => res.adoption);
                return adoption;
            } else {
                console.log("Failed to get adoption");
                return null;
            }
        } catch (error) {
            console.error("An error occurred:", error);
            return null;
        }
    }

    static async verifyIfAdoptionExists(petId, userId) {
        try {
            const response = await fetch(`${Adoption.#URL}/${userId}/${petId}`);
            if (response.ok) {
                const adoption = await response.json();
                return adoption;
            } else {
                console.log("Failed to get adoption");
                return null;
            }
        } catch (error) {
            console.error("An error occurred:", error);
            return null;
        }
    }

}

export default Adoption;