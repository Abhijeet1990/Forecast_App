///*------------- Showing the current time on the header of thr page----------- */
function ShowTime() {
    var dt = new Date();
    document.getElementById("lblTime").innerHTML = dt.toLocaleTimeString();
    window.setTimeout("ShowTime()", 1000);
}
//function Timeout() {
//    $(document).idle({
//        onIdle: function () {
//            alertify.alert("Do you want to reset the form?").set('onok', function () {
//                sessionStorage.userName = null;
//                sessionStorage.clear();
//            });
//        },
//        idle: 5000
//        //AuthenticateUser();
//    })
//}

///*-------------Authenticating user before changes anything in the page.--------- */
//function AuthenticateUser() {
//    var username = $('#uLogin').val();
//    var password = $('#uPassword').val();
//    $.ajax({
//        type: "POST",
//        url: "RTPUserDetails.asmx/GetUserDetails",
//        data: '{userName: "' + username + '",password: "' + password + '" }',
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (response) {
//            if (response.d == 1) {
//                //sessionStorage.setItem('userName', username)
//                //Timer();
//                $('#errormsg').hide();
//                $("#myModal").hide();
//                $(".modal-backdrop").hide();
//                alertify.alert("The form has been updated successfully.");
//            }
//            else {
//                $('#errormsg').show();
//            }
//        },
//    });
//}
