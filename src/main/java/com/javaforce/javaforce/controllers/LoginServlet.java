package com.javaforce.javaforce.controllers;

import com.javaforce.javaforce.models.User;
import com.javaforce.javaforce.services.UserService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.sql.SQLException;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {
    private UserService userService;

    @Override
    public void init() throws ServletException {
        userService = new UserService();
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String username = request.getParameter("username");
        String password = request.getParameter("password");

        try {
            User user = userService.loginUser(username, password);
            if (user != null) {
                HttpSession session = request.getSession();
                session.setAttribute("user", user);
                if ("ADMIN".equals(user.getRole())) {
                    response.sendRedirect("adminDashboard.jsp");
                } else {
                    response.sendRedirect("userDashboard.jsp");
                }
            } else {
                request.setAttribute("errorMessage", "Nom d'utilisateur ou mot de passe incorrect.");
                request.getRequestDispatcher("login.jsp").forward(request, response);
            }
        } catch (SQLException e) {
            throw new ServletException(e);
        }
    }
}
