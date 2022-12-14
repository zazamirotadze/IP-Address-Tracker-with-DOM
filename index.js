
let ip = ""

function initialFetch(){
    fetch("https://jsonip.com/")
    .then((response) => response.json())
    .then((data) =>{ip=data.ip})

    setTimeout(()=>{
        fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_HjOp99VR0QnmxhSYM2SSm69KJ5U7X&ipAddress=${ip}`)
        .then((response) => response.json())
        .then((data) =>{ 
            document.getElementById("ip-data").innerHTML = data.ip
            document.getElementById("location-data").innerHTML = data.location.city
            document.getElementById("utc-data").innerHTML = data.location.timezone
            document.getElementById("isp-data").innerHTML = data.isp
            if(data.code===undefined) {
                updateMarker(data.location.lat, data.location.lng)
            }else{
                alert("please enter  correct ip")
            }
        });
    },100)

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
    map = L.map('map').setView([lat, lng], 10,  );
    var marker = L.marker([lat, lng]).addTo(map);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        noWrap: true,
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
}








