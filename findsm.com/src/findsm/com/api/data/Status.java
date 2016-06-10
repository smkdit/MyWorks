package findsm.com.api.data;

import javax.ws.rs.*;
import javax.ws.rs.core.*;
import javax.ws.rs.Path;
import javax.ws.rs.GET;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.MediaType;

import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jettison.json.JSONArray;

import java.sql.*;

import findsm.com.dao.*;
import findsm.com.api.data.ItemEntry;
import findsm.com.api.data.ItemEntryImages;
import findsm.com.api.data.UserDetails;
import findsm.com.util.ToJSON;

@Path("/business")
public class Status extends PropeltreeDao{
		
	@Path("/newbusiness")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public String returnAll() throws Exception{
		PreparedStatement query = null;
		Connection conn = null;
		String returnString = null;
		
		try{
//			conn = PropeltreeDao.OracleConnect().getConnection();
			conn = getConnection();
			System.out.print(conn);
			query = conn.prepareStatement("select * " + "from BUSINESS_TABLE_SECONDARY");
			ResultSet rs = query.executeQuery();
			ToJSON converter = new ToJSON();
			JSONArray json = new JSONArray();
			
			json = converter.toJSONArray(rs);
			query.close();
			
			returnString = json.toString();
		}
		catch(Exception e){
			e.printStackTrace();
		}
		finally{
			if(conn != null) conn.close();
		}
		return returnString;
	}
	
	@Path("/getuseraccounts")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public String returnUserAccounts() throws Exception{
		PreparedStatement query = null;
		Connection conn = null;
		String returnString = null;
		
		try{
			conn = getConnection();
			System.out.print(conn);
			query = conn.prepareStatement("select * " + "from USER_ACCOUNTS");
			ResultSet rs = query.executeQuery();
			ToJSON converter = new ToJSON();
			JSONArray json = new JSONArray();
			
			json = converter.toJSONArray(rs);
			query.close();
			
			returnString = json.toString();
		}
		catch(Exception e){
			e.printStackTrace();
		}
		finally{
			if(conn != null) conn.close();
		}
		return returnString;
	}
	
	@Path("/getsubcategory")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response getSubCategory()
				throws Exception {
		
		String returnString = null;
		JSONArray json = new JSONArray();
		try 
		{
			SchemaQueries dao = new SchemaQueries();
			json = dao.getNewSubCategories();
			returnString = json.toString();
		}
		catch (Exception e) {
			e.printStackTrace();
			return Response.status(500).entity("Server was not able to process your request").build();
		}
		return Response.ok(returnString).build();
	}
	
	@Path("/getproducts")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response getProducts()
				throws Exception {
		
		String returnString = null;
		JSONArray json = new JSONArray();
		try 
		{
			SchemaQueries dao = new SchemaQueries();
			json = dao.getNewProducts();
			returnString = json.toString();
		}
		catch (Exception e) {
			e.printStackTrace();
			return Response.status(500).entity("Server was not able to process your request").build();
		}
		return Response.ok(returnString).build();
	}
	
	@Path("/getproductsbybusinessname")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response getProductsByBusinessName(@QueryParam("company_name") String business_name, @QueryParam("area") String area, @QueryParam("city") String city)
				throws Exception {
		
		String returnString = null;
		JSONArray json = new JSONArray();
		try 
		{
			SchemaQueries dao = new SchemaQueries();
			json = dao.getBusinessProducts(business_name, area, city);
			returnString = json.toString();
		}
		catch (Exception e) {
			e.printStackTrace();
			return Response.status(500).entity("Server was not able to process your request").build();
		}
		return Response.ok(returnString).build();
	}
	
	@Path("/getservices")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response getServices()
				throws Exception {
		
		String returnString = null;
		JSONArray json = new JSONArray();
		try 
		{
			SchemaQueries dao = new SchemaQueries();
			json = dao.getNewServices();
			returnString = json.toString();
		}
		catch (Exception e) {
			e.printStackTrace();
			return Response.status(500).entity("Server was not able to process your request").build();
		}
		return Response.ok(returnString).build();
	}
	
	@Path("/getservicesbybusinessname")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response getServicesByBusinessName(@QueryParam("company_name") String business_name, @QueryParam("area") String area, @QueryParam("city") String city)
				throws Exception {
		
		String returnString = null;
		JSONArray json = new JSONArray();
		try 
		{
			SchemaQueries dao = new SchemaQueries();
			json = dao.getBusinessServices(business_name, area, city);
			returnString = json.toString();
		}
		catch (Exception e) {
			e.printStackTrace();
			return Response.status(500).entity("Server was not able to process your request").build();
		}
		return Response.ok(returnString).build();
	}
	
	@Path("/getcityarea")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response getCityArea()
				throws Exception {
		
		String returnString = null;
		JSONArray json = new JSONArray();
		try 
		{
			SchemaQueries dao = new SchemaQueries();
			json = dao.getNewCityArea();
			returnString = json.toString();
		}
		catch (Exception e) {
			e.printStackTrace();
			return Response.status(500).entity("Server was not able to process your request").build();
		}
		return Response.ok(returnString).build();
	}
	
	@Path("/partnerdata")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public String returnPartnerData() throws Exception{
		PreparedStatement query = null;
		Connection conn = null;
		String returnString = null;
		
		try{
			conn = getConnection();
			System.out.print(conn);
			query = conn.prepareStatement("select * " + "from PARTNER_TABLE");
			ResultSet rs = query.executeQuery();
			ToJSON converter = new ToJSON();
			JSONArray json = new JSONArray();
			
			json = converter.toJSONArray(rs);
			query.close();
			
			returnString = json.toString();
		}
		catch(Exception e){
			e.printStackTrace();
		}
		finally{
			if(conn != null) conn.close();
		}
		return returnString;
	}
	
