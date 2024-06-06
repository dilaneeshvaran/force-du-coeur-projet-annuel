<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Accueil</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
<div class="container">
    <h1>Bienvenue sur notre application</h1>
    <p>Veuillez vous connecter ou créer un compte pour continuer.</p>
    <a href="login.jsp" class="btn">Se connecter</a>
    <a href="register.jsp" class="btn">Créer un compte</a>
</div>

<style>
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
        color: #333;
    }

    .container {
        width: 80%;
        margin: 0 auto;
        padding: 20px;
        background: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        text-align: center;
    }

    h1 {
        margin-bottom: 20px;
    }

    p {
        margin-bottom: 20px;
    }

    .btn {
        display: inline-block;
        padding: 10px 20px;
        margin: 10px;
        background-color: #4CAF50;
        color: #fff;
        border: none;
        border-radius: 4px;
        text-decoration: none;
        cursor: pointer;
    }

    .btn:hover {
        background-color: #45a049;
    }
</style>
</body>
</html>
