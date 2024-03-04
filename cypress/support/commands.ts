import { faker } from "@faker-js/faker";
import { USER_TOKEN } from "../../src/utils/constants";

Cypress.Commands.add("auth", () => {
  cy.setCookie(USER_TOKEN, faker.string.alpha(10));
});

Cypress.Commands.add("getTextField", (label) => {
  cy.log("**getTextField**");

  cy.contains(label).then(
    (label?: Cypress.JQueryWithSelector<HTMLLabelElement>) =>
      label?.parent().find("input"),
  );
});

declare global {
  namespace Cypress {
    interface Chainable {
      auth(): Chainable<void>;
      getTextField(label: string): Chainable<void>;
    }
  }
}

// biome-ignore lint/complexity/noUselessEmptyExport: <explanation>
export {};
