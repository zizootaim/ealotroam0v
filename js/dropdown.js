let index = 1;

const on = (listener, query, fn) => {
  document.querySelectorAll(query).forEach((item) => {
    item.addEventListener(listener, (el) => {
      fn(el);
    });
  });
};

const onArrowClick = (item) => {
  const next = item.target.parentElement.nextElementSibling;

  next.classList.toggle("toggle");
  next.style.zIndex = index++;
};

const onOptionClick = (item, selectInput) => {
  item.target.parentElement.classList.remove("toggle");
  const value = item.target.getAttribute("data-value");
  selectInput.value = value;
};

const onInput = (e, options, selectInput) => {
  const next = selectInput.parentElement.nextElementSibling;
  next.classList.add("toggle");
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

const stateSelectInput = document.getElementById("state_option_input");
const stateOptions = document.querySelectorAll(".state-option");

on("click", ".select-state", (item) => {
  onArrowClick(item);
});
on("click", ".state-option", (item) => {
  onOptionClick(item, stateSelectInput);
});
stateSelectInput.addEventListener("input", (e) => {
  onInput(e, stateOptions, stateSelectInput);
});

/* Select Paying */
const payingInput = document.getElementById("select_paying_input");
const payingOptions = document.querySelectorAll(".paying-option");

on("click", ".select-paying", (item) => {
  onArrowClick(item);
});
on("click", ".paying-option", (item) => {
  onOptionClick(item, payingInput);
  fillProgressBar();
});
payingInput.addEventListener("input", (e) => {
  onInput(e, payingOptions, payingInput);
});
