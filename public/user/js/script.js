function addToCart(productId){
    $.ajax({
        url:'/addToCart/'+productId,
        method:'get',
        success:(response)=>{
            if(response.status){
                let count = $('#countCart').html()
				count=parseInt(count)+1
				$('#countCart').html(count)
            }
        }
    })
}