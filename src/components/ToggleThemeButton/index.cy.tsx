import ToggleThemeButton from ".";

describe("ToggleThemeButton Component", () => {
  it("should toggle theme", () => {
    cy.mount(<ToggleThemeButton />);

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
