$(document).ready(() => {
  $(document).on("click", ".buy", buyersPage);
  $(document).on("click", ".sell", sellersPage);

  function buyersPage() {
    window.location.replace("/buying");
  }

  function sellersPage() {
    window.location.replace("/selling");
  }
});
