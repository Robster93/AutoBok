function loading() {
    var iframe = window.parent.document.getElementById("content_iframe");
    var container = document.getElementById("content");
    iframe.style.height = container.offsetHeight + 'px';
}