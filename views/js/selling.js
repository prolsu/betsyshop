$(document).ready(() => {
  $(document).on("click", ".deleteBtn", deleteListing);
  // $(document).on("click", ".updateBtn", updateListing);

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
        .trim(),
      seller: $(".member-name").text()
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

  function deleteListing() {
    const listingId = $(this)
      .parent()
      .data().id;
    // console.log(listingId);
    $.ajax({
      method: "DELETE",
      url: `/api/selling/${listingId}`
    }).then(() => {
      window.location.reload();
    });
  }

  // function updateListing() {
  // here we update the sellers listings...
  // }

  $("#home").on("click", () => {
    window.location.replace("/home");
  });
});
