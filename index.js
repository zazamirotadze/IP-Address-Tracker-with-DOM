
let ip = ""

var box = document.getElementById("map")



function initialFetch(){
    fetch("https://ipapi.co/json/")
    .then((response) => response.json())
    .then((data) =>{ 
       
        document.getElementById("ip-data").innerHTML = data.ip
        document.getElementById("location-data").innerHTML = data.city
        document.getElementById("utc-data").innerHTML = data.utc_offset
        document.getElementById("isp-data").innerHTML = data.org
        if(data.code===undefined) {
            updateMarker(data.latitude, data.longitude)
        }else{
            alert("please enter  correct ip")
        }
    });

}

initialFetch()


function getInputValue(){
    var inputVal = document.getElementById("myInput").value;
    ip=inputVal;
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_HjOp99VR0QnmxhSYM2SSm69KJ5U7X&ipAddress=${ip}`)
    .then((response) => response.json())
    .then((data) =>{ 
        if(data.code===undefined) {
            document.getElementById("ip-data").innerHTML = data.ip
            document.getElementById("location-data").innerHTML = data.location.city
            document.getElementById("utc-data").innerHTML = data.location.timezone
            document.getElementById("isp-data").innerHTML = data.isp
            map.remove()
            updateMarker(data.location.lat, data.location.lng)
        }else{
            alert("please enter  correct ip")
        }
    });
}


updateMarker = (lat =initialLat, lng = initialLng) => {
    map = L.map('map', { zoomControl: false }).setView([lat, lng], 16,  );
    var greenIcon = L.icon({
        iconUrl: './images/icon-location.svg',
        iconSize:     [38, 48], // size of the icon// size of the shadow

    });
    var marker = L.marker([lat, lng], {icon: greenIcon}).addTo(map);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        noWrap: true,
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
}








