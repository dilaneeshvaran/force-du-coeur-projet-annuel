<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="com.javaforce.javaforce.models.User" %>
<%@ page import="javax.servlet.http.HttpSession" %>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Menu</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
<nav>
    <ul class="menu">
        <li><a href="index.jsp">Accueil</a></li>
        <li><a href="members">Gérer les membres</a></li>
        <li><a href="planning.jsp">Planification</a></li>
        <li><a href="taches.jsp">Tâches</a></li>
        <li><a href="ressources.jsp">Ressources</a></li>
        <li><a href="contact.jsp">Contact</a></li>
    </ul>
    <div class="user-info">
        <%
            User user = (User) session.getAttribute("user");
            if (user != null) {
        %>
        <a href="img/avatar.png"><img src="img/avatar.png" alt="Avatar" class="avatar"></a>
        <span class="username"><%= user.getUsername() %></span>
        <a href="logout" class="logout">Déconnexion</a>
        <%
        } else {
        %>
        <a href="login.jsp" class="login">Connexion</a>
        <a href="register.jsp" class="register">Inscription</a>
        <%
            }
        %>
    </div>
</nav>

<style>
    nav {
        background-color: #333;
        overflow: hidden;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
    }
    nav ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        display: flex;
    }
    nav ul li {
        margin-right: 20px;
    }
    nav ul li a {
        display: block;
        color: white;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
    }
    nav ul li a:hover {
        background-color: #111;
    }
    .user-info {
        display: flex;
        align-items: center;
    }
    .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 10px;
    }
    .username {
        margin-right: 20px;
        color: white;
    }
    .logout, .login, .register {
        color: white;
        text-decoration: none;
        background-color: #f44336;
        padding: 5px 10px;
        border-radius: 4px;
        margin-right: 10px;
    }
    .logout:hover, .login:hover, .register:hover {
        background-color: #d32f2f;
    }
</style>

</body>
</html>
