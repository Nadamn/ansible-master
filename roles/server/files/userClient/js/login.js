let login_div = document.getElementById("login");
let login_button = login_div.getElementsByTagName("button")[0];



login_button.addEventListener("click", (event) => {
    event.preventDefault();
    let password = login_div.getElementsByTagName("input")[1].value;
    request_response_login();

})



function request_response_login() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.response) {
                let response = JSON.parse(this.response)
                localStorage.setItem("userId",response.user_id)
                window.location.href = "../home.html";
              }
              else {
                swal("Oops" ,"Invalid username or password!" ,  "error")
                  document.getElementById("emailLogin").value=""
                  document.getElementById("passwordLogin").value=""
              }
        }
    };
    xhttp.open("POST", "http://192.168.0.50:5000/users/login");
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(JSON.stringify({
        email: login_div.getElementsByTagName("input")[0].value,
        password: md5(login_div.getElementsByTagName("input")[1].value)
    }))
};

