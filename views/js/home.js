$(document).ready(() => {
  $(".buy").on("click", () => {
    window.location.replace("/buying");
  });

  $(".sell").on("click", () => {
    window.location.replace("/selling");
  });
});
