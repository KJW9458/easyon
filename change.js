function change(obj) {
    var str = obj.value;
    var num = str.length;
    var i = str.lastIndexOf("\\");
    var index = str.substr(i + 1, num);
    document.getElementById('file_name').innerHTML = index;
    // document.querySelector('#sendFile').click();

    var form = $('#fileInput')[0];

    var formData = new FormData();
    formData.append('file', $('#fileInput')[0].files[0]);

    $.ajax({
        url: 'upload.php',
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: formData,
        type: 'POST',
        success: function(response) {
            console.log(response);
            $('#read').load('readdir.php');
        },
        error: function(error) {
            alert(error);
        }
    });
}

