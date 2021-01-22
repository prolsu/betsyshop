$(document).ready(() => {
  $(document).on("click", ".buyBtn", buyListing);

  $(".submitBuySearch").on("click", event => {
    event.preventDefault();

    const searchForThis = $("#searching")
      .val()
      .trim();

    $.ajax(`/buying/${searchForThis}`, {
      type: "GET"
    }).then(() => {
      $(".searching").val("");
    });

    console.log(`Item Searched: ${searchForThis}`);
    window.location.replace(`/buying/${searchForThis}`);
  });

  function buyListing() {
    const listingId = $(this)
      .parent()
      .data().id;

    const sellerEmail = $(this)
      .prev()
      .text();

    const sellerItem = $(this)
      .prev()
      .prev()
      .prev()
      .prev()
      .prev()
      .prev()
      .text();

    const itemInfo = {
      email: sellerEmail,
      item: sellerItem
    };
    $.ajax(`/api/buying/${listingId}`, {
      type: "PUT",
      data: itemInfo
    }).then(() => {
      window.location.reload();
    });
  }

  $("#home").on("click", () => {
    window.location.replace("/home");
  });
});
