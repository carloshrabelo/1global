import { faker } from "@faker-js/faker";
import user from "../../../src/mocks/users";

const base_url = Cypress.env("url");
const url = `${base_url}signup`;
const API = Cypress.env("NEXT_PUBLIC_API");

describe("Sign Up Page", () => {
  beforeEach(() => {
    cy.visit(url);
  });

  it("should redirect to homepage after register", () => {
    cy.intercept("POST", `${API}register`, {
      body: {
        token: faker.string.alpha(10),
      },
    }).as("register");
    const userPassword = faker.internet.password();

    cy.getTextField("Email").type(user.email);
    cy.getTextField("Password").type(userPassword);
    cy.getTextField("Confirm Password").type(userPassword);

    cy.get("button[type='submit']").click();
    cy.wait("@register");

    cy.url().should("eq", base_url);
  });

  it("should display error messages for invalid input", () => {
    cy.visit(url);
    cy.get("button[type='submit']").click();

    cy.contains("Email is required").should("be.visible");
    cy.contains("Password is required").should("be.visible");

    cy.getTextField("Email").type("invalid_email");
    cy.getTextField("Password").type("pass");

    cy.get("button[type='submit']").click();

    cy.contains("Invalid email").should("be.visible");
    cy.contains("Password must be at least 6 characters").should("be.visible");

    cy.getTextField("Password").type(faker.lorem.sentence());
    cy.getTextField("Confirm Password").type(faker.lorem.sentence());
    cy.contains("Passwords don't match").should("be.visible");
  });

  it("should display error messages if request failed", () => {
    Cypress.on("uncaught:exception", () => false);
    const errorMsg = faker.lorem.sentence();
    const userPassword = faker.internet.password();

    cy.intercept("POST", `${API}register`, {
      statusCode: 301,
      body: {
        error: errorMsg,
      },
    }).as("register");

    cy.getTextField("Email").type(user.email);
    cy.getTextField("Password").type(userPassword);
    cy.getTextField("Confirm Password").type(userPassword);

    cy.get("button[type='submit']").click();
    cy.wait("@register");
    //  Wait Toast be displayed
    cy.wait(1).then(() => cy.contains(errorMsg).should("be.visible"));
  });
});
