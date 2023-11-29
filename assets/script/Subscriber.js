// Subscriber (the derived/child class)
// The Subscriber class uses the base class method as part of its own
// implementation.

// pages
// groups
// canMonetize

// (groups and pages are arrays, canMonetize is a Boolean

// private properties
// constructor
// getters

// getInfo()
// The data to populate the pop-up modal comes from the getInfo() method

class Subscriber extends User {
  #pages = [];
  #groups = [];
  #canMonetize = false;

  constructor(
    id,
    firstName,
    lastName,
    username,
    email,
    pages,
    groups,
    canMonetize
  ) {
    super(id, firstName, lastName, username, email);
    this.#pages = pages;
    this.#groups = groups;
    this.#canMonetize = canMonetize;
  }

  get pages() {
    return this.#pages;
  }

  get groups() {
    return this.#groups;
  }

  get canMonetize() {
    return this.#canMonetize;
  }

  getInfo() {
    return `${super.getInfo()} ${this.#pages} ${this.#groups} ${
      this.#canMonetize
    }`;
  }
}
