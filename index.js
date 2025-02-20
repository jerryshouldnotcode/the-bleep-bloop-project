document.addEventListener("DOMContentLoaded", () => {
  // Dark reader mode
  let themeButton = document.getElementById("theme-button");
  const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
  };
  themeButton.addEventListener("click", toggleDarkMode);

  // Helper function to validate form inputs
  const validateForm = () => {
    let containsErrors = false;

    // Create a person object with form inputs
    let person = {
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      hometown: document.getElementById("hometown").value.trim(),
    };

    // Loop through the person object to validate each property
    for (let field in person) {
      let inputElement = document.getElementById(field); // Map key to input field
      if (!person[field]) {
        inputElement.classList.add("invalid");
        containsErrors = true;
      } else {
        inputElement.classList.remove("invalid");
      }
    }

    return { isValid: !containsErrors, person }; // Return validation result and person object
  };

  // Function to add a signature
  const addSignature = () => {
    const { isValid, person } = validateForm(); // Validate and retrieve person object

    if (!isValid) {
      alert("Please fill out all fields.");
      return;
    }

    // Create the signature message
    let message = `🖊️ ${person.name} from ${person.hometown} supports this!`;

    // Append the message to the signatures list
    let newSignature = document.createElement("p");
    newSignature.innerText = message;
    let signatureList = document.querySelector(".signatures");
    signatureList.appendChild(newSignature);

    // Clear the input fields after submission
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("hometown").value = "";

    // Show the modal with a thank you message
    toggleModal(person);
  };

  scaleFactor = 1;

  function scaleImage() {
    if (scaleFactor == 1) {
        scaleFactor = 0.8;
    } else {
        scaleFactor = 1;
    }

    // Select the image inside the modal
    const modalImage = document.querySelector('.modal-content img');
    
    // Apply scaling to the image
    modalImage.style.transform = `scale(${scaleFactor})`;

    let intervalId = setInterval(scaleImage, 500);
    
  }

  // Function to toggle the modal
  let intervalId;  // Declare intervalId outside of toggleModal to control it globally
  
function toggleModal(person) {
    // Select modal elements
    let modal = document.getElementById("thanks-modal");
    let modalText = document.getElementById("thanks-modal-content");

    // Display the modal
    modal.style.display = "flex";

    // Set personalized thank you message
    modalText.innerText = `Thank you so much, ${person.name}! ${person.hometown} represent!`;

    // Start the scaling animation
    intervalId = setInterval(scaleImage, 500);

    // Hide the modal after a timeout and clear the interval
    setTimeout(() => {
        modal.style.display = "none";
        clearInterval(intervalId);  // Stop the scaling animation when the modal is hidden
    }, 4000);  // Adjust timeout to control how long the modal stays open
  }
 
  // Add event listener for the "Sign Now" button
  let signUpButton = document.getElementById("sign-now-button");
  signUpButton.addEventListener("click", addSignature);
  
  // Animation settings for revealable elements
  let animation = {
    revealDistance: 150,
    initialOpacity: 0,
    transitionDuration: "1s",
    transitionProperty: "all",
    transitionTimingFunction: "ease",
  };

  let revealableContainers = document.querySelectorAll(".revealable"); // Fixed selector: it should be `.revealable`

  const reveal = () => {
    revealableContainers.forEach((container) => {
      let windowHeight = window.innerHeight;
      let topOfRevealableContainer = container.getBoundingClientRect().top;
      if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
        container.classList.add("active");
      } else {
        container.classList.remove("active");
      }
    });
  };

  // Attach the reveal function to the scroll event
  window.addEventListener("scroll", reveal);

  // Placeholder for future reduce-motion functionality
  // State management outside the reduce motion function
  // State management outside the reduce motion function
  let isMotionReduced = false;

  
  // Function to toggle motion state
  function toggleMotionState() {
    // Toggle the state
    isMotionReduced = !isMotionReduced;

    // Get references to key elements
    const reduceMotionButton = document.getElementById("motion-button");
    const revealableContainers = document.querySelectorAll(".revealable");

    revealableContainers.forEach((container) => {
      if (isMotionReduced) {
        // Disable motion: make containers immediately visible
        container.style.transition = "none";
        container.style.opacity = "1"; // Fully visible
        container.style.transform = "none"; // Reset any animations
        container.classList.remove("active");
      } else {
        // Restore motion: reset to original animation settings
        container.style.transition = `${animation.transitionProperty} ${animation.transitionDuration} ${animation.transitionTimingFunction}`;
        container.style.opacity = animation.initialOpacity; // Back to hidden state
        container.style.transform = ""; // Reset transforms to allow animations
      }
    });

    // Manage scroll event listener and button text
    if (isMotionReduced) {
      window.removeEventListener("scroll", reveal);
      reduceMotionButton.textContent = "Enable Motion";
    } else {
      window.addEventListener("scroll", reveal);
      reduceMotionButton.textContent = "Reduce Motion";

      // Trigger reveal to ensure containers can become visible
      reveal();
    }
  }

  // Function to initialize the reduce motion button
  const reduceMotion = () => {
    const reduceMotionButton = document.getElementById("motion-button");

    // Add click event listener that calls the separate toggle function
    reduceMotionButton.addEventListener("click", toggleMotionState);
  };

  // Call reduce motion setup
  reduceMotion();

});