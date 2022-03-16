showBooks();

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click',addBook)


function addBook(e){
    let bookName = document.getElementById('bookName');
    let authorName = document.getElementById('authorName');
    let radioAnswer = document.querySelector("input[name='bookCatagory']:checked");
    radioAnswerValue = radioAnswer.value;
    let eachBook = {};
    eachBook['bookName'] = bookName.value;
    eachBook['authorName'] = authorName.value;
    eachBook['bookType'] = radioAnswerValue;

    if(localStorage.allBooksData){
        allBooksArray =JSON.parse(localStorage.allBooksData);
        allBooksArray.push(eachBook);
        localStorage.setItem('allBooksData',JSON.stringify(allBooksArray))
    }
    else{
        let allBooksArray = [];     
        allBooksArray.push(eachBook);
        localStorage.setItem('allBooksData',JSON.stringify(allBooksArray))
    }
    bookName.value = ''; 
    authorName.value = '';
    radioAnswer.checked = false;
    showBooks();
}


function showBooks(){
    let displayTable = document.getElementById('displayTable');
    let emptyDisplay = document.getElementById('emptyDisplay');
    emptyDisplay.style.display = 'none';
    let html = '';
    html += `<tr>
                <th>Book</th>
                <th>Author</th>
                <th>Type</th>
            </tr>
        `;
    
    if(localStorage.allBooksData){
        allBooksData = JSON.parse(localStorage.allBooksData);
        allBooksData.forEach(function(element){
            html += `
                    <tr>
                    <td>${element['bookName']}</td>
                    <td>${element['authorName']}</td>
                    <td>${element['bookType']}</td>
                    </tr>
            `;
        });
        displayTable.innerHTML = html;
    }
    else{
        emptyDisplay.style.display = 'block';
    }
}