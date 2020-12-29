(function(){
    fetchInternalImages();
})();

function setFullname(){
    var fullnameHeading = document.getElementById("id-fullname");

    var name = sessionStorage.getItem("name");
    var surname = sessionStorage.getItem("surname");
    var username = sessionStorage.getItem("username");

    fullnameHeading.innerHTML = name + " " + surname + " - " + username;
}

function fetchInternalImages(){
    var request = getRequestObject();

    if(request != null){
        var url = "https://cors-anywhere.herokuapp.com/https://picloc.herokuapp.com/get_user_internal_images/" + sessionStorage.getItem("username");

        request.open("GET", url, true);
        request.onreadystatechange = function(){
            if(request.readyState == 4 && request.status == 200){
                var imagesJSONArray = JSON.parse(request.responseText);

                var table = document.getElementById("id-user-table");
                table.innerHTML = "";

                if(imagesJSONArray.length == 0){
                    var tr = document.createElement("tr");
                    tr.style.setProperty("padding", "10px");

                    var div = document.createElement("DIV");
                    div.style.setProperty("padding", "10px");

                    var nodata = document.createElement("H2");
                    nodata.innerHTML = "No data";

                    div.appendChild(nodata);

                    tr.appendChild(div);

                    table.appendChild(tr);
                }

                for(let i = 0; i < imagesJSONArray.length; i++){
                    var tr = document.createElement("tr");
                    tr.style.setProperty("padding", "10px");

                    var div = document.createElement("DIV");
                    div.style.setProperty("padding", "10px");

                    var location = document.createElement("H2");
                    location.innerHTML = imagesJSONArray[i].location;
                    location.style.setProperty("margin-bottom", "0px");
                    location.style.setProperty("padding-bottom", "0px");

                    var coordinates = document.createElement("h3");
                    coordinates.innerHTML = "Latitude: " + imagesJSONArray[i].latitude + "&nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;Longitude: " + imagesJSONArray[i].longitude;
                    coordinates.style.setProperty("margin-top", "0px");
                    coordinates.style.setProperty("padding-top", "0px");

                    var time = document.createElement("h2");
                    time.innerHTML = "Time: " + imagesJSONArray[i].time;

                    var image = new Image();
                    image.src = "data:image/jpeg;base64," + imagesJSONArray[i].image;

                    div.appendChild(location);
                    div.appendChild(coordinates);
                    div.appendChild(time);
                    div.appendChild(image);

                    tr.appendChild(div);

                    table.appendChild(tr);
                }
            }
        }

        request.send();
    }
}

function getRequestObject(){
    if(window.XMLHttpRequest){
        return new XMLHttpRequest();
    }
    else if(window.ActiveXObject){
        return new ActiveXObject("Microsoft.XMLHTTP");
    }
    else{
        return null;
    }
}