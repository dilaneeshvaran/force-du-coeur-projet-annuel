<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="com.javaforce.javaforce.models.User" %>
<%@ page import="javax.servlet.http.HttpSession" %>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Tableau de Bord Utilisateur</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
<jsp:include page="menu.jsp" />

<div class="container">
    <h1>Tableau de Bord Utilisateur</h1>
    <%
        User user = (User) session.getAttribute("user");
        if (user != null) {
    %>
    <p>Bienvenue, <%= user.getUsername() %>!</p>
    <p><a href="viewTasks.jsp">Voir les tâches</a></p>
    <p><a href="logout">Déconnexion</a></p>
    <%
        } else {
            response.sendRedirect("login.jsp");
        }
    %>
</div>
</body>
</html>
