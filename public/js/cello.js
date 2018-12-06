
/// silmek istediğiniz butona id ekleyin id numarasına göre siler 
function sil (clickElement, postUrl,cb){

    $(clickElement).on("click",function(e){

        console.log("tıklandı")
    
        var id = $(this).attr("id");
    
        if (confirm('Silmek İstediğinizden Eminmisiniz !')) {
            // Save it!
           $.post(postUrl,{id:id},function(data){
    
            cb(data)
    
           })
        } else {
            // Do nothing!
            console.log("vazgeçtik")
        }
    
        return false;
    })

}