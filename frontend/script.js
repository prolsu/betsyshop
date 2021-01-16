$(document).ready(() => {
  $("#floatingSelect").change(function() {
    const value = $(this).val();
    console.log(value);

    if (value === "sell") {
      //backend route to sell page (return)

      location.href = "sell.html";
    }

    if (value === "buy") {
      //backend route to sell page (return)

      location.href = "buy.html";
    }
  });

  $("#submitButton").click(() => {
    const itemName = $("#itemName").val();
    const description = $("#description").val();
    const category = $("#category").val();
    const price = $("#price").val();

    const item = {
      name: itemName,
      description: description,
      category: category,
      price: price
    };
    //post new item to db
    console.log(item);
  });
});
