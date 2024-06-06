<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="com.javaforce.javaforce.models.User" %>
<%@ page import="javax.servlet.http.HttpSession" %>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Tableau de Bord Administrateur</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
<jsp:include page="menu.jsp" />

<div class="container">
    <h1>Tableau de Bord Administrateur</h1>
    <%
        User user = (User) session.getAttribute("user");
        if (user != null) {
    %>
    <p>Bienvenue, <%= user.getUsername() %>!</p>
    <p class="p-btn"><a href="members" class="btn">Gérer les membres</a></p>
    <p><a href="logout" class="btn">Déconnexion</a></p>
    <%
        } else {
            response.sendRedirect("login.jsp");
        }
    %>
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
    }

    .btn {
        padding: 10px 20px;
        background: #333;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        text-align: center;
        text-decoration: none;
        margin: 10px;
    }

    .btn:hover {
        background: #555;
    }
    .p-btn{
        margin-bottom: 10px;
    }

    h1 {
        text-align: center;
        margin-top: 20px;
    }
</style>
</body>
</html>
