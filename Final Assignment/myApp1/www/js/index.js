document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
 console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
 console.log("received deviceready");
 document.getElementById('deviceready').classList.add('ready');
 document.getElementById("submit").addEventListener("click", Userlogin);
//   document.getElementById("databutton").addEventListener("click", Userbank);
document.getElementById("databutton").addEventListener("click", getUserInfo);
document.getElementById("databutton1").addEventListener("click", getUserBankAccounts);
// document.getElementById("databutton2").addEventListener("click", UserAccount);
// document.getElementById("databutton3").addEventListener("click", UserTrans);
}
// show or hide login form
const loginsec=document.querySelector('.login-section')
const loginlink=document.querySelector('.login-link')
const registerlink=document.querySelector('.register-link')
registerlink.addEventListener('click',()=>{
    loginsec.classList.add('active')
})
loginlink.addEventListener('click',()=>{
    loginsec.classList.remove('active')
})

var token;
const bank_id_name = {
    "rbs": 'Royal Bank Service', 
    "gh.29.tr": "TR",
    "gh.29.us": "US"
}


function Userlogin() {
   console.log("in Userlogin");
   var username = document.getElementById("uname").value;
   var password = document.getElementById("pwd").value;
   const consumer_key = '2pbgtpk2y1ghmdxckzupu1qml5eouc0sn3xpu1yl';
//    susan.uk.29@example.com  2b78e8,   asil.tr.29@example.com  af2d2b
    // username="susan.uk.29@example.com", password="2b78e8",key="wgid1xvi14ppin2vutgwfp4pttsxljmkar3yejtt"');
   var directLogin = 'DirectLogin username=' +username+ ', password=' +password + ', consumer_key='+ consumer_key;
   $.ajax({
       url: "https://apisandbox.openbankproject.com/my/logins/direct",
       type: "POST",
       dataType: "json",
       crossDomain: true,
       cache: false,
       contentType: "application/json; charset=utf-8",
   
       beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", directLogin);
    },
      
       success: function (data, textStatus, jQxhr) {
           console.log("in success", token);
        //    document.getElementById("indicator").innerHTML = "Successful Login. Token=" + data.token;
           token = data.token;
           getUserInfo(token);
        //    Userbank(token);
       },
       error: function (jqXhr, textStatus, errorThrown) {
           console.log("in error");
           document.getElementById("indicator").innerHTML = "Error";
       }
   });
}

function getUserInfo(){
    $.ajax({
        url: "https://apisandbox.openbankproject.com//obp/v5.1.0/users/current",
        type: "GET",
        dataType: "json",
        crossDomain: true,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", 'DirectLogin token=' + token);
        },
        success: function (data, textStatus, jQxhr) {
            console.log("in query success");
            const banks = [];
            for(const i of data.views.list){
                const bank = {id: i.bank_id, full_name: bank_id_name[i.bank_id]};
                banks.push(bank)
                // console.log(i.bank_id, ' ==== ' ,bank_id_name[i.bank_id])
            }
            window.location.href = "#page1";
            $("#tablebody").append("<tr><td></td><td></td><td></td></tr>");
            // $("#tablebody").append("<tr><td>Full Name</td><td>Short Name</td><td>Id</td></tr>");
            banks.forEach(appendRow);
            // $("#tablebody").append("<tr><td><button onclick=UserAccount('"+bank.id+"')>" + bank.full_name+"</button></td><td>"  + bank.short_name+"</td><td>" +bank.id+"</td></tr>");

        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log("in query error");
            document.getElementById("query").innerHTML = "Query Failed";
        }
        
    });   
    function appendRow(bank) {
        $("#tablebody").append("<tr><td><button onclick=getUserBankAccounts('"+bank.id+"')>" + bank.full_name+"</button></td><td>"  + " ST NAME " +"</td><td>" +bank.id+"</td></tr>");

        // $("#tabebody").append("<tr><td><button onclick=UserAccount('"+bank.id+"')>" + bank.full_name+"</button></td><td>"  + bank.short_name+"</td><td>" +bank.id+"</td></tr>");
        
    }
}

function getUserBankAccounts(BANK_ID){
    console.log(' ======== ', BANK_ID);
    $.ajax({
        url: `https://apisandbox.openbankproject.com/obp/v5.1.0/banks/${BANK_ID}/accounts-held`,
        type: "GET",
        dataType: "json",
        crossDomain: true,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", 'DirectLogin token=' + token);
        },
        success: function (data, textStatus, jQxhr) {
            console.log("in query success");
            console.log(data);
            window.location.href = "#page2";
            $("#tablebody1").append("<tr><td></td><td></td><td></td></tr>");
            // $("#tablebody").append("<tr><td>Full Name</td><td>Short Name</td><td>Id</td></tr>");
            banks.forEach(appendRow);
            // $("#tablebody").append("<tr><td><button onclick=UserAccount('"+bank.id+"')>" + bank.full_name+"</button></td><td>"  + bank.short_name+"</td><td>" +bank.id+"</td></tr>");

        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log("in query error");
            document.getElementById("query").innerHTML = "Query Failed";
        }
        
    });   
    function appendRow(bank) {
        $("#tablebody1").append("<tr><td><button onclick= UserTrans('"+bank.id+"')>" + bank.full_name+"</button></td><td>"  + " ST NAME " +"</td><td>" +bank.id+"</td></tr>");

        // $("#tabebody").append("<tr><td><button onclick=UserAccount('"+bank.id+"')>" + bank.full_name+"</button></td><td>"  + bank.short_name+"</td><td>" +bank.id+"</td></tr>");
        
    }
}



 function UserTrans(B_id) {}
//     console.log("in UserTrans");
//     $.ajax({
//         // url:  "https://apisandbox.openbankproject.com/obp/v5.1.0/banks/" + B_id + "/accounts",
//         url: "https://apisandbox.openbankproject.com/obp/v4.0.0/my/banks/gh.29.uk/accounts/1995/transactions",
//         type: "GET",
//         dataType: "json",
//         crossDomain: true,
//         cache: true,
//         contentType: "application/json; charset=utf-8",
//         beforeSend: function (xhr) {
//             xhr.setRequestHeader("Authorization", 'DirectLogin token=' + token);
//         },
//         success: function (data, textStatus, jQxhr) {
//             console.log("in query success");
//             console.log(data);
//             window.location.href = "#page3";
//             $("#tablebody2").append("<tr><td></td><td></td><td></td></tr>");
//             // $("#tablebody").append("<tr><td>Full Name</td><td>Short Name</td><td>Id</td></tr>");
//             data.banks.forEach(appendRow);
//         },
//         // error: function (jqXhr, textStatus, errorThrown) {
//         //     console.log("in query error");
//         //     document.getElementById("query").innerHTML = "Query Failed";
//         // }
        
//     });
//     function appendRow(bank) {
//         $("#tablebody2").append("<tr><td><button onclick=Trans('"+bank.id+"')>" + bank.full_name+"</button></td><td>"  + bank.short_name+"</td><td>" +bank.id+"</td></tr>");
        
//     }
    
// }
