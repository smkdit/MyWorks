package findsm.com.dao;

import java.io.ByteArrayInputStream;
import java.io.Console;
import java.io.File;
import java.io.InputStream;
import java.io.FileInputStream;
import java.sql.*;
import java.text.DateFormat;
import java.text.SimpleDateFormat;

import javax.sql.rowset.serial.SerialBlob;

import org.codehaus.jettison.json.JSONArray;

//import sun.misc.BASE64Decoder;

import findsm.com.util.ToJSON;
import com.sun.jersey.core.util.Base64;

public class SchemaQueries extends PropeltreeDao{
	
	public int insertIntoNewBusinessTable(String BUSINESS_NAME, String MAIN_CATEGORY, String SUB_CATEGORY1, String SUB_CATEGORY2, String SUB_CATEGORY3, String OTHER_CATEGORY1, String OTHER_CATEGORY2, String OTHER_CATEGORY3, String DESCRIPTION, String SHORT_DESC, String PHONE, String MOBILE, String EMAIL, String WEBSITE, String FACEBOOK, String TWITTER, String GOOGLE_PLUS, String LINKEDIN, String STREET, String AREA, String STATE_NAME, String CITY, String ZIP,String LANDMARK, String PHOTO, String MON_OPEN, String MON_CLOSE, String TUES_OPEN, String TUES_CLOSE, String WED_OPEN, String WED_CLOSE, String THURS_OPEN, String THURS_CLOSE, String FRI_OPEN, String FRI_CLOSE, String SAT_OPEN, String SAT_CLOSE, String SUN_OPEN, String SUN_CLOSE,String ACTIVE, String USER_ROLE, String VERIFICATION) throws Exception{
		 
		PreparedStatement query = null;
		Connection conn = null;
		
		try{
			conn = getConnection();
			query = conn.prepareStatement("insert into BUSINESS_TABLE_SECONDARY " + "(BUSINESS_NAME, MAIN_CATEGORY, SUB_CATEGORY1, SUB_CATEGORY2, SUB_CATEGORY3, OTHER_CATEGORY1, OTHER_CATEGORY2, OTHER_CATEGORY3, DESCRIPTION, SHORT_DESC, PHONE, MOBILE, EMAIL, WEBSITE, FACEBOOK, TWITTER, GOOGLE_PLUS, LINKEDIN, STREET, AREA, STATE_NAME, CITY, ZIP, LANDMARK, PHOTO, MONDAY_OPEN, MONDAY_CLOSE, TUESDAY_OPEN, TUESDAY_CLOSE, WEDNESDAY_OPEN, WEDNESDAY_CLOSE, THURSDAY_OPEN, THURSDAY_CLOSE, FRIDAY_OPEN, FRIDAY_CLOSE, SATURDAY_OPEN, SATURDAY_CLOSE, SUNDAY_OPEN, SUNDAY_CLOSE, ACTIVE, USER_ROLE, VERIFICATION) " + "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
			query.setString(1, BUSINESS_NAME);
			query.setString(2, MAIN_CATEGORY);
			query.setString(3, SUB_CATEGORY1);
			query.setString(4, SUB_CATEGORY2);
			query.setString(5, SUB_CATEGORY3);
			query.setString(6, OTHER_CATEGORY1);
			query.setString(7, OTHER_CATEGORY2);
			query.setString(8, OTHER_CATEGORY3);
			query.setString(9, DESCRIPTION);
			query.setString(10, SHORT_DESC);
			query.setString(11, PHONE);
			query.setString(12, MOBILE);
			query.setString(13, EMAIL);
			query.setString(14, WEBSITE);
			query.setString(15, FACEBOOK);
			query.setString(16, TWITTER);
			query.setString(17, GOOGLE_PLUS);
			query.setString(18, LINKEDIN);
			query.setString(19, STREET);
			query.setString(20, AREA);
			query.setString(21, STATE_NAME);
			query.setString(22, CITY);
			int zipInt = Integer.parseInt(ZIP);
			query.setInt(23, zipInt);
			query.setString(24, LANDMARK);
			query.setString(25, PHOTO);
			query.setString(26, MON_OPEN);
			query.setString(27, MON_CLOSE);
			query.setString(28, TUES_OPEN);
			query.setString(29, TUES_CLOSE);
			query.setString(30, WED_OPEN);
			query.setString(31, WED_CLOSE);
			query.setString(32, THURS_OPEN);
			query.setString(33, THURS_CLOSE);
			query.setString(34, FRI_OPEN);
			query.setString(35, FRI_CLOSE);
			query.setString(36, SAT_OPEN);
			query.setString(37, SAT_CLOSE);
			query.setString(38, SUN_OPEN);
			query.setString(39, SUN_CLOSE);
			query.setString(40, ACTIVE);
			query.setString(41, USER_ROLE);
			query.setString(42, VERIFICATION);
			query.executeUpdate();
		}
		catch(Exception e){
			e.printStackTrace();
			return 500;
		}
		finally{
			if(conn != null) conn.close();
		}
		return 200;
	}
	
	
	public int insertIntoNewBusinessImagesTable(String BUSINESS_NAME, String AREA,  String CITY, String IMAGES) throws Exception{
		PreparedStatement query = null;
		Connection conn = null;
		
		try{
			conn = getConnection();
			query = conn.prepareStatement("insert into BUSINESS_IMAGES " + "(BUSINESS_NAME, AREA, CITY, IMAGES)" + "VALUES (?, ?, ?, ?)");
			query.setString(1, BUSINESS_NAME);
			query.setString(2, AREA);
			query.setString(3, CITY);
			query.setString(4, IMAGES);
			query.executeUpdate();
		}
		catch(Exception e){
			e.printStackTrace();
			return 500;
		}
		finally{
			if(conn != null) conn.close();
		}
		return 200;
	}
	
	public int updateNewBusinessImagesTable(String BUSINESS_NAME, String AREA,  String CITY, String IMAGES) throws Exception{
		PreparedStatement query = null;
		Connection conn = null;
		
		try{
			conn = getConnection();
			query = conn.prepareStatement("UPDATE BUSINESS_IMAGES SET IMAGES = ? WHERE BUSINESS_NAME = ? AND AREA = ? AND CITY = ?");
			query.setString(1, IMAGES);
			query.setString(2, BUSINESS_NAME);
			query.setString(3, AREA);
			query.setString(4, CITY);
			query.executeUpdate();
		}
		catch(Exception e){
			e.printStackTrace();
			return 500;
		}
		finally{
			if(conn != null) conn.close();
		}
		return 200;
	}
	
	public int insertIntoNewsPartnerImagesTable(String BUSINESS_NAME, String AREA, String CITY, String IMAGES) throws Exception{
		PreparedStatement query = null;
		Connection conn = null;
		
		try{
			conn = getConnection();
			query = conn.prepareStatement("insert into BUSINESS_IMAGES " + "(BUSINESS_NAME, AREA, CITY, IMAGES)" + "VALUES (?, ?, ?, ?)");
			query.setString(1, BUSINESS_NAME);
			query.setString(2, AREA);
			query.setString(3, CITY);
			query.setString(4, IMAGES);
			query.executeUpdate();
		}
		catch(Exception e){
			e.printStackTrace();
			return 500;
		}
		finally{
			if(conn != null) conn.close();
		}
		return 200;
	}
	
	public int insertIntoSubCategoryList(String CATEGORY, String SUB_CATEGORY) throws Exception{
		PreparedStatement query = null;
		Connection conn = null;
		
		try{
			conn = getConnection();
			query = conn.prepareStatement("insert into SUB_CATEGORY_LIST " + "(CATEGORY, SUB_CATEGORY)" + "VALUES (?, ?)");
			query.setString(1, CATEGORY);
			query.setString(2, SUB_CATEGORY);
			query.executeUpdate();
		}
		catch(Exception e){
			e.printStackTrace();
			return 500;
		}
		finally{
			if(conn != null) conn.close();
		}
		return 200;
	}
	
	public int insertIntoCityAreaList(String STATE_NAME, String CITY, String AREA) throws Exception{
		PreparedStatement query = null;
		Connection conn = null;
		
		try{
			conn = getConnection();
			query = conn.prepareStatement("insert into CITY_AREA_LIST " + "(STATE_NAME, CITY, AREA)" + "VALUES (?, ?, ?)");
			query.setString(1, STATE_NAME);
			query.setString(2, CITY);
			query.setString(3, AREA);
			query.executeUpdate();
		}
		catch(Exception e){
			e.printStackTrace();
			return 500;
		}
		finally{
			if(conn != null) conn.close();
		}
		return 200;
	}
	
	public int insertIntoBusinessProducts(String BUSINESS_NAME, String AREA, String CITY, String PRODUCT_NAME) throws Exception{
		PreparedStatement query = null;
		Connection conn = null;
		
		try{
			conn = getConnection();
			query = conn.prepareStatement("insert into BUSINESS_PRODUCTS " + "(BUSINESS_NAME, AREA, CITY, PRODUCT_NAME)" + "VALUES (?, ?, ?, ?)");
			query.setString(1, BUSINESS_NAME);
			query.setString(2, AREA);
			query.setString(3, CITY);
			query.setString(4, PRODUCT_NAME);
			query.executeUpdate();
		}
		catch(Exception e){
			e.printStackTrace();
			return 500;
		}
		finally{
			if(conn != null) conn.close();
		}
		return 200;
	}
	
	public int updateBusinessProducts(String BUSINESS_NAME, String AREA, String CITY, String PRODUCT_NAME) throws Exception{
		PreparedStatement query = null;
		Connection conn = null;
		
		try{
			conn = getConnection();
			query = conn.prepareStatement("DELETE FROM BUSINESS_PRODUCTS WHERE BUSINESS_NAME = ? AND AREA = ? AND CITY = ?");
//			query.setString(1, PRODUCT_NAME);
			query.setString(1, BUSINESS_NAME);
			query.setString(2, AREA);
			query.setString(3, CITY);
			query.executeUpdate();
			insertIntoBusinessProducts(BUSINESS_NAME, AREA, CITY, PRODUCT_NAME);
		}
		catch(Exception e){
			e.printStackTrace();
			return 500;
		}
		finally{
			if(conn != null) conn.close();
		}
		return 200;
	}
	
	public int insertIntoBusinessServices(String BUSINESS_NAME, String AREA, String CITY, String SERVICE_NAME) throws Exception{
		PreparedStatement query = null;
		Connection conn = null;
		
		try{
			conn = getConnection();
			query = conn.prepareStatement("insert into BUSINESS_SERVICES " + "(BUSINESS_NAME, AREA, CITY, SERVICE_NAME)" + "VALUES (?, ?, ?, ?)");
			query.setString(1, BUSINESS_NAME);
			query.setString(2, AREA);
			query.setString(3, CITY);
			query.setString(4, SERVICE_NAME);
			query.executeUpdate();
		}
		catch(Exception e){
			e.printStackTrace();
			return 500;
		}
		finally{
			if(conn != null) conn.close();
		}
		return 200;
	}
	
	public int updateBusinessServices(String BUSINESS_NAME, String AREA, String CITY, String SERVICE_NAME) throws Exception{
		PreparedStatement query = null;
		Connection conn = null;
		
		try{
			conn = getConnection();
			query = conn.prepareStatement("DELETE FROM BUSINESS_SERVICES WHERE BUSINESS_NAME = ? AND AREA = ? AND CITY = ?");
//			query.setString(1, SERVICE_NAME);
			query.setString(1, BUSINESS_NAME);
			query.setString(2, AREA);
			query.setString(3, CITY);
			query.executeUpdate();
			insertIntoBusinessServices(BUSINESS_NAME, AREA, CITY, SERVICE_NAME);
		}
		catch(Exception e){
			e.printStackTrace();
			return 500;
		}
		finally{
			if(conn != null) conn.close();
		}
		return 200;
	}
	
	public int insertIntoProductsTable(String PRODUCT_NAME) throws Exception{
		PreparedStatement query = null;
		Connection conn = null;
		
		try{
			conn = getConnection();
			query = conn.prepareStatement("insert into PRODUCTS_TABLE " + "(PRODUCT_NAME)" + "VALUES (?)");
			query.setString(1, PRODUCT_NAME);
			query.executeUpdate();
		}
		catch(Exception e){
			e.printStackTrace();
			return 500;
		}
		finally{
			if(conn != null) conn.close();
		}
		return 200;
	}
	
	public int insertIntoServicesTable(String SERVICE_NAME) throws Exception{
		PreparedStatement query = null;
		Connection conn = null;
		
		try{
			conn = getConnection();
			query = conn.prepareStatement("insert into SERVICES_TABLE " + "(SERVICE_NAME)" + "VALUES (?)");
			query.setString(1, SERVICE_NAME);
			query.executeUpdate();
		}
		catch(Exception e){
			e.printStackTrace();
			return 500;
		}
		finally{
			if(conn != null) conn.close();
		}
		return 200;
	}
	
	public int insertReviews(String BUSINESS_NAME, String AREA, String EMAIL, String REVIEW, String VALUE, String PRICE, String QUALITY, String SERVICE, String RESPONSE, String REVIEWED_DATE ) throws Exception{
		PreparedStatement query = null;
		Connection conn = null;
		
		try{
			conn = getConnection();
			query = conn.prepareStatement("insert into REVIEWS " + "(BUSINESS_NAME, AREA, EMAIL, REVIEW, VALUE, PRICE, QUALITY, SERVICE, RESPONSE, GIVEN_DATE)" + "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
			query.setString(1, BUSINESS_NAME);
			query.setString(2, AREA);
//			query.setString(3, USER_NAME);
			query.setString(3, EMAIL);
			query.setString(4, REVIEW);
			int value = Integer.parseInt(VALUE);
			query.setInt(5, value);
			int price = Integer.parseInt(PRICE);
			query.setInt(6, price);
			int quality = Integer.parseInt(QUALITY);
			query.setInt(7, quality);
			int service = Integer.parseInt(SERVICE);
			query.setInt(8, service);
			int response = Integer.parseInt(RESPONSE);
			query.setInt(9, response);
		    query.setString(10, REVIEWED_DATE);
			query.executeUpdate();
		}
		catch(Exception e){
			e.printStackTrace();
			return 500;
		}
		finally{
			if(conn != null) conn.close();
		}
		return 200;
	}
	
	
	
	
	public JSONArray queryForCompanyDetails(String sub_category) throws Exception{
		
		PreparedStatement query = null;
		Connection conn = null;
		
		ToJSON converter = new ToJSON();
		JSONArray json = new JSONArray();
		
		try{
			conn = getConnection();
			query = conn.prepareStatement("select * " + "from BUSINESS_TABLE_SECONDARY " + "where MAIN_CATEGORY=? OR SUB_CATEGORY1=? OR SUB_CATEGORY2=? OR SUB_CATEGORY3=? OR BUSINESS_NAME=? OR OTHER_CATEGORY1=? OR OTHER_CATEGORY2=? OR OTHER_CATEGORY3=?");
			query.setString(1, sub_category);
			query.setString(2, sub_category);
			query.setString(3, sub_category);
			query.setString(4, sub_category);
			query.setString(5, sub_category);
			query.setString(6, sub_category);
			query.setString(7, sub_category);
			query.setString(8, sub_category);
			ResultSet rs = query.executeQuery();			
			json = converter.toJSONArray(rs);
			query.close();
		}
		catch(SQLException sqlError){
			sqlError.printStackTrace();
			return json;
		}
		catch(Exception e){
			e.printStackTrace();
			return json;
		}
		finally{
			if(conn != null) conn.close();
		}
		return json;
	}
	
	public JSONArray queryForBusinessReviewDetails(String company_name) throws Exception{
		
		PreparedStatement query = null;
		Connection conn = null;
		
		ToJSON converter = new ToJSON();
		JSONArray json = new JSONArray();
		
		try{
			conn = getConnection();
			query = conn.prepareStatement("select * " + "from REVIEWS " + "where BUSINESS_NAME=?");
			query.setString(1, company_name);
			ResultSet rs = query.executeQuery();			
			json = converter.toJSONArray(rs);
			query.close();
		}
		catch(SQLException sqlError){
			sqlError.printStackTrace();
			return json;
		}
		catch(Exception e){
			e.printStackTrace();
			return json;
		}
		finally{
			if(conn != null) conn.close();
		}
		return json;
	}
	
	public JSONArray queryForUserReviewDetails(String email) throws Exception{
		
		PreparedStatement query = null;
		Connection conn = null;
		
		ToJSON converter = new ToJSON();
		JSONArray json = new JSONArray();
		
		try{
			conn = getConnection();
			query = conn.prepareStatement("select * " + "from REVIEWS " + "where EMAIL=?");
			query.setString(1, email);
			ResultSet rs = query.executeQuery();			
			json = converter.toJSONArray(rs);
			query.close();
		}
		catch(SQLException sqlError){
			sqlError.printStackTrace();
			return json;
		}
		catch(Exception e){
			e.printStackTrace();
			return json;
		}
		finally{
			if(conn != null) conn.close();
		}
		return json;
	}
	
	public JSONArray queryForItemDetails(String company_name, String area, String city) throws Exception{
		
		PreparedStatement query = null;
		Connection conn = null;
		
		ToJSON converter = new ToJSON();
		JSONArray json = new JSONArray();
		
		try{
			conn = getConnection();
			query = conn.prepareStatement("select * " + "from BUSINESS_TABLE_SECONDARY " + "where business_name=? AND area=? AND city=?");
			query.setString(1, company_name);
			query.setString(2, area);
			query.setString(3, city);
			ResultSet rs = query.executeQuery();			
			json = converter.toJSONArray(rs);
			query.close();
		}
		catch(SQLException sqlError){
			sqlError.printStackTrace();
			return json;
		}
		catch(Exception e){
			e.printStackTrace();
			return json;
		}
		finally{
			if(conn != null) conn.close();
		}
		return json;
	}
	
public JSONArray queryForPartnerItemDetails(String company_name, String area, String city) throws Exception{
		
		PreparedStatement query = null;
		Connection conn = null;
		
		ToJSON converter = new ToJSON();
		JSONArray json = new JSONArray();
		
		try{
			conn = getConnection();
			query = conn.prepareStatement("select * " + "from PARTNER_TABLE " + "where company_name=? AND area=? AND city=?");
			query.setString(1, company_name);
			query.setString(2, area);
			query.setString(3, city);
			ResultSet rs = query.executeQuery();			
			json = converter.toJSONArray(rs);
			query.close();
		}
		catch(SQLException sqlError){
			sqlError.printStackTrace();
			return json;
		}
		catch(Exception e){
			e.printStackTrace();
			return json;
		}
		finally{
			if(conn != null) conn.close();
		}
		return json;
	}
	
	public JSONArray queryForItemImages(String company_name, String area, String city) throws Exception{
		
		PreparedStatement query = null;
		Connection conn = null;
		
		ToJSON converter = new ToJSON();
		JSONArray json = new JSONArray();
		
		try{
			conn = getConnection();
			query = conn.prepareStatement("select * " + "from BUSINESS_IMAGES " + "where business_name=? AND area=? AND city=?");
			query.setString(1, company_name);
			query.setString(2, area);
			query.setString(3, city);
			ResultSet rs = query.executeQuery();			
			json = converter.toJSONArray(rs);
			query.close();
		}
		catch(SQLException sqlError){
			sqlError.printStackTrace();
			return json;
		}
		catch(Exception e){
			e.printStackTrace();
			return json;
		}
		finally{
			if(conn != null) conn.close();
		}
		return json;
	}
	
public JSONArray queryForPartnerImages(String sno) throws Exception{
		
		PreparedStatement query = null;
		Connection conn = null;
		
		ToJSON converter = new ToJSON();
		JSONArray json = new JSONArray();
		
		try{
			conn = getConnection();
			query = conn.prepareStatement("select * " + "from PARTNER_IMAGES " + "where sno=?");
			query.setString(1, sno);
			ResultSet rs = query.executeQuery();			
			json = converter.toJSONArray(rs);
			query.close();
		}
		catch(SQLException sqlError){
			sqlError.printStackTrace();
			return json;
		}
		catch(Exception e){
			e.printStackTrace();
			return json;
		}
		finally{
			if(conn != null) conn.close();
		}
		return json;
	}

	public int userAccountDetails(String user_name, 
						 		  String first_name, 
						 		  String last_name,
						 		  String password,
						 		  String user_role,
						 		  String created_date) 
								 throws Exception {

		PreparedStatement query = null;
		Connection conn = null;
		try 
		{
			conn = getConnection();
			query = conn.prepareStatement("insert into USER_ACCOUNTS (USER_NAME, FIRST_NAME, LAST_NAME, PASSWORD, USER_ROLE, CREATED_DATE) VALUES ( ?, ?, ?, ?, ?, ?) ");
			query.setString(1, user_name);
			query.setString(2, first_name);
			query.setString(3, last_name);
			query.setString(4, password);
			query.setString(5, user_role);
			query.setString(6, created_date);
			query.executeUpdate(); //note the new command for insert statement
		} 
		catch(Exception e) {
			return 500; //if a error occurs, return a 500
		}	
		finally {
			if (conn != null) conn.close();
		}
		return 200;
	}
	
	public int updateBusinessTable(String BUSINESS_NAME, String MAIN_CATEGORY, String SUB_CATEGORY1, String SUB_CATEGORY2, String SUB_CATEGORY3, String OTHER_CATEGORY1, String OTHER_CATEGORY2, String OTHER_CATEGORY3, String DESCRIPTION, String SHORT_DESC, String PHONE, String MOBILE, String EMAIL, String WEBSITE, String FACEBOOK, String TWITTER, String GOOGLE_PLUS, String LINKEDIN, String STREET, String AREA, String STATE_NAME, String CITY, String ZIP,String LANDMARK, String PHOTO, String MON_OPEN, String MON_CLOSE, String TUES_OPEN, String TUES_CLOSE, String WED_OPEN, String WED_CLOSE, String THURS_OPEN, String THURS_CLOSE, String FRI_OPEN, String FRI_CLOSE, String SAT_OPEN, String SAT_CLOSE, String SUN_OPEN, String SUN_CLOSE,String ACTIVE, String USER_ROLE, String VERIFICATION) throws Exception
	{
		 
		PreparedStatement query = null;
		Connection conn = null;
		System.out.println("in");
		try{
			conn = getConnection();
			query = conn.prepareStatement("UPDATE BUSINESS_TABLE_SECONDARY SET MAIN_CATEGORY = ?, SUB_CATEGORY1 = ?, SUB_CATEGORY2 = ?, SUB_CATEGORY3 = ?, OTHER_CATEGORY1 = ?, OTHER_CATEGORY2 = ?, OTHER_CATEGORY3 = ?, DESCRIPTION = ?, SHORT_DESC = ?, PHONE = ?, MOBILE = ?, EMAIL = ?, WEBSITE = ?, FACEBOOK = ?, TWITTER = ?, GOOGLE_PLUS = ?, LINKEDIN = ?, STREET = ?, STATE_NAME = ?, ZIP = ?, LANDMARK = ?, PHOTO = ?, MONDAY_OPEN = ?, MONDAY_CLOSE = ?, TUESDAY_OPEN = ?, TUESDAY_CLOSE = ?, WEDNESDAY_OPEN = ?, WEDNESDAY_CLOSE = ?, THURSDAY_OPEN = ?, THURSDAY_CLOSE = ?, FRIDAY_OPEN = ?, FRIDAY_CLOSE = ?, SATURDAY_OPEN = ?, SATURDAY_CLOSE = ?, SUNDAY_OPEN = ?, SUNDAY_CLOSE = ?, ACTIVE = ?, USER_ROLE = ?, VERIFICATION = ? WHERE BUSINESS_NAME = ? AND AREA = ? AND CITY = ?");
			query.setString(1, BUSINESS_NAME);
			query.setString(1, MAIN_CATEGORY);
			query.setString(2, SUB_CATEGORY1);
			query.setString(3, SUB_CATEGORY2);
			query.setString(4, SUB_CATEGORY3);
			query.setString(5, OTHER_CATEGORY1);
			query.setString(6, OTHER_CATEGORY2);
			query.setString(7, OTHER_CATEGORY3);
			query.setString(8, DESCRIPTION);
			query.setString(9, SHORT_DESC);
			query.setString(10, PHONE);
			query.setString(11, MOBILE);
			query.setString(12, EMAIL);
			query.setString(13, WEBSITE);
			query.setString(14, FACEBOOK);
			query.setString(15, TWITTER);
			query.setString(16, GOOGLE_PLUS);
			query.setString(17, LINKEDIN);
			query.setString(18, STREET);
//			query.setString(20, AREA);
			query.setString(19, STATE_NAME);
//			query.setString(22, CITY);
			int zipInt = Integer.parseInt(ZIP);
			query.setInt(20, zipInt);
			query.setString(21, LANDMARK);
			query.setString(22, PHOTO);
			query.setString(23, MON_OPEN);
			query.setString(24, MON_CLOSE);
			query.setString(25, TUES_OPEN);
			query.setString(26, TUES_CLOSE);
			query.setString(27, WED_OPEN);
			query.setString(28, WED_CLOSE);
			query.setString(29, THURS_OPEN);
			query.setString(30, THURS_CLOSE);
			query.setString(31, FRI_OPEN);
			query.setString(32, FRI_CLOSE);
			query.setString(33, SAT_OPEN);
			query.setString(34, SAT_CLOSE);
			query.setString(35, SUN_OPEN);
			query.setString(36, SUN_CLOSE);
			query.setString(37, ACTIVE);
			query.setString(38, USER_ROLE);
			query.setString(39, VERIFICATION);
			query.setString(40, BUSINESS_NAME);
			query.setString(41, AREA);
			query.setString(42, CITY);
			query.executeUpdate();
			System.out.println("out");
		}
		catch(Exception e){
			e.printStackTrace();
			return 500;
		}
		finally{
			if(conn != null) conn.close();
		}
		return 200;
	}
	
	
	public int updateReview(String company_name, 
				String email,
				String edited_date,
				String review,
				String value,
				String service)
						throws Exception {

		PreparedStatement query = null;
		Connection conn = null;
		try{ 
			conn = getConnection();
			query = conn.prepareStatement("UPDATE REVIEWS SET REVIEW = ?, VALUE = ?, SERVICE = ?, REVIEWED_DATE = ? WHERE EMAIL = ? AND BUSINESS_NAME = ?");
			query.setString(1, review);
			query.setString(2, value);
			query.setString(3, service);
			query.setString(4, edited_date);
			query.setString(5, email);
			query.setString(6, company_name);
			query.executeUpdate();
		} 
		catch(Exception e) {
			return 500;
		}	
		finally {
			if (conn != null) conn.close();
		}
		return 200;
	}
	
	public int updateProduct(String productName, String companyName) throws Exception {

	PreparedStatement query = null;
	Connection conn = null;
	try{ 
		conn = getConnection();
		query = conn.prepareStatement("UPDATE BUSINESS_PRODUCTS SET PRODUCT_NAME = ? WHERE PRODUCT_NAME = ?"); 
		query.setString(1, productName);
		query.setString(2, companyName);
		query.executeUpdate();
	} 
	catch(Exception e) {
		return 500;
	}	
	finally {
		if (conn != null) conn.close();
	}
	return 200;
}	
	
	public int resetPassword(String userName, String password) throws Exception {

		PreparedStatement query = null;
		Connection conn = null;
		try{ 
			conn = getConnection();
			query = conn.prepareStatement("UPDATE USER_ACCOUNTS SET PASSWORD = ? WHERE USER_NAME = ?"); 
			query.setString(1, password);
			query.setString(2, userName);
			query.executeUpdate();
		} 
		catch(Exception e) {
			return 500;
		}	
		finally {
			if (conn != null) conn.close();
		}
		return 200;
	}
	
	public int deleteUser(String userName) throws Exception {

		PreparedStatement query = null;
		Connection conn = null;
		try{ 
			conn = getConnection();
			System.out.println("function:"+userName);
			query = conn.prepareStatement("DELETE FROM USER_ACCOUNTS WHERE USER_NAME = ?"); 
			query.setString(1, userName);
			query.executeUpdate();
		} 
		catch(Exception e) {
			return 500;
		}	
		finally {
			if (conn != null) conn.close();
		}
		return 200;
	}
	
	public int deleteBusiness(String businessName, String area, String city) throws Exception {

		PreparedStatement query = null;
		Connection conn = null;
		try{ 
			conn = getConnection();
			query = conn.prepareStatement("DELETE FROM BUSINESS_TABLE_SECONDARY WHERE BUSINESS_NAME = ? AND AREA = ? AND CITY = ?"); 
			query.setString(1, businessName);
			query.setString(2, area);
			query.setString(3, city);
			query.executeUpdate();
		} 
		catch(Exception e) {
			return 500;
		}	
		finally {
			if (conn != null) conn.close();
		}
		return 200;
	}
	
	
	public int deleteImages(String businessName, String area, String city) throws Exception {

		PreparedStatement query = null;
		Connection conn = null;
		try{ 
			conn = getConnection();
			query = conn.prepareStatement("DELETE FROM BUSINESS_IMAGES WHERE BUSINESS_NAME = ? AND AREA = ? AND CITY = ?"); 
			query.setString(1, businessName);
			query.setString(2, area);
			query.setString(3, city);
			query.executeUpdate();
		} 
		catch(Exception e) {
			return 500;
		}	
		finally {
			if (conn != null) conn.close();
		}
		return 200;
	}
	
	
	public int deleteProducts(String businessName, String area, String city) throws Exception {

		PreparedStatement query = null;
		Connection conn = null;
		try{ 
			conn = getConnection();
			query = conn.prepareStatement("DELETE FROM BUSINESS_PRODUCTS WHERE BUSINESS_NAME = ? AND AREA = ? AND CITY = ?"); 
			query.setString(1, businessName);
			query.setString(2, area);
			query.setString(3, city);
			query.executeUpdate();
		} 
		catch(Exception e) {
			return 500;
		}	
		finally {
			if (conn != null) conn.close();
		}
		return 200;
	}
	
	public int deleteServices(String businessName, String area, String city) throws Exception {

		PreparedStatement query = null;
		Connection conn = null;
		try{ 
			conn = getConnection();
			query = conn.prepareStatement("DELETE FROM BUSINESS_SERVICES WHERE BUSINESS_NAME = ? AND AREA = ? AND CITY = ?"); 
			query.setString(1, businessName);
			query.setString(2, area);
			query.setString(3, city);
			query.executeUpdate();
		} 
		catch(Exception e) {
			return 500;
		}	
		finally {
			if (conn != null) conn.close();
		}
		return 200;
	}
	
	public int updateService(String serviceName, String companyName) throws Exception {

		PreparedStatement query = null;
		Connection conn = null;
		try{ 
			conn = getConnection();
			query = conn.prepareStatement("UPDATE BUSINESS_SERVICES SET SERVICE_NAME = ? WHERE SERVICE_NAME = ?"); 
			query.setString(1, serviceName);
			query.setString(2, companyName);
			query.executeUpdate();
		} 
		catch(Exception e) {
			return 500;
		}	
		finally {
			if (conn != null) conn.close();
		}
		return 200;
	}	
	
	public int updateBusinessCategory1(String newSubCategoryName, 
			String oldSubCategoryName)
					throws Exception {

	PreparedStatement query = null;
	Connection conn = null;
	try{ 
		conn = getConnection();
//		query = conn.prepareStatement("UPDATE BUSINESS_DETAILS SET OTHER_CATEGORY1 = (CASE when OTHER_CATEGORY1 = ? then ? end),OTHER_CATEGORY2 = (CASE when OTHER_CATEGORY2 = ? then ? end), OTHER_CATEGORY3 = (CASE when OTHER_CATEGORY3 = ? then ? end) WHERE OTHER_CATEGORY1 = ? OR OTHER_CATEGORY2 = ? OR OTHER_CATEGORY3 = ?");
		query = conn.prepareStatement("UPDATE BUSINESS_TABLE_SECONDARY SET OTHER_CATEGORY1 = ? WHERE OTHER_CATEGORY1 = ?"); 
		query.setString(1, newSubCategoryName);
		query.setString(2, oldSubCategoryName);
		query.executeUpdate();
	} 
	catch(Exception e) {
		return 500;
	}	
	finally {
		if (conn != null) conn.close();
	}
	return 200;
}	
	
	public int updateBusinessCategory2(String newSubCategoryName, 
			String oldSubCategoryName)
					throws Exception {

	PreparedStatement query = null;
	Connection conn = null;
	try{ 
		conn = getConnection();
//		query = conn.prepareStatement("UPDATE BUSINESS_DETAILS SET OTHER_CATEGORY1 = (CASE when OTHER_CATEGORY1 = ? then ? end),OTHER_CATEGORY2 = (CASE when OTHER_CATEGORY2 = ? then ? end), OTHER_CATEGORY3 = (CASE when OTHER_CATEGORY3 = ? then ? end) WHERE OTHER_CATEGORY1 = ? OR OTHER_CATEGORY2 = ? OR OTHER_CATEGORY3 = ?");
		query = conn.prepareStatement("UPDATE BUSINESS_TABLE_SECONDARY SET OTHER_CATEGORY2 = ? WHERE OTHER_CATEGORY2 = ?"); 
		query.setString(1, newSubCategoryName);
		query.setString(2, oldSubCategoryName);
		query.executeUpdate();
	} 
	catch(Exception e) {
		return 500;
	}	
	finally {
		if (conn != null) conn.close();
	}
	return 200;
}	
	
	public int updateBusinessCategory3(String newSubCategoryName, 
			String oldSubCategoryName)
					throws Exception {

	PreparedStatement query = null;
	Connection conn = null;
	try{ 
		conn = getConnection();
//		query = conn.prepareStatement("UPDATE BUSINESS_DETAILS SET OTHER_CATEGORY1 = (CASE when OTHER_CATEGORY1 = ? then ? end),OTHER_CATEGORY2 = (CASE when OTHER_CATEGORY2 = ? then ? end), OTHER_CATEGORY3 = (CASE when OTHER_CATEGORY3 = ? then ? end) WHERE OTHER_CATEGORY1 = ? OR OTHER_CATEGORY2 = ? OR OTHER_CATEGORY3 = ?");
		query = conn.prepareStatement("UPDATE BUSINESS_TABLE_SECONDARY SET OTHER_CATEGORY3 = ? WHERE OTHER_CATEGORY3 = ?"); 
		query.setString(1, newSubCategoryName);
		query.setString(2, oldSubCategoryName);
		query.executeUpdate();
	} 
	catch(Exception e) {
		return 500;
	}	
	finally {
		if (conn != null) conn.close();
	}
	return 200;
}	
	
	public int updateCityArea(String oldAreaName, String city, String area)
					throws Exception {

	PreparedStatement query = null;
	Connection conn = null;
	try{ 
		conn = getConnection();
		query = conn.prepareStatement("UPDATE BUSINESS_TABLE_SECONDARY SET AREA = ? WHERE CITY = ? AND AREA = ?"); 
		query.setString(1, area);
		query.setString(2, city);
		query.setString(3, oldAreaName);
		query.executeUpdate();
	} 
	catch(Exception e) {
		return 500;
	}	
	finally {
		if (conn != null) conn.close();
	}
	return 200;
}	

	public JSONArray loginCheck(String username, String password) throws Exception {
	
		PreparedStatement query = null;
		Connection conn = null;
		ToJSON converter = new ToJSON();
		JSONArray json = new JSONArray();
	
		try 
		{
			conn = getConnection();
//			System.out.println("no2");
			query = conn.prepareStatement("select FIRST_NAME,USER_NAME,PASSWORD from USER_ACCOUNTS  " +
										"where user_name = ? " +
										"and password = ?");
		
		/*
		 * protect against sql injection
		 * when you have more than one ?, it will go in chronological
		 * order.
		 */
			query.setString(1, username); //first ?
			query.setString(2, password); //second ?
			ResultSet rs = query.executeQuery();
			json = converter.toJSONArray(rs);
			query.close(); //close connection
		}
		catch(SQLException sqlError) {
			sqlError.printStackTrace();
			return json;
		}
		catch(Exception e) {
			e.printStackTrace();
			return json;
		}
		finally {
			if (conn != null) conn.close();
		}
		return json;
	}
	
	public JSONArray getNewSubCategories() throws Exception {
		
		PreparedStatement query = null;
		Connection conn = null;
		ToJSON converter = new ToJSON();
		JSONArray json = new JSONArray();
	
		try 
		{
			conn = getConnection();
			query = conn.prepareStatement("select MAIN_CATEGORY, OTHER_CATEGORY1, OTHER_CATEGORY2, OTHER_CATEGORY3 from BUSINESS_TABLE_SECONDARY");
		
			ResultSet rs = query.executeQuery();
			json = converter.toJSONArray(rs);
			query.close(); //close connection
		}
		catch(SQLException sqlError) {
			sqlError.printStackTrace();
			return json;
		}
		catch(Exception e) {
			e.printStackTrace();
			return json;
		}
		finally {
			if (conn != null) conn.close();
		}
		return json;
	}
	
public JSONArray getNewProducts() throws Exception {
		
		PreparedStatement query = null;
		Connection conn = null;
		ToJSON converter = new ToJSON();
		JSONArray json = new JSONArray();
	
		try 
		{
			conn = getConnection();
			query = conn.prepareStatement("select * from BUSINESS_PRODUCTS");
		
			ResultSet rs = query.executeQuery();
			json = converter.toJSONArray(rs);
			query.close(); //close connection
		}
		catch(SQLException sqlError) {
			sqlError.printStackTrace();
			return json;
		}
		catch(Exception e) {
			e.printStackTrace();
			return json;
		}
		finally {
			if (conn != null) conn.close();
		}
		return json;
	}

public JSONArray getBusinessProducts(String business_name, String area, String city) throws Exception {
	
	PreparedStatement query = null;
	Connection conn = null;
	ToJSON converter = new ToJSON();
	JSONArray json = new JSONArray();

	try 
	{
		conn = getConnection();
		query = conn.prepareStatement("select * from BUSINESS_PRODUCTS WHERE BUSINESS_NAME = ? AND AREA = ? AND CITY = ?");
		query.setString(1, business_name);
		query.setString(2, area);
		query.setString(3, city); 
		ResultSet rs = query.executeQuery();
		json = converter.toJSONArray(rs);
		query.close(); //close connection
	}
	catch(SQLException sqlError) {
		sqlError.printStackTrace();
		return json;
	}
	catch(Exception e) {
		e.printStackTrace();
		return json;
	}
	finally {
		if (conn != null) conn.close();
	}
	return json;
}


public JSONArray getNewServices() throws Exception {
	
	PreparedStatement query = null;
	Connection conn = null;
	ToJSON converter = new ToJSON();
	JSONArray json = new JSONArray();

	try 
	{
		conn = getConnection();
		query = conn.prepareStatement("select * from BUSINESS_SERVICES");
	
		ResultSet rs = query.executeQuery();
		json = converter.toJSONArray(rs);
		query.close(); //close connection
	}
	catch(SQLException sqlError) {
		sqlError.printStackTrace();
		return json;
	}
	catch(Exception e) {
		e.printStackTrace();
		return json;
	}
	finally {
		if (conn != null) conn.close();
	}
	return json;
}

public JSONArray getBusinessServices(String business_name, String area, String city) throws Exception {
	
	PreparedStatement query = null;
	Connection conn = null;
	ToJSON converter = new ToJSON();
	JSONArray json = new JSONArray();

	try 
	{
		conn = getConnection();
		query = conn.prepareStatement("select * from BUSINESS_SERVICES WHERE BUSINESS_NAME = ? AND AREA = ? AND CITY = ?");
		query.setString(1, business_name);
		query.setString(2, area);
		query.setString(3, city); 
		ResultSet rs = query.executeQuery();
		json = converter.toJSONArray(rs);
		query.close(); //close connection
	}
	catch(SQLException sqlError) {
		sqlError.printStackTrace();
		return json;
	}
	catch(Exception e) {
		e.printStackTrace();
		return json;
	}
	finally {
		if (conn != null) conn.close();
	}
	return json;
}

public JSONArray getNewCityArea() throws Exception {
	
	PreparedStatement query = null;
	Connection conn = null;
	ToJSON converter = new ToJSON();
	JSONArray json = new JSONArray();

	try 
	{
		conn = getConnection();
		query = conn.prepareStatement("select STATE_NAME, CITY, AREA from BUSINESS_TABLE_SECONDARY");
	
		ResultSet rs = query.executeQuery();
		json = converter.toJSONArray(rs);
		query.close(); //close connection
	}
	catch(SQLException sqlError) {
		sqlError.printStackTrace();
		return json;
	}
	catch(Exception e) {
		e.printStackTrace();
		return json;
	}
	finally {
		if (conn != null) conn.close();
	}
	return json;
}
	
	public JSONArray queryForUserDetails(String email) throws Exception {
		
		PreparedStatement query = null;
		Connection conn = null;
		ToJSON converter = new ToJSON();
		JSONArray json = new JSONArray();
	
		try 
		{
			conn = getConnection();
			query = conn.prepareStatement("select * from user_details  " +
										"where email = ?");
		
		/*
		 * protect against sql injection
		 * when you have more than one ?, it will go in chronological
		 * order.
		 */
			query.setString(1, email); //first ?
			ResultSet rs = query.executeQuery();
			json = converter.toJSONArray(rs);
			query.close(); //close connection
		}
		catch(SQLException sqlError) {
			sqlError.printStackTrace();
			return json;
		}
		catch(Exception e) {
			e.printStackTrace();
			return json;
		}
		finally {
			if (conn != null) conn.close();
		}
		return json;
	}
}
