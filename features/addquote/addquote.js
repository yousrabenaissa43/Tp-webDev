// Function to add a new quote
async function addQuote(domain, content, rating) {
    try {
      const response = await  fetch('http://localhost:5500/qapi/quotes', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ domain, content, rating }), 
      });
  
      if (response.ok) {
        alert('Quote added successfully!');
      } else {
        alert('Failed to add quote.');
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  // Attach event listener to the form outside the addQuote function
  document.getElementById('add-quote-form').addEventListener('submit', async (event) => { 
    event.preventDefault(); // Prevent default form submission behavior
  
    const domainElement = document.getElementById('domain'); 
    const contentElement = document.getElementById('content'); 
    const ratingElement = document.getElementById('rating');
  
    const domain = domainElement.value; 
    const content = contentElement.value; 
    const rating = ratingElement.value;
  
    await addQuote(domain, content, rating);
  });
  