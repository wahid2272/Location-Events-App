(function(){
    var lat = null,
        lon = null;

    navigator.geolocation.getCurrentPosition(function(location){
        console.log(location.coords.latitude);
        console.log(location.coords.longitude);

    //Use coordinates
    
    })

    fetch(`https://api.hel.fi/linkedevents/v1/place/?format=json`)
        .then(function(resp){
            return resp.json()
        })
        .then(function(json){
            console.log(json)
            //Places with coordinates
        })
        .catch(function(err){
            console.log(err)
        })
})()

