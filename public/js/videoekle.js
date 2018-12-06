var fd = new FormData();
var input = $('.file');
var description = $('.description');
var title = $('.title');
var sira = $('.sira');

 

$(".uploadButton").click(function (e) {
 
 
    console.dir(input[0].files[0])
    if(!input[0].files[0]){

        alert("DOSYA SEÇMEDİNİZ ")
    }else{
        fd.append("file",input[0].files[0]);
        fd.append("description", description[0].value);
        fd.append("title", title[0].value);
        fd.append("sira", sira[0].value);
        fd.append("type", input[0].files[0].type);
       // $("form").slideUp();
        var req =  $.ajax({
            xhr: function() {
                var xhr = new window.XMLHttpRequest();

                xhr.upload.addEventListener("progress", function(evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = evt.loaded / evt.total;
                        percentComplete = parseInt(percentComplete * 100);
                        console.log(evt.loaded);
                            $(".progress-bar").attr("style","width: "+percentComplete+"%")
                            $(".progress-bar").attr("style","width: "+percentComplete+"%")
                            $(".progress-bar").html(" "+percentComplete+"%")
                        if (percentComplete === 100) {

                        

                        }

                    }
                }, false);

                return xhr;
            },
            url: '/videoekle',
            data: fd,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function(data,textStatus, jqXHR){
               console.log(data)
               location.reload(); 
              if(Array.isArray(data) == true){
                   console.log(data)
                  data.shift()
                 // data.shift()
                 // data.shift()
                 // data.shift()
                 // data.splice(-1,1)
                 // data.splice(-1,1)
                  //data.splice(-1,1)

                 
              }else{

                    $(".hata").html('<h1>' + data + '</h1>')
              }


            }
        });

    }
    return false;
})



sil(".videoSil","/admin/sil",function(data){
        console.log(data)
        $("#"+data.id).parent().parent().remove()
})





