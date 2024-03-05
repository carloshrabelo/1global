import UserFormDialog from ".";

describe("UserFormDialog Component", () => {
  it("should display form when button is clicked", () => {
    const onSubmit = cy.stub().as("submitStub");
    cy.mount(<UserFormDialog onSubmit={onSubmit} />);

    cy.contains("Create new user here").should("not.exist");

    cy.get('[data-cy="user-form-dialog-button"]').click();
    cy.contains("Create new user here").should("exist");
  });

  it("should hidden form when cancel button is clicked", () => {
    const onSubmit = cy.stub().as("submitStub");
    cy.mount(<UserFormDialog onSubmit={onSubmit} />);
    cy.get('[data-cy="user-form-dialog-button"]').click();
    cy.contains("Create new user here").should("exist");

    cy.contains("Cancel").click();
    cy.contains("Create new user here").should("not.exist");
  });
});
