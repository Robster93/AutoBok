function setHeight() {
    var iframe = window.parent.document.getElementById("content_iframe");
    var container = document.getElementById("content");
    iframe.style.height = container.offsetHeight + 'px';
}

function loadTeam() {
    var teamlist = [];
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "../Data/Team.json", true);
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            var array = Array.from(myObj);            
            for (i = 0; i < array.length; i++) {
                teamlist.push(new Employee(myObj[i].Vorname, myObj[i].Nachname, myObj[i].Position, myObj[i].ImBetriebSeit, myObj[i].Image))
            } 
            return teamlist;         
        }
    };
    xmlhttp.send(null);
    return teamlist;
}



class Employee {
    constructor(vorname, nachname, position, imBetriebSeit, imageLink) {
        this.vorname = vorname;
        this.nachname = nachname;
        this.imBetriebSeit = imBetriebSeit;
        this.imageLink = imageLink;
        this.position = position;
    }
}
/*
var app = angular.module('app', [])
            angular.module('app')
                .controller('Team', ['$http', function($http) {
                    var vm = this;
                    vm.title = "Team";
                    vm.team = [];
                    vm.getData = function() {
                        //vm.team = loadTeam()
                        $http.get("../Data/Team.json")
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
*/
//$(window).bind("load", function(){setHeight()}) 
/*
app.factory("viewModel", function(dataService) {
    var vm = {
        team: []
    }
    vm.refresh = function() {
        dataService.getData(function (data) {
            vm.team = loadTeam();
        }, function (error) {

        });
    };
});*/
