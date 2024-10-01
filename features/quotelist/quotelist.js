// Quote List feature JavaScript code
// quotelist.js

// Function to display all quotes
function displayQuotes() {
    fetch('http://localhost:5500/qapi/quotes')
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

  function editQuote(quoteid) {
    const updatedQuote = {
        domain: prompt("Enter the new domain:"),
        content: prompt("Enter the new content:"),
        rating: parseInt(prompt("Enter the new rating:"))
    };
  if(updatedQuote.domain != null && updatedQuote.content != null && updatedQuote.rating != null){
    fetch(`http://localhost:5500/qapi/quotes/${quoteid}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedQuote) // Send updated quote data as JSON
    })
    .then(response => {
        if (response.ok) {
            alert('Quote updated successfully!');
            displayQuotes(); // Refresh the quote list after updating
        } else {
            alert('Failed to update quote.');
        }
    })
    .catch(error => console.log('Error:', error));
  }

}



  function deleteQuote(quoteid) {
    fetch(`http://localhost:5500/qapi/quotes/${quoteid}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (response.ok) {
            alert('Quote deleted successfully!');
            displayQuotes(); // Refresh the quotes list after deletion
        } else {
            alert('Failed to delete quote.');
        }
    })
    .catch(error => console.log('Error:', error));
}


  