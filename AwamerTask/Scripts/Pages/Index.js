$(document).ready(function () {
    debugger;
    GetData();

});

function GetData() {
    debugger;
    $.ajax({
        type: "GET",
        url: "/Home/SelectAll",
        data: '',
        contentType: "application/json",
        dataType: "json",
        success: function (data) {
            debugger;
            if (data != null) {
                debugger;
                FillDataTable(data);
            }
        }
    });

}

function FillDataTable(objList) {
    debugger;
    $('#TblHeader tbody').find('tr').remove();

    if (objList != null && objList.length > 0) {

        for (var i = 0; i < objList.length; i++) {
            $('#TblHeader  tbody').append('<tr>' +
                '<td style="width: 5%;" class="StudentId" StudentIdProp= "' + objList[i].StudentId+'"> ' + ($('#TblHeader  tbody tr').length + 1) + ' </td>' +
                '<td style="width: 10%;" class="StudentName" StudentNameProp = "' + objList[i].StudentName + '"> ' + objList[i].StudentName + ' </td>' +
                '<td style="width: 10%;" class="CourseName" CourseIdProp="' + objList[i].CourseId + '"   CourseNameProp="' + objList[i].CoursreName + '"> ' + objList[i].CoursreName + ' </td>' +
                '<td style="width: 10%;" class="Age"  AgeProp="' + objList[i].Age + '"> ' + objList[i].Age + ' </td>' +
                '<td style="width: 10%; " ><a href="javascript:;" id="btnUpdate" data-toggle="modal" data-target="#AddEditModal" onclick="Update(this);"  class="btn btn-md blue"><i class="fa fa-edit"></i></a></td>' +
                '<td style="width: 10%; " ><a href="javascript:;" id="btnDelete" onclick="Delete(this);"   class="btn btn-md red"><span></span><i class="fa fa-trash"></i></a></td>' +
                '</tr>');
          

        }
    }
}


function Update(e) {
    $('#student_id').val($(e).parents('tr').find('.StudentId').attr('StudentIdProp'));
    $('#Student_Name').val($(e).parents('tr').find('.StudentName').attr('StudentNameProp'));

    $('#Student_Age').val($(e).parents('tr').find('.Age').attr('AgeProp'));


    $("#Course").val($(e).parents('tr').find('.CourseName').attr('CourseIdProp')).trigger('change');
    $("#Course").attr('tag', $(e).parents('tr').find('.CourseName').attr('CourseIdProp'));
    
}
function Delete(e) {
    var id = $(e).parents('tr').find('.StudentId').attr('StudentIdProp');
    if (id != null && id != "" && id != undefined) {

        var DTO = { 'id': id };
        debugger;
        $.ajax({
            type: "POST",
            url: "/Home/Delete",
            data: JSON.stringify(DTO),
            contentType: "application/json",
            dataType: "json",
            async: false,
            success: function (data) {
                result = data;
                debugger;
                if (result == true) {
                    alert('DataSaved');
                }
                else {
                    alert('DataNotSaved');
                }
            }
        });
        GetData();

    }
}

function Save() {
    var data = {};
    data.StudentId = $('#student_id').val();
    data.StudentName = $('#Student_Name').val();
    data.Age = $('#Student_Age').val();
    data.CourseId = $("#Course option:selected").val();
    data.CoursreName = $("#Course option:selected").text();

    var DTO = { 'data': data };
    debugger;
    $.ajax({
        type: "POST",
        url: "/Home/Save",
        data: JSON.stringify(DTO),
        contentType: "application/json",
        dataType: "json",
        async: false,
        success: function (data) {
            result = data;
            debugger;
            if (result == true) {
                alert('DataSaved');              
            }
            else {
                alert('DataNotSaved');
            }
        }
    });

    $("#AddEditModal .close").click();

    GetData();

    resetForm();

}
function resetForm() {

    $('#student_id').val("");
    $('#Student_Name').val("");
    $('#Student_Age').val("");
    $("#Course").val("").trigger('change');
    $("#Course").attr('tag', "");
}
