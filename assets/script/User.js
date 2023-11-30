// User (the base/parent class)
// private properties
// constructor
// getters

// getInfo()
// The data to populate the pop-up modal comes from the getInfo() method

class User {
  #id;
  #firstName;
  #lastName;
  #username;
  #email;

  constructor(id, firstName, lastName, username, email) {
    this.#id = id;
    this.#firstName = firstName;
    this.#lastName = lastName;
    this.#username = username;
    this.#email = email;
  }

  get id() {
    return this.#id;
  }

  get firstName() {
    return this.#firstName;
  }

  get lastName() {
    return this.#lastName;
  }

  get username() {
    return this.#username;
  }

  get email() {
    return this.#email;
  }

  getInfo() {
    return `${this.#id}, ${this.#firstName}, ${this.#lastName}, ${
      this.#username
    }, ${this.#email}`;
  }
}

export default User;
