import accountID from "../fixtures/account.json";

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

describe("Login", () => {
  beforeEach(() => {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );
    cy.contains("Login").should("be.visible");
  });

  it("Should login and Logout with valid username and password", () => {
    cy.get("input[placeholder='Username']").type(accountID.username);
    cy.get("input[placeholder='Password']").type(accountID.password);
    cy.get("button[type='submit']").click();
    cy.contains("Dashboard", { timeout: 15000 }).should("be.visible");

    cy.get(".oxd-userdropdown-tab").click();
    cy.contains("Logout").click();
    cy.contains("Login").should("be.visible");
  });
  it("Should display error for existing user when invalid password", () => {
    cy.get("input[placeholder='Username']").type(accountID.username);
    cy.get("input[placeholder='Password']").type("password");
    cy.get("button[type='submit']").click();
    cy.get(".oxd-text.oxd-text--p.oxd-alert-content-text").should(
      "have.text",
      "Invalid credentials"
    );
  });
  it("Should display error for existing user when invalid username", () => {
    cy.get("input[placeholder='Username']").type("Username");
    cy.get("input[placeholder='Password']").type(accountID.password);
    cy.get("button[type='submit']").click();
    cy.get(".oxd-text.oxd-text--p.oxd-alert-content-text").should(
      "have.text",
      "Invalid credentials"
    );
  });
  it("Should display error for existing user when invalid username & invalid password", () => {
    // cy.get("input[placeholder='Username']").type("Username");
    // cy.get("input[placeholder='Password']").type("Password");
    cy.get("button[type='submit']").click();
    cy.get(":nth-child(2) > .oxd-input-group > .oxd-text")
      .should("be.visible")
      .and("have.text", "Required");
    cy.get(":nth-child(3) > .oxd-input-group > .oxd-text")
      .should("be.visible")
      .and("have.text", "Required");
  });
});
