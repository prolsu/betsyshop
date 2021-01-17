$(document).ready(() => {
  $(".submitSell").on("click", event => {
    event.preventDefault();

    const newItemToSell = {
      item: $(".item")
        .val()
        .trim(),
      description: $(".description")
        .val()
        .trim(),
      category: $(".category")
        .val()
        .trim(),
      price: $(".price")
        .val()
        .trim()
    };
    if (
      !newItemToSell.item ||
      !newItemToSell.description ||
      !newItemToSell.category ||
      !newItemToSell.price
    ) {
      alert("Boxes can't be empty!");
    } else {
      $.ajax("/api/selling", {
        type: "POST",
        data: newItemToSell
      }).then(() => {
        location.reload();
      });
    }
  });

  $(".home").on("click", () => {
    window.location.replace("/home");
  });
});
