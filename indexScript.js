var autobokApp = angular.module('autobokApp', ['ngRoute']);

autobokApp.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl : 'Sub/home.html'
    })
    .when('/team', {
        templateUrl : 'Sub/team.html',
        controller : 'TeamController'
    })
    .when('/offers', {
        templateUrl : 'Sub/offers.html',
        controller : 'OffersController'
    })
    .when('/contact', {
        templateUrl : 'Sub/contact.html',
        controller : 'ContactController'
    })
    .when('/EditOffers', {
        templateUrl : 'Sub/editOffers.html',
        controller : 'EditOffersController'
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

autobokApp.controller('TeamController', ['$http', function($http) {
        var vm = this;
        vm.title = "Team";
        vm.team = [];
        vm.getData = function() {
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
    vm.title = "Contact";
    Map.init();
}]);

autobokApp.controller('OffersController', ['$http', function($http) {
    var vm = this;
    vm.title = "Offers";
    vm.offers = [];
    vm.getData = function() {
        $http.get("Data/Offers.json")
        .then(function(response) {
            var array = Array.from(response.data);       
            var offersList = [];     
            for (i = 0; i < array.length; i++) {
                offersList.push(new Offer(array[i].Name, array[i].Beschreibung, array[i].Baujahr, array[i].Farbe ,array[i].Image, array[i].Preis))
            }
            vm.offers = offersList;
        })};
    vm.getData();
}]);

autobokApp.controller('EditOffersController', ['$http', function($http) {
    var vm = this;
    vm.offers = [];
    vm.getData = function() {
        $http.get("Data/Offers.json")
        .then(function(response) {
            var array = Array.from(response.data);       
            var offersList = [];     
            for (i = 0; i < array.length; i++) {
                offersList.push(new Offer(array[i].Name, array[i].Beschreibung, array[i].Baujahr, array[i].Farbe ,array[i].Image, array[i].Preis))
            }
            vm.offers = offersList;
        })};
    vm.getData();
    vm.addRow = function() {
        vm.offers.push(new Offer("","","","","",""));
    };
    vm.removeRow = function(offer) {
        for (i = 0; i< vm.offers.length; i++) {
            if (vm.offers[i] === offer) {
                vm.offers.splice(i, 1);
            }
        }
    };
    vm.saveData = function() {
        $http.post('Data/Offers.json', JSON.stringify(vm.offers))
        .then(function(data) {
            vm.message = "Data saved!"
        })
    };
    vm.message = "";
}])

class Offer {
    constructor(name, beschreibung, baujahr, farbe, imageLink, preis) {
        this.name = name;
        this.beschreibung = beschreibung;
        this.baujahr = baujahr;
        this.imageLink = imageLink;
        this.farbe = farbe;
        this.preis = preis;
    }
};

class Employee {
    constructor(vorname, nachname, position, imBetriebSeit, imageLink) {
        this.vorname = vorname;
        this.nachname = nachname;
        this.imBetriebSeit = imBetriebSeit;
        this.imageLink = imageLink;
        this.position = position;
    }
};