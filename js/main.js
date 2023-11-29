/* Phone Number Input Logic */
const input = document.querySelector("#phone");
window.intlTelInput(input, {
  separateDialCode: true,
  customPlaceholder: function (selectedCountryPlaceholder) {
    return "e.g. " + selectedCountryPlaceholder;
  },
});
[];

/* Scroll Logic */
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
    const totalHeight = 6 * window.innerHeight;

    scrollBtns[0].classList.remove("disabled");
    if (nextScroll > totalHeight) {
      scrollBtns[1].classList.add("disabled");
    }
  }
  if (!Array.from(formWrappers[0].classList).includes("active")) {
    formWrappers[0].classList.add("active");
  }
};

const scrollToSection = (direction) => {
  if (direction === "up") {
    if (currentPage > 0) currentPage--;
  } else {
    if (currentPage < 6) currentPage++;
  }
  const targetScrollPosition = currentPage * window.innerHeight;

  document.querySelector("main").scrollTo({
    top: targetScrollPosition,
    behavior: "smooth",
  });
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

/* Form Logic */
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
    required: true,
  },
  state_option_input: {
    required: false,
  },
  age: {
    required: false,
  },
  have_smoked: {
    required: false,
  },
  select_paying_input: {
    required: false,
  },
};

const fillProgressBar = () => {
  const progressBar = document.querySelector(".progress-bar");
  const filledWidth = progressBar.children[0].clientWidth;
  const calculatedWidth = filledWidth + progressBar.clientWidth / 5;
  progressBar.children[0].setAttribute("style", `width: ${calculatedWidth}px;`);
};

const createErrorEl = (inputField) => {
  const errorEl = document.createElement("div");
  errorEl.classList.add("error");
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

const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
};

const validateForm = (formInputs) => {
  let isValid = true;
  Object.keys(formInputs).forEach((id) => {
    const required = formInputs[id].required;
    if (required) {
      const input = document.getElementById(id);
      const inputField = input.parentElement;
      const isValidEmail = id === "email" ? validateEmail(input.value) : true;
      const errorIndex = id !== "money_amount" ? 2 : 1;
      const isErrorExisted = !!inputField.children[errorIndex];

      if (!input.value || !isValidEmail) {
        if (!isErrorExisted) {
          createErrorEl(inputField);
        }
        isValid = false;
      } else if (isErrorExisted) {
        const errorEl = input.parentElement.querySelector(".error");
        input.parentElement.removeChild(errorEl);
      }
    }
  });
  return isValid;
};

const okBtns = document.querySelectorAll(".ok-btn");

okBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const inputID = btn.getAttribute("data-input_id");
    switch (inputID) {
      case "user_data":
        {
          const { money_amount, ...formInputsToValidate } = formInputs;
          if (!validateForm(formInputsToValidate)) {
            return;
          }
          fillProgressBar();
        }
        break;
      case "money_amount":
        {
          const { money_amount } = formInputs;
          if (!validateForm({ money_amount })) {
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

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

/* Checkboxes Logic */
const checkBtns = document.querySelectorAll(".checkboxes button");

checkBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    checkBtns.forEach((btn) => {
      btn.classList.remove("selected");
    });
    btn.classList.add("selected");
  });
});

/* Enter Event */
window.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    if (currentPage && currentPage < 6) {
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

// if (window.innerWidth < 550) {
//   function getRealViewportHeight() {
//     const doc = document.documentElement;
//     const vh = window.innerHeight || doc.clientHeight;

//     // Mobile browsers often include the address bar height in the initial
//     // window.innerHeight. We can adjust it by checking the orientation.
//     const isPortrait = window.matchMedia("(orientation: portrait)").matches;
//     const chromeHeight = isPortrait ? screen.height - vh : screen.width - vh;

//     // Calculate the adjusted viewport height
//     const realViewportHeight = vh + chromeHeight;

//     document.querySelector("main").style.height = `${realViewportHeight}px`;
//     document.querySelector(
//       ".form-wrapper"
//     ).style.height = `${realViewportHeight}px`;
//     document.querySelector(
//       ".form-fields"
//     ).style.height = `${realViewportHeight}px`;
//   }

//   window.addEventListener("resize", () => {
//     getRealViewportHeight();
//   });
//   getRealViewportHeight();
// }

// Adjust the height on mobile devices
function setMobileHeight() {
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  if (isMobile) {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
}

// Call the function on window resize
window.addEventListener("resize", setMobileHeight);
