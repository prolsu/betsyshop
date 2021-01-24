$(document).ready(() => {
  $(".buy").on("click", () => {
    $.ajax("/buying", {
      type: "GET"
    }).then(() => {
      window.location.replace("/buying");
    });
  });

  $(".sell").on("click", () => {
    $.ajax("/selling", {
      type: "GET"
    }).then(() => {
      window.location.replace("/selling");
    });
  });
});
