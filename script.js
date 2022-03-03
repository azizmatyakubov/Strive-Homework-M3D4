let books = []
let cardBooks = []
let filterBooks = []
 
window.onload = () => {


    fetch ('https://striveschool-api.herokuapp.com/books')
    .then(res=> res.json())
    .then(data => {
        books = data
        displayBooks(data)
        console.log(books)
    })
    .catch(err=>console.log(err.message)) 
}





displayBooks = (data) => {
   let booksWrapper = document.querySelector('#booksWrapper')
    booksWrapper.innerHTML = ''

   data.forEach(element => {
    booksWrapper.innerHTML +=
    ` <div class="col-12 col-sm-6 col-md-4 col-lg-3">
     <div class="card" id="${element.asin}">
        <img src="${element.img}" class="card-img-top img-fluid" alt="...">
        <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
            <p class="card-text">${element.category}</p>
            <a href="#" class="btn btn-primary" onclick="addToCard(event)">Add card</a>
            <a href="#" class="btn btn-danger" onclick="deleteCard(event)">Skip</a>
        </div>
        </div>
        </div>`
});
     
}

deleteCard = (e) => {
    const id = e.target.closest(".card").id

    let index = books.findIndex((b) => b.asin === id)
    books.splice(index, 1)
    displayBooks(books)
  
 
  

}

addToCard = (e) => {
    const id = e.target.closest(".card").id

    let book = books.filter((b) => b.asin === id)[0]

    cardBooks.push(book)
  
    
   showCard()
}

showCard = () => {
    document.querySelector('.card-section').innerHTML = ' '
    cardBooks.forEach(elem => {
       document.querySelector('.card-section').innerHTML += `
         <div class="card-item mb-2 m-2">
         <h3 class="text-center mb-4">${elem.title}</h3>
         <div class="d-flex align-items-center  justify-content-around">
         <h5 class="mt-2">${elem.price}</h5>
         <button class="btn btn-warning" onclick="deleteFromCardBooks(${elem.asin})">Delete</button>
         </div>
        </div>
         `
    })
}

function search(word) {
    
    searchBook = books.filter((book) =>
    book.title.toLowerCase().includes(word.toLowerCase())
    );

  
    displayBooks(searchBook);
}



deleteFromCardBooks = (id) => {

    console.log(cardBooks)
    let index = books.findIndex(item => item.asin == id)
    cardBooks.splice(index, 1)
    showCard()
}