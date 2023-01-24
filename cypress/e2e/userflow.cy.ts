import "../support/commands";

describe("User Flow", () => {
  before(() => {
    cy.clearLocalStorageSnapshot();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it("should visit the site", () => {
    cy.visit("http://localhost:3000");
    cy.url().should("include", "localhost:3000");
  });

  it("should navigate to the register page", () => {
    cy.get("button[name='register-button']").click();
    cy.url().should("include", "localhost:3000/register");
  });

  it("should register a new user, and navigate to login", () => {
    cy.get("input[id='firstName']").type("Tianwu");
    cy.get("input[id='lastName']").type("Shen");
    cy.get("input[id='email']").type("test@gmail.com");
    cy.get("input[id='password']").type("password");
    cy.get("input[id='confirm']").type("password");
    cy.get("button[name='register']").click();
    cy.url().should("include", "localhost:3000/login");
  });

  it("should login the user, and navigate to the landing page", () => {
    cy.get("input[id='email']").type("test@gmail.com");
    cy.get("input[id='password']").type("password");
    cy.get("button[name='login']").click();
    cy.getLocalStorage("token").should("exist");
    cy.saveLocalStorage();
    cy.url().should("include", "localhost:3000");
  });

  it("create a new listing", () => {
    cy.get("button[name='menu-button']").click();
    cy.get("button[name='hostedlistings-button']").click();
    cy.url().should("include", "localhost:3000/hostedlistings");
    cy.get("button[name='new-listing-button']").click();
    cy.url().should("include", "localhost:3000/hostedlistings/create");
    // basic
    cy.get("input[id='title']").type("Test Listing");
    cy.get("input[id='price']").type("100");
    cy.get("[id='propertyType']").select("apartment");
    // address
    cy.get("input[id='street']").type("street");
    cy.get("input[id='city']").type("city");
    cy.get("input[id='state']").type("state");
    cy.get("input[id='postcode']").type("12345");
    cy.get("input[id='country']").type("country");
    // bedrooms
    cy.get("button[name='add-bedroom-button']").click();
    cy.get("input[id='metadata.bedrooms.0.single']").type("1");
    // bathrooms
    cy.get("input[id='metadata.bathrooms']").type("1");
    // thumbnail
    const fileName = "openpees2.png";
    cy.get("input[type='file']").attachFile(fileName);
    cy.wait(1000);
    // submit
    cy.getLocalStorage("user").should("exist");
    cy.get("button[type='submit']").click();
    cy.wait(1000);
    cy.url().should("include", "localhost:3000/hostedlistings");
  });

  it("Updates the thumbnail and title of the listing successfully", () => {
    cy.get("button[name='edit-button']").click();
    cy.get("input[id='title']").type("Test Listing 2");
    const fileName = "cat.jpg";
    cy.get("input[type='file']").attachFile(fileName);
    cy.wait(1000);
    cy.get("button[type='submit']").click();
    cy.wait(1000);
    cy.url().should("include", "localhost:3000/hostedlistings");
  });

  it("Publish a listing successfully", () => {
    cy.contains("Unpublished").click();
    cy.get(":nth-child(25) > .rdrDayNumber > span").click();
    cy.get(":nth-child(27) > .rdrDayNumber > span").click();
    cy.get("button[name='publish-modal-submit']").click();
    cy.wait(1000);
    cy.url().should("include", "localhost:3000/hostedlistings");
  });

  it("Unpublish a listing successfully", () => {
    cy.contains("Published").click();
    cy.contains("Yes").click();
    cy.wait(1000);
    cy.url().should("include", "localhost:3000/hostedlistings");
  });

  it("Publish again for booking", () => {
    cy.contains("Unpublished").click();
    cy.get(":nth-child(25) > .rdrDayNumber > span").click();
    cy.get(":nth-child(27) > .rdrDayNumber > span").click();
    cy.get("button[name='publish-modal-submit']").click();
    cy.wait(1000);
    cy.url().should("include", "localhost:3000/hostedlistings");
  });

  // Logout
  it("should logout the user, and navigate to the landing page", () => {
    cy.get("button[name='menu-button']").click();
    cy.get("button[name='logout-button']").click();
    cy.getLocalStorage("token").should("not.exist");
    cy.url().should("include", "localhost:3000");
  });

  // Create another user to book the listing
  it("should visit the site", () => {
    cy.visit("http://localhost:3000");
    cy.url().should("include", "localhost:3000");
  });

  it("should navigate to the register page", () => {
    cy.get("button[name='register-button']").click();
    cy.url().should("include", "localhost:3000/register");
  });

  it("Register another user", () => {
    cy.clearLocalStorageSnapshot();
    cy.get("input[id='firstName']").type("Tianwu");
    cy.get("input[id='lastName']").type("Shen");
    cy.get("input[id='email']").type("test2@gmail.com");
    cy.get("input[id='password']").type("password");
    cy.get("input[id='confirm']").type("password");
    cy.get("button[name='register']").click();
    cy.url().should("include", "localhost:3000/login");
  });

  it("Login as another user", () => {
    cy.get("input[id='email']").type("test2@gmail.com");
    cy.get("input[id='password']").type("password");
    cy.get("button[name='login']").click();
    cy.getLocalStorage("token").should("exist");
    cy.saveLocalStorage();
    cy.url().should("include", "localhost:3000");
  });

  it("Book a listing successfully", () => {
    cy.get("button[name='all-listings-button']").click();
    cy.url().should("include", "localhost:3000/listings");
    cy.get(".chakra-link").click();
    cy.get(":nth-child(25) > .rdrDayNumber > span").click();
    cy.get(":nth-child(27) > .rdrDayNumber > span").click();
    cy.get(".css-d1bddl > .chakra-button").click();
    cy.wait(1000);
    cy.url().should("include", "localhost:3000/listing");
  });

  // Logout
  it("should logout the user, and navigate to the landing page", () => {
    cy.get("[id='logo-link']").click({ force: true });
    cy.get("button[name='menu-button']").click();
    cy.get("button[name='logout-button']").click();
    cy.getLocalStorage("token").should("not.exist");
    cy.url().should("include", "localhost:3000");
  });

  // Login back
  it("Login as another user", () => {
    cy.get("button[name='login-button']").click();
    cy.url().should("include", "localhost:3000/login");
    cy.get("input[id='email']").type("test2@gmail.com");
    cy.get("input[id='password']").type("password");
    cy.get("button[name='login']").click();
    cy.getLocalStorage("token").should("exist");
    cy.saveLocalStorage();
    cy.url().should("include", "localhost:3000");
  });
});
