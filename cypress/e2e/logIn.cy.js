import { faker } from '@faker-js/faker/locale/es';

const URL = 'http://localhost:3000/login';

describe("Login", () => {
  beforeEach(() => {
    cy.visit(URL);
  });


  it("should display the login form", () => {
    cy.get("form").should("exist");
    cy.get("input[name='email']").should("exist");
    cy.get("input[name='password']").should("exist");
    cy.get("button[type='submit']").should("exist");
  });

  it("should display error message on invalid login", () => {

    cy.get("input[name='email']").type(faker.internet.email());
    cy.get("input[name='password']").type(faker.internet.password());
    cy.get("button[type='submit']").click();

    cy.get(".text-red-500").should("contain", "Error en la verificación");
  });

  it("should redirect to home page on successful login", () => {
    cy.fixture("validUsers").then((validUser) => {
      const user = validUser.user;
      cy.get("input[name='email']").type(user.email);
      cy.get("input[name='password']").type(user.password);
      cy.get("button[type='submit']").click();
      cy.url().should("eq", "http://localhost:3000/");
    });
  });

  it("should display error message on empty email", () => {
    cy.get("input[name='password']").type(faker.internet.password());
    cy.get("button[type='submit']").click();

    cy.get(".text-red-500").should("contain", "El email es requerido");
  });

  it("should display error message on empty password", () => {
    cy.get("input[name='email']").type(faker.internet.email());
    cy.get("button[type='submit']").click();

    cy.get(".text-red-500").should("contain", "La contraseña es requerida");
  });
});



