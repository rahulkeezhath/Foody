const { response } = require("express")

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

function addToWishlist(productId){
    $.ajax({
        url:'/addToWishlist/'+productId,
        method:'get',
        success:(response)=>{
            if(response.status){
                let count = $('countCart').html()
                count= parseInt(count)+1
                $('#countCart').html(count)
            }
        }
    })
}