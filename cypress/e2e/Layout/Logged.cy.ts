import { usersPage1 } from "../../../src/mocks/users";

const base_url = Cypress.config("baseUrl");
const signin_url = `${base_url}signin`;
const API = Cypress.env("NEXT_PUBLIC_API");

describe("Home - User Dashboard", () => {
  beforeEach(() => {
    cy.auth();
    cy.intercept(`${API}users?page=1`, usersPage1).as("getUsers1");
    cy.visit("/");
  });

  it("should toggle theme", () => {
    cy.get("html")
      .then(($el) => $el.css("color-scheme"))
      .then((currentTheme) => {
        cy.get('[aria-label="Toggle theme"]').click();
        cy.get("html")
          .then(($el) => $el.css("color-scheme"))
          .then((newTheme) => expect(currentTheme).to.not.equal(newTheme));
      });
  });

  it("should logout and redirect", () => {
    cy.intercept("DELETE", `${API}logout`).as("logout");
    cy.contains("Logout").click();
    cy.wait("@logout");
    cy.url().should("eq", signin_url);
  });
});
