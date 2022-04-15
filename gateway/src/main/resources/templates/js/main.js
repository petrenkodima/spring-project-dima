$(function() {
    getAuth();
})

function getAuth(){
    var token = sessionStorage.getItem("authToken");
    if (token == null){
        showAuthBlock();
    }else {
        showUserBlock();
    }
}

function logout(){
    sessionStorage.clear();
    showAuthBlock();
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
            var user = `<tr><td>${response["id"]}</td> <td>${response["login"]}</td><td>${response["role"]["name"]}</td></tr>`
            $("#getUserTable").html(user);
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
                user += `<tr><td>${response[i].id}</td><td>${response[i].login}</td><td>${response[i].role.name}</td></tr>`
            }
            $("#getUserAllTable").html(user);
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
                user += `<tr><td>${response[i].id}</td><td>${response[i].login}</td><td>${response[i].role.name}</td></tr>`
            }
            $("#getUserByRoleTableBody").html(user);
            $("#getUserByRoleBlock").css("display", "block");
            $("#getUserByRoleTable").css("display", "");
            $("#getUserByRoleError").css("display", "none");
        },
        error: function(xhr, status, error){
            var errorMessage = xhr.status + ': ' + xhr.statusText
            console.log(errorMessage);
            $("#getUserByRoleBlock").css("display", "block");
            $("#getUserByRoleTable").css("display", "none");
            $("#getUserByRoleError").css("display", "block");
            $("#getUserByRoleError").html("Не достаточно прав");

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
            var user = `<tr><td>${response["id"]}</td> <td>${response["login"]}</td><td>${response["role"]["name"]}</td></tr>`
            $("#getUserByIdTableBody").html(user);
            $("#getUserByIdTable").css("display", "");
            $("#getUserByIdBlock").css("display", "block");
            $("#getUserByIdError").css("display", "none");
        },
        error: function(xhr, status, error){
            var errorMessage = xhr.status + ': ' + xhr.statusText
            console.log(errorMessage);
            $("#getUserByIdBlock").css("display", "block");
            $("#getUserByIdError").css("display", "block");
            $("#getUserByIdTable").css("display", "none");
            $("#getUserByIdError").html("Не достаточно прав");

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
            var user = `<tr><td>${response["id"]}</td> <td>${response["login"]}</td><td>${response["role"]["name"]}</td></tr>`
            $("#newUserTableBody").html(user);
            $("#newUserBlock").css("display", "block");
            $("#newUserTable").css("display", "");
            $("#newUserError").css("display", "none");
        },
        error: function(xhr, status, error){
            var errorMessage = xhr.status + ': ' + xhr.statusText
            console.log(errorMessage);
            $("#newUserBlock").css("display", "block");
            $("#newUserError").css("display", "block");
            $("#newUserTable").css("display", "none");
            $("#newUserError").html("Пользователь с таким логином существует");

        }
    });
}