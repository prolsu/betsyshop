$(document).ready(function(){
    $("#floatingSelect").change(function(){
    var value = $(this).val()  
    console.log (value)

    if (value === "sell"){
        //backend route to sell page (return)

        location.href = "sell.html"
    }

    if (value === "buy"){
        //backend route to sell page (return)

        location.href = "buy.html"
    }
    });

$("#submitButton").click(function(event){
    var itemName = $("#itemName").val()
    var description = $("#description").val()
    var category = $("#category").val()
    var price = $("#price").val()

    var item = {
        name: itemName, 
        description: description,
        category: category,
        price: price  
    }
    //post new item to db
    console.log(item)
})

  });

