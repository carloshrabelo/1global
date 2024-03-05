import "./commands";

import { mount } from "cypress/react18";
import "../../src/app/globals.css";
import { mountWithTheme } from "./mountWithTheme";

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

Cypress.Commands.add("mount", mountWithTheme);
