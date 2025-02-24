from flask import Flask, render_template, request, redirect, url_for
import sqlite3

app = Flask(__name__)

# Función para crear la base de datos y la tabla de usuarios
def create_database():
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

# Ruta principal (tu página actual)
@app.route('/')
def index():
    return render_template('index.html')

# Ruta para mostrar el formulario de registro
@app.route('/register', methods=['GET'])
def register_form():
    return render_template('register.html')

# Ruta para procesar el formulario de registro
@app.route('/register', methods=['POST'])
def register():
    email = request.form['email']
    password = request.form['password']
    confirm_password = request.form['confirm_password']

    # Validar que las contraseñas coincidan
    if password != confirm_password:
        return "Las contraseñas no coinciden. Intenta de nuevo."

    # Conectar a la base de datos y guardar el usuario
    try:
        conn = sqlite3.connect('database.db')
        cursor = conn.cursor()
        cursor.execute('INSERT INTO users (email, password) VALUES (?, ?)', (email, password))
        conn.commit()
        conn.close()
    except sqlite3.IntegrityError:
        return "El correo electrónico ya está registrado."

    # Redirigir a una página de éxito
    return redirect(url_for('success'))

# Ruta para mostrar la página de éxito después del registro
@app.route('/success')
def success():
    return render_template('success.html')

# Iniciar la aplicación
if __name__ == '__main__':
    create_database()  # Crear la base de datos al iniciar
    app.run(debug=True)