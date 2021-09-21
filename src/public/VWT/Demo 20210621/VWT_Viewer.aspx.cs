using System;
using System.Data;
using System.Configuration;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Configuration;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using System.Data.SqlClient;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Text;
using System.Web.Script.Serialization;
using System.Net;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System.Data.SqlClient;

public partial class VWT_Viewer : System.Web.UI.Page
{
    enum AjaxCallStatus : int
    {
        LoginTimeout = 440
    }

    CommonFun common = new CommonFun();
    DCSCommonFun DCSComFun = new DCSCommonFun();
    string checklogin = ConfigurationManager.AppSettings["SessionKey"].ToString();
    public string userid, projectItemId, projectId = "", customPropsList, guid, modelPath, userShortName, timestamp, viewportId, isAdmin = "N";
    public string vwt_config_string = "";
    // TODO: Pending to remove
    public string fileid, bbox;

    // 20200506 Added by Tat
    protected bool CheckIsGIAAdmin(string userId, string accountId, string projectId)
    {
        if (Session["isAdmin"].ToString() == "Y")
            return true;

        if (common.GetScalarBySql(string.Format(@"SELECT TOP 1 1 
                    FROM perGroup g INNER JOIN
                    perGroupUser gu ON g.ID = gu.GroupID INNER JOIN usrUser u ON gu.UserID = u.ID
                    WHERE u.AccountID = {0} AND g.ID IN (1, 2)
                    UNION ALL
                    SELECT TOP 1 1 
                    FROM perGroup g INNER JOIN perGroupUser gu ON g.ID = gu.GroupID 
                    WHERE g.Status = 1 AND g.ProjectID = {1} AND gu.UserID = {2} AND g.AccessTypeID = 24", accountId, projectId, userId)) == "1")
            return true;

        return false;
    }

    protected void Page_Load(object sender, EventArgs e)
    {

        Console.WriteLine("DBConnect {0}", ConfigurationManager.AppSettings["DBConnect"].ToString(), "}");
        if (Session[checklogin] == null)
        {
            Response.Redirect("/Account/Login.aspx?path=" + HttpContext.Current.Request.Url.PathAndQuery);
        }

        isAdmin = Session["isAdmin"].ToString();
        // if (isAdmin == "N")
        // isAdmin = common.GetScalarBySql(string.Format(@"SELECT case when count(1) > 0 then 'Y' else 'N' end  FROM perGroup g INNER JOIN perGroupUser gu ON g.ID = gu.GroupID 
        // where gu.UserID = '{0}' and g.StandardGroupID = '{1}'  ", Session["UserID"].ToString(), ((int)StandardGroup.Project_GIA_Controller).ToString()));

        userid = Session["UserID"].ToString();

        //isAdmin = "N";
        isAdmin = "Y";
        userShortName = Session["ShortName"].ToString();
        timestamp = ((Int32)(DateTime.UtcNow.Subtract(new DateTime(1970, 1, 1)).TotalSeconds)).ToString();
        projectItemId = "20210621";

        vwt_config_string = ReadVWT_Config(projectItemId);

        if (vwt_config_string.Length < 10)
        {
            vwt_config_string = "0";
        }

        if ((vwt_config_string == null) || (vwt_config_string == "fail"))
        {
            vwt_config_string = "0";
        }

        if (Request.QueryString["guid"] != null && Request.QueryString["guid"].ToString() != "")
        {
            guid = Request.QueryString["guid"].ToString().Trim();
            string strDocSetID = common.GetScalarBySql(string.Format("select top 1 d.ID from dcsDocSet d inner join  dcsItem i on d.ID=i.DocSetID where i.GUID='{0}'", guid));
            
            // Benson         
            if (!DCSComFun.IsUserAccountAllowAccessDocSet(strDocSetID, Session["UserID"].ToString()))
            {
                Response.Clear();
                Response.Expires = -1;
                Response.Write(strDocSetID);
                Response.Write("Access denied, please contract site administrator 1");
                Response.End();
            }

            Dictionary<string, string> dictModelItemInfo = GetModelItemInfo(guid);

            if (dictModelItemInfo["Error"] == "Y")
            {
                Response.Clear();
                Response.Expires = -1;
                Response.Write("Wrong parameter, please contract site administrator 2");
                Response.End();
            }

            // Check is System Admin or GIA Admin
            projectId = dictModelItemInfo["ProjectID"];
            projectItemId = dictModelItemInfo["ProjectItemID"];
            modelPath = dictModelItemInfo["ModelPath"];
            customPropsList = GetCustomProps(projectItemId);
            // fileid = common.GetScalarBySql(string.Format(@"SELECT  MAX(ProjectModelHistory.ID) AS ID FROM  ProjectModelHistory INNER JOIN ProjectItem ON ProjectModelHistory.ProjectItemID = ProjectItem.ID WHERE  ProjectItem.Guid ='{0}' ", guid));
            // bbox = GetBboxFromDb(projectItemId);
            //timestamp = ((Int32)(DateTime.UtcNow.Subtract(new DateTime(1970, 1, 1)).TotalSeconds)).ToString();

            // Check is System Admin or GIA Admin
            isAdmin = "N";
            if (CheckIsGIAAdmin(Session["UserID"].ToString(), Session["AccountID"].ToString(), projectId))
                isAdmin = "Y";
        }
        else
        {
            /*Response.Clear();
            Response.Expires = -1;
            Response.Write("Wrong parameter, please contract site administrator 3");
            Response.End();*/
        }
        /*
        if (Request.QueryString["asm"] != null)
        {
            Page.ClientScript.RegisterStartupScript(GetType(), "GetAsmModel", string.Format("<script>getAsmModel('{0}');</script>", Request.QueryString["asm"].ToString()));
        }
        */
        //projectId = common.GetScalarBySql(string.Format("select Top 1 tableb.[projectId] from [ProjectItem] tablea join [ProjectSection] tableb on tablea.[SectionID] = tableb.[ID] where tablea.[ID]='{0}' ", projectItemId));

        if (Request.QueryString["vp"] != null) //viewport Id
        {
            viewportId = Request.QueryString["vp"];
        }
        //****************************20180116 add value to Saved Viewport Placeholder****************************
        if (!IsPostBack) //is first time open this page
        {

        }
    }

    // TODO: Pending to remove
    public static void ModelAsm(string asmnam, string[] rvtlist, string[] filenamelist)
    {
        JArray refs = new JArray();

        for (int i = 0; i < rvtlist.Length; i++)
        {
            refs.Add(new JObject(
               new JProperty("name", filenamelist[i]),
               new JProperty("ref", rvtlist[i]))
               );
        }
        /*
        foreach (string rvt in rvtlist)
        {
            refs.Add(new JObject(
                new JProperty("name", rvt),
                new JProperty("ref", rvt))
                );
        }
        */
        JObject json = new JObject(
          new JProperty("path", asmnam),
          new JProperty("refs", refs)
          );

        var httpWebRequest = (HttpWebRequest)WebRequest.Create("http://10.17.37.15:14002/dx/api/f/v1/file/asm");
        httpWebRequest.ContentType = "application/json";
        httpWebRequest.Method = "POST";

        using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
        {
            streamWriter.Write(json);
            streamWriter.Flush();
            streamWriter.Close();
        }

        var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
        using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
        {
            //Label1.Text = streamReader.ReadToEnd();
        }
    }

    /* TODO: Pending to remove */
    [WebMethod]
    public static string createAsm(List<string> name, List<string> path, string displayname, string projectItemId, string userid)
    {
        string msg = displayname + " " + name.Count + " " + path.Count;
        string filepath = Guid.NewGuid().ToString() + ".asm";
        string display = displayname + ".asm";
        string[] rvts = path.ToArray();
        string[] filenames = name.ToArray();
        //path=tst2.asm&asm=367d95ee-cb0f-479f-94a9-e48df9ffaac8.rvt,78ab48a9-2125-4b5e-8157-30ba06200910.rvt
        string rvtstr = "";
        int i = 0;
        foreach (string s in rvts)
        {
            rvts[i] = s.Substring(s.IndexOf("path=") + 5);
            rvtstr += (rvtstr == "" ? "" : ",") + s.Substring(s.IndexOf("path=") + 5);
            i++;
        }
        string reurl = string.Format("/models/ViewerTest_20190228.aspx?path={0}", filepath);
        //string reurl = string.Format("/models/Viewer.aspx?path={0}&asm={1}",filepath, rvtstr);


        //string[] rvts = new string[] { "b765f610-954c-46a3-89ca-0d684f354cba.rvt", "367d95ee-cb0f-479f-94a9-e48df9ffaac8.rvt" };
        ModelAsm(filepath, rvts, filenames);



        string sql = "declare @newid as int ";
        CommonFun common2 = new CommonFun();
        string sectionid = common2.GetScalarBySql(string.Format(@"select SectionID from ProjectItem where ID ='{0}' ", projectItemId));
        sql += string.Format(@" INSERT INTO [ProjectItem]
                                                           ([SectionID]
                                                           ,[SectionRef]
                                                           ,[Description]
		                                                   ,[Discipline]
                                                           ,[IsShow]
                                                           ,[FileName]
                                                           ,[FileType]
                                                           ,[HTMLURL]
                                                           ,[FileSize]
                                                           ,[CreatedBy]
                                                           ,[Created]
                                                           ,[Modified]
                                                           ,[ModifiedBy]
                                                          )
                                                            select  ID as [SectionID]
                                                           ,Section as [SectionRef]
                                                           ,'{1}'
		                                                   ,'Linked Models'                                                                
                                                           ,1
                                                           ,'{1}'
                                                           ,'asm'
                                                           ,'{3}'
                                                           ,2
                                                           ,'{2}'
                                                           ,getdate()
                                                           ,getdate()
                                                           ,'{2}'     
                                                           from ProjectSection where ID='{0}' set @newid = @@IDENTITY 

                                                          INSERT INTO[dbo].[ProjectModelHistory]
                                                                   ([projectItemId]
                                                                   ,[IsLatest]
                                                                   ,[Status]
                                                                   ,[UrlPath]
                                                                   ,[FilePath]
                                                                   ,[Comments]
                                                                   ,[BBox]
                                                                   ,[CustomProperties]
                                                                   ,[Created]
                                                                   ,[CreatedBy]
                                                                   ,[Modified]
                                                                   ,[ModifiedBy]
                                                                   ,[LinkedModel])
                                                             VALUES(@newid
                                                                    , '1'
                                                                    , '1'
                                                                    , '{6}{3}'
                                                                    , '{4}'
                                                                    , ''
                                                                    , ''
                                                                    , ''
                                                                    , getdate()
                                                                    ,{2}
                                                                    ,getdate()
                                                                    ,{2}
                                                                    ,'{5}'                                                                    
                                                                   )
                                                                  
                                                              ",
                                                            sectionid,
                                                            display,
                                                            userid,
                                                             reurl,
                                                             filepath,
                                                             rvtstr,
                                                              ConfigurationManager.AppSettings["RootUrl"].ToString()
                                                             );

        common2.ExecuteNonQueryBySql(sql);
        return reurl;
    }

    /*
    [WebMethod]
    public static string loaddataProjectModelMarkup(string projectItemId) //2018 Feb 07 Test failed
    {
        string constr = GetConnectionString();
        DataTable dt = new DataTable();

        using (SqlConnection con = new SqlConnection(constr))
        {
            using (SqlCommand cmd = new SqlCommand("SELECT [Id],[Name], [Image], [Status], [Date] FROM [ProjectModelMarkup] where [projectItemId]=" + projectItemId))
            {
                using (SqlDataAdapter sda = new SqlDataAdapter())
                {
                    cmd.Connection = con;
                    sda.SelectCommand = cmd;
                    sda.Fill(dt);
                }
            }
        }

        //Building an HTML string.
        string array = "";
        StringBuilder html = new StringBuilder();

        //Building the Data rows.
        foreach (DataRow row in dt.Rows)
        {
            string strDate = "";

            foreach (DataColumn column in dt.Columns)
            {
                if (column.ColumnName == "Date")
                {
                    DateTime dtime = Convert.ToDateTime(row["Date"].ToString());
                    strDate = dtime.ToString("MM/dd/yyyy HH:mm:ss");
                }
            }
            array += "##"+ row["Id"] + "," + row["Name"] + "," + row["Status"] + "," + strDate;
        }
        array += "";
        return array;
    }
    */

    /* TODO: Pending to remove */
    [WebMethod]
    private string testCommonFun(string name, string image, string status, string date, string projectItemId) //TESTING ONLY
    {
        string msg = "";
        bool res = common.ExecuteNonQueryBySql("insert into [NWC_CIA_DEV].[dbo].[ProjectModelMarkup]([Name],[projectItemId]) values( 'test3',1)");
        if (res)
        {
            msg = "true";
        }
        else
        {
            msg = "false";
        }
        return msg;
    }

    [WebMethod(EnableSession = true)]
    public static string InsertQTOJson(string jsonType, string guid, string data)
    {
        string msg = "";

        try
        {
            //Check permission
            CommonFun common = new CommonFun();
            DCSCommonFun DCSComFun = new DCSCommonFun();
            string strDocSetID = common.GetScalarBySql(string.Format("select top 1 d.ID from dcsDocSet d inner join  dcsItem i on d.ID=i.DocSetID where i.GUID='{0}'", guid));
            if (!DCSComFun.IsUserAccountAllowAccessDocSet(strDocSetID, HttpContext.Current.Session["UserID"].ToString()))
            {
                return "";
            }
            //msg = System.Web.Hosting.HostingEnvironment.ApplicationPhysicalPath;

            string rootDir = System.Web.Hosting.HostingEnvironment.MapPath(string.Format("~/Models/Forge/{0}", guid));

            if (Directory.Exists(rootDir))
            {
                string dataDir = Path.Combine(rootDir, "Data");
                if (!Directory.Exists(dataDir))
                    Directory.CreateDirectory(dataDir);

                string filePath = Path.Combine(dataDir, string.Format("{0}.json", jsonType));
                File.WriteAllText(filePath, data);
            }
        }
        catch (Exception ex)
        {
            msg = ex.Message;
        }

        return msg;
    }

    [WebMethod]
    public static string InsertdataMarkup(string name, string image, string status, string date, string model_id, string userid, string category)
    {
        string msg = "";
        string connectionString = GetConnectionString();

        using (SqlConnection con = new SqlConnection())
        {
            con.ConnectionString = connectionString;

            //SqlCommand cmd = new SqlCommand("insert into [ProjectModelMarkup]([Name],[Image],[Status],[Date]) values( 's2', 'urlurl','{status bahbahbah}','2018-01-11')", con);
            SqlCommand cmd = new SqlCommand("insert into [ProjectModelMarkup]([Name],[Status],[Date],[projectItemId],[Image],[UserID],[Category]) values( @Name,@Status,@Date,@projectItemId,@Image_New, @userId, @category); SELECT SCOPE_IDENTITY()", con);
            //insert into [NWC_CIA_DEV].[dbo].[ProjectModelMarkup]([Name],[projectItemId]) values( 'test3',1)

            image = image.Replace("data:image/png;base64,", "");//base64 string

            int mod4 = image.Length % 4;
            if (mod4 > 0)
                image += new string('=', 4 - mod4);
            //System.Diagnostics.Debug.WriteLine(image);
            byte[] imageBytes = Convert.FromBase64String(image);

            //Console.WriteLine("{0} {1}", image, "}");
            //byte[] bytes = Convert.FromBase64String(image);
            cmd.Parameters.AddWithValue("@Name", name);
            //cmd.Parameters.AddWithValue("@Image", bytes); //convert to varbinary(max)
            //cmd.Parameters.AddWithValue("@Image", image);
            cmd.Parameters.AddWithValue("@Status", status);
            cmd.Parameters.AddWithValue("@Date", date);
            cmd.Parameters.AddWithValue("@projectItemId", model_id);
            cmd.Parameters.AddWithValue("@Image_New", imageBytes);
            //cmd.Parameters.AddWithValue("@Image_New", "");

            cmd.Parameters.AddWithValue("@userId", userid);
            cmd.Parameters.AddWithValue("@category", category);
            con.Open();

            object val = cmd.ExecuteScalar();
            msg = "true";

            if (val != null)
                msg = val.ToString();

            /*
            int i = cmd.ExecuteNonQuery();
            if (i == 1)
                msg = "true";
            else
                msg = "false";
            */
        }
        return msg;
    }

    [WebMethod(EnableSession = true)]
    public static string DeleteMarkupRecord(string markupid)
    {
        string msg = "";
        string connectionString = GetConnectionString();

        // TODO: Check permission

        using (SqlConnection con = new SqlConnection())
        {
            con.ConnectionString = connectionString;
            SqlCommand cmd = new SqlCommand("DELETE FROM [ProjectModelMarkup] WHERE [Id] = " + markupid, con);

            con.Open();

            int affectedRows = cmd.ExecuteNonQuery();
            if (affectedRows > 0)
                msg = "true";
            else
                msg = "false";
        }

        return msg;
    }

    [WebMethod]
    public static string deletedataLevel(string model_id, string delschedulename) //20180410 SNAPSHOT_LEVEL
    {
        string msg = "";
        string connectionString = GetConnectionString();

        using (SqlConnection con = new SqlConnection())
        {
            con.ConnectionString = connectionString;
            SqlCommand cmd = new SqlCommand("delete from [ProjectModelLevel] where [projectItemId]=" + model_id + " AND [ScheduleName]='" + delschedulename + "'", con);
            //SqlCommand cmd = new SqlCommand("delete from [ProjectModelLevel] where [projectItemId]=" + model_id + " AND [ScheduleName]=" + schedulename, con);
            con.Open();

            int i = cmd.ExecuteNonQuery();
            if (i == 1)
            {
                msg = "true";
            }
            else
            {
                msg = "false";
            }
        }
        return msg;
    }

    [WebMethod(EnableSession = true)]
    public static string InsertdataLevel(string data) //20180410 SNAPSHOT_LEVEL
    {
        List<Dictionary<string, string>> lstLevel = JsonConvert.DeserializeObject<List<Dictionary<string, string>>>(data);

        string msg = "";
        string connectionString = GetConnectionString();


        using (SqlConnection con = new SqlConnection(connectionString))
        {
            con.Open();

            SqlCommand cmd = con.CreateCommand();
            SqlTransaction transaction;

            transaction = con.BeginTransaction("InsertLevel");
            cmd.Connection = con;
            cmd.Transaction = transaction;

            try
            {
                if (lstLevel.Count > 0)
                {
                    cmd.Parameters.Clear();

                    cmd.CommandText = @"DELETE FROM [ProjectModelLevel] WHERE [projectItemId] = @projectItemId AND [ScheduleName] = @ScheduleName;";

                    cmd.Parameters.AddWithValue("@projectItemId", lstLevel[0]["model_id"]);
                    cmd.Parameters.AddWithValue("@ScheduleName", lstLevel[0]["schedulename"]);

                    cmd.ExecuteNonQuery();
                }

                foreach (Dictionary<string, string> lvl in lstLevel)
                {
                    cmd.Parameters.Clear();

                    string name = lvl["name"], image = lvl["image"], status = lvl["status"], date = lvl["date"],
                        model_id = lvl["model_id"], mPD = lvl["mPD"], schedulename = lvl["schedulename"];

                    image = image.Replace("data:image/png;base64,", "");//base64 string
                    int mod4 = image.Length % 4;
                    if (mod4 > 0)
                    {
                        image += new string('=', 4 - mod4);
                    }
                    //System.Diagnostics.Debug.WriteLine(image);
                    byte[] imageBytes = Convert.FromBase64String(image);

                    cmd.CommandText = @"INSERT INTO [ProjectModelLevel] ([Name], [Status], [Date], [ProjectItemId], [Image], [mPD], [ScheduleName]) 
                                        VALUES(@Name, @Status, @Date, @projectItemId, @Image_New, @mPD, @ScheduleName);";

                    cmd.Parameters.AddWithValue("@Name", name);
                    cmd.Parameters.AddWithValue("@Status", status);
                    cmd.Parameters.AddWithValue("@Date", date);
                    cmd.Parameters.AddWithValue("@projectItemId", model_id);
                    cmd.Parameters.AddWithValue("@Image_New", imageBytes);
                    cmd.Parameters.AddWithValue("@mPD", mPD);
                    cmd.Parameters.AddWithValue("@ScheduleName", schedulename);

                    cmd.ExecuteNonQuery();
                }

                transaction.Commit();
            }
            catch (Exception ex)
            {
                transaction.Rollback();

                return ex.Message;
            }



            //SqlCommand cmd = new SqlCommand("insert into [ProjectModelMarkup]([Name],[Image],[Status],[Date]) values( 's2', 'urlurl','{status bahbahbah}','2018-01-11')", con);
            //SqlCommand cmd = new SqlCommand("insert into [ProjectModelLevel]([Name],[Status],[Date],[projectItemId],[Image],[mPD], [ScheduleName]) values( @Name,@Status,@Date,@projectItemId,@Image_New, @mPD, @ScheduleName); SELECT SCOPE_IDENTITY()", con);
            //insert into [NWC_CIA_DEV].[dbo].[ProjectModelMarkup]([Name],[projectItemId]) values( 'test3',1)




            //con.Open();

            //object val = cmd.ExecuteScalar();
            //msg = "true";

            //if (val != null)
            //{
            //    msg = val.ToString();
            //}
        }
        return "true";
    }

    [WebMethod]
    public static string InsertdataLevel2(string name, string image, string status, string date, string model_id, string mPD, string schedulename) //20180410 SNAPSHOT_LEVEL
    {
        string msg = "";
        string connectionString = GetConnectionString();

        using (SqlConnection con = new SqlConnection())
        {
            con.ConnectionString = connectionString;

            //SqlCommand cmd = new SqlCommand("insert into [ProjectModelMarkup]([Name],[Image],[Status],[Date]) values( 's2', 'urlurl','{status bahbahbah}','2018-01-11')", con);
            SqlCommand cmd = new SqlCommand("insert into [ProjectModelLevel]([Name],[Status],[Date],[projectItemId],[Image],[mPD], [ScheduleName]) values( @Name,@Status,@Date,@projectItemId,@Image_New, @mPD, @ScheduleName); SELECT SCOPE_IDENTITY()", con);
            //insert into [NWC_CIA_DEV].[dbo].[ProjectModelMarkup]([Name],[projectItemId]) values( 'test3',1)

            image = image.Replace("data:image/png;base64,", "");//base64 string
            int mod4 = image.Length % 4;
            if (mod4 > 0)
            {
                image += new string('=', 4 - mod4);
            }
            //System.Diagnostics.Debug.WriteLine(image);
            byte[] imageBytes = Convert.FromBase64String(image);

            //Console.WriteLine("{0} {1}", image, "}");
            //byte[] bytes = Convert.FromBase64String(image);
            cmd.Parameters.AddWithValue("@Name", name);
            //cmd.Parameters.AddWithValue("@Image", bytes); //convert to varbinary(max)
            //cmd.Parameters.AddWithValue("@Image", image);
            cmd.Parameters.AddWithValue("@Status", status);
            cmd.Parameters.AddWithValue("@Date", date);
            cmd.Parameters.AddWithValue("@projectItemId", model_id);
            cmd.Parameters.AddWithValue("@Image_New", imageBytes);
            cmd.Parameters.AddWithValue("@mPD", mPD);
            cmd.Parameters.AddWithValue("@ScheduleName", schedulename);
            con.Open();

            object val = cmd.ExecuteScalar();
            msg = "true";

            if (val != null)
            {
                msg = val.ToString();
            }
        }
        return msg;
    }

    /*private DataTable GetProjectModelMarkupData(string projectItemId)
    {
        //string constr = ConfigurationManager.ConnectionStrings["constr"].ConnectionString;
        string constr = GetConnectionString();
        using (SqlConnection con = new SqlConnection(constr))
        {
            //Besnon
            //using (SqlCommand cmd = new SqlCommand("SELECT Markups.[Id],Markups.[Name], Markups.[Image], Markups.[Status], Markups.[Date], Markups.[Image] , Users.[ShortName],Markups.UserID, Markups.Category FROM[ProjectModelMarkup] Markups LEFT JOIN[dbo].[UserInfo] Users ON Users.ID = Markups.UserID where[projectItemId] = " + projectItemId))
            //{
            using (SqlCommand cmd = new SqlCommand("SELECT Markups.[Id],Markups.[Name], Markups.[Image], Markups.[Status], Markups.[Date], Markups.[Image] , Users.[ShortName],Markups.UserID, Markups.Category FROM[ProjectModelMarkup] Markups LEFT JOIN [dbo].[usrUser] Users ON Users.ID = Markups.UserID where[projectItemId] = " + projectItemId))
            {
                using (SqlDataAdapter sda = new SqlDataAdapter())
                {
                    cmd.Connection = con;
                    sda.SelectCommand = cmd;
                    using (DataTable dt = new DataTable())
                    {
                        sda.Fill(dt);
                        return dt;
                    }
                }
            }
        }
    }*/

    private DataTable GetProjectModelLevelData(string projectItemId) //20180410 SNAPSHOT_LEVEL
    {
        //string constr = ConfigurationManager.ConnectionStrings["constr"].ConnectionString;
        string constr = GetConnectionString();
        using (SqlConnection con = new SqlConnection(constr))
        {
            using (SqlCommand cmd = new SqlCommand("SELECT [Id],[Name], [Image], [Status], [Date], [Image], [mPD], [ScheduleName] FROM [ProjectModelLevel] where [projectItemId]=" + projectItemId))
            {
                using (SqlDataAdapter sda = new SqlDataAdapter())
                {
                    cmd.Connection = con;
                    sda.SelectCommand = cmd;
                    using (DataTable dt = new DataTable())
                    {
                        sda.Fill(dt);
                        return dt;
                    }
                }
            }
        }
    }
    private string GetModelFileName(string GUID)
    {
        string projectCode = "";
        //string constr = ConfigurationManager.ConnectionStrings["constr"].ConnectionString;
        string constr = GetConnectionString();
        using (SqlConnection con = new SqlConnection(constr))
        {
            using (SqlCommand cmd = new SqlCommand(
                    "SELECT TOP 1 s.OriginalFileName " +
                    "FROM[NWCON_CIA2_UAT3].[dbo].[sysFileInfo] s " +
                        "LEFT JOIN[NWCON_CIA2_UAT3].[dbo].[dcsItem] d ON d.FileInfoID = s.ID " +
                    "WHERE d.GUID = '" + GUID + "'"))
            {
                using (SqlDataAdapter sda = new SqlDataAdapter())
                {
                    cmd.Connection = con;
                    sda.SelectCommand = cmd;
                    using (DataTable dt = new DataTable())
                    {
                        sda.Fill(dt);
                        string[] fileNameSplited = dt.Rows[0]["OriginalFileName"].ToString().Split('_');
                        if (fileNameSplited.First() != null)
                            projectCode = fileNameSplited.First();
                    }
                }
            }
        }
        return projectCode;
    }

    private DataTable GetProjectWorkPermit(string projectCode)
    {
        //string constr = ConfigurationManager.ConnectionStrings["constr"].ConnectionString;
        string constr = GetConnectionString();
        using (SqlConnection con = new SqlConnection(constr))
        {
            using (SqlCommand cmd = new SqlCommand(
                    "SELECT f.name, u.level, u.block, DATEADD(SECOND, f.date, '1970-01-01 08:00:00') AS dateCreation, DATEADD(SECOND, h.Created, '1970-01-01 08:00:00') AS dateHistory, t.Name As template, " +
                        "Case When f.status = -2 Then N'被撤回' " +
                            "When f.status = -1 Then N'不批核' " +
                            "When f.status = 1 Then N'未批核' " +
                            "When f.status = 2 Then N'未註銷' " +
                            "When f.status = 3 Then N'已註銷' " +
                            "When f.status = 4 Then N'已確認註銷' End As statusName " +
                    "FROM [NWCON_CIA_Novade_UAT].[dbo].[unybiz.forms.forms] f " +
                        "LEFT JOIN [NWCON_CIA_Novade_UAT].[dbo].[unybiz.forms.formsHistory] h ON f.id = h.FormId " +
                        "LEFT JOIN [NWCON_CIA_Novade_UAT].[dbo].[novadetrack.units] u ON u.id = f.linkedid AND f.linkedtable ='novadetrack.units' " +
                        "LEFT JOIN [NWCON_CIA_Novade_UAT].[dbo].[unybiz.forms.templates] t On t.id = f.templateid AND t.linkedtable = 'novadetrack.units' " +
                    "WHERE DATALENGTH(u.level) > 0 AND t.Name IS NOT NULL AND f.status IS NOT NULL AND f.status <> 0 " +
                        "AND f.[name] LIKE '%" + projectCode + "%'"))
            {
                using (SqlDataAdapter sda = new SqlDataAdapter())
                {
                    cmd.Connection = con;
                    sda.SelectCommand = cmd;
                    using (DataTable dt = new DataTable())
                    {
                        sda.Fill(dt);
                        return dt;
                    }
                }
            }
        }
    }

    //no use
    private DataTable getModelListFromDb(string projectId)
    {
        string constr = GetConnectionString();
        using (SqlConnection con = new SqlConnection(constr))
        {
            //string sqlStr = "select [Id],[FileName],[HTMLURL],[Modified] from [ProjectItem] where [SectionRef] = '3D MODEL' AND [IsShow] = 1 order by [FileName] ASC";
            string sqlStr = "select tablea.[ID],tablea.[FileName],tablea.[HTMLURL], tablea.[Modified],tablea.[SectionID], tableb.[projectId] from [ProjectItem] tablea join [ProjectSection] tableb on tablea.[SectionID] = tableb.[ID] where  tablea.FileType in ('rvt','asm')  AND tablea.[IsShow] = 1 AND tableb.[projectId] = @projectId order by tablea.[FileName] ASC";
            //select[Id],[UrlPath],[Modified] from[ProjectModelHistory] where[Id] = 1 order by[UrlPath] ASC
            using (SqlCommand cmd = new SqlCommand(sqlStr))
            {
                cmd.Parameters.AddWithValue("@projectId", projectId);
                using (SqlDataAdapter sda = new SqlDataAdapter())
                {
                    cmd.Connection = con;
                    sda.SelectCommand = cmd;
                    using (DataTable dt = new DataTable())
                    {
                        sda.Fill(dt);
                        return dt;
                    }
                }
            }
        }
    }

    [WebMethod]
    public static string updateMarkupCategoryValue(string markupid, string categoryvalue)
    {
        string msg = "";
        string connectionString = GetConnectionString();

        using (SqlConnection con = new SqlConnection())
        {
            con.ConnectionString = connectionString;
            con.Open();

            SqlCommand cmdUpdate = new SqlCommand("update [ProjectModelMarkup] SET [Category]=@category where [Id]=" + markupid, con);
            cmdUpdate.Parameters.AddWithValue("@category", categoryvalue);
            int i = cmdUpdate.ExecuteNonQuery();
            if (i == 1)
            {
                msg = "true";
            }
            else
            {
                msg = "false";
            }
        }
        return msg;
    }

    /* TODO: Pending to remove */
    [WebMethod]
    public static string updateBboxValue(string value, string model_id)
    {
        string msg = "";
        string connectionString = GetConnectionString();

        using (SqlConnection con = new SqlConnection())
        {
            con.ConnectionString = connectionString;
            con.Open();

            SqlCommand cmdUpdate = new SqlCommand("update [ProjectModelHistory] SET [Bbox]=@bbox where [ProjectItemID]=" + model_id, con);
            cmdUpdate.Parameters.AddWithValue("@bbox", value);
            int i = cmdUpdate.ExecuteNonQuery();
            if (i == 1)
            {
                msg = "true";
            }
            else
            {
                msg = "false";
            }
        }
        return msg;
    }

    /* TODO: Pending to remove */
    /*
    private string GetBboxFromDb(string model_id)
    {
        string msg = "";
        string connectionString = GetConnectionString();

        using (SqlConnection con = new SqlConnection())
        {
            con.ConnectionString = connectionString;
            con.Open();

            //SqlCommand cmdSelect = new SqlCommand("select Top 1 [Bbox] from [ProjectModelHistory] where [FilePath] = @guid order by [Modified] DESC", con);
            SqlCommand cmdSelect = new SqlCommand("select Top 1 [Bbox] from [ProjectModelHistory] where [ProjectItemID] = @model_id order by [Modified] DESC", con);
            cmdSelect.Parameters.AddWithValue("@model_id", model_id);
            object val = cmdSelect.ExecuteScalar();
            if (val != null)
            {
                msg = val.ToString();
            }
        }

        return msg;
    }
    */

    /*
    [WebMethod]
    public static string getLinkedModelFromDb(string path)
    {
        string msg = "";
        string connectionString = GetConnectionString();

        using (SqlConnection con = new SqlConnection())
        {
            con.ConnectionString = connectionString;
            con.Open();

            SqlCommand cmdSelect = new SqlCommand("select [LinkedModel] from [ProjectModelHistory] where [FilePath] = @guid order by [Modified] DESC", con);
            cmdSelect.Parameters.AddWithValue("@guid", path);
            object val = cmdSelect.ExecuteScalar();
            if (val != null)
            {
                msg = (string)val;
            }
        }

        return msg;
    }
    */

    [WebMethod]
    public static string updateCustomPropsProject(string value, string model_id) //model_id changed to model path
    {
        // ------------------------------------------------------------------------------------------------------------
        // Function: updateCustomPropsProject
        //
        // Description: This function writes the custom properties of packages (package code, item code and remarks
        //              to the CIA server
        // ------------------------------------------------------------------------------------------------------------

        // ------------------------------------------------------------------------------------------------------------
        // Variable declaration
        // ------------------------------------------------------------------------------------------------------------
        string msg = "";                                        // variable to return whether the write procedure is 
                                                                // successful or not
        string connectionString = GetConnectionString();        // connection string to the server

        // ------------------------------------------------------------------------------------------------------------
        // Start new connection sequence
        // ------------------------------------------------------------------------------------------------------------
        using (SqlConnection con = new SqlConnection())
        {

            // --------------------------------------------------------------------------------------------------------
            // Open up connection with server
            // --------------------------------------------------------------------------------------------------------
            con.ConnectionString = connectionString;
            con.Open();
            //Int32 id = 0;

            // --------------------------------------------------------------------------------------------------------
            // Check orginial customprops
            // --------------------------------------------------------------------------------------------------------
            string oldProps = "";
            SqlCommand cmdSelect = new SqlCommand("select [CustomProperties] from [ProjectModelHistory] where [ID] = @model_id", con);
            cmdSelect.Parameters.AddWithValue("@model_id", model_id);
            object val = cmdSelect.ExecuteScalar();

            // --------------------------------------------------------------------------------------------------------
            // If there is original values of custom properties exist
            // --------------------------------------------------------------------------------------------------------
            if ((string)val != "")
            {
                oldProps = (string)val;                                 // convert the values to a string


                JObject results = JObject.Parse(value);                 // convert the new values to JSON objects
                var modDate = results["modifiedDate"];
                modDate += "|||||";

                JObject record = JObject.Parse(oldProps);               // convert the existing values to JSON objects

                //modDate = modDate + " " + record["modifiedDate"];
                record["modifiedDate"] = results["modifiedDate"];       //update the modified date  

                JToken nitems = results["items"];                       // convert the new values to JToken
                JToken ritems = record["items"];                        // convert the existing values to JToken

                // ----------------------------------------------------------------------------------------------------
                // 
                // ----------------------------------------------------------------------------------------------------
                if (nitems is JArray && ritems is JArray)
                {
                    JArray nitemsArray = (JArray)nitems;                // convert the new values to JArray format
                    JArray ritemsArray = (JArray)ritems;                // convert the existing values to JArray format

                    // ------------------------------------------------------------------------------------------------
                    // For new item JToken in the array
                    // ------------------------------------------------------------------------------------------------
                    foreach (JToken nitem in nitemsArray)
                    {
                        // --------------------------------------------------------------------------------------------
                        // Extract the id of the new item
                        // --------------------------------------------------------------------------------------------
                        JToken nid = (string)(nitem).SelectToken("id");

                        // --------------------------------------------------------------------------------------------
                        // Search for the corresponding item in the old record
                        // --------------------------------------------------------------------------------------------
                        JToken acme = record.SelectToken("$.items[?(@.id == '" + nid.ToString() + "')]"); //search record

                        // --------------------------------------------------------------------------------------------
                        // If the corresponding id exist in the record
                        // --------------------------------------------------------------------------------------------
                        if (acme != null)
                        {
                            // ----------------------------------------------------------------------------------------
                            // Extract the property values of new item
                            // ----------------------------------------------------------------------------------------
                            JArray npropertiesArray = (JArray)(nitem).SelectToken("properties");

                            // ----------------------------------------------------------------------------------------
                            // Extract the corresponding property values of existing item
                            // ----------------------------------------------------------------------------------------
                            JArray rpropertiesArray = (JArray)(acme).SelectToken("properties");

                            // ----------------------------------------------------------------------------------------
                            // For each object of the new item properties
                            // ----------------------------------------------------------------------------------------
                            foreach (JObject nparsedObject in npropertiesArray.Children<JObject>())
                            {
                                // ------------------------------------------------------------------------------------
                                // For each property of the property object
                                // ------------------------------------------------------------------------------------
                                foreach (JProperty nparsedProperty in nparsedObject.Properties())
                                {
                                    bool isfound = false;
                                    //replace record in db
                                    foreach (JObject rparsedObject in rpropertiesArray.Children<JObject>())
                                    {

                                        foreach (JProperty rparsedProperty in rparsedObject.Properties())
                                        {
                                            // ------------------------------------------------------------------------
                                            // If the corresponding property exist in the database
                                            // ------------------------------------------------------------------------
                                            if (nparsedProperty.Name == rparsedProperty.Name)
                                            {
                                                //modDate += "#" + nparsedProperty.Name;
                                                // --------------------------------------------------------------------
                                                // Replace the existing value with new value
                                                // --------------------------------------------------------------------
                                                rparsedProperty.Value = nparsedProperty.Value;
                                                isfound = true;
                                            }
                                        }
                                    }

                                    // --------------------------------------------------------------------------------
                                    // If the corresponding id exist in the database but not the property value
                                    // --------------------------------------------------------------------------------
                                    if (!isfound) //found the uid but not find the property BQ Item No
                                    {
                                        // ----------------------------------------------------------------------------
                                        // Add to props list
                                        // ----------------------------------------------------------------------------
                                        JObject newitem = new JObject();
                                        newitem[nparsedProperty.Name] = nparsedProperty.Value;
                                        rpropertiesArray.Add(newitem);
                                        //modDate += "#" + "not found";
                                    }

                                }
                            }
                        }
                        // --------------------------------------------------------------------------------------------
                        // If the corresponding id do not exist in the database
                        // --------------------------------------------------------------------------------------------
                        else
                        {
                            // ----------------------------------------------------------------------------------------
                            // Add new uid record
                            // ----------------------------------------------------------------------------------------
                            JArray propsArray = new JArray();
                            JArray npropertiesArray = (JArray)(nitem).SelectToken("properties");
                            foreach (JObject nparsedObject in npropertiesArray.Children<JObject>())
                            {
                                foreach (JProperty nparsedProperty in nparsedObject.Properties())
                                {
                                    JObject obj1 = new JObject(new JProperty(nparsedProperty.Name, nparsedProperty.Value));
                                    propsArray.Add(obj1);
                                }
                            }

                            JObject rss = new JObject(new JProperty("id", nid.ToString()), new JProperty("properties", propsArray));
                            ritemsArray.Add(rss); //add to record
                        }
                    }
                }

                // ----------------------------------------------------------------------------------------------------
                // Convert the update requests to string
                // ----------------------------------------------------------------------------------------------------
                value = Newtonsoft.Json.JsonConvert.SerializeObject(record);
            }

            // --------------------------------------------------------------------------------------------------------
            // Connect to the database and send command to update the property values
            // --------------------------------------------------------------------------------------------------------
            SqlCommand cmdUpdate = new SqlCommand("update [ProjectModelHistory] SET [CustomProperties]=@CustomProp where [ID]=@model_id", con);
            cmdUpdate.Parameters.AddWithValue("@CustomProp", value);
            cmdUpdate.Parameters.AddWithValue("@model_id", model_id);

            // --------------------------------------------------------------------------------------------------------
            // Assign the update request response to msg variable
            // --------------------------------------------------------------------------------------------------------
            int i = cmdUpdate.ExecuteNonQuery();
            if (i == 1)
            {
                msg = "true";

                //msg = modDate.ToString();
            }
            else
            {
                msg = "false";
            }
        }

        // ------------------------------------------------------------------------------------------------------------
        // Return the update request response
        // ------------------------------------------------------------------------------------------------------------
        return msg;
    }

    [WebMethod(EnableSession = true)]
    public static string InsertItemHighlight(string id, string name, string pItemId, string items)
    {
        // Check user is login
        if (HttpContext.Current.Session["UserID"] == null)
            return ((int)AjaxCallStatus.LoginTimeout).ToString();

        Dictionary<string, int[]> dictItems = JsonConvert.DeserializeObject<Dictionary<string, int[]>>(items);

        string msg = "";
        string userID = HttpContext.Current.Session["UserID"].ToString();
        string connectionString = GetConnectionString();

        /* Param */
        int listID = -1;
        int.TryParse(id, out listID);

        if (listID == -1 && string.IsNullOrWhiteSpace(name))
            return "fail";

        int projectItemId = -1;
        int.TryParse(pItemId, out projectItemId);

        if (projectItemId == -1)
            return "fail";

        using (SqlConnection con = new SqlConnection(connectionString))
        {
            con.Open();

            SqlCommand cmd = con.CreateCommand();
            SqlTransaction transaction;

            transaction = con.BeginTransaction("InsertItemHighlight");
            cmd.Connection = con;
            cmd.Transaction = transaction;

            try
            {
                if (dictItems.Count > 0)
                {
                    cmd.Parameters.Clear();

                    cmd.CommandText = @"DECLARE @ListIDTbl TABLE (ID INT);
                                        IF (@ListID IS NULL OR @ListID = -1)
	                                        BEGIN
		                                        INSERT INTO [ProjectModelHighlightList] ([Name], [ProjectItemID], [CreatedBy], [ModifiedBy], [Status])
		                                        VALUES (@ItemName, @ProjectItemID, @UserID, @UserID, 1);

		                                        SELECT CONVERT(INT, SCOPE_IDENTITY());
	                                        END
                                        ELSE
	                                        BEGIN
		                                        UPDATE [ProjectModelHighlightList]
		                                        SET [Modified] = GETDATE(), [ModifiedBy] = @UserID
		                                        OUTPUT INSERTED.[ID] INTO @ListIDTbl
		                                        WHERE [ID] = @ListID AND [CreatedBy] = @UserID

                                                UPDATE [ProjectModelHighlightItem]
                                                SET [Status] = 0
                                                WHERE [ListID] IN (SELECT TOP 1 [ID] FROM @ListIDTbl);

                                                SELECT TOP 1 [ID] FROM @ListIDTbl;
	                                        END";

                    cmd.Parameters.AddWithValue("@ListID", listID);
                    cmd.Parameters.AddWithValue("@ProjectItemID", projectItemId);
                    cmd.Parameters.AddWithValue("@ItemName", name);
                    cmd.Parameters.AddWithValue("@UserID", userID);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        listID = -1;
                        if (reader.HasRows)
                        {
                            reader.Read();
                            listID = reader.IsDBNull(0) ? -1 : reader.GetInt32(0);
                        }
                    }

                    if (listID != -1)
                    {
                        SqlCommand cmd2 = con.CreateCommand();

                        cmd2.Connection = con;
                        cmd2.Transaction = transaction;

                        foreach (var item in dictItems)
                        {
                            foreach (int dbId in item.Value)
                            {
                                cmd2.Parameters.Clear();

                                cmd2.CommandText = @"INSERT INTO [ProjectModelHighlightItem] ([ListID], [ColorCode], [ItemID], [Status])
	                                            VALUES (@ListID, @ColorCode, @ItemID, 1)";

                                cmd2.Parameters.AddWithValue("@ListID", listID);
                                cmd2.Parameters.AddWithValue("@ColorCode", item.Key);
                                cmd2.Parameters.AddWithValue("@ItemID", dbId);

                                cmd2.ExecuteNonQuery();
                            }
                        }
                    }

                    transaction.Commit();
                }

            }
            catch (Exception ex)
            {
                transaction.Rollback();

                return ex.Message;
            }
        }
        return "true";
    }

    [WebMethod(EnableSession = true)]
    public static string GetItemHighlightList(string pItemId)
    {
        // Check user is login
        if (HttpContext.Current.Session["UserID"] == null)
            return ((int)AjaxCallStatus.LoginTimeout).ToString();

        CommonFun common = new CommonFun();
        DCSCommonFun DCSComFun = new DCSCommonFun();
        string userID = HttpContext.Current.Session["UserID"].ToString();
        bool isSystemAdmin = DCSComFun.IsSystemAdmin(userID);

        if (DCSComFun.ConvertStringToInt(pItemId, 0) > 0)
        {
            string sql = @"SELECT l.[ID], l.[Name], 
                            CASE WHEN @IsAdmin = 1 THEN CONCAT(CONVERT(NVARCHAR(100), l.[Modified], 20), ' (', ISNULL(mu.[FullName], 'NIL'), ')')
                            ELSE CONVERT(NVARCHAR(100), l.[Modified], 20)
                            END AS [Modified]
                           FROM [dbo].[ProjectModelHighlightList] l
                           LEFT OUTER JOIN usrUser AS mu ON l.[ModifiedBy] = mu.[ID]
                           WHERE l.[Status] = 1 AND l.[ProjectItemID] = @ItemID {0}
                           ORDER BY l.[Modified] DESC";


            if (!isSystemAdmin)
                sql = string.Format(sql, " AND l.[ModifiedBy] = @UserID");
            else
                sql = string.Format(sql, "");

            List<SqlParameter> parsList = new List<SqlParameter>();
            DCSComFun.SetSqlParameter(ref parsList, "@ItemID", pItemId, SqlDbType.VarChar);
            DCSComFun.SetSqlParameter(ref parsList, "@UserID", userID, SqlDbType.VarChar);
            DCSComFun.SetSqlParameter(ref parsList, "@IsAdmin", isSystemAdmin ? 1 : 0, SqlDbType.Int);
            SqlParameter[] paramList = parsList.ToArray();

            DataTable dt = common.GetDataBySql(sql, paramList);

            if (dt.Rows.Count > 0)
                return JsonConvert.SerializeObject(dt, new IsoDateTimeConverter() { DateTimeFormat = "yyyy-MM-dd HH:mm:ss" });
            else
                return "empty";
        }

        return "fail";
    }

    [WebMethod(EnableSession = true)]
    public static string GetItemHighlight(string pListId)
    {
        // Check user is login
        if (HttpContext.Current.Session["UserID"] == null)
            return ((int)AjaxCallStatus.LoginTimeout).ToString();

        CommonFun common = new CommonFun();
        DCSCommonFun DCSComFun = new DCSCommonFun();
        string userID = HttpContext.Current.Session["UserID"].ToString();
        bool isSystemAdmin = DCSComFun.IsSystemAdmin(userID);

        if (DCSComFun.ConvertStringToInt(pListId, 0) > 0)
        {
            string sql = @" SELECT h.[ColorCode], h.[ItemID]
                            FROM [dbo].[ProjectModelHighlightItem] h INNER JOIN [dbo].[ProjectModelHighlightList] l ON h.[ListID] = l.[ID]
                            WHERE h.[Status] = 1 AND l.[ID] = @ListID {0}";

            if (!isSystemAdmin)
                sql = string.Format(sql, " AND l.[ModifiedBy] = @UserID");
            else
                sql = string.Format(sql, "");

            List<SqlParameter> parsItem = new List<SqlParameter>();
            DCSComFun.SetSqlParameter(ref parsItem, "@ListID", pListId, SqlDbType.VarChar);
            DCSComFun.SetSqlParameter(ref parsItem, "@UserID", userID, SqlDbType.VarChar);
            SqlParameter[] paramItem = parsItem.ToArray();

            DataTable dt = common.GetDataBySql(sql, paramItem);

            if (dt.Rows.Count > 0)
            {
                var lst = dt.AsEnumerable().GroupBy(r => r["ColorCode"]).Select(g => new
                {
                    ColorCode = g.Key,
                    ItemId = g.Select(d => (int)d["ItemID"]).ToArray()
                });

                return JsonConvert.SerializeObject(lst, Formatting.None);
            }
            else
                return "empty";
        }

        return "fail";
    }

    [WebMethod(EnableSession = true)]
    public static string RemoveItemHighlight(string pListId)
    {
        // Check user is login
        if (HttpContext.Current.Session["UserID"] == null)
            return ((int)AjaxCallStatus.LoginTimeout).ToString();

        CommonFun common = new CommonFun();
        DCSCommonFun DCSComFun = new DCSCommonFun();
        string userID = HttpContext.Current.Session["UserID"].ToString();
        bool isSystemAdmin = DCSComFun.IsSystemAdmin(userID);

        if (DCSComFun.ConvertStringToInt(pListId, 0) > 0)
        {
            string sql = @"	DECLARE @rowCount INT;
                            DECLARE @temp TABLE (ID [INT]);

                            SET @rowCount = 0;

                            UPDATE [ProjectModelHighlightList]
		                    SET [Status] = 0
		                    OUTPUT INSERTED.ID
		                    WHERE [ID] = @ListID AND [Status] = 1 {0};

		                    SELECT @rowCount = COUNT([ID]) FROM @temp;

		                    IF(@rowCount > 0)
		                    BEGIN
			                    UPDATE [ProjectModelHighlightItem]
			                    SET [Status] = 0
			                    WHERE [ListID] = @ListID AND [Status] = 1;
		                    END";

            if (!isSystemAdmin)
                sql = string.Format(sql, " AND [ModifiedBy] = @UserID");
            else
                sql = string.Format(sql, "");

            List<SqlParameter> parsList = new List<SqlParameter>();
            DCSComFun.SetSqlParameter(ref parsList, "@ListID", pListId, SqlDbType.VarChar);
            DCSComFun.SetSqlParameter(ref parsList, "@UserID", userID, SqlDbType.VarChar);
            SqlParameter[] paramList = parsList.ToArray();

            if (common.ExecuteNonQueryBySql(sql, paramList))
                return "true";
        }

        return "false";
    }

    [WebMethod(EnableSession = true)]
    public static string GetFloorPlan(string projectItemId)
    {
        // Check user is login
        if (HttpContext.Current.Session["UserID"] == null)
            return ((int)AjaxCallStatus.LoginTimeout).ToString();

        CommonFun common = new CommonFun();
        DCSCommonFun DCSComFun = new DCSCommonFun();
        string userID = HttpContext.Current.Session["UserID"].ToString();

        if (DCSComFun.ConvertStringToInt(projectItemId, 0) > 0)
        {
            string sql = @"SELECT [AdditionalValue], ISNULL([ModelPath], '') AS [ModelPath] FROM [ProjectModelRelFile] WHERE [ProjectItemID] = @ProjectItemId AND [FileRelType] = 2";           

            List<SqlParameter> parsItem = new List<SqlParameter>();
            DCSComFun.SetSqlParameter(ref parsItem, "@ProjectItemId", projectItemId, SqlDbType.VarChar);
            SqlParameter[] paramItem = parsItem.ToArray();

            DataTable dt = common.GetDataBySql(sql, paramItem);

            if (dt.Rows.Count > 0)
            {
                return JsonConvert.SerializeObject(dt, Formatting.None);
            }
            else
                return "empty";
        }

        return "fail";
    }

    static private string GetConnectionString()
    {
        // To avoid storing the connection string in your code, 
        // you can retrieve it from a configuration file.
        return ConfigurationManager.AppSettings["DBConnect"].ToString();
    }

    static private string GetQTOConnectionString()
    {
        // To avoid storing the connection string in your code, 
        // you can retrieve it from a configuration file.
        return ConfigurationManager.AppSettings["QTOConnect"].ToString();
    }

    private string GetprojectIdByPath(string guid)
    {
        //return common.GetScalarBySql(string.Format(@"select ID from ProjectItem where Guid='{0}' ", guid));
        return common.GetScalarBySql(string.Format(@"select ID from prjSectionItem where Guid='{0}' ", guid));
    }

    private Dictionary<string, string> GetModelItemInfo(string guid)
    {
        Dictionary<string, string> returnObj = new Dictionary<string, string>();
        returnObj.Add("Error", "Y");

        //string sql = string.Format(@"   SELECT TOP 1 [ps].[ProjectID], [pi].[ID] AS [ProjectItemID], [pi].[Path] AS [ModelPath]
        //                                FROM[dbo].[ProjectItem][pi] INNER JOIN[ProjectSection] [ps] ON[pi].[SectionID] = [ps].[ID]
        //                                    WHERE[Guid] = '{0}';", guid);

        string sql = string.Format(@" SELECT TOP 1 d.ProjectID, d.ID AS [ProjectItemID], d.ModelPath AS [ModelPath]
                                        FROM dcsItem d    WHERE d.Guid  = '{0}';", guid);

        DataTable dt = common.GetDataBySql(sql);

        if (dt.Rows.Count > 0)
        {
            returnObj["ProjectID"] = dt.Rows[0]["ProjectID"].ToString();
            returnObj["ProjectItemID"] = dt.Rows[0]["ProjectItemID"].ToString();
            returnObj["ModelPath"] = dt.Rows[0]["ModelPath"].ToString();
            returnObj["Error"] = "N";
        }

        return returnObj;
    }

    private string GetCustomProps(string id)
    {
        // ------------------------------------------------------------------------------------------------------------
        // Function: GetCustomProps
        //
        // Description: This functions retrieve the property values of a corresponding id from the database
        //
        // note: id = project id
        // ------------------------------------------------------------------------------------------------------------

        // ------------------------------------------------------------------------------------------------------------
        // Variable declaration
        // ------------------------------------------------------------------------------------------------------------
        string rtnValue = "";

        // ------------------------------------------------------------------------------------------------------------
        // Retrieve the existing property values, modified data and the status whether the values are transferred
        // from the database
        // ------------------------------------------------------------------------------------------------------------
        string oldProps = common.GetScalarBySql(string.Format(@"select customProperties from ProjectModelHistory where ProjectItemID= '{0}' ", id));
        string modelModifiedDate = common.GetScalarBySql(string.Format(@"select Modified from ProjectModelHistory where ProjectItemID= '{0}' ", id));
        string modelIsTransfer = common.GetScalarBySql(string.Format(@"select isTransfer from ProjectModelHistory where ProjectItemID= '{0}' ", id));

        // ------------------------------------------------------------------------------------------------------------
        // If corresponding property values of the id exist in the database
        // ------------------------------------------------------------------------------------------------------------
        if (oldProps.Length > 20)
        {
            JObject record = JObject.Parse(oldProps);                             // convert the values to Jobject
            string propsModifiedDate = record["modifiedDate"].ToString();

            // --------------------------------------------------------------------------------------------------------
            // If the values is not yet updated to the model (for old daixianyuen version), assign the values to
            // return variable
            // --------------------------------------------------------------------------------------------------------
            //if (modelIsTransfer=="0" && DateTime.Parse(propsModifiedDate) < DateTime.Parse(modelModifiedDate)) //20180806 ALSO CHECK ISTRANSFER IS 0 OR 1
            //{
            rtnValue = oldProps;

            //AND THEN SET ISTRANSFER TO 1
            bool updateIsTransfer = common.ExecuteNonQueryBySql("update [ProjectModelHistory] SET [isTransfer]=1 where [ProjectItemID]=" + id);
            //}

            // --------------------------------------------------------------------------------------------------------
            // Return the retrieved values
            // --------------------------------------------------------------------------------------------------------
            return rtnValue;
        }
        return "{}";
    }

    [WebMethod]
    public static string GetQTO_StructureBeam(string projectItemId)
    {
        // Check user is login
        /*if (HttpContext.Current.Session["UserID"] == null)
            return ((int)AjaxCallStatus.LoginTimeout).ToString();

        CommonFun common = new CommonFun();
        DCSCommonFun DCSComFun = new DCSCommonFun();
        string userID = HttpContext.Current.Session["UserID"].ToString();
        bool isSystemAdmin = DCSComFun.IsSystemAdmin(userID);*/

        string connectionString = GetQTOConnectionString();

        projectItemId = "111111";       // temp set for development
        using (SqlConnection sqlConnection = new SqlConnection(connectionString))
        //using (SqlConnection sqlConnection = new SqlConnection("Data Source=DEVDCX113;Initial Catalog=NWCON_BIMQTO_UAT;User ID=vincentyeung;password=vincent!Yeung;Connection Timeout=30"))
        {
            //TaskDialog.Show("Revit", "using connection");

            string sql = @"SELECT ProjectId, 
                ElementId, 
                
                ElementLevel, 
                
                Zoning,
                Mark,
                ConcreteGrade,
                
                
                Length,
                Width,
                Depth,
                SlabAboveThickness,
                AdjustedVolume,
                ProfileAdjustment,
                
                TotalOverlapVolumeWithSlab
               
                FROM dbo.giaQTO01000StructureConcreteBeam WHERE ProjectId=" + projectItemId;

            /*string sql = @"SELECT ProjectId, 
                ElementId, 
                BuiltInCategory,
                ElementLevel, 
                Elevation,
                Zoning,
                Mark,
                ConcreteGrade,
                MaterialGrade,
                SlabAboveMaterialGrade,
                Length,
                Width,
                Depth,
                SlabAboveThickness,
                AdjustedVolume,
                ProfileAdjustment,
                AssociatedOpeningElements,
                AssociatedOpeningTypes,
                AssociatedOpeningVolumes, 
                AssociatedOpeningCenterPoints,
                TotalOverlapVolumeWithSlab,
                OverlapVolumesWithSlab,
                OverlapVolumesEndPoints,
                OverlapMeshInfo,
                SMMAdjustedVolume,
                SMMOverlapVolumesWithSlab,
                SMMOverlapVolumesEndpoints,
                SMMTotalOverlapVolumeWithSlab, 
                SourceFile 
                FROM dbo.giaQTO01000StructureConcreteBeam WHERE ProjectId=" + projectItemId;*/

            SqlCommand cmd = new SqlCommand(sql, sqlConnection);
           
            sqlConnection.Open();

            DataTable dt = new DataTable();
            SqlDataAdapter da = new SqlDataAdapter(cmd);
            da.Fill(dt);
            System.Web.Script.Serialization.JavaScriptSerializer serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            
            List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
            Dictionary<string, object> row;
            foreach (DataRow dr in dt.Rows)
            {
                row = new Dictionary<string, object>();
                foreach (DataColumn col in dt.Columns)
                {
                    

                    row.Add(col.ColumnName, dr[col]);
                }
                rows.Add(row);
            }
            serializer.MaxJsonLength = Int32.MaxValue;
            return serializer.Serialize(rows);
            
        }

    }

    [WebMethod(EnableSession = true)]
    public static string WriteVWT_Config(string pItemId, string configstring)
    {                
        int projectItemId = -1;
        int.TryParse(pItemId, out projectItemId);

        if (projectItemId == -1)
            return "fail";

        string VWTConnectionString = "Data Source=DEVDCX113;Initial Catalog=NWCON_CIA_CB_UAT;User ID=vincentyeung;password=vincent!Yeung;Connection Timeout=30";

        //string trimstring = configstring.TrimEnd();
        string trimstring = configstring.Substring(0, 43600);

        using (SqlConnection con = new SqlConnection(VWTConnectionString))
        //using (SqlConnection con = new SqlConnection(connectionString))
        {
            con.Open();

            SqlCommand cmd = con.CreateCommand();
            SqlTransaction transaction;

            transaction = con.BeginTransaction("WriteVWTConfig");
            cmd.Connection = con;
            cmd.Transaction = transaction;

            try
            {
                cmd.Parameters.Clear();
                                                
                cmd.CommandText = @"UPDATE[dbo].[ciaCB02000VWTConfig] SET[configstring] = @configstring
                                WHERE [projectItemId]=" + projectItemId;

                //cmd.Parameters.AddWithValue("@configstring", "ABC");                
                //cmd.Parameters.AddWithValue("@configstring", trimstring);
                cmd.Parameters.AddWithValue("@configstring", configstring);
                int rowsAffected = cmd.ExecuteNonQuery();
                
                
                if (rowsAffected == 0)
                {
                    //return "fail 3";
                }

                transaction.Commit();                

            }
            catch (Exception ex)
            {
                transaction.Rollback();
                //return "fail 2";
                return ex.Message;
            }
        }
        return "true";




    }

    [WebMethod(EnableSession = true)]
    public static string ReadVWT_Config(string pItemId)
    {

        string config_string = "fail";
        int projectItemId = -1;
        int.TryParse(pItemId, out projectItemId);

        if (projectItemId == -1)
        {
            config_string = "fail";
            return config_string;
            //return "fail";
        }

        string VWTConnectionString = "Data Source=DEVDCX113;Initial Catalog=NWCON_CIA_CB_UAT;User ID=vincentyeung;password=vincent!Yeung;Connection Timeout=30";
       
        using (SqlConnection con = new SqlConnection(VWTConnectionString))
        //using (SqlConnection con = new SqlConnection(connectionString))
        {
            //con.Open();

            //SqlCommand cmd = con.CreateCommand();
            //SqlTransaction transaction;

            //transaction = con.BeginTransaction("ReadVWTConfig");
            //cmd.Connection = con;
            //cmd.Transaction = transaction;

            try
            {
                SqlCommand cmd = con.CreateCommand();
                
                cmd.CommandText = @"SELECT configstring FROM [dbo].[ciaCB02000VWTConfig] WHERE [projectItemId]=" + projectItemId;

                con.Open();
                //cmd.Transaction = transaction;
                //SqlCommand cmd = new SqlCommand(sql, sqlConnection);

                //TaskDialog.Show("Revit", "open connection");

                //sqlConnection.Open();
                SqlDataReader sqlreader = cmd.ExecuteReader();

                while (sqlreader.Read())
                {
                    config_string = sqlreader["configstring"].ToString();                    
                }
                            
                //transaction.Commit();

                if (config_string == null)
                {
                    config_string = "fail";
                }


                return config_string;

            }
            catch (Exception ex)
            {
                //transaction.Rollback();
                //return "fail";

                config_string = "fail";
                return config_string;
                //return ex.Message;
            }
        }

        config_string = "fail";

        return config_string;

        //return "fail";




    }

    [WebMethod(EnableSession = true)]
    public static string WriteQTO_StructureBeam(string id, string name, string pItemId, string items)
    {
        // Check user is login
        if (HttpContext.Current.Session["UserID"] == null)
            return ((int)AjaxCallStatus.LoginTimeout).ToString();

        Dictionary<string, int[]> dictItems = JsonConvert.DeserializeObject<Dictionary<string, int[]>>(items);

        string msg = "";
        string userID = HttpContext.Current.Session["UserID"].ToString();
        string connectionString = GetQTOConnectionString();

        /* Param */
        int listID = -1;
        int.TryParse(id, out listID);

        if (listID == -1 && string.IsNullOrWhiteSpace(name))
            return "fail";

        int projectItemId = -1;
        int.TryParse(pItemId, out projectItemId);

        if (projectItemId == -1)
            return "fail";

        using (SqlConnection con = new SqlConnection(connectionString))
        {
            con.Open();

            SqlCommand cmd = con.CreateCommand();
            SqlTransaction transaction;

            transaction = con.BeginTransaction("InsertItemHighlight");
            cmd.Connection = con;
            cmd.Transaction = transaction;

            try
            {
                if (dictItems.Count > 0)
                {
                    cmd.Parameters.Clear();

                    cmd.CommandText = @"DECLARE @ListIDTbl TABLE (ID INT);
                                        IF (@ListID IS NULL OR @ListID = -1)
	                                        BEGIN
		                                        INSERT INTO [ProjectModelHighlightList] ([Name], [ProjectItemID], [CreatedBy], [ModifiedBy], [Status])
		                                        VALUES (@ItemName, @ProjectItemID, @UserID, @UserID, 1);

		                                        SELECT CONVERT(INT, SCOPE_IDENTITY());
	                                        END
                                        ELSE
	                                        BEGIN
		                                        UPDATE [ProjectModelHighlightList]
		                                        SET [Modified] = GETDATE(), [ModifiedBy] = @UserID
		                                        OUTPUT INSERTED.[ID] INTO @ListIDTbl
		                                        WHERE [ID] = @ListID AND [CreatedBy] = @UserID

                                                UPDATE [ProjectModelHighlightItem]
                                                SET [Status] = 0
                                                WHERE [ListID] IN (SELECT TOP 1 [ID] FROM @ListIDTbl);

                                                SELECT TOP 1 [ID] FROM @ListIDTbl;
	                                        END";

                    cmd.Parameters.AddWithValue("@ListID", listID);
                    cmd.Parameters.AddWithValue("@ProjectItemID", projectItemId);
                    cmd.Parameters.AddWithValue("@ItemName", name);
                    cmd.Parameters.AddWithValue("@UserID", userID);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        listID = -1;
                        if (reader.HasRows)
                        {
                            reader.Read();
                            listID = reader.IsDBNull(0) ? -1 : reader.GetInt32(0);
                        }
                    }

                    if (listID != -1)
                    {
                        SqlCommand cmd2 = con.CreateCommand();

                        cmd2.Connection = con;
                        cmd2.Transaction = transaction;

                        foreach (var item in dictItems)
                        {
                            foreach (int dbId in item.Value)
                            {
                                cmd2.Parameters.Clear();

                                cmd2.CommandText = @"INSERT INTO [ProjectModelHighlightItem] ([ListID], [ColorCode], [ItemID], [Status])
	                                            VALUES (@ListID, @ColorCode, @ItemID, 1)";

                                cmd2.Parameters.AddWithValue("@ListID", listID);
                                cmd2.Parameters.AddWithValue("@ColorCode", item.Key);
                                cmd2.Parameters.AddWithValue("@ItemID", dbId);

                                cmd2.ExecuteNonQuery();
                            }
                        }
                    }

                    transaction.Commit();
                }

            }
            catch (Exception ex)
            {
                transaction.Rollback();

                return ex.Message;
            }
        }
        return "true";
    }
}
