$(document).ready(() => {
  $(".submitBuySearch").on("click", event => {
    event.preventDefault();

    const searchForThis = $(".searching")
      .val()
      .trim();

    $.ajax(`/buying/${searchForThis}`, {
      type: "GET"
    }).then(() => {
      $(".searching").val("");
    });

    console.log(`Item Searched: ${searchForThis}`);
    location.replace(`/buying/${searchForThis}`);
  });

  $(".buyBtn").on("click", event => {
    event.stopPropagation();
    console.log("Item Bought!");
    //item needs to be removed from the db with a http delete request
  });

  $(".home").on("click", () => {
    window.location.replace("/home");
  });
});
