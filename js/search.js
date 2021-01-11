// 네이버 검색 ajax
function naver_btn() {
    var val = $('#nsearch').val();
    
    $.ajax({
        url: "../search.php",
        type: "GET",
        dataType: "json",
        data: {
            query: val,
        },
        cache: false,
        success: function(data) {
            console.log(data);
            var n = JSON.parse(data);
            console.log(n.items[0].title);
            var end = n.display;
            var content = "";
            $('#naver').html('');
            for (var i = n.start; i <= end; i++) {
                content += "<div>";
                content += "<div><img src='" + n.items[i].thumbnail + "' style='width:" + n.items[i].sizewidth + ";height:" + n.items[i].sizewidth + "'></div>";
                content += "<div>" + n.items[i].title + "</div>";
                //                    content += "<div>"+n.items[i].description+"</div>";
                content += "</div><br>";
                $('#naver').html(content);
            }
        },
        error: function(e) {
            console.log(e);
        }
    });
}
