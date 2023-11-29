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
