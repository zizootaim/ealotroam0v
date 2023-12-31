const NUM_OF_PAGES = 4;
/* Phone Number Input Logic */
const input = document.querySelector("#phone");
window.intlTelInput(input, {
  separateDialCode: true,
  customPlaceholder: function (selectedCountryPlaceholder) {
    return "e.g. " + selectedCountryPlaceholder;
  },
});
[];

/* Scroll Logic and Form */

const continueBtn = document.getElementById("continue-btn");
const scrollBtns = document.querySelectorAll(".scroll-btn");
const formWrappers = document.querySelectorAll(".form-fields");
let currentPage = 0;

const updateUi = (direction) => {
  const targetScrollPosition = currentPage * window.innerHeight;
  if (direction === "up") {
    if (targetScrollPosition < 10) {
      scrollBtns[0].classList.add("disabled");
    }
    scrollBtns[1].classList.remove("disabled");
  } else {
    const currentScrollPosition = document.querySelector("main").scrollTop;
    const nextScroll = currentScrollPosition + 2 * window.innerHeight;
    const totalHeight = NUM_OF_PAGES * window.innerHeight;

    scrollBtns[0].classList.remove("disabled");
    if (nextScroll > totalHeight) {
      scrollBtns[1].classList.add("disabled");
    }
  }
  if (!Array.from(formWrappers[0].classList).includes("active")) {
    formWrappers[0].classList.add("active");
  }
};

const formInputs = {
  first_name: {
    required: true,
  },
  last_name: {
    required: true,
  },
  phone: {
    required: false,
  },
  email: {
    required: true,
  },
  money_amount: {
    required: false,
  },
  locationSearch: {
    required: true,
  },
  gender_option_input: {
    required: true,
  },
  dob_trigger: {
    required: true,
  },
};

const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
};

const validateForm = (inputs, canShowError) => {
  let isValid = true;
  Object.values(inputs).forEach((id) => {
    const required = formInputs[id].required;
    if (required) {
      const input = document.getElementById(id);
      let inputField = input.parentElement;
      const changeInputParent =
        inputField.className.includes("select") ||
        inputField.className.includes("date");
      if (changeInputParent) {
        inputField = inputField.parentElement.parentElement;
      }
      const isValidEmail = id === "email" ? validateEmail(input.value) : true;
      const isErrorExisted = !!inputField.querySelector(".error");
      if (!input.value || !isValidEmail) {
        if (!isErrorExisted && canShowError) {
          createErrorEl(inputField, changeInputParent);
        }
        isValid = false;
      } else if (isErrorExisted) {
        const errorEl = inputField.querySelector(".error");
        if (errorEl) inputField.removeChild(errorEl);
      }
    }
  });

  if (!isValid) {
    scrollBtns[1].classList.add("disabled");
  } else {
    scrollBtns[1].classList.remove("disabled");
  }

  return isValid;
};

const userDataInputs = ["first_name", "last_name", "email"];
const addressInputs = ["locationSearch", "gender_option_input", "dob_trigger"];

const scrollToSection = (direction) => {
  if (direction === "up") {
    if (currentPage > 0) currentPage--;
  } else {
    if (currentPage < 3) currentPage++;
  }
  // const targetScrollPosition = currentPage * window.innerHeight;
  const targetSection = document.getElementById(`sec-${currentPage}`);

  if (currentPage) {
    let firstInput = "";
    scrollBtns[1].classList.remove("disabled");
    switch (currentPage) {
      case 1:
        {
          validateForm(userDataInputs);

          firstInput = document.getElementById("first_name");
        }
        break;
      case 2: {
        validateForm(addressInputs);

        firstInput = document.getElementById("locationSearch");
        break;
      }
      case 3: {
        firstInput = document.getElementById("money_amount");
        scrollBtns[1].classList.add("disabled");
        break;
      }
    }

    firstInput.focus({
      preventScroll: true,
    });
  }

  // document.querySelector("main").scrollTo({
  //   top: targetScrollPosition,
  //   behavior: "smooth",
  // });
  if (targetSection) {
    targetSection.scrollIntoView({ behavior: "smooth" });
  }
};

continueBtn.addEventListener("click", () => {
  scrollToSection("down");
  formWrappers[0].classList.add("active");
  scrollBtns[0].classList.remove("disabled");
});

scrollBtns.forEach((scrollBtn, index) => {
  scrollBtn.addEventListener("click", () => {
    if (!index) {
      scrollToSection("up");
      updateUi("up");
    } else {
      scrollToSection("down");
      updateUi("down");
    }
  });
});

const fillProgressBar = () => {
  const progressBar = document.querySelector(".progress-bar");
  const filledWidth = progressBar.children[0].clientWidth;
  const calculatedWidth = filledWidth + progressBar.clientWidth / 3;
  progressBar.children[0].setAttribute("style", `width: ${calculatedWidth}px;`);
};

