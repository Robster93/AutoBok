function loading() {
    var iframe = window.parent.document.getElementById("content_iframe");
    var container = document.getElementById("content");
    iframe.style.height = container.offsetHeight + 'px';
}

function loadTeam() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            var array = Array.from(myObj);
            var container = document.getElementById("team_container");
            for (i = 0; i < array.length; i++) {
                var htm = '<hr /><img src="../' + myObj[i].Image + '" /><h4>'+ myObj[i].Vorname + ' ' + myObj[i].Nachname + '</h4><p>' + myObj[i].Position + '<br /> Im Betrieb seit: ' + myObj[i].ImBetriebSeit + '</p>';
                container.innerHTML += htm;
            }
            loading();
        }
    };
    xmlhttp.open("GET", "../Data/Team.json", true);
    xmlhttp.send(); 
}
