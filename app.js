window.addEventListener('load',()=> {
    let long;
    let lat;
    let temperaturaDescripcion = document.querySelector(
        ".temperatura-descripcion"
    );
    let temperaturaGrados = document.querySelector(".temperatura-grados");
    let locacionZonahoraria = document.querySelector(".locacion-zonahoraria");
    let temperaturaSection = document.querySelector(".temperatura");
    const temperaturaSpan = document.querySelector('temperatura span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;

            fetch(api)
            .then(response => {
             return response.json();
            })
            .then(data =>{
             const {temperature, summary, icon } = data.currently;
             // Set DOM elementos desde la API //
             temperaturaGrados.textContent = temperature;
             temperaturaDescripcion.textContent = summary;
             locacionZonahoraria.textContent = data.timezone;
             // Formula PARA CELSIUS //
             let celsius = (temperature)
             //Set Icon
             setIcons(icon, document.querySelector(".icon"));


             // Cambio temperatura para Celsius / Farenheit //
             temperaturaSection.addEventListener("click", () => {
                 if (temperaturaSpan.textContent === "C") {
                     temperaturaSpan.textContent  = "F";
                 } else {
                     temperaturaSpan.textContent = "C";
                 }
             });
            });
        });
    }


    function setIcons(icon,iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase ();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});