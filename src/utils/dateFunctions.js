export const getAge = (pet) => {
    let age;
    if (pet.age === undefined && pet.birthDate !== undefined) {
        const birthDate = new Date(pet.birthDate);
        const today = new Date();
        const diffTime = Math.abs(today - birthDate);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const diffYears = Math.floor(diffDays / 365);
        const diffMonths = Math.floor((diffDays - diffYears * 365) / 30);

        if (diffYears === 0) {
            if (diffMonths === 0) {
                age = {
                    number: diffDays,
                    unit: diffDays > 1 ? "días" : "día",
                };
            } else {
                age = {
                    number: diffMonths,
                    unit: diffMonths > 1 ? "meses" : "mes",
                };
            }
        } else {
            age = {
                number: diffYears,
                unit: diffYears > 1 ? "años" : "año",
            };
        }
    }
    return age;
};
