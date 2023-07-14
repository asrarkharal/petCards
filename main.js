// https://learnwebcode.github.io/pet-adoption-data/pets.json
const uRL = "https://learnwebcode.github.io/pet-adoption-data/pets.json";
const petPromise = await fetch(uRL);
const pets = await petPromise.json();

const template = document.querySelector("#animal-cards-template");
const wrapper = document.createElement("div");

function decideAgeText(age) {
  if (!age) {
    return "Less than a year old";
  }
  return age > 1 ? `${age} year old` : "1 year old";
}

pets.forEach((pet) => {
  const clone = template.content.cloneNode(true);
  clone.querySelector("h3").textContent = pet.name;
  clone.querySelector(".para-detail").textContent = pet.description;
  clone.querySelector(".name").textContent = pet.name;
  const img = clone.querySelector("img");
  img.src = pet.photo;
  img.alt = `A ${pet.species} named ${pet.name}`;

  const age = new Date().getFullYear() - pet.birthYear;
  const ageText = decideAgeText(age);
  clone.querySelector(".age").textContent = ageText;
  clone.querySelector(".species").textContent = pet.species;

  const primaryBtn = clone.querySelector(".primary-btn");
  primaryBtn.addEventListener("click", handleAdopt);
  wrapper.appendChild(clone);
});
function handleAdopt(e) {
  e.preventDefault();
  console.log(e.target.textContent);
  var n = document.querySelector(".adoptedNumber");
  console.log(n.textContent);
  n.textContent = parseInt(n.textContent) + 1;
}

document.querySelector(".animals-list").appendChild(wrapper);

const filterButtons = document.querySelectorAll(".filter-nav");

filterButtons.forEach((element) => {
  element.addEventListener("click", handleFilterClick);
});

function handleFilterClick(e) {
  e.preventDefault();
  var elements = document.querySelector(".active");
  if (elements !== null) {
    elements.classList.remove("active");
  }
  e.target.classList.add("active");

  filterPets(e.target.dataset.filter);
}

function filterPets(species) {
  const allPets = document.querySelectorAll(".pet-card");

  if (species == "all") {
    allPets.forEach((element) => {
      element.style.display = "";
    });
  } else {
    allPets.forEach((element) => {
      if (element.querySelector(".species").textContent == species) {
        element.style.display = "";
      } else {
        element.style.display = "none";
      }
    });
  }
}
