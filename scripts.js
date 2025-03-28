document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu functionality
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // Enhanced Modal functionality
  const registerBtn = document.getElementById("register-btn");
  const registerModal = document.getElementById("registerModal");
  const loginModal = document.getElementById("loginModal");
  const bookingModal = document.getElementById("bookingModal");
  const closeButtons = document.querySelectorAll(".close");
  const bookNowButtons = document.querySelectorAll(".book-now-btn");
  const switchToLogin = document.getElementById("switchToLogin");
  const switchToRegister = document.getElementById("switchToRegister");
  const togglePassword = document.getElementById("togglePassword");
  const loginPassword = document.getElementById("loginPassword");

  // Function to show a modal with animation
  function showModal(modal) {
    modal.style.display = "block";
    // Trigger a reflow to ensure the transition applies
    modal.offsetHeight;
    modal.classList.add("show");
    document.body.style.overflow = "hidden"; // Prevent scrolling
  }

  // Function to hide a modal with animation
  function hideModal(modal) {
    modal.classList.remove("show");
    // Wait for animation to complete before hiding
    setTimeout(() => {
      modal.style.display = "none";
      document.body.style.overflow = ""; // Enable scrolling again
    }, 300);
  }

  // Register button opens register modal
  if (registerBtn && registerModal) {
    registerBtn.addEventListener("click", (e) => {
      e.preventDefault();
      showModal(registerModal);
    });
  }

  // Close buttons hide modals
  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (registerModal.classList.contains("show")) hideModal(registerModal);
      if (loginModal.classList.contains("show")) hideModal(loginModal);
      if (bookingModal.classList.contains("show")) hideModal(bookingModal);
    });
  });

  // Book Now buttons open booking modal
  bookNowButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      showModal(bookingModal);
    });
  });

  // Switch between login and register modals
  if (switchToLogin) {
    switchToLogin.addEventListener("click", (e) => {
      e.preventDefault();
      hideModal(registerModal);
      setTimeout(() => {
        showModal(loginModal);
      }, 350);
    });
  }

  if (switchToRegister) {
    switchToRegister.addEventListener("click", (e) => {
      e.preventDefault();
      hideModal(loginModal);
      setTimeout(() => {
        showModal(registerModal);
      }, 350);
    });
  }

  // Toggle password visibility
  if (togglePassword && loginPassword) {
    togglePassword.addEventListener("click", () => {
      const type =
        loginPassword.getAttribute("type") === "password" ? "text" : "password";
      loginPassword.setAttribute("type", type);
      togglePassword.innerHTML =
        type === "password"
          ? '<i class="fas fa-eye"></i>'
          : '<i class="fas fa-eye-slash"></i>';
    });
  }

  // Close modal when clicking outside
  window.addEventListener("click", (event) => {
    if (event.target === registerModal) hideModal(registerModal);
    if (event.target === loginModal) hideModal(loginModal);
    if (event.target === bookingModal) hideModal(bookingModal);
  });

  // Form validation with visual feedback
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Simulate successful form submission
      const formInputs = this.querySelectorAll("input, select, textarea");
      let isValid = true;

      formInputs.forEach((input) => {
        if (input.hasAttribute("required") && !input.value.trim()) {
          isValid = false;
          input.classList.add("error");
          setTimeout(() => input.classList.remove("error"), 3000);
        } else {
          input.classList.remove("error");
        }
      });

      if (isValid) {
        // Show success message or redirect
        this.innerHTML = `
          <div class="success-message">
            <i class="fas fa-check-circle"></i>
            <h3>Success!</h3>
            <p>Your submission was successful.</p>
          </div>
        `;

        // Close the modal after a delay
        setTimeout(() => {
          if (this.closest(".modal")) {
            hideModal(this.closest(".modal"));

            // Reset form after hiding
            setTimeout(() => {
              this.reset();
              // Restore original form content (would need to be implemented)
            }, 300);
          }
        }, 2000);
      }
    });
  });

  // Add some additional CSS for form validation
  const style = document.createElement("style");
  style.textContent = `
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
      border-color: #ff3860;
      animation: shake 0.5s;
    }
    
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20%, 60% { transform: translateX(-5px); }
      40%, 80% { transform: translateX(5px); }
    }
    
    .success-message {
      text-align: center;
      padding: 2rem;
      color: var(--primary);
    }
    
    .success-message i {
      font-size: 4rem;
      margin-bottom: 1rem;
    }
    
    .success-message h3 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }
  `;
  document.head.appendChild(style);
});
