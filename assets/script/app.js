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

const selectedImageFeedback = select(".selected-image-feedback");
const modalButton = select(".profile-image");
const modal = select(".modal");
const modalContent = select(".modal-content");
const textArea = select("textarea");
const postButton = select(".post-button-container");
const postsContainer = select(".posts-container");
const fileInput = select("#file");
let fileSelected = false;
let file;

function cleanInput() {
  textArea.value = "";
  fileSelected = false;
  file = null;
  fileInput.value = "";
  selectedImageFeedback.innerHTML = "";
}

function newImgUploaded(event) {
  fileSelected = true;
  file = event.target.files[0];

  const fileSelectedText = create("p");
  fileSelectedText.classList.add("file-selected-text");
  fileSelectedText.textContent = `${file.name}`;
  selectedImageFeedback.prepend(fileSelectedText);

  console.log(`File Selected`);
}

// Event listener for the file input change
onEvent("change", fileInput, newImgUploaded);

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

  if (fileSelected) {
    let imageContainer = create("div");
    let image = create("img");

    imageContainer.classList.add("post-body-image");
    image.src = URL.createObjectURL(file);

    post.appendChild(imageContainer);
    imageContainer.appendChild(image);
  }

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
  if (
    (event.key === "Enter" && textArea.value.trim().length > 0) ||
    fileSelected
  ) {
    // Prevents the default Enter key behavior (usually adding a new line)
    event.preventDefault();
    newPost();
    textArea.focus();
    cleanInput();
  } else if (event.key === "Enter") {
    // Prevents the default Enter key behavior (usually adding a new line)
    event.preventDefault();
    textArea.focus();
  }
}

// Adding the keydown event listener to the text area
onEvent("keydown", textArea, handleKeyDown);

onEvent("click", postButton, () => {
  if (textArea.value.trim().length > 0 || fileSelected) {
    newPost();
    textArea.focus();
    cleanInput();
  } else {
    textArea.focus();
  }
});

onEvent("load", window, () => {
  textArea.focus();
});

// Modal content from the Subscriber class
const modalContentText = create("p");
modalContentText.classList.add("modal-content-text");
modalContent.appendChild(modalContentText);
modalContentText.textContent = `Name: ${subscriberOne
  .getInfo()
  .split(", ")
  .splice(1, 2)
  .join(", ")} \n
Username: ${subscriberOne.getInfo().split(", ")[3]} \n
Email: ${subscriberOne.getInfo().split(", ")[4]} \n
Pages: ${subscriberOne.getInfo().split(", ")[5]} \n
Groups: ${subscriberOne.getInfo().split(", ")[6]} \n
Can Monetize: ${subscriberOne.getInfo().split(", ")[7]}`;

console.log(
  `Name: ${subscriberOne.getInfo().split(", ").splice(1, 2).join(", ")}`
);
console.log(`Username: ${subscriberOne.getInfo().split(", ")[3]}`);
console.log(`Email: ${subscriberOne.getInfo().split(", ")[4]}`);
console.log(`Pages: ${subscriberOne.getInfo().split(", ")[5]}`);
console.log(`Groups: ${subscriberOne.getInfo().split(", ")[6]}`);
console.log(`Can Monetize: ${subscriberOne.getInfo().split(", ")[7]}`);
