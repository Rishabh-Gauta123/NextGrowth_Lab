const userSlider = document.getElementById('userSlider');
const temp1 = document.getElementById('temp1');
const temp2 = document.getElementById('temp2');
const temp3 = document.getElementById('temp3');

userSlider.addEventListener('input', updateHighlightedPlan);

function updateHighlightedPlan() {
  const userCount = parseInt(userSlider.value);
  document.getElementById('userCount').textContent = userCount;
  
  // Remove the 'highlighted' class from all plans
  temp1.classList.remove('highlighted');
  temp2.classList.remove('highlighted');
  temp3.classList.remove('highlighted');

  // Highlight the appropriate plan based on user count
  if (userCount >= 0 && userCount < 10) {
    temp1.classList.add('highlighted');
  } else if (userCount >= 10 && userCount < 20) {
    temp2.classList.add('highlighted');
  } else {
    temp3.classList.add('highlighted');
  }
}

// Initial call to set the initial highlighted plan
updateHighlightedPlan();
// Get modal and buttons
const modal = document.getElementById('myModal');
const buttons = document.querySelectorAll('.open-modal-button');
const closeButton = document.querySelector('.close');

// Open modal when a button is clicked
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    modal.style.display = 'block';
  });
});

// Close modal when the close button is clicked
closeButton.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Close modal when clicking outside the modal content
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

// Handle form submission
const form = document.getElementById('modalForm');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  // Get form data
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const comments = document.getElementById('comments').value;

  // You can now do something with the form data, e.g., send it to a server
  const form = document.getElementById('modalForm');
  const formData = new FormData(form);

  // Define the endpoint where you want to send the data
  const endpoint = 'https://forms.maakeetoo.com/formapi/671'; // Replace with your actual endpoint URL

  // Send a POST request using the Fetch API
  fetch(endpoint, {
      method: 'POST',
      body: formData, // Pass the FormData object as the request body
      mode: 'no-cors'
  })
  .then(response => {
      if (response.ok) {
          // Handle success (e.g., display a success message)
          console.log('Form submitted successfully');
          // You can do something here, like showing a success message to the user
      } else {
          // Handle errors (e.g., display an error message)
          console.error('Form submission failed');
          // You can do something here, like showing an error message to the user
      }
  })
  .catch(error => {
      console.error('Error:', error);
  });
  // Close the modal
  modal.style.display = 'none';

  // Reset the form
  form.reset();
});

// // Load initial data
// appendResults();
const resultsList = document.getElementById('results-list');
const itemsPerPage = 10; // Number of items to load at a time
let page = 1;
let isLoading = false;

// Function to generate random text using a timestamp as a seed
const generateRandomData = () => {
    const randomData = [];
    const timestamp = Date.now(); // Get the current timestamp

    for (let i = 1; i <= itemsPerPage; i++) {
        // Use the timestamp as a seed for generating random text
        const randomValue = Math.random().toString(36).substring(7) + timestamp;
        randomData.push(`Random Item ${randomValue}`);
    }

    return randomData;
};

// Function to show a loading symbol (e.g., a spinning circle)
const showLoadingSymbol = () => {
    const loadingSymbol = document.createElement('div');
    loadingSymbol.classList.add('loading-symbol');
    resultsList.appendChild(loadingSymbol);
};

// Function to hide the loading symbol
const hideLoadingSymbol = () => {
    const loadingSymbol = document.querySelector('.loading-symbol');
    if (loadingSymbol) {
        resultsList.removeChild(loadingSymbol);
    }
};

const fetchAndAppendData = async () => {
    if (isLoading) return;

    isLoading = true;

    // Show loading symbol while data is being generated
    showLoadingSymbol();

    try {
        // Simulate fetching data (replace with your actual data fetching code)
        // In this example, we are using a timeout to simulate an API call
        const response = await new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    data: generateRandomData(), // Simulated data
                });
            }, 100); // Simulated 1-second delay
        });

        // Hide the loading symbol
        hideLoadingSymbol();

        const { data } = response;

        data.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item;
            resultsList.appendChild(listItem);
        });

        isLoading = false;
        page++;
    } catch (error) {
        console.error('Error fetching or processing data:', error);
        // Handle the error here
        isLoading = false;
    }
};

// Function to check if the user has scrolled to the bottom of the page
const isUserAtBottom = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    return scrollTop + clientHeight >= scrollHeight - 100;
};

// Add an event listener to load more when the user reaches the end of the page
window.addEventListener('scroll', () => {
    if (isUserAtBottom()) {
        fetchAndAppendData();
    }
});

// Load initial data
fetchAndAppendData();