	@Path("/subcategory")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public String returnSubCategory() throws Exception{
		PreparedStatement query = null;
		Connection conn = null;
		String returnString = null;
		
		try{
			conn = getConnection();
			System.out.print(conn);
			query = conn.prepareStatement("select * " + "from SUB_CATEGORY_LIST");
			ResultSet rs = query.executeQuery();
			ToJSON converter = new ToJSON();
			JSONArray json = new JSONArray();
			
			json = converter.toJSONArray(rs);
			query.close();
			
			returnString = json.toString();
		}
		catch(Exception e){
			e.printStackTrace();
		}
		finally{
			if(conn != null) conn.close();
		}
		return returnString;
	}
	
	@Path("/subcategoryitem")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public String returnSubCategory(@QueryParam("category") String category) throws Exception{
		PreparedStatement query = null;
		Connection conn = null;
		String returnString = null;
		
		try{
			conn = getConnection();
			System.out.print(conn);
			query = conn.prepareStatement("select * " + "from SUB_CATEGORY_LIST where category=?");
			query.setString(1, category);
			ResultSet rs = query.executeQuery();
			ToJSON converter = new ToJSON();
			JSONArray json = new JSONArray();
			
			json = converter.toJSONArray(rs);
			query.close();
			
			returnString = json.toString();
		}
		catch(Exception e){
			e.printStackTrace();
		}
		finally{
			if(conn != null) conn.close();
		}
		return returnString;
	}
	
	@Path("/city")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public String returnCityList() throws Exception{
		PreparedStatement query = null;
		Connection conn = null;
		String returnString = null;
		
		try{
			conn = getConnection();
			System.out.print(conn);
			query = conn.prepareStatement("select * " + "from CITY_AREA_LIST");
			ResultSet rs = query.executeQuery();
			ToJSON converter = new ToJSON();
			JSONArray json = new JSONArray();
			
			json = converter.toJSONArray(rs);
			query.close();
			
			returnString = json.toString();
		}
		catch(Exception e){
			e.printStackTrace();
		}
		finally{
			if(conn != null) conn.close();
		}
		return returnString;
	}
	
	@Path("/productsdata")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public String returnProductsData() throws Exception{
		PreparedStatement query = null;
		Connection conn = null;
		String returnString = null;
		
		try{
			conn = getConnection();
			System.out.print(conn);
			query = conn.prepareStatement("select * " + "from PRODUCTS_TABLE");
			ResultSet rs = query.executeQuery();
			ToJSON converter = new ToJSON();
			JSONArray json = new JSONArray();
			
			json = converter.toJSONArray(rs);
			query.close();
			
			returnString = json.toString();
		}
		catch(Exception e){
			e.printStackTrace();
		}
		finally{
			if(conn != null) conn.close();
		}
		return returnString;
	}
	
	@Path("/servicesdata")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public String returnServicesData() throws Exception{
		PreparedStatement query = null;
		Connection conn = null;
		String returnString = null;
		
		try{
			conn = getConnection();
			System.out.print(conn);
			query = conn.prepareStatement("select * " + "from SERVICES_TABLE");
			ResultSet rs = query.executeQuery();
			ToJSON converter = new ToJSON();
			JSONArray json = new JSONArray();
			
			json = converter.toJSONArray(rs);
			query.close();
			
			returnString = json.toString();
		}
		catch(Exception e){
			e.printStackTrace();
		}
		finally{
			if(conn != null) conn.close();
		}
		return returnString;
	}
	
		
	@Path("/search")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response returnCompanyDetails(@QueryParam("sub_category") String sub_category) throws Exception{
		
		String returnString = null;
		JSONArray json = new JSONArray();
		try{
			SchemaQueries dao = new SchemaQueries();
			json = dao.queryForCompanyDetails(sub_category);
			returnString = json.toString();
		}
		catch(Exception e){
			e.printStackTrace();
			return Response.status(500).entity("Server was not able to process your request").build();
		}
		return Response.ok(returnString).build();
	}
	
	@Path("/itemdetail")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response returnItemDetails(@QueryParam("company_name") String company_name,
									  @QueryParam("area") String area,
									  @QueryParam("city") String city) throws Exception{
		
		String returnString = null;
		JSONArray json = new JSONArray();
		try{
			SchemaQueries dao = new SchemaQueries();
			json = dao.queryForItemDetails(company_name, area, city);
			returnString = json.toString();
		}
		catch(Exception e){
			e.printStackTrace();
			return Response.status(500).entity("Server was not able to process your request").build();
		}
		return Response.ok(returnString).build();
	}
	
	@Path("/itemdetailPartner")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response returnItemDetailsPartner(@QueryParam("company_name") String company_name,
									  @QueryParam("area") String area,
									  @QueryParam("city") String city) throws Exception{
		
		String returnString = null;
		JSONArray json = new JSONArray();
		try{
			SchemaQueries dao = new SchemaQueries();
			json = dao.queryForPartnerItemDetails(company_name, area, city);
			returnString = json.toString();
		}
		catch(Exception e){
			e.printStackTrace();
			return Response.status(500).entity("Server was not able to process your request").build();
		}
		return Response.ok(returnString).build();
	}
	
	@Path("/itemimages")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response returnItemImages(@QueryParam("company_name") String company_name,
			  @QueryParam("area") String area,
			  @QueryParam("city") String city) throws Exception{
		
		String returnString = null;
		JSONArray json = new JSONArray();
		try{
			SchemaQueries dao = new SchemaQueries();
			json = dao.queryForItemImages(company_name, area, city);
			returnString = json.toString();
		}
		catch(Exception e){
			e.printStackTrace();
			return Response.status(500).entity("Server was not able to process your request").build();
		}
		return Response.ok(returnString).build();
	}
	
//	@Path("/partnerimages")
//	@GET
//	@Produces(MediaType.APPLICATION_JSON)
//	public Response returnPartnerImages(@QueryParam("sno") String sno) throws Exception{
//		
//		String returnString = null;
//		JSONArray json = new JSONArray();
//		try{
//			SchemaQueries dao = new SchemaQueries();
//			json = dao.queryForItemImages(sno);
//			returnString = json.toString();
//		}
//		catch(Exception e){
//			e.printStackTrace();
//			return Response.status(500).entity("Server was not able to process your request").build();
//		}
//		return Response.ok(returnString).build();
//	}
	
