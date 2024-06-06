package com.javaforce.javaforce.services;

import com.javaforce.javaforce.models.User;
import mysqlconnection.DBConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class UserService {

    public void registerUser(User user) throws SQLException {
        Connection connection = null;
        try {
            connection = DBConnection.getConnection();
            String query = "INSERT INTO users (username, email, password, role_id) VALUES (?, ?, ?, (SELECT id FROM roles WHERE name = ?))";
            PreparedStatement preparedStatement = connection.prepareStatement(query);
            preparedStatement.setString(1, user.getUsername());
            preparedStatement.setString(2, user.getEmail());
            preparedStatement.setString(3, user.getPassword());
            preparedStatement.setString(4, user.getRole());
            preparedStatement.executeUpdate();
        } finally {
            if (connection != null) {
                connection.close();
            }
        }
    }

    public User loginUser(String username, String password) throws SQLException {
        User user = null;
        Connection connection = null;
        try {
            connection = DBConnection.getConnection();
            String query = "SELECT u.id, u.username, u.email, r.name as role FROM users u JOIN roles r ON u.role_id = r.id WHERE u.username = ? AND u.password = ?";
            PreparedStatement preparedStatement = connection.prepareStatement(query);
            preparedStatement.setString(1, username);
            preparedStatement.setString(2, password);
            ResultSet resultSet = preparedStatement.executeQuery();

            if (resultSet.next()) {
                user = new User();
                user.setId(resultSet.getInt("id"));
                user.setUsername(resultSet.getString("username"));
                user.setEmail(resultSet.getString("email"));
                user.setRole(resultSet.getString("role"));
            }
        } finally {
            if (connection != null) {
                connection.close();
            }
        }
        return user;
    }
}
