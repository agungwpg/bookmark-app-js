// Listen for form submit

document.getElementById('myForm').addEventListener('submit', saveBookmark);

// save bookmark function
function saveBookmark(e) {
    // get form values
    var siteName = document.getElementById('siteName').value;
    var siteURL = document.getElementById('siteURL').value;

    // create object name bookmark
    var bookmark = {
        name: siteName,
        url: siteURL
    }

    if (!siteName || !siteURL) {
        alert('Please fill in the form');
        return false;
    }

    /* ==== local storage test
    localStorage.setItem('test', 'hello world'); //local storage set item
    console.log(localStorage.getItem('test')); // get item from local storage
    localStorage.removeItem('test'); // remove local storage item
    */
    if (localStorage.getItem('bookmarks') === null) {
        // init array bookmarks 
        var bookmarks = [];
        bookmarks.push(bookmark);

        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        // get bookmarks from localstorage and push it into new variable called bookmarks
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // add bookmarks array
        bookmarks.push(bookmark);
        // re-set back to localstorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    fetchBookmarks();
    // Prevent form submitting
    e.preventDefault();
}

// delete bookmark
function deleteBookmark(url) {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url) {
            // remove argument
            bookmarks.splice(i, 1);
        }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
}

// fetch bookmarks
function fetchBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // get output id
    var bookmarksResults = document.getElementById('bookmarkResults');
    bookmarksResults.innerHTML = '';

    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        bookmarksResults.innerHTML += '<div class="well">' +
            '<h3>' +
            name +
            '<a class="btn btn-default" target="_blank" href="' +
            url +
            '">Visit</a>' +
            '<a onclick="deleteBookmark(\'' + url + '\')" class="btn btn-danger" href="#">Delete</a>' +
            '</h3>' +
            '</div>';

    }
}