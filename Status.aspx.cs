using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Script.Services;
using System.Web.Services;
using System.Web.Script.Serialization;
using System.IO;
using System.Text;

namespace RTP.TESWebServer
{
    public partial class Status : System.Web.UI.Page
    {
        //public static List<DataSnapshot.TESVariable> tesVar = new List<DataSnapshot.TESVariable>();
        protected void Page_Load(object sender, EventArgs e)
        {
            //tesVar = DataSnapshot.SettingsToClass();
            //UpdateDashBoard();
            //GetEquipmentsInService("Sec Pumps");
        }

        protected void OnGetDataClick(object sender, EventArgs e)
        {
            //RTPTESWebService service = new RTPTESWebService();
            //DataTable dt = new DataTable();
            //var tmax = DateTime.Parse(ToDateTextBox.Text);
            //var tmin = DateTime.Parse(FromDateTextBox.Text);
            //CancellationTokenSource cts = new CancellationTokenSource();
            //var variables = DataSnapshot.GetVariableList();
            //dt = service.GetPerformanceData(variables, null, tmax, tmin, 1, cts.Token);
        }


        // Call the UpdateDashBoard function inside the Timer in the web page
        //[WebMethod]
        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string UpdateDashBoard()
        {
            //List<DataSnapshot.TESVariable> tesVar = new List<DataSnapshot.TESVariable>();
            //tesVar = DataSnapshot.SettingsToClass();
            var variables = DataSnapshot.GetVariableList();

            var dt = DataSnapshot.GetSnapshot(variables);
            //int count = tesVar.Count;

            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            Dictionary<string, object> childRow;
            foreach (DataRow row in dt.Rows)
            {
                childRow = new Dictionary<string, object>();
                foreach (DataColumn col in dt.Columns)
                {
                    childRow.Add(col.ColumnName, row[col]);
                }
                parentRow.Add(childRow);
            }
            var serializer = new JavaScriptSerializer();
            var json = serializer.Serialize(parentRow);
            return json;

        }

        //[WebMethod]
        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetTesVariable()
        {
            List<DataSnapshot.TESVariable> tesVar = new List<DataSnapshot.TESVariable>();
            tesVar = DataSnapshot.SettingsToClass();
            var variables = DataSnapshot.GetVariableList();
            
            var jsonSerialiser = new JavaScriptSerializer();
            var json = jsonSerialiser.Serialize(tesVar);
            return json;

        }

        private Control GenerateControls(Control ctrl, string text, string cssClass)
        {
            if (ctrl.GetType() == typeof(TextBox))
            {
                TextBox t = (TextBox)ctrl;
                t.Text = text;
                t.CssClass = cssClass;
                t.Width = 50;
                return t;
            }
            else if (ctrl.GetType() == typeof(Label))
            {
                Label t = (Label)ctrl;
                t.Text = text;
                t.CssClass = cssClass;
                //t.Width=50;
                return t;
            }
            return ctrl;
        }


        private Control AmbientGenerateControls(Control ctrl, string text, string cssClass)
        {
            if (ctrl.GetType() == typeof(TextBox))
            {
                TextBox t = (TextBox)ctrl;
                t.Text = text;
                t.CssClass = cssClass;
                t.Width = 50;
                return t;
            }
            else if (ctrl.GetType() == typeof(Label))
            {
                Label t = (Label)ctrl;
                t.Text = text;
                t.CssClass = cssClass;
                t.Width = 50;
                return t;
            }
            return ctrl;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetEquipmentsInService(string equipName)
        {
            // Read from the operator.tab file
            var path = Properties.Settings.Default.OperatorFilePath;
            List<string> variables = new List<string>();
            variables.Add("Hour");
            variables.Add(equipName);

            var dt = DataSnapshot.ReadUpdateFileIntoDataTable(path);
            for (int i = 0; i < 2; i++)
            {
                if (dt.Rows.Count > 0) dt.Rows.RemoveAt(0);
            }

            List<UserVariable> values = new List<UserVariable>();
            List<string> output = new List<string>();

            foreach (DataRow r in dt.Rows)
            {
                UserVariable v = new UserVariable();
                v.variable = r[0].ToString();
                v.value = Convert.ToDouble(r[1]);
                values.Add(v);
            }

            for (int i = 1; i <= 24; i++)
            {
                bool found = false;
                foreach (var item in values)
                {
                    if (item.variable == i.ToString())
                    { output.Add(item.value.ToString()); found = true; }
                }
                if (!found) output.Add(string.Empty);
            }
            var serializer = new JavaScriptSerializer();

            var json = serializer.Serialize(output);
            return json;
        }


    }
}