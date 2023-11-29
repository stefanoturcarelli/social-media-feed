"use strict";

import {
  onEvent,
  getElement,
  select,
  selectAll,
  print,
  sleep,
  randomNumber,
  filterArray,
  create,
} from "./utils.js";

import User from "./User.js";
import Subscriber from "./Subscriber.js";

const modalButton = select(".profile-image");
const modal = select(".modal");
const textArea = select("textarea");
const postButton = select(".post-button-container");
const postsContainer = select(".posts-container");

const subscriberOne = new Subscriber(
  123,
  "Stefano",
  "Turcarelli",
  "stefTrooper",
  "stefano@email.com",
  ["Cookers", "Drivers"],
  ["Instructors"],
  false
);

// ! Posting

function newPost() {
  let post = create("div");
  post.classList.add("post");

  // Create post-header
  const postHeader = create("div");
  postHeader.classList.add("post-header");
  post.appendChild(postHeader);

  // Create post-header-image
  let profileImage = create("div");
  profileImage.classList.add("post-header-image");
  postHeader.appendChild(profileImage);

  // Create post-header-text
  let postHeaderText = create("div");
  postHeaderText.classList.add("post-header-text");
  postHeader.appendChild(postHeaderText);

  let user = create("p");
  user.classList.add("user");
  user.textContent = subscriberOne.firstName + " " + subscriberOne.lastName;
  postHeaderText.appendChild(user);

  let date = create("p");
  date.classList.add("date");
  // Options for date formatting
  let options = {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  date.textContent = new Date().toLocaleDateString("en-CA", options).toString();
  postHeaderText.appendChild(date);

  // Create post body
  let text = create("p");
  text.textContent = textArea.value;
  post.appendChild(text);

  postsContainer.insertBefore(post, postsContainer.firstChild);

  textArea.value = "";
}

// ! Modal

function toggleModal() {
  modal.classList.toggle("visible");
}

function closeModal() {
  modal.classList.remove("visible");
}

function closeModalOnEsc(event) {
  if (event.key === "Escape") {
    closeModal();
  }
}

onEvent("click", modalButton, toggleModal);

onEvent("keyup", document, closeModalOnEsc);

// Function to handle keydown event on the text area
function handleKeyDown(event) {
  if (event.key === "Enter" && textArea.value.trim().length > 0) {
    event.preventDefault(); // Prevents the default Enter key behavior (usually adding a new line)
    newPost();
    textArea.focus();
  }
}

// Adding the keydown event listener to the text area
onEvent("keydown", textArea, handleKeyDown);

onEvent("click", postButton, () => {
  if (textArea.value.trim().length > 0) {
    newPost();
    textArea.focus();
  }
});

onEvent("load", window, () => {
  textArea.focus();
});
