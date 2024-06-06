<%@ page import="com.javaforce.javaforce.models.Member" %>
<%@ page import="java.util.List" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Gestion des Membres</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
<jsp:include page="menu.jsp" />

<div class="container">
    <h1>Gestion des Membres</h1>

    <a href="addMember.jsp" class="btn-add">Ajouter un membre</a>

    <table class="members-table" border="1">
        <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Action</th>
        </tr>
        <%
            List<Member> members = (List<Member>) request.getAttribute("members");
            if (members != null) {
                for (Member member : members) {
        %>
        <tr>
            <td><%= member.getId() %></td>
            <td><%= member.getName() %></td>
            <td><%= member.getEmail() %></td>
            <td>
                <div class="members-actions">
                    <a href="editMember?id=<%= member.getId() %>" class="btn-edit">Modifier</a>
                    <a href="deleteMember?id=<%= member.getId() %>" class="btn-delete" onclick="return confirm('Êtes-vous sûr de vouloir supprimer ce membre ?');">Supprimer</a>
                </div>
            </td>
        </tr>
        <%
            }
        } else {
        %>
        <tr>
            <td colspan="4">Aucun membre trouvé</td>
        </tr>
        <%
            }
        %>
    </table>
</div>

<style>
    /* Global styles */
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

    h1 {
        text-align: center;
        margin-top: 20px;
    }

    .btn-add {
        display: inline-block;
        padding: 10px 20px;
        margin-bottom: 20px;
        background-color: #4CAF50;
        color: #fff;
        border: none;
        border-radius: 4px;
        text-decoration: none;
        cursor: pointer;
    }

    .btn-add:hover {
        background-color: #45a049;
    }

    .members-table {
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;
        background: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .members-table, th, td {
        border: 1px solid #ddd;
    }

    th, td {
        padding: 10px;
        text-align: left;
    }

    th {
        background: #f4f4f4;
        text-align: center;
    }

    td {
        text-align: center;
    }

    .members-actions {
        display: flex;
        justify-content: center;
        gap: 10px;
    }

    .btn-edit, .btn-delete {
        padding: 5px 10px;
        color: #fff;
        border-radius: 4px;
        text-decoration: none;
        cursor: pointer;
    }

    .btn-edit {
        background-color: #4CAF50;
    }

    .btn-edit:hover {
        background-color: #45a049;
    }

    .btn-delete {
        background-color: #f44336;
    }

    .btn-delete:hover {
        background-color: #e53935;
    }

    .message {
        padding: 10px;
        margin: 10px 0;
        border: 1px solid #ddd;
        background: #e7f7ff;
        color: #31708f;
    }

    .error {
        padding: 10px;
        margin: 10px 0;
        border: 1px solid #f2dede;
        background: #f2dede;
        color: #a94442;
    }
</style>
</body>
</html>
