$(document).ready(() => {
  $(document).on("submit", "#signup", submitUserSignUp);
  $(document).on("click", "#closeAlertModal", redirectToLogin);

  const emailInput = $("#email-input");
  const passwordInput = $("#password-input");

  function submitUserSignUp(event) {
    event.preventDefault();

    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }
    signupUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  }

  function signupUser(email, password) {
    $.post("/api/signup", {
      email: email,
      password: password
    })
      .then(() => {
        // if (!err) {
        window.location.replace("/home");
        // }
        // If there's an error, handle it by throwing up a bulma alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alertModal").addClass("is-active");
    const registeredUser = err.responseJSON.errors[0].instance.email;
    const alert = `<h1 class="subtitle">User '${registeredUser}' already exists</h1>`;
    $("#alertContent").append(alert);
    // keepRegisterUser(registeredUser);
  }

  // function keepRegisterUser(user) {
  //   return user;
  // }

  function redirectToLogin() {
    window.location.replace("/login");
  }
});
