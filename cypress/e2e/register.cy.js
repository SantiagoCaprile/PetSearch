import { faker } from '@faker-js/faker/locale/es';

describe("Register", () => {
    beforeEach(() => {
        cy.visit("/register");
    });

    it("should display the registration form", () => {
        cy.get("form").should("exist");
        cy.get("input[name='email']").should("exist");
        cy.get("input[name='name']").should("exist");
        cy.get("input[name='password']").should("exist");
        cy.get("select[name='type']").should("exist");
        cy.get("button[type='submit']").should("exist");
    });

    it('should display success toast on successful registration and redirect to login', () => {
        const user = {
            email: faker.internet.email(),
            name: faker.person.fullName(),
            password: faker.internet.password()
        };

        cy.get("input[name='email']").type(user.email);
        cy.get("input[name='name']").type(user.name);
        cy.get("input[name='password']").type(user.password);
        cy.get("button[type='submit']").click();

        cy.get("#success_toast").should("exist");
        cy.get("#success_toast").should("contain", "Cuenta creada exitosamente");

        cy.url().should("contain", "/login");

        //should verify if the file registeredUsers.json exists if not create it
        const filePath = 'cypress/fixtures/registeredUsers.json';
        const initialContent = JSON.stringify([]);

        // Verificar si el archivo existe, si no, crear con contenido inicial
        cy.task('fileExists', { filePath, initialContent }).then((exists) => {
            if (exists) {
                // Leer el archivo existente, agregar el nuevo usuario y guardar el arreglo actualizado
                cy.readFile(filePath).then((users) => {
                    users.push(user);
                    cy.writeFile(filePath, users);
                });
            } else {
                // Si el archivo fue creado, agregar el nuevo usuario y guardar
                cy.writeFile(filePath, [user]);
            }
        });

    });

    it("should display html error on empty email", () => {
        cy.get("input[name='name']").type(faker.person.fullName());
        cy.get("input[name='password']").type(faker.internet.password());
        cy.get("button[type='submit']").click();

        cy.get('.text-red-500').should("contain", "Email es requerido");
    });

    it("should display error message on empty name", () => {
        cy.get("input[name='email']").type(faker.internet.email());
        cy.get("input[name='password']").type(faker.internet.password());
        cy.get("button[type='submit']").click();

        cy.get(".text-red-500").should("contain", "Nombre completo requerido");
    });

    it("should display error message on empty password", () => {
        cy.get("input[name='email']").type(faker.internet.email());
        cy.get("input[name='name']").type(faker.person.fullName());
        cy.get("button[type='submit']").click();

        cy.get(".text-red-500").should("contain", "La contraseña es requerida");
    });

    it("should display error message on password less than 8 characters", () => {
        cy.get("input[name='email']").type(faker.internet.email());
        cy.get("input[name='name']").type(faker.person.fullName());
        cy.get("input[name='password']").type(faker.internet.password({ length: 7 }));
        cy.get("button[type='submit']").click();

        cy.get(".text-red-500").should("contain", "La contraseña debe tener al menos 8 caracteres");
    });

    it("shouldn't redirect if the email is invalid", () => {
        cy.get("input[name='email']").type(faker.lorem.word());
        cy.get("input[name='name']").type(faker.person.fullName());
        cy.get("input[name='password']").type(faker.internet.password());
        cy.get("button[type='submit']").click();

        cy.url().should("eq", "http://localhost:3000/register");
    });

    it("should display new layout when changing user type", () => {
        cy.get("select[name='type']").select("rescuer");
        cy.get("input[name='email']").should("exist");
        cy.get("input[name='name']").should("exist");
        cy.get("input[name='password']").should("exist");
        cy.get("select[name='type']").should("exist");
        cy.get("button[type='submit']").should("exist");

        cy.get('.underline').should("contain", "Rescatista")
        cy.get(':nth-child(4) > .block').should("contain", "organización")
    });

    // it("should display error message on failed registration", () => {
    //         const user = invalidUser.user;
    //         cy.get("input[name='email']").type(user.email);
    //         cy.get("input[name='name']").type(faker.person.fullName());
    //         cy.get("input[name='password']").type(faker.internet.password());
    //         cy.get("select[name='type']").select(
    //         cy.get("button[type='submit']").click();

    //         cy.get(".text-red-500").should("contain", "Error al crear la cuenta");
    // });
});