function submitOnEnter(event, nextField) {
    if (event.key === "Enter" || event.type === "click") {
      event.preventDefault();

      var form = document.getElementById("signup");
      var requiredFields = form.querySelectorAll('[required]');
      var allFieldsFilled = Array.from(requiredFields).every(function (field) {
        return field.value.trim() !== ''; // Check if each required field is not empty
      });

      if (allFieldsFilled) {
        if (nextField) {
          document.getElementById(nextField).focus();
        } else {
          form.submit();
        }
      }
    }
  }

  document.querySelectorAll(".input-box input").forEach(function (input, index, array) {
    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        // Move focus to the next input or submit the form if it's the last input
        event.preventDefault();
        index < array.length - 1 ? array[index + 1].focus() : submitOnEnter(event, null);
      }
    });
  });