showBooks();
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click',addBook)
function addBook(e){
    let bookName = document.getElementById('bookName');
    let authorName = document.getElementById('authorName');
    if(localStorage.allBooksData){
        allBooksArray =JSON.parse(localStorage.allBooksData);
        let eachBook = {};
        eachBook['bookName'] = bookName.value;
        eachBook['authorName'] = authorName.value;
        let radioAnswer;
        if(document.getElementById('fiction').checked){
            radioAnswer = document.getElementById('fiction').value;
        }
        else if(document.getElementById('non-fiction').checked){
            radioAnswer = document.getElementById('non-fiction').value;
        }
        else if(document.getElementById('tech').checked){
            radioAnswer = document.getElementById('tech').value;
        }
        else{
            radioAnswer = 'NA';
        }
        eachBook['bookType'] = radioAnswer;
        allBooksArray.push(eachBook);
        localStorage.setItem('allBooksData',JSON.stringify(allBooksArray))
    }
    else{
        let allBooksArray = [];
        let eachBook = {};
        eachBook['bookName'] = bookName.value;
        eachBook['authorName'] = authorName.value;
        let radioAnswer;
        if(document.getElementById('fiction').checked){
            radioAnswer = document.getElementById('fiction').value;
        }
        else if(document.getElementById('non-fiction').checked){
            radioAnswer = document.getElementById('non-fiction').value;
        }
        else if(document.getElementById('tech').checked){
            radioAnswer = document.getElementById('tech').value;
        }
        else{
            radioAnswer = 'NA';
        }
        eachBook['bookType'] = radioAnswer;
        allBooksArray.push(eachBook);
        localStorage.setItem('allBooksData',JSON.stringify(allBooksArray))
    }
    bookName.value = ''; 
    authorName.value = '';
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