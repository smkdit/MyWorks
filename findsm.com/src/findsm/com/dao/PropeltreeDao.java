package findsm.com.dao;

import javax.naming.*;
import javax.sql.*;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
public class PropeltreeDao {

	 public Connection getConnection() {
		 Connection con = null;
		 try{
	   Class.forName("com.mysql.jdbc.Driver");
//	   String url = "jdbc:mysql://54.169.247.133:3306/findsm?useSSL=false;";
//	   String name = "root";
//	   String password = "findsm";

	   con = DriverManager.getConnection("jdbc:mysql://localhost:3306/findsm?useSSL=false", "root", "findsm");
		 }
		 catch(SQLException e){
			 System.out.println(e);
		 }
		 catch(ClassNotFoundException e){
			 System.out.println("Class not found error");
		 }
	   return con;
	}}
