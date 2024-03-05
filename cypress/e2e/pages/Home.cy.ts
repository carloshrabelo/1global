import firstUser, {
  makeUser,
  usersPage1,
  usersPage2,
} from "../../../src/mocks/users";

const API = Cypress.env("NEXT_PUBLIC_API");

describe("Home - User Dashboard", () => {
  beforeEach(() => {
    cy.auth();
    cy.intercept(`${API}users?page=1`, usersPage1).as("getUsers1");
    cy.intercept(`${API}users?page=2`, usersPage2).as("getUsers2");
    cy.visit("/");
  });

  it("should display users by pagination", () => {
    cy.wait("@getUsers1");

    for (const user of usersPage1.data) {
      cy.contains(`${user.first_name} ${user.last_name}`).should("be.visible");
      cy.contains(user.email).should("be.visible");
      cy.get(`img[src='${user.avatar}']`).should("be.visible");
    }

    cy.contains("Next").click();
    cy.wait("@getUsers2");

    for (const user of usersPage2.data) {
      cy.contains(`${user.first_name} ${user.last_name}`).should("be.visible");
      cy.contains(user.email).should("be.visible");
      cy.get(`img[src='${user.avatar}']`).should("be.visible");
    }
  });

  it("should add new user", () => {
    const user = makeUser();
    cy.intercept("POST", `${API}users`, { body: user }).as("newUser");

    cy.get('[aria-label="Create new user"]').click();

    cy.getTextField("First Name").type(user.first_name);
    cy.getTextField("Last Name").type(user.last_name);
    cy.getTextField("Email").type(user.email);

    cy.contains("Save").click();
    cy.wait("@newUser");

    cy.contains(`${user.first_name} ${user.last_name}`).should("be.visible");
    cy.contains(user.email).should("be.visible");
  });

  it("should remove user", () => {
    const [user] = usersPage1.data;
    cy.intercept("DELETE", `${API}users/${user.id}`).as("removeUser");

    cy.wait("@getUsers1");

    cy.contains(`${user.first_name} ${user.last_name}`).should("be.visible");
    cy.contains(user.email).should("be.visible");
    cy.get(`img[src='${user.avatar}']`).should("be.visible");

    cy.get('li:first [aria-label="Remove user"]').click();
    cy.wait("@removeUser");

    cy.contains(`${user.first_name} ${user.last_name}`).should("not.exist");
    cy.contains(user.email).should("not.exist");
  });

  it("should edit user", () => {
    const newUser = makeUser();
    cy.intercept("PUT", `${API}users/${firstUser.id}`).as("editUser");

    cy.wait("@getUsers1");

    cy.contains(`${firstUser.first_name} ${firstUser.last_name}`).should(
      "be.visible",
    );
    cy.contains(firstUser.email).should("be.visible");
    cy.get(`img[src='${firstUser.avatar}']`).should("be.visible");

    cy.get('li:first [aria-label="Edit user"]').click();

    cy.getTextField("First Name").clear().type(newUser.first_name);
    cy.getTextField("Last Name").clear().type(newUser.last_name);
    cy.getTextField("Email").clear().type(newUser.email);

    cy.contains("Save").click();
    cy.wait("@editUser");

    cy.contains(`${firstUser.first_name} ${firstUser.last_name}`).should(
      "not.exist",
    );
    cy.contains(firstUser.email).should("not.exist");
    cy.contains(`${newUser.first_name} ${newUser.last_name}`).should(
      "be.visible",
    );
    cy.contains(newUser.email).should("be.visible");
  });
});