	@Path("/userdetails")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response getUserDetails(@QueryParam("email") String email) throws Exception{
		
		String returnString = null;
		JSONArray json = new JSONArray();
		try{
			SchemaQueries dao = new SchemaQueries();
			json = dao.queryForUserDetails(email);
			returnString = json.toString();
		}
		catch(Exception e){
			e.printStackTrace();
			return Response.status(500).entity("Server was not able to process your request").build();
		}
		return Response.ok(returnString).build();
	}
	
	@Path("logincheck/{fsemail}/{fspwd}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response loginCheck(
				@PathParam("fsemail") String fsemail,
				@PathParam("fspwd") String fspwd) 
				throws Exception {
		
		String returnString = null;
		JSONArray json = new JSONArray();
		try 
		{
			System.out.println("no1");
			SchemaQueries dao = new SchemaQueries();
			json = dao.loginCheck(fsemail, fspwd);
			returnString = json.toString();
		}
		catch (Exception e) {
			e.printStackTrace();
			return Response.status(500).entity("Server was not able to process your request").build();
		}
		return Response.ok(returnString).build();
	}
	
	@Path("getreviews")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response getReviews(@QueryParam("company_name") String company_name)
				throws Exception {
		
		String returnString = null;
		JSONArray json = new JSONArray();
		try 
		{
			SchemaQueries dao = new SchemaQueries();
			json = dao.queryForBusinessReviewDetails(company_name);
			returnString = json.toString();
		}
		catch (Exception e) {
			e.printStackTrace();
			return Response.status(500).entity("Server was not able to process your request").build();
		}
		return Response.ok(returnString).build();
	}
	
	@Path("getuserreviews")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response getUserReviews(@QueryParam("email") String email)
				throws Exception {
		
		String returnString = null;
		JSONArray json = new JSONArray();
		try 
		{
			SchemaQueries dao = new SchemaQueries();
			json = dao.queryForUserReviewDetails(email);
			returnString = json.toString();
		}
		catch (Exception e) {
			e.printStackTrace();
			return Response.status(500).entity("Server was not able to process your request").build();
		}
		return Response.ok(returnString).build();
	}
	
	@POST
	@Consumes({MediaType.APPLICATION_FORM_URLENCODED,MediaType.APPLICATION_JSON})
	@Produces(MediaType.APPLICATION_JSON)
	public Response addNewBusiness(String incomingData) throws Exception{
		
		String returnString = null;
		JSONArray json = new JSONArray();
		SchemaQueries dao = new SchemaQueries();
		
		try{
			System.out.println("IncomingData:" + incomingData);
			ObjectMapper mapper = new ObjectMapper();
			ItemEntry itemEntry = mapper.readValue(incomingData, ItemEntry.class);
			int http_code = dao.insertIntoNewBusinessTable(
													itemEntry.BUSINESS_NAME,
													itemEntry.MAIN_CATEGORY,
													itemEntry.SUB_CATEGORY1,
													itemEntry.SUB_CATEGORY2,
													itemEntry.SUB_CATEGORY3,
													itemEntry.OTHER_CATEGORY1,
													itemEntry.OTHER_CATEGORY2,
													itemEntry.OTHER_CATEGORY3,
													itemEntry.DESCRIPTION,
													itemEntry.SHORT_DESC,
													itemEntry.PHONE,
													itemEntry.MOBILE,
													itemEntry.EMAIL,
													itemEntry.WEBSITE,
													itemEntry.FACEBOOK,
													itemEntry.TWITTER,
													itemEntry.GOOGLE_PLUS,
													itemEntry.LINKEDIN,
													itemEntry.STREET,
													itemEntry.AREA,
													itemEntry.STATE_NAME,
													itemEntry.CITY,
													itemEntry.ZIP,
													itemEntry.LANDMARK,
													itemEntry.PHOTO,
													itemEntry.MONDAY_OPEN,
													itemEntry.MONDAY_CLOSE,
													itemEntry.TUESDAY_OPEN,
													itemEntry.TUESDAY_CLOSE,
													itemEntry.WEDNESDAY_OPEN,
													itemEntry.WEDNESDAY_CLOSE,
													itemEntry.THURSDAY_OPEN,
													itemEntry.THURSDAY_CLOSE,
													itemEntry.FRIDAY_OPEN,
													itemEntry.FRIDAY_CLOSE,
													itemEntry.SATURDAY_OPEN,
													itemEntry.SATURDAY_CLOSE,
													itemEntry.SUNDAY_OPEN,
													itemEntry.SUNDAY_CLOSE,
													itemEntry.ACTIVE,
													itemEntry.USER_ROLE,
													itemEntry.VERIFICATION
													);
			
			if(http_code == 200){
				returnString = json.toString();
			}
			else{
				return Response.status(500).entity("Unable to process item").build();
			}
		}
		catch(Exception e){
			e.printStackTrace();System.out.println(e);
			return Response.status(500).entity("Server was not able to process your request").build();
		}
		return Response.ok(returnString).build();
	}
	
