$(document).ready(() => {
  $(document).on("click", ".submitBuySearch", searchThisItem);
  $(document).on("click", ".buyBtn", buyListing);
  $(document).on("click", "#home", takeMeHome);

  function searchThisItem(event) {
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
  }

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

  function takeMeHome() {
    window.location.replace("/home");
  }
});
