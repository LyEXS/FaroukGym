<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nom = htmlspecialchars($_POST['nom']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);
    $to = "contact@faroukgym.fr";
    $subject = "Nouveau message de $nom";
    $body = "Nom: $nom\nEmail: $email\nMessage:\n$message";
    $headers = "From: $email";
    mail($to, $subject, $body, $headers);
    header("Location: merci.html");
    exit();
}
?>