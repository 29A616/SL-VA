function submitOnEnter(event, nextField) {
    if (event.key === "Enter") {
      event.preventDefault();
      if (nextField) {
        document.getElementsByName(nextField)[0].focus();
      } else {
        var form = document.getElementById("login");
        form.submit();
      }
    }
  }

  // Use the correct class name for the click event
  document.querySelector(".submit").addEventListener("click", function(event) {
    // Prevent the default link behavior
    event.preventDefault();
    // Submit the form
    var form = document.getElementById("login");
    form.submit();
  });