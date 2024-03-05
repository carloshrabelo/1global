import { faker } from "@faker-js/faker";
import user from "../../../src/mocks/users";

const API = Cypress.env("NEXT_PUBLIC_API");
const base_url = Cypress.config("baseUrl");

describe("Sign In Page", () => {
  beforeEach(() => {
    cy.visit("/signin");
  });

  it("should redirect to homepage after login", () => {
    cy.intercept("POST", `${API}login`, {
      body: {
        token: faker.string.alpha(10),
      },
    }).as("login");

    cy.getTextField("Email").type(user.email);
    cy.getTextField("Password").type(faker.internet.password());

    cy.contains("Login").click();
    cy.wait("@login");

    cy.url().should("eq", base_url);
  });

  it("should display error messages for invalid input", () => {
    cy.contains("Login").click();

    cy.contains("Email is required").should("be.visible");
    cy.contains("Password is required").should("be.visible");

    cy.getTextField("Email").type("invalid_email");
    cy.getTextField("Password").type("pass");

    cy.contains("Login").click();

    cy.contains("Invalid email").should("be.visible");
    cy.contains("Password must be at least 6 characters").should("be.visible");
  });

  it("should display error messages if data is wrong", () => {
    Cypress.on("uncaught:exception", () => false);
    const errorMsg = faker.lorem.sentence();

    cy.intercept("POST", `${API}login`, {
      statusCode: 301,
      body: {
        error: errorMsg,
      },
    }).as("login");

    cy.getTextField("Email").type(user.email);
    cy.getTextField("Password").type(faker.internet.password());

    cy.contains("Login").click();
    cy.wait("@login");
    //  Wait Toast be displayed
    cy.wait(1).then(() => cy.contains(errorMsg).should("be.visible"));
  });
});
