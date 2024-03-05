import { faker } from "@faker-js/faker";
import SignInCard from ".";

describe("SignInCard Component", () => {
  it("submits the form correctly", () => {
    const onSubmit = cy.stub().as("submitStub");
    cy.mount(<SignInCard onSubmit={onSubmit} />);

    cy.getTextField("Email").type(faker.internet.email());
    cy.getTextField("Password").type("password123");
    cy.get('button[type="submit"]').click();

    cy.get("@submitStub").should("have.been.calledOnce");
  });

  it("should display error messages for invalid input", () => {
    const onSubmit = cy.stub().as("submitStub");
    cy.mount(<SignInCard onSubmit={onSubmit} />);

    cy.get('button[type="submit"]').click();
    cy.get("@submitStub").should("not.have.been.called");

    cy.contains("Email is required").should("be.visible");
    cy.contains("Password is required").should("be.visible");

    cy.getTextField("Email").type("invalid_email");
    cy.getTextField("Password").type("pass");

    cy.get('button[type="submit"]').click();
    cy.get("@submitStub").should("not.have.been.called");

    cy.contains("Invalid email").should("be.visible");
    cy.contains("Password must be at least 6 characters").should("be.visible");

    cy.getTextField("Email").clear().type(faker.internet.email());
    cy.getTextField("Password").clear().type(faker.internet.password());
  });
});
