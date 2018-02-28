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
    //var iframe = document.getElementById("content_iframe");
    //iframe.src = 'Sub/' + tabName + '.html';
    
    //document.getElementById("content").innerHTML = '<object type="type/html" data="Sub/' + tabName + '.html" style="width:100%; height:auto"></object>';        
}

function setBodyOffset() {
    var offset = document.getElementById("header").offsetHeight;
    document.getElementById("main").style.top = offset + 'px';
    //document.getElementById('content_iframe').style.height = window.innerHeight - offset + 'px';
}

function setHeight() {
    var iframe = document.getElementById('content_iframe')
    var window = iframe.contentWindow;
    var doc = iframe.contentDocument? iframe.contentDocument: iframe.contentWindow.document;
    var form = doc.getElementById('content');
    iframe.style.height = form.offsetHeight;
}


var autobokApp = angular.module('autobokApp', ['ngRoute']);

autobokApp.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl : 'Sub/home.html'
    })
    .when('/team', {
        templateUrl : 'Sub/team.html',
        controller : 'Team'
    })
    .when('/contact', {
        templateUrl : 'Sub/contact.html',
        controller : 'ContactController'
    })
});

autobokApp.service('Map', function() {
    this.init = function() {        
    var pos = {lat: 48.6988318,lng: 9.0063085};
        var options = {
            center: new google.maps.LatLng(pos),
            zoom: 15,
            disableDefaultUI: true,            
            mapTypeId: google.maps.MapTypeId.HYBRID  
        }        
        this.map = new google.maps.Map(
            document.getElementById("map"), options
        );
        var marker = new google.maps.Marker({position: pos, map: this.map });
    }
});

autobokApp.controller('Team', ['$http', function($http) {
        var vm = this;
        vm.title = "Team";
        vm.team = [];
        vm.getData = function() {
            //vm.team = loadTeam()
            $http.get("Data/Team.json")
            .then(function(response) {
                var array = Array.from(response.data);       
                var teamlist = [];     
                for (i = 0; i < array.length; i++) {
                    teamlist.push(new Employee(array[i].Vorname, array[i].Nachname, array[i].Position, array[i].ImBetriebSeit, array[i].Image))
                }
                vm.team = teamlist;
            })};
        vm.getData();
}]);

autobokApp.controller('ContactController', ['Map', function(Map) {
    var vm = this;
    Map.init();
}]);


class Employee {
    constructor(vorname, nachname, position, imBetriebSeit, imageLink) {
        this.vorname = vorname;
        this.nachname = nachname;
        this.imBetriebSeit = imBetriebSeit;
        this.imageLink = imageLink;
        this.position = position;
    }
};