<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Connexion</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
<!-- jsp:include page="menu.jsp" / -->

<div class="container">
  <h1>Connexion</h1>
  <%
    String errorMessage = (String) request.getAttribute("errorMessage");
    if (errorMessage != null) {
  %>
  <div class="error"><%= errorMessage %></div>
  <%
    }
  %>
  <form action="login" method="post" class="form-container">
    <div class="form-group">
      <label for="username">Nom d'utilisateur:</label>
      <input type="text" id="username" name="username" required>
    </div>
    <div class="form-group">
      <label for="password">Mot de passe:</label>
      <input type="password" id="password" name="password" required>
    </div>
    <div class="form-group">
      <input type="submit" value="Se connecter" class="btn">
    </div>
  </form>
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

  .form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .form-group {
    margin-bottom: 15px;
    width: 100%;
  }

  .form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }

  .form-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
  }

  .btn {
    padding: 10px 20px;
    background: #333;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
  }

  .btn:hover {
    background: #555;
  }

  .error {
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #f2dede;
    background: #f2dede;
    color: #a94442;
    text-align: center;
  }

  h1 {
    text-align: center;
    margin-top: 20px;
  }
</style>
</body>
</html>
