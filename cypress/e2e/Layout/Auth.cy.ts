const url = Cypress.env("url");
const signin_url = `${url}signin`;
describe("Home - User Dashboard", () => {
  it("should toggle theme", () => {
    cy.visit(signin_url);
    cy.get("html")
      .then(($el) => $el.css("color-scheme"))
      .then((currentTheme) => {
        cy.get('[aria-label="Toggle theme"]').click();
        cy.get("html")
          .then(($el) => $el.css("color-scheme"))
          .then((newTheme) => expect(currentTheme).to.not.equal(newTheme));
      });
  });
});
