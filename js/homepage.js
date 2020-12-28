(function(){
    fetchUsers();
})();

function fetchUsers(){
    var request = getRequestObject();

    if(request != null){
        var url = "https://cors-anywhere.herokuapp.com/https://picloc.herokuapp.com/get_users";

        request.open("GET", url, true);
        request.onreadystatechange = function(){
            if(request.readyState == 4 && request.status == 200){
                var usersJSON = JSON.parse(request.responseText);

                var usersJSONArray = usersJSON.users;

                var tbody = document.getElementById("homepage-table-body");
                tbody.innerHTML = "";

                for(let i = 0; i < usersJSONArray.length; i++){
                    tbody.innerHTML += "<tr><td>" + usersJSONArray[i].name + "</td><td>" + usersJSONArray[i].surname + "</td><td>" 
                    + usersJSONArray[i].username + "</td><td><a href='user.html?username=" + usersJSONArray[i].username  + "'>See info</a></td></tr>"
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