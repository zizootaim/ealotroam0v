const stateSelectInput = document.getElementById("state_option_input");
const stateOptions = document.querySelectorAll(".state-option");

const locationSearchInput = document.getElementById("locationSearch");
var locationSearchOptions = document.querySelectorAll(".locationSearch-option");

const genderSelectInput = document.getElementById("gender_option_input");
const genderOptions = document.querySelectorAll(".gender-option");

let index = 1;

const on = (listener, query, fn) => {
  document.querySelectorAll(query).forEach((item) => {
    item.addEventListener(listener, (el) => {
      fn(el);
    });
  });
};

const onDropdownClick = (item) => {
  const next = item.target.parentElement.nextElementSibling;

  next.classList.toggle("open-dropdown");
  next.style.zIndex = index++;
};

const onOptionClick = (item, selectInput) => {
  const value = item.target.getAttribute("data-value");
  selectInput.value = value;

  var event = new Event("input");
  selectInput.dispatchEvent(event);
  item.target.parentElement.classList.remove("open-dropdown");

  const id = selectInput.getAttribute("id");
  if (id === "state_option_input") {
    stateOptions.forEach((option) => {
      option.classList.remove("disabled");
    });
  } else {
    genderOptions.forEach((option) => {
      option.classList.remove("disabled");
    });
  }
};

const onInput = (e, options, selectInput) => {
  const next = selectInput.parentElement.nextElementSibling;
  next.classList.add("open-dropdown");
  next.style.zIndex = index++;
  const inputValue = e.target.value.trim().toLocaleLowerCase();
  options.forEach((option) => {
    const value = option.getAttribute("data-value").trim().toLocaleLowerCase();
    if (!value.startsWith(inputValue)) {
      option.classList.add("disabled");
    } else {
      option.classList.remove("disabled");
    }
  });
};

on("click", ".select-locationSearch", (item) => {
  onDropdownClick(item);
});
on("click", ".locationSearch-option", (item) => {
  onOptionClick(item, locationSearchInput);
});

locationSearchInput.addEventListener("input", (e) => {
  onInput(e, locationSearchOptions, locationSearchInput);
});

on("click", ".select-state", (item) => {
  onDropdownClick(item);
});
on("click", ".state-option", (item) => {
  onOptionClick(item, stateSelectInput);
});

stateSelectInput.addEventListener("input", (e) => {
  onInput(e, stateOptions, stateSelectInput);
});

on("click", ".select-gender", (item) => {
  onDropdownClick(item);
});

on("click", ".gender-option", (item) => {
  onOptionClick(item, genderSelectInput);
});

on("click", "#gender_option_input", (item) => {
  onDropdownClick(item);
});

on("click", "#state_option_input", (item) => {
  onDropdownClick(item);
});

// Close all dropdowns when clicking outside
document.addEventListener("click", function (event) {
  const dropdowns = document.querySelectorAll(".select");

  let insideDropdown = false;
  for (const dropdown of dropdowns) {
    if (dropdown.contains(event.target)) {
      insideDropdown = true;
      break;
    }
  }

  if (!insideDropdown) {
    for (const dropdown of dropdowns) {
      dropdown.children[1].classList.remove("open-dropdown");
    }
  }
});
