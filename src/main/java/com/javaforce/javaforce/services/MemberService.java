package com.javaforce.javaforce.services;

import com.javaforce.javaforce.models.Member;
import mysqlconnection.DBConnection;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class MemberService {

    public List<Member> getAllMembers() throws SQLException {
        List<Member> members = new ArrayList<>();
        Connection connection = null;
        try {
            connection = DBConnection.getConnection();
            String query = "SELECT * FROM membres";
            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery(query);

            while (resultSet.next()) {
                Member member = new Member();
                member.setId(resultSet.getInt("id"));
                member.setName(resultSet.getString("nom"));
                member.setEmail(resultSet.getString("email"));
                members.add(member);
                System.out.println("Fetched member: " + member.getName()); // For debugging
            }

            System.out.println("Total members fetched: " + members.size()); // For debugging
        } finally {
            if (connection != null) {
                connection.close();
            }
        }
        return members;
    }

    public void addMember(Member member) throws SQLException {
        Connection connection = null;
        try {
            connection = DBConnection.getConnection();
            String query = "INSERT INTO membres (nom, email) VALUES (?, ?)";
            PreparedStatement preparedStatement = connection.prepareStatement(query);
            preparedStatement.setString(1, member.getName());
            preparedStatement.setString(2, member.getEmail());
            preparedStatement.executeUpdate();
        } finally {
            if (connection != null) {
                connection.close();
            }
        }
    }
    public Member getMemberById(int memberId) throws SQLException {
        Member member = null;
        Connection connection = null;
        try {
            connection = DBConnection.getConnection();
            String query = "SELECT * FROM membres WHERE id = ?";
            PreparedStatement preparedStatement = connection.prepareStatement(query);
            preparedStatement.setInt(1, memberId);
            ResultSet resultSet = preparedStatement.executeQuery();

            if (resultSet.next()) {
                member = new Member();
                member.setId(resultSet.getInt("id"));
                member.setName(resultSet.getString("nom"));
                member.setEmail(resultSet.getString("email"));
            }
        } finally {
            if (connection != null) {
                connection.close();
            }
        }
        return member;
    }

    public void updateMember(Member member) throws SQLException {
        Connection connection = null;
        try {
            connection = DBConnection.getConnection();
            String query = "UPDATE membres SET nom = ?, email = ? WHERE id = ?";
            PreparedStatement preparedStatement = connection.prepareStatement(query);
            preparedStatement.setString(1, member.getName());
            preparedStatement.setString(2, member.getEmail());
            preparedStatement.setInt(3, member.getId());
            preparedStatement.executeUpdate();
        } finally {
            if (connection != null) {
                connection.close();
            }
        }
    }

    public void deleteMember(int memberId) throws SQLException {
        Connection connection = null;
        try {
            connection = DBConnection.getConnection();
            String query = "DELETE FROM membres WHERE id = ?";
            PreparedStatement preparedStatement = connection.prepareStatement(query);
            preparedStatement.setInt(1, memberId);
            preparedStatement.executeUpdate();
        } finally {
            if (connection != null) {
                connection.close();
            }
        }
    }


}
