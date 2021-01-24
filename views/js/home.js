$(document).ready(() => {
  $(".buy").on("click", () => {
    window.location.replace("/buyings");
  });

  $(".sell").on("click", () => {
    window.location.replace("/sellings");
  });
});
