import React from "react";
import PageNumbers, { PAGE_DISTANCE } from "./PageNumbers";

const pages = PAGE_DISTANCE * 5;

describe("PageNumbers Component", () => {
  it(`should displays only the first ${PAGE_DISTANCE + 1}`, () => {
    const distance = PAGE_DISTANCE + 1;
    cy.mount(<PageNumbers current={1} pages={pages} onClick={cy.stub()} />);
    for (let i = 1; i < distance; i++) {
      cy.contains(i).should("be.visible");
    }
    cy.contains("4").should("not.exist");
  });

  it(`should displays only the last ${PAGE_DISTANCE + 1}`, () => {
    const distance = pages - PAGE_DISTANCE;
    cy.mount(<PageNumbers current={pages} pages={pages} onClick={cy.stub()} />);
    for (let i = distance; i < pages; i++) {
      cy.contains(i).should("be.visible");
    }

    cy.contains(distance - 1).should("not.exist");
  });

  it("should emit value when button is clicked", () => {
    const onClick = cy.stub().as("onClick");
    cy.mount(<PageNumbers current={1} pages={pages} onClick={onClick} />);
    cy.contains("2").click();

    cy.get("@onClick").should("have.been.calledOnceWith", 2);
  });

  it("should not emit value when button is clicked if it is active", () => {
    const onClick = cy.stub().as("onClick");
    cy.mount(<PageNumbers current={1} pages={pages} onClick={onClick} />);
    cy.contains("1").click({ force: true });

    cy.get("@onClick").should("not.have.been.called");
  });
});