	@Path("/addbusiness_images")
	@POST
	@Consumes({MediaType.APPLICATION_FORM_URLENCODED,MediaType.APPLICATION_JSON})
	@Produces(MediaType.APPLICATION_JSON)
	public Response addNewBusinessImages(String incomingData) throws Exception{
		
		String returnString = null;
		JSONArray json = new JSONArray();
		SchemaQueries dao = new SchemaQueries();
		
		try{
			System.out.println("IncomingData:" + incomingData);
			ObjectMapper mapper = new ObjectMapper();
			ItemEntryImages itemEntryImages = mapper.readValue(incomingData, ItemEntryImages.class);
			int http_code = dao.insertIntoNewBusinessImagesTable(itemEntryImages.BUSINESS_NAME, itemEntryImages.AREA, itemEntryImages.CITY, itemEntryImages.IMAGES);
			if(http_code == 200){
				returnString = json.toString();
			}
			else{
				return Response.status(500).entity("Unable to process item").build();
			}
		}
		catch(Exception e){
			e.printStackTrace();System.out.println(e);
			return Response.status(500).entity("Server was not able to process your request").build();
		}
		return Response.ok(returnString).build();
	}
	
	@Path("/updatebusinessimages")
	@PUT
	@Consumes({MediaType.APPLICATION_FORM_URLENCODED,MediaType.APPLICATION_JSON})
	@Produces(MediaType.APPLICATION_JSON)
	public Response updateNewBusinessImages(String incomingData) throws Exception{
		
		String returnString = null;
		JSONArray json = new JSONArray();
		SchemaQueries dao = new SchemaQueries();
		
		try{
			System.out.println("IncomingData:" + incomingData);
			ObjectMapper mapper = new ObjectMapper();
			ItemEntryImages itemEntryImages = mapper.readValue(incomingData, ItemEntryImages.class);
			int http_code = dao.updateNewBusinessImagesTable(itemEntryImages.BUSINESS_NAME, itemEntryImages.AREA, itemEntryImages.CITY, itemEntryImages.IMAGES);
			if(http_code == 200){
				returnString = json.toString();
			}
			else{
				return Response.status(500).entity("Unable to process item").build();
			}
		}
		catch(Exception e){
			e.printStackTrace();System.out.println(e);
			return Response.status(500).entity("Server was not able to process your request").build();
		}
		return Response.ok(returnString).build();
	}
	
	@Path("/addsubcategory")
	@POST
	@Consumes({MediaType.APPLICATION_FORM_URLENCODED,MediaType.APPLICATION_JSON})
	@Produces(MediaType.APPLICATION_JSON)
	public Response insertIntoSubCategoryListTable(String incomingData) throws Exception{
		
		String returnString = null;
		JSONArray json = new JSONArray();
		SchemaQueries dao = new SchemaQueries();
		
		try{
			System.out.println("IncomingData:" + incomingData);
			ObjectMapper mapper = new ObjectMapper();
			SubCategory subCategory = mapper.readValue(incomingData, SubCategory.class);
			int http_code = dao.insertIntoSubCategoryList(subCategory.CATEGORY, subCategory.SUB_CATEGORY);
			if(http_code == 200){
				returnString = json.toString();
			}
			else{
				return Response.status(500).entity("Unable to process item").build();
			}
		}
		catch(Exception e){
			e.printStackTrace();System.out.println(e);
			return Response.status(500).entity("Server was not able to process your request").build();
		}
		return Response.ok(returnString).build();
	}
	
	@Path("/addcityarea")
	@POST
	@Consumes({MediaType.APPLICATION_FORM_URLENCODED,MediaType.APPLICATION_JSON})
	@Produces(MediaType.APPLICATION_JSON)
	public Response insertIntoCityAreaListTable(String incomingData) throws Exception{
		
		String returnString = null;
		JSONArray json = new JSONArray();
		SchemaQueries dao = new SchemaQueries();
		
		try{
			System.out.println("IncomingData:" + incomingData);
			ObjectMapper mapper = new ObjectMapper();
			CityArea cityArea = mapper.readValue(incomingData, CityArea.class);
			int http_code = dao.insertIntoCityAreaList(cityArea.STATE_NAME,  cityArea.CITY, cityArea.AREA);
			if(http_code == 200){
				returnString = json.toString();
			}
			else{
				return Response.status(500).entity("Unable to process item").build();
			}
		}
		catch(Exception e){
			e.printStackTrace();System.out.println(e);
			return Response.status(500).entity("Server was not able to process your request").build();
		}
		return Response.ok(returnString).build();
	}
	
	@Path("/businessproducts")
	@POST
	@Consumes({MediaType.APPLICATION_FORM_URLENCODED,MediaType.APPLICATION_JSON})
	@Produces(MediaType.APPLICATION_JSON)
	public Response insertBusinessProducts(String incomingData) throws Exception{
		
		String returnString = null;
		JSONArray json = new JSONArray();
		SchemaQueries dao = new SchemaQueries();
		
		try{
			System.out.println("IncomingData:" + incomingData);
			ObjectMapper mapper = new ObjectMapper();
			BusinessProducts businessProducts = mapper.readValue(incomingData, BusinessProducts.class);
			int http_code = dao.insertIntoBusinessProducts(businessProducts.BUSINESS_NAME, businessProducts.AREA, businessProducts.CITY, businessProducts.PRODUCT_NAME);
			if(http_code == 200){
				returnString = json.toString();
			}
			else{
				return Response.status(500).entity("Unable to process item").build();
			}
		}
		catch(Exception e){
			e.printStackTrace();System.out.println(e);
			return Response.status(500).entity("Server was not able to process your request").build();
		}
		return Response.ok(returnString).build();
	}
	
	@Path("/updateproducts")
	@PUT
	@Consumes({MediaType.APPLICATION_FORM_URLENCODED,MediaType.APPLICATION_JSON})
	@Produces(MediaType.APPLICATION_JSON)
	public Response updateBusinessProducts(String incomingData) throws Exception{
		
		String returnString = null;
		JSONArray json = new JSONArray();
		SchemaQueries dao = new SchemaQueries();
		
		try{
			System.out.println("IncomingData:" + incomingData);
			ObjectMapper mapper = new ObjectMapper();
			BusinessProducts businessProducts = mapper.readValue(incomingData, BusinessProducts.class);
			int http_code = dao.updateBusinessProducts(businessProducts.BUSINESS_NAME, businessProducts.AREA, businessProducts.CITY, businessProducts.PRODUCT_NAME);
			if(http_code == 200){
				returnString = json.toString();
			}
			else{
				return Response.status(500).entity("Unable to process item").build();
			}
		}
		catch(Exception e){
			e.printStackTrace();System.out.println(e);
			return Response.status(500).entity("Server was not able to process your request").build();
		}
		return Response.ok(returnString).build();
	}
	
