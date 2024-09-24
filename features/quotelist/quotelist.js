// Quote List feature JavaScript code
// quotelist.js

// Function to display all quotes
function displayQuotes() {
    fetch('/japi/quotes')
      .then(response => response.json())
      .then(data => {
        const quoteList = document.getElementById('quote-list');
        quoteList.innerHTML = '';
  
        data.forEach(quote => {
          const listItem = document.createElement('li');
          listItem.className = 'list-group-item';
          listItem.innerHTML = `
            <strong>Domain:</strong> ${quote.domain}<br>
            <strong>Content:</strong> ${quote.content}<br>
            <strong>Rating:</strong> ${quote.rating}<br>
            <button class="btn btn-sm btn-primary" onclick="editQuote(${quote.id})">Edit</button>
            <button class="btn btn-sm btn-danger" onclick="deleteQuote(${quote.id})">Delete</button>
          `;
          quoteList.appendChild(listItem);
        });
      })
      .catch(error => console.log(error));
  }