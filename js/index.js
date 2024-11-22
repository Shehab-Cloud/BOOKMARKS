// // display input
// var inputNameSite = document.getElementById("bookName");
// var inputUrlSite = document.getElementById("siteUrl");
// // errorMessage


// // Array save Data with function  submit()
// var data = [];
// if(localStorage.getItem("container") !== null){
//     data = JSON.parse(localStorage.getItem("container"));
//     viewData();
// }



// // function submit value with user 
// function submit() {
//     var website = {
//         name:inputNameSite.value.trim(),
//         url:inputUrlSite.value.trim(),
//     }

//     data.push(website)
//     localStorage.setItem(    "container"  ,   JSON.stringify(data)   )
//     clearForm ()
//     viewData()
// }






// // view Data 
// function viewData(){
//     var box = '';
//   for ( var i = 0 ; i < data.length  ; ++i ){
    
//     box+=`
//                     <tr>
//                     <td>${i + 1}</td>
//                     <td>${data[i].name}</td>              
//                     <td>
//                     <a  target="_blank" class="btn btn-info px-3 text-white" href="${data[i].url}"><i class="fa-solid fa-eye pe-1"></i>Visit</a>
//                     </td>
//                     <td>
//                         <button  onclick="deleteData(${i})" class="btn btn-danger pe-2">
//                     <i class="fa-solid fa-trash-can"></i>
//                     Delete
//                     </button>
//                     </td>
//                   </tr>
    
//     `
//   }
//   document.getElementById("tableData").innerHTML= box
// }
//     // clear Form
//     function clearForm (){
//         inputNameSite.value = null;
//         inputUrlSite.value  = null ;
//     }

//     // delet 
//     function deleteData (index){
//         data.splice( index  ,   1 )
//         localStorage.setItem(    "container"  ,   JSON.stringify(data)   )
//         viewData()

//     }




// عرض مدخلاتم
var inputNameSite = document.getElementById("bookName");
var inputUrlSite = document.getElementById("siteUrl");
var errorDialog = document.getElementById("errorDialog");
var dialogMessage = document.getElementById("dialogMessage");

// تخزين البيانات في مصفوفة
var data = [];
if (localStorage.getItem("container") !== null) {
    data = JSON.parse(localStorage.getItem("container"));
    viewData();
}

//  إظهار الرسائل في نافذة 
function showDialog(message) {
    dialogMessage.textContent = message;
    errorDialog.showModal();
}

// إغلاق نافذة 
function closeDialog() {
    errorDialog.close();
}

//  إرسال البيانات
function submit() {
    var website = {
        name: inputNameSite.value.trim(),
        url: inputUrlSite.value.trim(),
    };

    // التحقق من الحقول الفارغة
    if (website.name === "" || website.url === "") {
        showDialog("جميع الحقول مطلوبة.");
        return;
    }

    
    if (!/^[a-zA-Z\s]{1,20}$/.test(website.name) || website.name.split(/\s+/).length > 2) {
        showDialog("اسم الموقع يجب أن يحتوي على كلمتين كحد أقصى وحروف فقط.");
        return;
    }

    // التحقق من صحة رابط URL
    var urlPattern = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.(com|net|org|edu|gov|mil|int|co|io|biz)(\/\S*)?$/;
    if (!urlPattern.test(website.url)) {
        showDialog("الرجاء إدخال رابط صحيح.");
        return;
    }

    // التحقق من عدم تكرار البيانات
    var isDuplicate = data.some(item => item.name === website.name || item.url === website.url);
    if (isDuplicate) {
        showDialog("هذا الموقع موجود بالفعل.");
        return;
    }

    // إضافة البيانات وتحديث العرض
    data.push(website);
    localStorage.setItem("container", JSON.stringify(data));
    clearForm();
    viewData();
}

// عرض البيانات
function viewData() {
    var box = "";
    for (var i = 0; i < data.length; ++i) {
        box += `
            <tr>
                <td>${i + 1}</td>
                <td>${data[i].name}</td>              
                <td>
                    <a target="_blank" class="btn btn-info px-3 text-white" href="${data[i].url}">
                        <i class="fa-solid fa-eye pe-1"></i>Visit
                    </a>
                </td>
                <td>
                    <button onclick="deleteData(${i})" class="btn btn-danger pe-2">
                        <i class="fa-solid fa-trash-can"></i>
                        Delete
                    </button>
                </td>
            </tr>
        `;
    }
    document.getElementById("tableData").innerHTML = box;
}

// مسح الحقول
function clearForm() {
    inputNameSite.value = null;
    inputUrlSite.value = null;
}

// حذف البيانات
function deleteData(index) {
    data.splice(index, 1);
    localStorage.setItem("container", JSON.stringify(data));
    viewData();
}


