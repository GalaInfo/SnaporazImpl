function search() {
    var title = $("#title").val();
    if (title) {
        window.location = 'search.html?title=' + title;
    }
}