	@Path("/businessservices")
	@POST
	@Consumes({MediaType.APPLICATION_FORM_URLENCODED,MediaType.APPLICATION_JSON})
	@Produces(MediaType.APPLICATION_JSON)
	public Response insertBusinessServices(String incomingData) throws Exception{
		
		String returnString = null;
		JSONArray json = new JSONArray();
		SchemaQueries dao = new SchemaQueries();
		
		try{
			System.out.println("IncomingData:" + incomingData);
			ObjectMapper mapper = new ObjectMapper();
			BusinessServices businessServices = mapper.readValue(incomingData, BusinessServices.class);
			int http_code = dao.insertIntoBusinessServices(businessServices.BUSINESS_NAME, businessServices.AREA, businessServices.CITY, businessServices.SERVICE_NAME);
			if(http_code == 200){
				returnString = json.toString();
			}
			else{
				return Response.status(500).entity("Unable to process item").build();
			}
		}
		catch(Exception e){
			e.printStackTrace();System.out.println(e);
			return Response.status(500).entity("Server was not able to process your request").build();
		}
		return Response.ok(returnString).build();
	}
	
	@Path("/updateservices")
	@PUT
	@Consumes({MediaType.APPLICATION_FORM_URLENCODED,MediaType.APPLICATION_JSON})
	@Produces(MediaType.APPLICATION_JSON)
	public Response updateBusinessServices(String incomingData) throws Exception{
		
		String returnString = null;
		JSONArray json = new JSONArray();
		SchemaQueries dao = new SchemaQueries();
		
		try{
			System.out.println("IncomingData:" + incomingData);
			ObjectMapper mapper = new ObjectMapper();
			BusinessServices businessServices = mapper.readValue(incomingData, BusinessServices.class);
			int http_code = dao.updateBusinessServices(businessServices.BUSINESS_NAME, businessServices.AREA, businessServices.CITY, businessServices.SERVICE_NAME);
			if(http_code == 200){
				returnString = json.toString();
			}
			else{
				return Response.status(500).entity("Unable to process item").build();
			}
		}
		catch(Exception e){
			e.printStackTrace();System.out.println(e);
			return Response.status(500).entity("Server was not able to process your request").build();
		}
		return Response.ok(returnString).build();
	}
	
	@Path("/addproduct")
	@POST
	@Consumes({MediaType.APPLICATION_FORM_URLENCODED,MediaType.APPLICATION_JSON})
	@Produces(MediaType.APPLICATION_JSON)
	public Response insertIntoProductsTable(String incomingData) throws Exception{
		
		String returnString = null;
		JSONArray json = new JSONArray();
		SchemaQueries dao = new SchemaQueries();
		
		try{
			System.out.println("IncomingData:" + incomingData);
			ObjectMapper mapper = new ObjectMapper();
			Products products = mapper.readValue(incomingData, Products.class);
			int http_code = dao.insertIntoProductsTable(products.PRODUCT_NAME);
			if(http_code == 200){
				returnString = json.toString();
			}
			else{
				return Response.status(500).entity("Unable to process item").build();
			}
		}
		catch(Exception e){
			e.printStackTrace();System.out.println(e);
			return Response.status(500).entity("Server was not able to process your request").build();
		}
		return Response.ok(returnString).build();
	}
	
	@Path("/addservice")
	@POST
	@Consumes({MediaType.APPLICATION_FORM_URLENCODED,MediaType.APPLICATION_JSON})
	@Produces(MediaType.APPLICATION_JSON)
	public Response insertIntoServiceTable(String incomingData) throws Exception{
		
		String returnString = null;
		JSONArray json = new JSONArray();
		SchemaQueries dao = new SchemaQueries();
		
		try{
			System.out.println("IncomingData:" + incomingData);
			ObjectMapper mapper = new ObjectMapper();
			Services services = mapper.readValue(incomingData, Services.class);
			int http_code = dao.insertIntoServicesTable(services.SERVICE_NAME);
			if(http_code == 200){
				returnString = json.toString();
			}
			else{
				return Response.status(500).entity("Unable to process item").build();
			}
		}
		catch(Exception e){
			e.printStackTrace();System.out.println(e);
			return Response.status(500).entity("Server was not able to process your request").build();
		}
		return Response.ok(returnString).build();
	}
	
	@Path("/addpartner_images")
	@POST
	@Consumes({MediaType.APPLICATION_FORM_URLENCODED,MediaType.APPLICATION_JSON})
	@Produces(MediaType.APPLICATION_JSON)
	public Response addNewPartnerImages(String incomingData) throws Exception{
		
		String returnString = null;
		JSONArray json = new JSONArray();
		SchemaQueries dao = new SchemaQueries();
		
		try{
			System.out.println("IncomingData:" + incomingData);
			ObjectMapper mapper = new ObjectMapper();
			ItemEntryImages itemEntryImages = mapper.readValue(incomingData, ItemEntryImages.class);
			int http_code = dao.insertIntoNewsPartnerImagesTable(itemEntryImages.BUSINESS_NAME, itemEntryImages.AREA,  itemEntryImages.CITY, itemEntryImages.IMAGES);
			if(http_code == 200){
				returnString = json.toString();
			}
			else{
				return Response.status(500).entity("Unable to process item").build();
			}
		}
		catch(Exception e){
			e.printStackTrace();System.out.println(e);
			return Response.status(500).entity("Server was not able to process your request").build();
		}
		return Response.ok(returnString).build();
	}
	