const createErrorEl = (inputField, addMarginTop) => {
  const errorEl = document.createElement("div");
  errorEl.classList.add("error");
  if (addMarginTop) {
    errorEl.classList.add("mt-10");
  }
  errorEl.innerHTML = `<svg height="24" viewBox="0 0 24 24" width="24">
      <path
        clip-rule="evenodd"
        d="M16.3361 17.9998L7.00279 18C5.49294 18 4.52754 16.391 5.23806 15.0588L9.90471 6.30882C10.6576 4.89706 12.6812 4.89706 13.4341 6.30881L18.1008 15.0586C18.8113 16.3908 17.8459 17.9998 16.3361 17.9998ZM11.6694 8.50003C12.2217 8.50003 12.6694 8.94774 12.6694 9.50003V11.5C12.6694 12.0523 12.2217 12.5 11.6694 12.5C11.1171 12.5 10.6694 12.0523 10.6694 11.5V9.50003C10.6694 8.94774 11.1171 8.50003 11.6694 8.50003ZM11.6694 16C12.2217 16 12.6694 15.5523 12.6694 15C12.6694 14.4477 12.2217 14 11.6694 14C11.1171 14 10.6694 14.4477 10.6694 15C10.6694 15.5523 11.1171 16 11.6694 16Z"
        fill-rule="evenodd"
      ></path>
      </svg>
      Please fill this in`;
  inputField.appendChild(errorEl);
};

const okBtns = document.querySelectorAll(".ok-btn");

okBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const inputID = btn.getAttribute("data-input_id");
    switch (inputID) {
      case "user_data":
        {
          if (!validateForm(userDataInputs, true)) {
            return;
          }
          fillProgressBar();
        }
        break;
      case "state_option_input":
        {
          if (!validateForm(addressInputs, true)) {
            return;
          }
          fillProgressBar();
        }
        break;
      default: {
        const inputValue = document.getElementById(inputID).value;
        if (inputValue) {
          fillProgressBar();
        }
      }
    }
    scrollToSection("down");
    updateUi("down");
  });
});

// /* Checkboxes Logic */
// const checkBtns = document.querySelectorAll(".checkboxes button");
// checkBtns.forEach((btn) => {
//   btn.addEventListener("click", () => {
//     checkBtns.forEach((btn) => {
//       btn.classList.remove("selected");
//     });
//     btn.classList.add("selected");
//   });
// });

/* Enter Event */

window.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    if (currentPage && currentPage < 4) {
      const currentSection = formWrappers[currentPage - 1];
      if (currentSection) {
        const okBtn = currentSection.querySelector(".ok-btn");
        okBtn.click();
      }
    } else {
      continueBtn.click();
    }
  }
});

const formatPhoneNumber = (number) => {
  number = number.replace(/\D/g, "");

  if (number.length <= 3) {
    return number;
  } else if (number.length <= 6) {
    return `(${number.slice(0, 3)}) ${number.slice(3)}`;
  } else if (number.length <= 10) {
    return `(${number.slice(0, 3)}) ${number.slice(3, 6)}-${number.slice(6)}`;
  } else {
    return `(${number.slice(0, 3)}) ${number.slice(3, 6)}-${number.slice(
      6,
      10
    )}${number.slice(10)}`;
  }
};

/* Behavior of Required Inputs and Phone Number */

const onRequiredInputting = (inputs) => {
  Object.values(inputs).forEach((inputID) => {
    document.getElementById(inputID).addEventListener("input", () => {
      let numOfValidInputs = 0;
      Object.values(inputs).forEach((id) => {
        const input = document.getElementById(id);
        if (input.value) {
          if (id === "email") {
            if (validateEmail(input.value)) {
              numOfValidInputs++;
            }
          } else numOfValidInputs++;
        }
      });
      if (numOfValidInputs === inputs.length) {
        scrollBtns[1].classList.remove("disabled");
      } else {
        scrollBtns[1].classList.add("disabled");
      }
    });
  });
};

onRequiredInputting(userDataInputs);
onRequiredInputting(addressInputs);

const phoneInput = document.getElementById("phone");
phoneInput.addEventListener("input", (e) => {
  const value = e.target.value;
  const selectedCode = document.querySelector(
    ".iti__selected-dial-code"
  ).textContent;
  if (selectedCode === "+1") {
    e.target.value = formatPhoneNumber(value);
  }
});

const dateInput = document.getElementById("dob");
const calendarBtn = document.getElementById("dob-calendar");
const dateTrigger = document.getElementById("dob_trigger");
const dateContainer = document.querySelector(".date-container");

const triggerCalendar = () => {
  dateContainer.classList.toggle("focus");
  dateInput.focus();
  dateInput.showPicker();
};

calendarBtn.addEventListener("click", () => {
  triggerCalendar();
});

dateTrigger.addEventListener("click", () => {
  triggerCalendar();
});

dateInput.addEventListener("change", (e) => {
  const selectedDate = new Date(e.target.value);

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  const americanDateFormat = selectedDate.toLocaleDateString("en-US", options);
  dateTrigger.setAttribute("value", americanDateFormat);
  validateForm(addressInputs);
});

// document.querySelector("main").scrollTo({
//   top: window.innerHeight * 1,
//   behavior: "smooth",
// });
// document.getElementById(`sec-2`).scrollIntoView({ behavior: "smooth" });
