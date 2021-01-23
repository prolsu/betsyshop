$(document).ready(() => {
  const signUp = $("#signup");
  const emailInput = $("#email-input");
  const passwordInput = $("#password-input");

  signUp.on("submit", event => {
    event.preventDefault();

    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
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
