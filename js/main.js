showBooks(); //executes the showBooks func. before anything

// class to create a book object
class theLib{
    constructor(bookName,authorName,radioAnswerValue){
        this.bookName = bookName;
        this.authorName = authorName;
        this.radioAnswer = radioAnswerValue;
    }
}


// Display Class
class Display{
    // function to add books to localStorage
    addToLocal(eachBook){
        if(localStorage.allBooksData){
            let allBooksArray;
            allBooksArray = JSON.parse(localStorage.allBooksData);
            allBooksArray.push(eachBook);
            localStorage.setItem('allBooksData',JSON.stringify(allBooksArray))
        }
        else{
            let allBooksArray = [];     
            allBooksArray.push(eachBook);
            localStorage.setItem('allBooksData',JSON.stringify(allBooksArray))
        }
    }

    // validating the entries in the field -  required more that 3 characters
    validate(eachBook){
        if(eachBook.bookName.length>3 && eachBook.authorName.length>3 && eachBook.radioAnswer!==undefined){
            return true;
        }
        else{
            return false;
        }
    }

    // if the validate function returns false this gets executed with error message
    error = function(){
        let elem = document.getElementById('addSuccess');
        let field = document.getElementsByClassName('field');

        Array.from(field).forEach(function(element){
            element.style.border = '1px solid rgb(250, 126, 126)';
        })

        elem.innerText = `Enter A Name With More Than 3 Characters`;
        elem.style.backgroundColor = 'rgb(250, 126, 126)';
        elem.style.color = 'rgb(73, 0, 0)';
        elem.style.visibility = 'visible';
        elem.style.opacity = '1';
        setTimeout(function(){
            elem.style.visibility = 'hidden';
            elem.style.backgroundColor = 'rgb(94, 187, 94)';
            elem.style.color = 'rgb(0, 70, 0)';
            Array.from(field).forEach(function(element){
                element.style.border = '1px solid transparent';
            })
            
        },1000)
        console.log(elem);
    }

    // to display a custom success message for each book added
    success = function(eachBook){
        let elem = document.getElementById('addSuccess');
        elem.innerText = `${eachBook.bookName} Added!`;
        elem.style.visibility = 'visible';
        elem.style.opacity = '1';
        setTimeout(function(){
            elem.style.visibility = 'hidden';
        },1000)
        console.log(elem);
    }
}



// grabbing the add button for click event
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click',addBook);

// instantiates theLib class
function addBook(){
    let bookName = document.getElementById('bookName');
    let authorName = document.getElementById('authorName');
    let radioAnswer = document.querySelector("input[name='bookCatagory']:checked");
    let display = new Display();

    if(radioAnswer){
        let eachBook = new theLib(bookName.value,authorName.value,radioAnswer.value);
        if(display.validate(eachBook)){
            display.addToLocal(eachBook);
            display.success(eachBook);
        }
        else{
            display.error()
        }
        radioAnswer.checked = false;
    }
    else{
        display.error();
    }
    bookName.value = ''; 
    authorName.value = '';
    showBooks();
}


// func. that gets executed when the page loads or when addBtn is clicked
function showBooks(){
    let displayTable = document.getElementById('displayTable');
    let emptyDisplay = document.getElementById('emptyDisplay');
    emptyDisplay.style.display = 'none';
    let html = '';
    if(localStorage.allBooksData){
        allBooksData = JSON.parse(localStorage.allBooksData);
        allBooksData.forEach(function(element){
            html += `
                    <tr>
                    <td>${element['bookName']}</td>
                    <td>${element['authorName']}</td>
                    <td>${element['radioAnswer']}</td>
                    </tr>
            `;
        });
        displayTable.innerHTML = html;
    }
    else{
        emptyDisplay.style.display = 'block';
    }
} 