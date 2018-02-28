function setHeight() {
    var div = window.parent.document.getElementById("bod");
    var container = document.getElementById("content");
    div.style.height = window.parent.innerHeight + container.offsetHeight + 'px';
    //window.parent.document.getElementById('bod').style.height = window.height - offset + 'px';
}