package com.javaforce.javaforce.controllers;

import com.javaforce.javaforce.services.MemberService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;

@WebServlet("/deleteMember")
public class DeleteMemberServlet extends HttpServlet {
    private MemberService memberService;

    @Override
    public void init() throws ServletException {
        memberService = new MemberService();
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        int memberId = Integer.parseInt(request.getParameter("id"));

        try {
            memberService.deleteMember(memberId);
            response.sendRedirect("members");
        } catch (SQLException e) {
            throw new ServletException(e);
        }
    }
}
