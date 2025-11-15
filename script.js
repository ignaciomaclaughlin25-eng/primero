// script.js

// Esperamos a que el DOM esté listo
$(document).ready(function () {
  // ======================
  // Manejo de temas
  // ======================
  function applyTheme(theme) {
    // Quitamos posibles temas anteriores
    $("body").removeClass("theme-dark theme-blue");

    // Agregamos el tema elegido
    $("body").addClass("theme-" + theme);

    // Sincronizamos el selector si existe
    $("#theme-selector").val(theme);
  }

  // Al cargar la página, aplicamos el tema guardado o uno por defecto
  const savedTheme = localStorage.getItem("theme") || "dark";
  applyTheme(savedTheme);

  // Cuando el usuario cambia el selector de tema
  $("#theme-selector").on("change", function () {
    const selectedTheme = $(this).val();
    localStorage.setItem("theme", selectedTheme); // Guardamos en localStorage
    applyTheme(selectedTheme); // Aplicamos en la página actual
  });

  // ======================
  // Validación del formulario de contacto
  // (solo se ejecuta en contacto.html, porque es donde existe el #contact-form)
  // ======================
  $("#contact-form").on("submit", function (event) {
    event.preventDefault(); // Evita el envío real

    // Limpiamos mensajes previos
    $(".error-text").text("");
    $("#form-message").removeClass("success error").text("");
    $("input, textarea").removeClass("input-error");

    let isValid = true;

    const name = $("#name").val().trim();
    const email = $("#email").val().trim();
    const message = $("#message").val().trim();

    // Validar nombre
    if (name === "") {
      $("#name-error").text("Por favor, ingresá tu nombre.");
      $("#name").addClass("input-error");
      isValid = false;
    }

    // Validar email (validación sencilla)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
      $("#email-error").text("Por favor, ingresá tu email.");
      $("#email").addClass("input-error");
      isValid = false;
    } else if (!emailPattern.test(email)) {
      $("#email-error").text("Ingresá un email válido.");
      $("#email").addClass("input-error");
      isValid = false;
    }

    // Validar mensaje (opcional, pero queda más completo)
    if (message === "") {
      $("#message-error").text("Contame brevemente qué necesitás.");
      $("#message").addClass("input-error");
      isValid = false;
    }

    if (!isValid) {
      $("#form-message").addClass("error").text("Revisá los campos marcados.");
      return; // No seguimos si hay errores
    }

    // Si todo está bien, "aceptamos" el formulario
    $("#form-message")
      .addClass("success")
      .text("¡Gracias por contactarme! Te responderé a la brevedad.");

    // Limpiamos el formulario
    this.reset();
  });
});
