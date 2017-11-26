using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;

namespace RTP.TESWebServer
{
    /// <summary>
    /// Summary description for RTPUserDetails
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class RTPUserDetails : System.Web.Services.WebService
    {

        [WebMethod]
        public int GetUserDetails(string userName, string password)
        {
            var availabilityStatuses = DataSnapshot.UserDetailsSettingsToClass();
            //Context.Response.Write(JsonConvert.SerializeObject(availabilityStatuses));
            foreach (var val in availabilityStatuses)
            {
                if (val.Name == userName && val.Password == password)
                {
                    return 1;
                }
            }

            var serializer = new JavaScriptSerializer();
            var json = serializer.Serialize(availabilityStatuses);
            return 0;
        }


        [WebMethod]
        public int UpdateEquipSettingRec(object[] obj)
        {

            foreach (object value in obj)
            {

                IEnumerable<ObjValues> list = obj.Cast<ObjValues>();

                Dictionary<string, object> dicValues = new Dictionary<string, object>();
                dicValues = (Dictionary<string, object>)value;

            }
            //IList<ObjValues1> lst = new IList<ObjValues1>();// (IList)obj;
            //IEnumerable<ObjValues> list = obj.Cast<ObjValues>();
            //lst.Add(obj);
            using (StreamWriter writer = new StreamWriter(@"D:\Test\TestDocut.text", true))
            {
                writer.WriteLine("Hello!!!!");
            }

            return 1;
        }



        [WebMethod]
        public int UpdateEquipStatusRec(object[] obj)
        {
            foreach (object value in obj)
            {
                IEnumerable<ObjValues> list = obj.Cast<ObjValues>();
                Dictionary<string, object> dicValues = new Dictionary<string, object>();
                dicValues = (Dictionary<string, object>)value;

            }
            using (StreamWriter writer = new StreamWriter(@"D:\Test\TestDocut.text", true))
            {
                writer.WriteLine("Hello!!!!");
            }
            return 1;
        }

        public class ObjValues
        {
            public string _aliasName { get; set; }
            public string _name { get; set; }
            public int _value { get; set; }
            public int _group { get; set; }

        }


    }
}
