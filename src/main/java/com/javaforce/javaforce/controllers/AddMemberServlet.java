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

@WebServlet("/addMember")
public class AddMemberServlet extends HttpServlet {
    private MemberService memberService;

    @Override
    public void init() throws ServletException {
        memberService = new MemberService();
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String name = request.getParameter("name");
        String email = request.getParameter("email");

        Member member = new Member();
        member.setName(name);
        member.setEmail(email);

        try {
            memberService.addMember(member);
            response.sendRedirect("members");
        } catch (SQLException e) {
            throw new ServletException(e);
        }
    }
}
