$(function() {
    getAuth();
})
var users = [];
function getAuth(){
    var token = sessionStorage.getItem("authToken");
    if (token == null){
        showAuthBlock();
    }else {
        showUserBlock();
    }
}

function showAuthBlock(){
    $("#auth").css("display", "block");
    $("#user").css("display", "none");
}

function showUserBlock(){
    $("#auth").css("display", "none");
    $("#user").css("display", "block");
}

function on_auth_click(login, password){
    $.ajax({
        type: "GET",
        url: `http://localhost:8088/auth/auth?login=${login}&password=${password}`,
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:8088")
        },
        success: function(response){
            console.log(response);
            sessionStorage.setItem('authToken', response);
            showUserBlock();
        }
    });
}

function getUserByLogin(login){
    $.ajax({
        type: "GET",
        url: `http://localhost:8088/user/user/login?login=${login}`,
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:8088")
            xhr.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem("authToken"))
        },
        success: function(response){
            console.log(response);
            var user = `Id: ${response["id"]} Login: ${response["login"]} Role: ${response["role"]["name"]}`
            $("#getUserBlock").text(user);
            $("#getUserBlock").css("display", "block");
        }
    });
}

function getUserAll(){
    $.ajax({
        type: "GET",
        url: `http://localhost:8088/user/user`,
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:8088")
            xhr.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem("authToken"))
        },
        success: function(response){
            //console.log(response);
            var user = ""
            for(var i = 0; i<response.length; i++){
                //console.log(users[i])
                user += `Id: ${response[i].id} Login: ${response[i].login} Role: ${response[i].role.name}\n`
            }
            $("#getUserAllBlock").text(user);
            $("#getUserAllBlock").css("display", "block");
        }
    });
}

function getUserByRole(role){
    $.ajax({
        type: "GET",
        url: `http://localhost:8088/user/user/role?role=${role}`,
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:8088")
            xhr.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem("authToken"))
        },
        success: function(response){
            console.log(response);
            var user = ""
            for(var i = 0; i<response.length; i++){
                //console.log(users[i])
                user += `Id: ${response[i].id} Login: ${response[i].login} Role: ${response[i].role.name}\n`
            }
            $("#getUserByRoleBlock").text(user);
            $("#getUserByRoleBlock").css("display", "block");
        },
        error: function(xhr, status, error){
            var errorMessage = xhr.status + ': ' + xhr.statusText
            console.log(errorMessage);
            $("#getUserByRoleBlock").css("display", "block");
            $("#getUserByRoleBlock").text("Не достаточно прав");

        }
    });
}

function getUserById(id){
    $.ajax({
        type: "GET",
        url: `http://localhost:8088/user/user/id?id=${id}`,
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:8088")
            xhr.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem("authToken"))
        },
        success: function(response){
            console.log(response);
            var user = `Id: ${response["id"]} Login: ${response["login"]} Role: ${response["role"]["name"]}`
            $("#getUserByIdBlock").text(user);
            $("#getUserByIdBlock").css("display", "block");
        },
        error: function(xhr, status, error){
            var errorMessage = xhr.status + ': ' + xhr.statusText
            console.log(errorMessage);
            $("#getUserByIdBlock").css("display", "block");
            $("#getUserByIdBlock").text("Не достаточно прав");

        }
    });
}

function saveUser(login, password){
    $.ajax({
        type: "POST",
        url: `http://localhost:8088/user/user/save`,
        data: JSON.stringify({
                'login': login,
                'password': password
            }
        ),
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:8088")
            xhr.setRequestHeader("Content-Type", "application/json")
            xhr.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem("authToken"))
        },
        success: function(response){
            console.log(response);
            var user = `Id: ${response["id"]} Login: ${response["login"]} Role: ${response["role"]["name"]}`
            $("#newUserBlock").text(user);
            $("#newUserBlock").css("display", "block");
        },
        error: function(xhr, status, error){
            var errorMessage = xhr.status + ': ' + xhr.statusText
            console.log(errorMessage);
            $("#newUserBlock").css("display", "block");
            $("#newUserBlock").text("Пользователь с таким логином существует");

        }
    });
}