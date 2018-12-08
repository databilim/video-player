var fd = new FormData();
var input = $('.file');
var userId = $('.userId');
$(".logoYukle").click(function (e) {
    if(!input[0].files[0]){

        alert("DOSYA SEÇMEDİNİZ ")
    }else{
        fd.append("file",input[0].files[0]);
        fd.append("userId",userId[0].value);
    
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
            url: '/genelAyar/logoYukle',
            data: fd,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function(data,textStatus, jqXHR){
                
               location.reload(); 
              if(Array.isArray(data) == true){
                   console.log(data)
                  data.shift()
                  
                 
              }else{

                    $(".hata").html('<h1>' + data + '</h1>')
              }


            }
        });

    }


  return false;
})