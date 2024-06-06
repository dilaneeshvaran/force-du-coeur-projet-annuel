package com.javaforce.javaforce.controllers;

import com.javaforce.javaforce.models.Member;
import com.javaforce.javaforce.services.MemberService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

@WebServlet("/members")
public class MemberServlet extends HttpServlet {
    private MemberService memberService;

    @Override
    public void init() throws ServletException {
        memberService = new MemberService();
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            List<Member> members = memberService.getAllMembers();
            System.out.println("Fetched members in servlet: " + members); // For debugging
            request.setAttribute("members", members);
            request.getRequestDispatcher("members.jsp").forward(request, response);
        } catch (SQLException e) {
            throw new ServletException(e);
        }
    }
}
