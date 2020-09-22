(function(){
    var lat = null,
        lon = null;

    navigator.geolocation.getCurrentPosition(function(location){
        console.log(location.coords.latitude);
        console.log(location.coords.longitude);

        lat = location.coords.latitude;
        lon = location.coords.longitude;

    // Define a variable holding SVG mark-up that defines an icon image:
    var svgMarkup = '<svg width="24" height="24" ' +
        'xmlns="http://www.w3.org/2000/svg">' +
        '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
        'height="22" /><text x="12" y="18" font-size="12pt" ' +
        'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
        'fill="white">H</text></svg>';

    // Create an icon, an object holding the latitude and longitude, and a marker:
    var icon = new H.map.Icon(svgMarkup),
        coords = {lat: lat, lng: lon},
        marker = new H.map.Marker(coords, {icon: icon});

    //Here Map API
    var platform = new H.service.Platform({
        'apikey': 'B0IHxMzQDih65cU1LfpRVkOndU1K7DrxWyxN3DDRniE'
    });

    // Obtain the default map types from the platform object:
    var defaultLayers = platform.createDefaultLayers();

    // Instantiate (and display) a map object:
    var map = new H.Map(
       document.getElementById('mapContainer'),
       defaultLayers.vector.normal.map,
      {
      zoom: 10,
      center: { lat: lat, lng: lon }
    });

    fetch(`https://api.hel.fi/linkedevents/v1/place/?format=json`)
            .then(function(resp){
                return resp.json()
            })
            .then(function(json){
                json.data.forEach(function(event){
                    var _coordinates = { 
                        lat: event.position.coordinates[1],
                        lng: event.position.coordinates[0]
                    };
                    
                    var _marker = new H.map.Marker(_coordinates , {icon: icon});
                    map.addObject(_marker); 
                })
            })

            .catch(function(err){
                console.log(err)
            })

    // Add the marker to the map and center the map at the location of the marker:
      map.addObject(marker); //This will add pin for the current user location
    
    })        
})()

