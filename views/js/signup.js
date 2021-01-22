$(document).ready(() => {
  $(".signup").on("submit", event => {
    event.preventDefault();
    const emailInput = $("#email-input")
      .val()
      .trim();
    const passwordInput = $("#password-input")
      .val()
      .trim();

    const userData = {
      email: emailInput,
      password: passwordInput
    };

    if (!userData.email || !userData.password) {
      return;
    }
    signUpUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  function signUpUser(email, password) {
    $.post("/api/signup", {
      email: email,
      password: password
    })
      .then(() => {
        window.location.replace("/home");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    // $("#alert .msg").text(err.responseJSON);
    // $("#alert").fadeIn(500);
    console.log(err);
  }
});
