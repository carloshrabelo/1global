import { faker } from "@faker-js/faker";
import SignUpCard from ".";

describe("SignUpCard Component", () => {
  it("submits the form correctly", () => {
    const onSubmit = cy.stub().as("submitStub");
    const password = faker.internet.password();
    cy.mount(<SignUpCard onSubmit={onSubmit} />);

    cy.getTextField("Email").type(faker.internet.email());
    cy.getTextField("Password").type(password);
    cy.getTextField("Confirm Password").type(password);
    cy.get('button[type="submit"]').click();

    cy.get("@submitStub").should("have.been.calledOnce");
  });

  it("should display error messages for invalid input", () => {
    const onSubmit = cy.stub().as("submitStub");
    cy.mount(<SignUpCard onSubmit={onSubmit} />);

    cy.get('button[type="submit"]').click();
    cy.get("@submitStub").should("not.have.been.called");

    cy.contains("Email is required").should("be.visible");
    cy.contains("Password is required").should("be.visible");

    cy.getTextField("Email").type("invalid_email");
    cy.getTextField("Password").type("pass");
    cy.getTextField("Confirm Password").type("pass");

    cy.get('button[type="submit"]').click();
    cy.get("@submitStub").should("not.have.been.called");
    // cy.get('@submitStub').should('have.been.calledOnce');

    cy.contains("Invalid email").should("be.visible");
    cy.contains("Password must be at least 6 characters").should("be.visible");

    cy.getTextField("Email").clear().type(faker.internet.email());
    cy.getTextField("Password").clear().type(faker.internet.password());
    cy.getTextField("Confirm Password").type(faker.internet.password());
    cy.contains("Passwords don't match").should("be.visible");
  });
});
