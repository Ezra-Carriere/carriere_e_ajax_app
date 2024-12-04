(() => {

  // Variables
  const hotspots = document.querySelectorAll(".Hotspot");

  const materialTemplate = document.querySelector("#material-template");
  const materialList = document.querySelector("#material-list");

  // This is the API URL for infoBoxes: https://swiftpixel.com/earbud/api/infoboxes
  // This is the API URL for materials: https://swiftpixel.com/earbud/api/materials

  // Error handling function
  function displayError(message) {
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    errorMessage.textContent = message;
    document.body.appendChild(errorMessage);
  }

  // Function to load info boxes
  function loadInfoBoxes() {

    // Loading indicator can be added here

    fetch("https://swiftpixel.com/earbud/api/infoboxes")
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(infoBoxes => {
        infoBoxes.forEach((infoBox, index) => {
          let selected = document.querySelector(`#hotspot-${index + 1}`);
    
          const titleElement = document.createElement('h2');
          titleElement.textContent = infoBox.heading;
    
          const textElement = document.createElement('p');
          textElement.textContent = infoBox.description;
    
          selected.appendChild(titleElement);
          selected.appendChild(textElement);
        });
      })
      .catch(error => {
        console.error('Error loading info boxes:', error);
        displayError("Oops! Something went wrong. Please check your internet connection and try again.");
      });
  }
  loadInfoBoxes();

  // Function to load material info
  function loadMaterialInfo() {

    // Loading indicator can be added here

    fetch("https://swiftpixel.com/earbud/api/materials")
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(materialListData => {
        materialListData.forEach(material => {
          // Clone the template
          const clone = materialTemplate.content.cloneNode(true);
          // Populate the template
          const materialHeading = clone.querySelector(".material-heading");
          materialHeading.textContent = material.heading;

          const paragraphDescription = clone.querySelector(".material-description");
          paragraphDescription.textContent = material.description;

          materialList.appendChild(clone);
        });
      })
      .catch(error => {
        console.error('Error loading materials:', error);
        displayError("Oops! Something went wrong. Please check your internet connection and try again.");
      });
  }
  loadMaterialInfo();

  // Function to show information
  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  // Function to hide information
  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

  // Event listeners for hotspots
  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });

})();
