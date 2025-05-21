from email.message import EmailMessage
import smtplib
import os;
import sys;

EMAIL_USER = os.getenv('EMAIL_USER')
EMAIL_PASS = os.getenv('EMAIL_PASS')
SMTP_PORT = int(os.getenv('SMTP_PORT'))

def enviarEmail(emailDestinatario, username):
    asunto = 'Bienvenido a BuzzieChat'

    cuerpo_texto = f"""Hola {username},

    Gracias por registrarte en BuzzieChat. Puedes ir a iniciar sesión en el siguiente enlace:
    """

    cuerpo_html = f"""
    <html>
    <body>
        <p>Hola {username},</p>
        <p>Gracias por registrarte en BuzzieChat. Puedes ir a iniciar sesión en el siguiente enlace:</p><br>
        <a href="http://localhost:5173/login">Iniciar sesión</a>
        </p>
    </body>
    </html>
    """

    msg = EmailMessage()
    msg['From'] = EMAIL_USER
    msg['To'] = emailDestinatario
    msg['Subject'] = asunto
    msg.set_content(cuerpo_texto)
    msg.add_alternative(cuerpo_html, subtype='html')

    try:
        servidor = smtplib.SMTP('smtp.gmail.com', SMTP_PORT)
        servidor.starttls()
        print("Conexión al servidor SMTP exitosa.")
        servidor.login(EMAIL_USER,EMAIL_PASS)
        servidor.send_message(msg)
        print(servidor.quit())

        print("Email enviado a:", emailDestinatario)
    except Exception as error:
        print(f"Error al enviar el correo: {error}")

if __name__ == "__main__":
    emailDestinatario = sys.argv[1]
    username = sys.argv[2]
    enviarEmail(emailDestinatario, username)

