
<%--
  Created by IntelliJ IDEA.
  User: okombi
  Date: 04/06/2024
  Time: 12:54
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="UTF-8">
    <title>Planification des Activites</title>
    <link rel="stylesheet" href="CSS/style.css">
</head>
<body>
<jsp:include page="menu.jsp" />
    <div class="container">

        <h1>Planification des Activités des Membres</h1>
        <form id="activityForm">
            <label for="memberName">Nom du membre:</label>
            <input type="text" id="memberName" name="memberName" required>

            <label for="activity">Activite:</label>
            <input type="text" id="activity" name="activity" required>

            <label for="date">Date:</label>
            <input type="date" id="date" name="date" required>

            <button type="submit">Ajouter</button>
        </form>
        <table id="activitiesTable">
            <thead>
            <tr>
                <th>Membre</th>
                <th>Activite</th>
                <th>Date</th>
            </tr>
            </thead>
            <tbody>
            <!-- Les activités ajoutées apparaîtront ici -->
            </tbody>
        </table>
    </div>
</body>
</html>
