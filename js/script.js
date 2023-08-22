$(document).ready(function() {


    /*这个JavaScript代码使用jQuery库，是一个用于在浏览器中处理表单数据的代码。它旨在将联系人信息保存到localStorage（本地存储），以便以后可以方便地访问这些信息。

以下是这段代码的具体说明：

$(document).ready(function() { ... });：这是一个jQuery语句，用于在DOM文档准备好后执行函数中的代码。

var editIndex = localStorage.getItem('editContactIndex');：这行代码从localStorage中检索名为'editContactIndex'的值（如果存在），并将其保存到变量editIndex中。

if (editIndex !== null) { ... }：此部分代码是一个条件语句，检查editIndex是否为空。如果不为空，说明我们正在编辑一个已有的联系人。

在第3点的代码块内部，我们从localStorage中获取了名为itemsArray的数组（它包含所有联系人信息），并从其中提取了要编辑的联系人的信息。然后我们将该联系人的信息填充到表单中。

有一部分代码处理联系人的照片（如果存在）并将其显示在表单中。

localStorage.removeItem('editContactIndex');：此行代码将移除名为'editContactIndex'的localStorage项目，因为我们已经处理了要编辑的联系人。

$('form').submit(function(e) { ... });：此部分代码绑定一个函数到表单的提交事件。该函数阻止默认的表单提交行为，并处理表单数据。

在提交处理函数中，我们先检查表单是否有效。如果无效，将弹出一个警告框。然后我们收集表单数据，包括联系人的照片，将其转换为数据URL，并将其添加到数据对象中。

function processFormSubmission(data) { ... }：此函数处理表单数据。它首先从localStorage中检索名为'itemsArray'的数组（包含所有联系人信息），或者如果不存在该数组，则创建一个空数组。然后它会更新或添加新联系人信息，并将修改后的数组保存回localStorage。

最后，我们显示一个确认消息，然后将用户重定向到联系人列表页面。

(function($) { ... })(jQuery);：此代码块定义了一个名为serializeFormJSON的jQuery插件，该插件将表单数据序列化为JSON对象。

总体而言，这段代码的目的是允许用户添加或编辑联系人信息，并将这些信息保存到本地存储中，以便以后访问。*/    




    // Check if in edit mode and populate form with existing data
    var editIndex = localStorage.getItem('editContactIndex');
    if (editIndex !== null) {
        $('#editIndex').val(editIndex); // Set the hidden input value to indicate edit mode
// Check if in edit mode and populate form with existing data
var editIndex = localStorage.getItem('editContactIndex');
if (editIndex !== null) {
    $('#editIndex').val(editIndex); // Set the hidden input value to indicate edit mode

    // Load the contact data and pre-fill the form
    var myContacts = JSON.parse(localStorage.getItem('itemsArray'));
    var contactToEdit = myContacts[editIndex];

    $('input[name="name"]').val(contactToEdit.name);
    $('input[name="email"]').val(contactToEdit.email);
    $('input[name="phone"]').val(contactToEdit.phone);
    $('input[name="birthday"]').val(contactToEdit.birthday);
    $('input[name="company"]').val(contactToEdit.company);
    $('textarea[name="notes"]').val(contactToEdit.notes);  // Add this line for the notes field
 





    // For the profile picture:
    if (contactToEdit.profilePicture) {
        // Assuming you might want to show the existing image somewhere on the form:
        $('#previewImage').attr('src', contactToEdit.profilePicture);
    }

    localStorage.removeItem('editContactIndex'); // Clear it after using



    
}

    }

    $('form').submit(function(e) {
        e.preventDefault();

        if (!this.checkValidity()) {
            alert("Input is invalid. Please correct and submit again.");
            return;
        }

        var data = $(this).serializeFormJSON();

        var profilePictureFile = $('#profilePictureField')[0].files[0];
        if(profilePictureFile) {
            var reader = new FileReader();
            reader.readAsDataURL(profilePictureFile);
            reader.onload = function () {
                data.profilePicture = reader.result;
                processFormSubmission(data);
            };
        } else {
            data.profilePicture = contactToEdit ? contactToEdit.profilePicture : null;  
            processFormSubmission(data);
        }
    });

    function processFormSubmission(data) {
        var oldItems = JSON.parse(localStorage.getItem('itemsArray')) || [];
        
        if (editIndex !== null) { 
            oldItems[editIndex] = data;
        } else {
            oldItems.push(data);
        }
        
        localStorage.setItem('itemsArray', JSON.stringify(oldItems));

        $('#submission-msg').fadeIn().delay(3000).fadeOut(function() {
            window.location.href = "contacts-list.html";
        });
    }
});

(function($) {
    $.fn.serializeFormJSON = function() {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
})(jQuery);