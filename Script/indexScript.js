/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function toggleNavbar() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

function loadTabs(tabName) {
    var iframe = document.getElementById("content_iframe");
    iframe.src = 'Sub/' + tabName + '.html';
    
    //document.getElementById("content").innerHTML = '<object type="type/html" data="Sub/' + tabName + '.html" style="width:100%; height:auto"></object>';        
}

function setBodyOffset() {
    document.getElementById("bod").style.top = document.getElementById("header").offsetHeight + 'px';
}