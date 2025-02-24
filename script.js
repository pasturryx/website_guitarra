document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita que el formulario se envíe

    // Obtener los valores del formulario
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm_password').value;

    // Validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, ingresa un correo electrónico válido.');
        return;
    }

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden. Intenta de nuevo.');
        return;
    }

    // Crear un objeto con los datos del usuario
    const user = {
        email: email,
        password: password,
    };

    // Guardar el usuario en localStorage
    localStorage.setItem('user', JSON.stringify(user));

    // Redirigir a la página de éxito
    window.location.href = 'registro_database_local/success.html';
});