
// Your job is to represent a library system with JavaScript objects and methods.

// In your JavaScript file, create the following objects:
// A library object with the following properties and methods:
// A name property
// A location property
// A currentInventory property that holds an array of book titles(strings)
var library = {
  name: "East Branch Library",
  location: "123 Sesame St",
  currentInventory: ["Harry Potter and the Chamber of Secrets", "What Light Can Do", "The Remains of the Day", "The Bell Jar", "Harry Potter and the Order of the Phoenix", "The Golden Compass"]
};


// A patron object with the following properties and methods:
// A firstName property
// A lastName property
// A checkedOutBooks property that holds an array of book titles(strings)
// A overdueFees property that holds a number
// A printBooks method that builds an unordered list of all the patron's checked out books and prints it to the DOM.

var patron = {
  firstName: "Jordan",
  lastName: "Castelloe",
  checkedOutBooks: ["Harry Potter and the Goblet of Fire", "Madame Bovary", "In Other Rooms, Other Wonders", "Simple Suppers"],
  overdueFees: 1.00,
  printBooks: function () {
    var htmlString = "";
    for (var i = 0; i < this.checkedOutBooks.length; i++) {
      htmlString += `<li>${this.checkedOutBooks[i]}</li>`;

    }
    document.querySelector("#book-list").innerHTML = htmlString;
  }
}



// A librarian object with these properties and methods:
// A firstName property
// A lastName property
// A checkOutBook method that accepts three parameters: a string of a book title, a patron object, and a library object.If the book is currently in stock, this method should add the given book title to the patron's checkedOutBooks array and remove it from the library's currentInventory array. (Hint: look up.splice()).
// A chargeFee method that accepts two parameters: a number that represents the fee amount and a patron object.This method should add the fee object to the patron's overdueFees property.
// A checkInBook method that accepts three parameters: a string of a book title, a patron object, and a library object.This method should remove the given book title from the patron's checkedOutBooks array and add it back to the library's currentInventory array.

var librarian = {
  firstName: "Nancy",
  lastName: "Suppan",
  checkOutBook: function (bookTitle, patronObj, libraryObj) {
    // Clear the error message
    document.querySelector("#error-container").innerHTML = "";
    // First, check and make sure that the patron is under their limit (they can only have ten books)
    if (patronObj.checkedOutBooks.length <= 10) {
      // This variable will keep track of whether or not the book's in stock, and we'll print our error message accordingly
      var inStock = false;
      // Then loop through the library's current inventory and make sure the book they want is in stock
      for (var j = 0; j < libraryObj.currentInventory.length; j++) {
        if (libraryObj.currentInventory[j] === bookTitle) {
          // if it's in stock, add it to the patron's checked out books array 
          patronObj.checkedOutBooks.push(bookTitle);
          console.log("Here's the patron's new book stack", patronObj.checkedOutBooks);
          //and remove it from the library's inventory
          libraryObj.currentInventory.splice(j, 1);
          console.log("Here's the library's inventory with one thing missing", libraryObj.currentInventory)
          // It's in stock, so let's reset the variable!
          inStock = true;
        }
      }
      if (!inStock) {
        // If it's not in stock, print an error message
        document.querySelector("#error-container").innerHTML = `Sorry, ${bookTitle} book is unavailable.`
      }
    } else {
      // If they've reached their limit, tell them with an error message
      document.querySelector("#error-container").innerHTML = "You've reached your limit on books."
    }
  },
  chargeFee: function (feeNumber, patronObj) {
    patronObj.overdueFees += feeNumber;
    console.log("Now the patron owes: ", patronObj.overdueFees)
  },
  checkInBook: function (bookTitle, patronObj, libraryObj) {
    document.querySelector("#error-container").innerHTML = "";
    var isCheckedOut = false;
    for (var k = 0; k < patronObj.checkedOutBooks.length; k++) {
      v
      if (patronObj.checkedOutBooks[k] === bookTitle) {
        isCheckedOut = true;
        libraryObj.currentInventory.push(bookTitle);
        patronObj.checkedOutBooks.splice(k, 1);
      }
    }
    console.log("It's checked back in!", libraryObj.currentInventory);
    console.log("The patron no longer has it", patronObj.checkedOutBooks);
    if (!isCheckedOut) {
      document.querySelector("#error-container").innerHTML = "You're trying to check in a book you haven't checked out."
    }
  }
}

// Patrons can check out a maximum of ten books.If they go over that maximum, the librarian should see an error message in the console.
// Patrons should not be able to check in a book that they haven't checked out. If they try to do this, the librairan should see an error message in the console.
// If a patron tries to check out a book that's out of stock, the librarian should see an error message.

librarian.chargeFee(1.00, patron);
librarian.checkOutBook("Book that's not in the system", patron, library);
librarian.checkInBook("Book that the patron doesn't have", patron, library);
librarian.checkOutBook("What Light Can Do", patron, library);
librarian.checkInBook("What Light Can Do", patron, library);
patron.printBooks();