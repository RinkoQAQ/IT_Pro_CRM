/*这段JavaScript代码定义了一个名为addressBook的对象，该对象是一个立即执行的函数表达式（IIFE）。该对象主要用于处理和显示联系人信息，并提供了用于删除和编辑联系人信息的功能。

以下是这段代码的主要功能和结构：

在IIFE内部，我们首先从localStorage中获取名为'itemsArray'的联系人信息数组，并保存到变量myContacts中。

我们选择名为#table1的HTML表格，并保存对其tbody元素的引用。

我们为删除和编辑按钮添加点击事件处理程序。

我们调用_render函数，该函数将从myContacts数组中的联系人信息渲染到表格中。

_render函数：

首先清除表格的内容。
然后遍历联系人数组，并逐个添加联系人信息到表格中。每个联系人的行包括序号、图片、姓名、电话、电子邮件、分组、备注、生日、公司和操作按钮（编辑和删除）。
对于联系人的分组、备注、生日和公司，如果没有定义，则显示"N/A"。
deletePerson函数：

通过点击的删除按钮找到对应的表格行索引。
使用splice方法从myContacts数组中删除对应的联系人。
调用_render函数重新渲染表格。
将修改后的myContacts数组保存到localStorage中。
editPerson函数：

通过点击的编辑按钮找到对应的表格行索引。
将该行索引保存到localStorage中（名为'editContactIndex'）。
重定向到联系人表单页面。
我们为搜索框添加keyup事件处理程序，该处理程序允许用户在输入搜索词时实时过滤联系人表格。

最后，我们将deletePerson函数暴露为addressBook对象的公共方法。

总体而言，该代码的主要功能是从localStorage中检索联系人信息，显示这些信息在一个HTML表格中，并允许用户编辑、删除和搜索联系人。*/


var addressBook = (function() {
    var myContacts = JSON.parse(localStorage.getItem('itemsArray'));
    var table = $('#table1');
    var tbody = table.find('tbody');

    table.on('click', '#remove', deletePerson);
    table.on('click', '#edit', editPerson);
    _render();

    function _render() {
        tbody.html('');
        var length = myContacts.length;
        for (var i = length - 1; i >= 0; i--) {
            var imgHtml = myContacts[i].profilePicture 
                ? '<img src="' + myContacts[i].profilePicture + '" alt="' + myContacts[i].name + '" width="50" height="50">'
                : 'No Image';
            
            var group = myContacts[i].group || "N/A"; // If 'group' is not defined, use "N/A"
            var notes = myContacts[i].notes || "N/A"; // If 'notes' is not defined, use "N/A"
            var birthday = myContacts[i].birthday || "N/A"; // If 'birthday' is not defined, use "N/A"
            var company = myContacts[i].company || "N/A"; // If 'company' is not defined, use "N/A"
    
            table.prepend('<tr><td>' + i + '</td><td>' + imgHtml + '</td><td>' + myContacts[i].name + '</td><td>' + myContacts[i].phone + '</td><td>' + myContacts[i].email + '</td><td>' + group + '</td><td>' + notes + '</td><td>' + birthday + '</td><td>' + company + '</td><td><button id="edit" class="btn btn-info">Edit</button><button id="remove" class="btn btn-danger">X</button></td></tr>');
        }
    }
    
    
    

    function deletePerson(event) {
        var i = $('#table1 tr').index($(this).closest('tr')) - 1;
        myContacts.splice(i, 1);
        _render();
        localStorage.setItem('itemsArray', JSON.stringify(myContacts));
    }

    function editPerson(event) {
    var i = $('#table1 tr').index($(this).closest('tr')) - 1;  // Find out which row was clicked
    localStorage.setItem('editContactIndex', i);  // Store that row number in local storage
    window.location.href = "index.html";  // Redirect to the contact form page
}

    

    $("#search").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("table tr").filter(function(index) {
            if (index > 0) {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
            }
        });
    });

    return {
        deletePerson: deletePerson
    };
})();
