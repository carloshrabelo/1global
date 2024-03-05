import user from "@/mocks/users";
import UserForm from ".";

describe("UserForm Component", () => {
  it("should call send if all fields are correct", () => {
    const onSubmit = cy.stub().as("submitStub");
    cy.mount(<UserForm onSubmit={onSubmit} onCancel={cy.stub()} />);

    cy.getTextField("First Name").type(user.first_name);
    cy.getTextField("Last Name").type(user.last_name);
    cy.getTextField("Email").type(user.email);

    cy.contains("Save").click();

    cy.get("@submitStub").should("have.been.calledWith", {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    });
  });

  it("should not call send if fields are wrong", () => {
    const onSubmit = cy.stub().as("submitStub");
    cy.mount(<UserForm onSubmit={onSubmit} onCancel={cy.stub()} />);

    cy.contains("Save").click();
    cy.get("@submitStub").should("not.have.been.called");

    cy.contains("First Name must be at least 3 characters").should(
      "be.visible",
    );
    cy.contains("Last Name must be at least 3 characters").should("be.visible");
    cy.contains("Invalid email").should("be.visible");
  });

  it("should clear form if cancel was clicked", () => {
    const onCancel = cy.stub().as("cancelStub");
    cy.mount(<UserForm onSubmit={cy.stub()} onCancel={onCancel} />);

    cy.getTextField("First Name").type(user.first_name);
    cy.getTextField("Last Name").type(user.last_name);
    cy.getTextField("Email").type(user.email);

    cy.getTextField("First Name").should("have.value", user.first_name);
    cy.getTextField("Last Name").should("have.value", user.last_name);
    cy.getTextField("Email").should("have.value", user.email);

    cy.contains("Cancel").click();

    cy.getTextField("First Name").should("not.have.value", user.first_name);
    cy.getTextField("Last Name").should("not.have.value", user.last_name);
    cy.getTextField("Email").should("not.have.value", user.email);

    cy.get("@cancelStub").should("have.been.called");
  });
});
