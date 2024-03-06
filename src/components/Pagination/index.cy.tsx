import React from "react";
import Pagination from ".";

describe("Pagination Component", () => {
  it("should call the previous value when clicking on previous", () => {
    const onClick = cy.stub().as("onClick");
    cy.mount(<Pagination current={3} pages={5} onClick={onClick} />);

    cy.get('[aria-label="Previous page"]').click();
    cy.get("@onClick").should("have.been.calledOnceWith", 2);
  });

  it("should call the next value when clicking on previous", () => {
    const onClick = cy.stub().as("onClick");
    cy.mount(<Pagination current={3} pages={5} onClick={onClick} />);

    cy.get('[aria-label="Next page"]').click();
    cy.get("@onClick").should("have.been.calledOnceWith", 4);
  });

  it("should not call the previous value if it is already active", () => {
    const onClick = cy.stub().as("onClick");
    cy.mount(<Pagination current={1} pages={5} onClick={onClick} />);

    cy.get('[aria-label="Previous page"]').click({ force: true });
    cy.get("@onClick").should("not.have.been.called");
  });

  it("should not call the next value if it is already active", () => {
    const onClick = cy.stub().as("onClick");
    cy.mount(<Pagination current={5} pages={5} onClick={onClick} />);

    cy.get('[aria-label="Next page"]').click({ force: true });
    cy.get("@onClick").should("not.have.been.called");
  });
});
