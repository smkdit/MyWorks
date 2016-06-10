package findsm.com.util;

import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONObject;

import java.sql.ResultSet;

public class ToJSON {
	
	public static JSONArray toJSONArray(ResultSet resultSet)
            throws Exception {
        JSONArray jsonArray = new JSONArray();
        int total_rows = resultSet.getMetaData().getColumnCount();
        while (resultSet.next()) {
            
            JSONObject obj = new JSONObject();
            for (int i = 0; i < total_rows; i++) {
                obj.put(resultSet.getMetaData().getColumnLabel(i + 1)
                        .toLowerCase(), resultSet.getObject(i + 1));
                
            }
            jsonArray.put(obj);
        }
        return jsonArray;
    }

	/*public JSONArray toJSONArray(ResultSet rs) throws Exception{
		JSONArray json = new JSONArray();
		try{
			java.sql.ResultSetMetaData rsmd = rs.getMetaData();
			int numColumns = rsmd.getColumnCount();
			while(rs.next()){
				
				JSONObject obj = new JSONObject();
				
				for(int i=1;i<numColumns+1;i++){
					
					String column_name = rsmd.getColumnLabel(i);//rsmd.getCatalogName(i);
					if(rsmd.getColumnType(i)==java.sql.Types.ARRAY){
						obj.put(column_name, rs.getArray(i));
						System.out.println("ToJson:Array");
					}
					else if(rsmd.getColumnType(i)==java.sql.Types.BIGINT){
						obj.put(column_name, rs.getInt(i));
						System.out.println("ToJson:BIGINT");
					}
					else if(rsmd.getColumnType(i)==java.sql.Types.BOOLEAN){
						obj.put(column_name, rs.getBoolean(i));
						System.out.println("ToJson:BOOLEAN");
					}
					else if(rsmd.getColumnType(i)==java.sql.Types.BLOB){
						obj.put(column_name, rs.getBlob(i));
						System.out.println("ToJson:BLOB");
					}
					else if(rsmd.getColumnType(i)==java.sql.Types.DOUBLE){
						obj.put(column_name, rs.getDouble(i));
						System.out.println("ToJson:Double");
					}
					else if(rsmd.getColumnType(i)==java.sql.Types.FLOAT){
						obj.put(column_name, rs.getFloat(i));
						System.out.println("ToJson:FLOAT");
					}
					else if(rsmd.getColumnType(i)==java.sql.Types.INTEGER){
						obj.put(column_name, rs.getInt(i));
						System.out.println("ToJson:Integet");
					}
					else if(rsmd.getColumnType(i)==java.sql.Types.NVARCHAR){
						obj.put(column_name, rs.getNString(i));
						System.out.println("ToJson:NVARCHAR");
					}
					else if(rsmd.getColumnType(i)==java.sql.Types.VARCHAR){
						obj.put(column_name, rs.getString(i));
						System.out.println("ToJson:VARCHAR");
					}else if(rsmd.getColumnType(i)==java.sql.Types.TINYINT){
						obj.put(column_name, rs.getInt(i));
						System.out.println("ToJson:TINYINT");
					}else if(rsmd.getColumnType(i)==java.sql.Types.SMALLINT){
						obj.put(column_name, rs.getInt(i));
						System.out.println("ToJson:SMALLINT");
					}
					else if(rsmd.getColumnType(i)==java.sql.Types.DATE){
						obj.put(column_name, rs.getDate(i));
						System.out.println("ToJson:DATE");
					}
					else if(rsmd.getColumnType(i)==java.sql.Types.TIMESTAMP){
						obj.put(column_name, rs.getTimestamp(i));
						System.out.println("ToJson:TIMESTAMP");
					}
					else if(rsmd.getColumnType(i)==java.sql.Types.NUMERIC){
						obj.put(column_name, rs.getBigDecimal(i));
						System.out.println("ToJson:NUMERIC");
					}
					else{
						obj.put(column_name, rs.getObject(i));
						System.out.println("ToJson:Object"+column_name);
					}
				}
					json.put(obj);
			}			
		}
		catch(Exception e){
			e.printStackTrace();
		}
		return json;
	}*/
}
