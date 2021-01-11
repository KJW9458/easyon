$('input[type=range]').on('input', function() {
    var val = $(this).val();
    $(this).css('background', 'linear-gradient(to right, #3ebaae 0%, #3ebaae ' + val + '%, #d5d4d3 ' + val + '%, #d5d4d3 100%)');
});

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tab");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" on", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " on";
}

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

    // $.ajax({
    //     url: 'upload.php',
    //     dataType: 'text',
    //     cache: false,
    //     contentType: false,
    //     processData: false,
    //     data: formData,
    //     type: 'POST',
    //     success: function(response) {
    //         console.log(response);
    //         $('#read').load('readdir.php');
    //     },
    //     error: function(error) {
    //         console.log(error);
    //     }
    // });
}

function Enter_Check() {
    // 엔터키의 코드는 13입니다.
    if (event.keyCode == 13) {
        document.querySelector('#nbtn').click();
        return;
    }
}

$('.messages').scrollTop($('.messages').prop('scrollHeight'));