	@Path("/useraccounts")
	@POST
	@Consumes({MediaType.APPLICATION_FORM_URLENCODED,MediaType.APPLICATION_JSON,MediaType.TEXT_HTML})
	@Produces(MediaType.APPLICATION_JSON)
	public Response insertSignUpData(String incomingData) throws Exception {
		
		String returnString = null;
		SchemaQueries dao = new SchemaQueries();
		
		try {
			System.out.println("incomingData: " + incomingData);
			ObjectMapper mapper = new ObjectMapper();
			UserAccounts userAccounts = mapper.readValue(incomingData, UserAccounts.class);
			
			int http_code = dao.userAccountDetails(userAccounts.USER_NAME, userAccounts.FIRST_NAME, userAccounts.LAST_NAME, userAccounts.PASSWORD, userAccounts.USER_ROLE, userAccounts.CREATED_DATE);
			
			if( http_code == 200 ) {
				//returnString = jsonArray.toString();
				returnString = "Item inserted";
			} else {
				return Response.status(500).entity("Unable to process Item").build();
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("exception");
			return Response.status(500).entity("Server was not able to process your request").build();
		}

		return Response.ok().build();
	}
	
	
	@PUT
	@Path("/updatebusiness")
	@Consumes({MediaType.APPLICATION_FORM_URLENCODED,MediaType.APPLICATION_JSON,MediaType.TEXT_HTML})
	@Produces({MediaType.APPLICATION_JSON, MediaType.TEXT_HTML})
	public Response updateBusinessDetails(String incomingData) throws Exception {
		
		String returnString = null;
		SchemaQueries dao = new SchemaQueries();
		
		try {
			System.out.println("incomingData: " + incomingData);
			ObjectMapper mapper = new ObjectMapper();
			ItemEntry itemEntry = mapper.readValue(incomingData, ItemEntry.class);
			
			int http_code = dao.updateBusinessTable(itemEntry.BUSINESS_NAME, itemEntry.MAIN_CATEGORY, itemEntry.SUB_CATEGORY1, itemEntry.SUB_CATEGORY2, itemEntry.SUB_CATEGORY3, itemEntry.OTHER_CATEGORY1, itemEntry.OTHER_CATEGORY2, itemEntry.OTHER_CATEGORY3, itemEntry.DESCRIPTION, itemEntry.SHORT_DESC, itemEntry.PHONE, itemEntry.MOBILE, itemEntry.EMAIL, itemEntry.WEBSITE, itemEntry.FACEBOOK, itemEntry.TWITTER, itemEntry.GOOGLE_PLUS, itemEntry.LINKEDIN, itemEntry.STREET, itemEntry.AREA, itemEntry.STATE_NAME, itemEntry.CITY, itemEntry.ZIP, itemEntry.LANDMARK, itemEntry.PHOTO, itemEntry.MONDAY_OPEN, itemEntry.MONDAY_CLOSE, itemEntry.TUESDAY_OPEN, itemEntry.TUESDAY_CLOSE, itemEntry.WEDNESDAY_OPEN, itemEntry.WEDNESDAY_CLOSE, itemEntry.THURSDAY_OPEN, itemEntry.THURSDAY_CLOSE, itemEntry.FRIDAY_OPEN, itemEntry.FRIDAY_CLOSE, itemEntry.SATURDAY_OPEN, itemEntry.SATURDAY_CLOSE, itemEntry.SUNDAY_OPEN, itemEntry.SUNDAY_CLOSE, itemEntry.ACTIVE, itemEntry.USER_ROLE, itemEntry.VERIFICATION);
			if( http_code == 200 ) {
				returnString = "Item inserted";
			} else {
				return Response.status(500).entity("Unable to process Item").build();
			}
			
		} catch (Exception e) {
			e.printStackTrace();
//			System.out.println("exception");
			return Response.status(500).entity("Server was not able to process your request").build();
		}

		return Response.ok().build();
	}
	
	@PUT
	@Path("/updatereview")
	@Consumes({MediaType.APPLICATION_FORM_URLENCODED,MediaType.APPLICATION_JSON,MediaType.TEXT_HTML})
	@Produces({MediaType.APPLICATION_JSON, MediaType.TEXT_HTML})
	public Response updateReview(String incomingData) throws Exception {
		
		String returnString = null;
		SchemaQueries dao = new SchemaQueries();
		
		try {
			System.out.println("incomingData: " + incomingData);
			ObjectMapper mapper = new ObjectMapper();
			ReviewData reviewData = mapper.readValue(incomingData, ReviewData.class);
			
			int http_code = dao.updateReview(reviewData.BUSINESS_NAME, reviewData.EMAIL, reviewData.REVIEWED_DATE, reviewData.REVIEW, reviewData.VALUE, reviewData.SERVICE);
			
			if( http_code == 200 ) {
				returnString = "Item inserted";
			} else {
				return Response.status(500).entity("Unable to process Item").build();
			}
			
		} catch (Exception e) {
			e.printStackTrace();
//			System.out.println("exception");
			return Response.status(500).entity("Server was not able to process your request").build();
		}

		return Response.ok().build();
	}
	
	@PUT
	@Path("/updatesubcategory")
	@Consumes({MediaType.APPLICATION_FORM_URLENCODED,MediaType.APPLICATION_JSON,MediaType.TEXT_HTML})
	@Produces({MediaType.APPLICATION_JSON, MediaType.TEXT_HTML})
	public Response updateSubCategory(String incomingData) throws Exception {
		
		String returnString = null;
		SchemaQueries dao = new SchemaQueries();
		
		try {
			System.out.println("incomingData: " + incomingData);
			ObjectMapper mapper = new ObjectMapper();
			SubCategory subCategory = mapper.readValue(incomingData, SubCategory.class);
			
			int http_code1 = dao.updateBusinessCategory1(subCategory.CATEGORY, subCategory.SUB_CATEGORY);
			int http_code2 = dao.updateBusinessCategory2(subCategory.CATEGORY, subCategory.SUB_CATEGORY);
			int http_code3 = dao.updateBusinessCategory3(subCategory.CATEGORY, subCategory.SUB_CATEGORY);
			if( http_code1 == 200 && http_code2 == 200 && http_code3 == 200) {
				returnString = "Item inserted";
			} else {
				return Response.status(500).entity("Unable to process Item").build();
			}
			
		} catch (Exception e) {
			e.printStackTrace();
//			System.out.println("exception");
			return Response.status(500).entity("Server was not able to process your request").build();
		}

		return Response.ok().build();
	}
	
	@PUT
	@Path("/updatearea")
	@Consumes({MediaType.APPLICATION_FORM_URLENCODED,MediaType.APPLICATION_JSON,MediaType.TEXT_HTML})
	@Produces({MediaType.APPLICATION_JSON, MediaType.TEXT_HTML})
	public Response updateCityArea(String incomingData) throws Exception {
		
		String returnString = null;
		SchemaQueries dao = new SchemaQueries();
		
		try {
			System.out.println("incomingData: " + incomingData);
			ObjectMapper mapper = new ObjectMapper();
			CityArea cityArea = mapper.readValue(incomingData, CityArea.class);
			
			int http_code1 = dao.updateCityArea(cityArea.STATE_NAME, cityArea.CITY, cityArea.AREA);
			if( http_code1 == 200) {
				returnString = "Item inserted";
			} else {
				return Response.status(500).entity("Unable to process Item").build();
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("exception:"+e);
			return Response.status(500).entity("Server was not able to process your request").build();
		}

		return Response.ok().build();
	}
	
	@PUT
	@Path("/updateproduct")
	@Consumes({MediaType.APPLICATION_FORM_URLENCODED,MediaType.APPLICATION_JSON,MediaType.TEXT_HTML})
	@Produces({MediaType.APPLICATION_JSON, MediaType.TEXT_HTML})
	public Response updateProduct(String incomingData) throws Exception {
		
		String returnString = null;
		SchemaQueries dao = new SchemaQueries();
		
		try {
			System.out.println("incomingData: " + incomingData);
			ObjectMapper mapper = new ObjectMapper();
			BusinessProducts products = mapper.readValue(incomingData, BusinessProducts.class);
			
			int http_code1 = dao.updateProduct(products.PRODUCT_NAME, products.BUSINESS_NAME);
			if( http_code1 == 200) {
				returnString = "Item inserted";
			} else {
				return Response.status(500).entity("Unable to process Item").build();
			}
			
		} catch (Exception e) {
			e.printStackTrace();
//			System.out.println("exception");
			return Response.status(500).entity("Server was not able to process your request").build();
		}

		return Response.ok().build();
	}
	
	@PUT
	@Path("/resetpassword")
	@Consumes({MediaType.APPLICATION_FORM_URLENCODED,MediaType.APPLICATION_JSON,MediaType.TEXT_HTML})
	@Produces({MediaType.APPLICATION_JSON, MediaType.TEXT_HTML})
	public Response resetPassword(String incomingData) throws Exception {
		
		String returnString = null;
		SchemaQueries dao = new SchemaQueries();
		
		try {
			System.out.println("incomingData: " + incomingData);
			ObjectMapper mapper = new ObjectMapper();
			UserAccounts userAccounts = mapper.readValue(incomingData, UserAccounts.class);
			
			int http_code1 = dao.resetPassword(userAccounts.USER_NAME, userAccounts.PASSWORD);
			if( http_code1 == 200) {
				returnString = "Item inserted";
			} else {
				return Response.status(500).entity("Unable to process Item").build();
			}
			
		} catch (Exception e) {
			e.printStackTrace();
//			System.out.println("exception");
			return Response.status(500).entity("Server was not able to process your request").build();
		}

		return Response.ok().build();
	}
	
	@DELETE
	@Path("/deleteuser")
	@Consumes({MediaType.APPLICATION_FORM_URLENCODED,MediaType.APPLICATION_JSON,MediaType.TEXT_HTML})
	@Produces({MediaType.APPLICATION_JSON, MediaType.TEXT_HTML})
	public Response deleteAccount(@QueryParam("username") String user_name) throws Exception {
		
		String returnString = null;
		SchemaQueries dao = new SchemaQueries();
		
		try {
//			ObjectMapper mapper = new ObjectMapper();
//			UserAccounts userAccounts = mapper.readValue(incomingData, UserAccounts.class);
			System.out.println(user_name);
			int http_code1 = dao.deleteUser(user_name);
			if( http_code1 == 200) {
				returnString = "Item Deleted";
			} else {
				return Response.status(500).entity("Unable to process Item").build();
			}
			
		} catch (Exception e) {
			e.printStackTrace();
//			System.out.println("exception");
			return Response.status(500).entity("Server was not able to process your request").build();
		}

		return Response.ok().build();
	}
	
	@DELETE
	@Path("/deletebusiness")
	@Consumes({MediaType.APPLICATION_FORM_URLENCODED,MediaType.APPLICATION_JSON,MediaType.TEXT_HTML})
	@Produces({MediaType.APPLICATION_JSON, MediaType.TEXT_HTML})
	public Response deleteBusiness(@QueryParam("business_name") String business_name, @QueryParam("area") String area, @QueryParam("city") String city) throws Exception {
		
		String returnString = null;
		SchemaQueries dao = new SchemaQueries();
		
		try {
//			ObjectMapper mapper = new ObjectMapper();
//			UserAccounts userAccounts = mapper.readValue(incomingData, UserAccounts.class);
			int http_code1 = dao.deleteBusiness(business_name, area, city);
			if( http_code1 == 200) {
				returnString = "Item Deleted";
			} else {
				return Response.status(500).entity("Unable to process Item").build();
			}
			
		} catch (Exception e) {
			e.printStackTrace();
//			System.out.println("exception");
			return Response.status(500).entity("Server was not able to process your request").build();
		}

		return Response.ok().build();
	}
	
	
	@DELETE
	@Path("/deleteimages")
	@Consumes({MediaType.APPLICATION_FORM_URLENCODED,MediaType.APPLICATION_JSON,MediaType.TEXT_HTML})
	@Produces({MediaType.APPLICATION_JSON, MediaType.TEXT_HTML})
	public Response deleteImages(@QueryParam("business_name") String business_name, @QueryParam("area") String area, @QueryParam("city") String city) throws Exception {
		
		String returnString = null;
		SchemaQueries dao = new SchemaQueries();
		
		try {
//			ObjectMapper mapper = new ObjectMapper();
//			UserAccounts userAccounts = mapper.readValue(incomingData, UserAccounts.class);
			int http_code1 = dao.deleteImages(business_name, area, city);
			if( http_code1 == 200) {
				returnString = "Item Deleted";
			} else {
				return Response.status(500).entity("Unable to process Item").build();
			}
			
		} catch (Exception e) {
			e.printStackTrace();
//			System.out.println("exception");
			return Response.status(500).entity("Server was not able to process your request").build();
		}

		return Response.ok().build();
	}
	
	@DELETE
	@Path("/deleteproducts")
	@Consumes({MediaType.APPLICATION_FORM_URLENCODED,MediaType.APPLICATION_JSON,MediaType.TEXT_HTML})
	@Produces({MediaType.APPLICATION_JSON, MediaType.TEXT_HTML})
	public Response deleteProduct(@QueryParam("business_name") String business_name, @QueryParam("area") String area, @QueryParam("city") String city) throws Exception {
		
		String returnString = null;
		SchemaQueries dao = new SchemaQueries();
		
		try {
//			ObjectMapper mapper = new ObjectMapper();
//			UserAccounts userAccounts = mapper.readValue(incomingData, UserAccounts.class);
			int http_code1 = dao.deleteProducts(business_name, area, city);
			if( http_code1 == 200) {
				returnString = "Item Deleted";
			} else {
				return Response.status(500).entity("Unable to process Item").build();
			}
			
		} catch (Exception e) {
			e.printStackTrace();
//			System.out.println("exception");
			return Response.status(500).entity("Server was not able to process your request").build();
		}

		return Response.ok().build();
	}
	
	@DELETE
	@Path("/deleteservices")
	@Consumes({MediaType.APPLICATION_FORM_URLENCODED,MediaType.APPLICATION_JSON,MediaType.TEXT_HTML})
	@Produces({MediaType.APPLICATION_JSON, MediaType.TEXT_HTML})
	public Response deleteService(@QueryParam("business_name") String business_name, @QueryParam("area") String area, @QueryParam("city") String city) throws Exception {
		
		String returnString = null;
		SchemaQueries dao = new SchemaQueries();
		
		try {
//			ObjectMapper mapper = new ObjectMapper();
//			UserAccounts userAccounts = mapper.readValue(incomingData, UserAccounts.class);
			int http_code1 = dao.deleteServices(business_name, area, city);
			if( http_code1 == 200) {
				returnString = "Item Deleted";
			} else {
				return Response.status(500).entity("Unable to process Item").build();
			}
			
		} catch (Exception e) {
			e.printStackTrace();
//			System.out.println("exception");
			return Response.status(500).entity("Server was not able to process your request").build();
		}

		return Response.ok().build();
	}
	
	@PUT
	@Path("/updateservice")
	@Consumes({MediaType.APPLICATION_FORM_URLENCODED,MediaType.APPLICATION_JSON,MediaType.TEXT_HTML})
	@Produces({MediaType.APPLICATION_JSON, MediaType.TEXT_HTML})
	public Response updateService(String incomingData) throws Exception {
		
		String returnString = null;
		SchemaQueries dao = new SchemaQueries();
		
		try {
			System.out.println("incomingData: " + incomingData);
			ObjectMapper mapper = new ObjectMapper();
			BusinessServices services = mapper.readValue(incomingData, BusinessServices.class);
			
			int http_code1 = dao.updateService(services.SERVICE_NAME, services.BUSINESS_NAME);
			if( http_code1 == 200) {
				returnString = "Item inserted";
			} else {
				return Response.status(500).entity("Unable to process Item").build();
			}
			
		} catch (Exception e) {
			e.printStackTrace();
//			System.out.println("exception");
			return Response.status(500).entity("Server was not able to process your request").build();
		}

		return Response.ok().build();
	}
	
	@Path("/reviews")
	@POST
	@Consumes({MediaType.APPLICATION_FORM_URLENCODED,MediaType.APPLICATION_JSON,MediaType.TEXT_HTML})
	@Produces(MediaType.APPLICATION_JSON)
	public Response postReview(String incomingData) throws Exception {
		String returnString = null;
		SchemaQueries dao = new SchemaQueries();
		
		try {
			System.out.println("incomingData: " + incomingData);
			ObjectMapper mapper = new ObjectMapper();
			ReviewData itemEntry = mapper.readValue(incomingData, ReviewData.class);
			
			int http_code = dao.insertReviews(itemEntry.BUSINESS_NAME,
											  itemEntry.AREA, 
											  itemEntry.EMAIL,
											  itemEntry.REVIEW,
											  itemEntry.VALUE,
											  itemEntry.PRICE,
											  itemEntry.QUALITY,
											  itemEntry.SERVICE,
											  itemEntry.RESPONSE,
											  itemEntry.REVIEWED_DATE);
			
			if( http_code == 200 ) {
				//returnString = jsonArray.toString();
				returnString = "Item inserted";
			} else {
				return Response.status(500).entity("Unable to process Item").build();
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("exception");
			return Response.status(500).entity("Server was not able to process your request").build();
		}

		return Response.ok().build();
	}

}
