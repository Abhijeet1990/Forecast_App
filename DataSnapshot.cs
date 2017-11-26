using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using RTP.DataServer;
using System.IO;
using System.Text.RegularExpressions;
using System.Reflection;
using Newtonsoft.Json;
using System.Text;

namespace RTP.TESWebServer
{
    public class DataSnapshot
    {
        public enum Type
        {
            AmbPress,
            AmbRH,
            AmbTdew,
            AmbTemp,
            AmbWB,
            AuxLoad,
            AuxLoadOpt,
            CashFlow,
            Ch1CWT,
            Ch1CWTOpt,
            Ch1FR,
            Ch1FROpt,
            Ch2CWT,
            Ch2CWTOpt,
            Ch2FR,
            Ch2FROpt,
            Ch3CWT,
            Ch3CWTOpt,
            Ch3FR,
            Ch3FROpt,
            Ch4CWT,
            Ch4CWTOpt,
            Ch4FR,
            Ch4FROpt,
            ChillLoad,
            CogenPower,
            CogenSteam,
            CT1CFR,
            CT1CFROpt,
            CT1Tin,
            CT1TinOpt,
            CT2CFR,
            CT2CFROpt,
            CT2Gen,
            CT2Tin,
            CT2TinOpt,
            CT3CFR,
            CT3CFROpt,
            CT3Gen,
            CT3Tin,
            CT3TinOpt,
            CT4CFR,
            CT4CFROpt,
            CT4Gen,
            CT4Tin,
            CT4TinOpt,
            ElecPrice,
            GasPrice,
            NetHR,
            NetPower,
            RTTankCapacity,
            SPAStat,
            SPAStatOpt,
            SPBStat,
            SPBStatOpt,
            SPCStat,
            SPCStatOpt,
            SPDStat,
            SPDStatOpt,
            STGen,
            TankFlowIn,
            TankFlowOut,
            TankLevel,
            TempAbove,
            TempBelow,
            TESModeAct,
            TESModeOpt
        }

        public class TESVariable
        {
            public string Type { get; set; }
            public string Alias { get; set; }
            public List<string> Variables { get; set; }
            public string EngUnits { get; set; }
            public string Group { get; set; }
            public string Value { get; set; }

            public string panelID { get; set; }
        }
        public class CHARTVariable
        {
            public string Type { get; set; }
            public string Alias { get; set; }
            public List<string> Variables { get; set; }
            public string EngUnits { get; set; }
            public string Group { get; set; }
            public string Value { get; set; }

            public string panelID { get; set; }
        }

        public class AvailabilityVariable
        {
            public string Type { get; set; }
            public string Alias { get; set; }
            public string Variable { get; set; }
            public int Status { get; set; }
            public string Group { get; set; }
            public string DayAhead { get; set; }
        }

        public class EngrSettingVariable
        {
            public string Type { get; set; }
            public string Alias { get; set; }
            public string Variable { get; set; }
            public int Value { get; set; }
            public string EngUnits { get; set; }
            public string Group { get; set; }
        }

        public class UserDetails
        {
            public string Id { get; set; }
            public string Name { get; set; }
            public string Password { get; set; }
        }


        public static List<UserDetails> UserDetailsSettingsToClass()
        {
            List<UserDetails> _userDetails = new List<UserDetails>();
            var varList = Properties.Settings.Default.UserDetails;
            foreach (string var in varList)
            {
                if (!string.IsNullOrEmpty(var))
                {
                    string[] elements = getArray(var);
                    //string[] elements = (from Match m in Regex.Matches(var, @"\[[^]]*]|\{[^}]*}|\<[^}]*>|[^,]+")
                    //                     select m.Value).ToArray();
                    UserDetails userVariable = new UserDetails();
                    if (!string.IsNullOrEmpty(elements[0])) userVariable.Id = elements[0];
                    if (!string.IsNullOrEmpty(elements[1])) userVariable.Name = elements[1];
                    if (!string.IsNullOrEmpty(elements[2])) userVariable.Password = elements[2];
                    _userDetails.Add(userVariable);
                }
            }
            return _userDetails;
        }


        public static List<EngrSettingVariable> EngrSettingsToClass()
        {
            List<EngrSettingVariable> _EngineerVariable = new List<EngrSettingVariable>();
            var varList = Properties.Settings.Default.EngineerSetting;
            foreach (string var in varList)
            {
                if (!string.IsNullOrEmpty(var))
                {
                    string[] elements = getArray(var);
                    //string[] elements = (from Match m in Regex.Matches(var, @"\[[^]]*]|\{[^}]*}|\<[^}]*>|[^,]+")
                    //                     select m.Value).ToArray();
                    EngrSettingVariable engrVariable = new EngrSettingVariable();
                    if (!string.IsNullOrEmpty(elements[0])) engrVariable.Type = elements[0];
                    if (!string.IsNullOrEmpty(elements[1])) engrVariable.Alias = elements[1];
                    if (!string.IsNullOrEmpty(elements[2])) engrVariable.Variable = elements[2];
                    if (!string.IsNullOrEmpty(elements[3])) engrVariable.EngUnits = elements[3];
                    if (!string.IsNullOrEmpty(elements[4])) engrVariable.Group = elements[4];
                    _EngineerVariable.Add(engrVariable);
                }
            }
            return _EngineerVariable;
        }
        public static List<AvailabilityVariable> AvailabilitySettingsToClass()
        {
            List<AvailabilityVariable> _AvailabilityVariable = new List<AvailabilityVariable>();
            var varList = Properties.Settings.Default.Availability;
            foreach (string var in varList)
            {
                if (!string.IsNullOrEmpty(var))
                {
                    string[] elements = getArray(var);
                    //string[] elements = (from Match m in Regex.Matches(var, @"\[[^]]*]|\{[^}]*}|\<[^}]*>|[^,]+")
                    //                     select m.Value).ToArray();
                    AvailabilityVariable availVariable = new AvailabilityVariable();
                    if (!string.IsNullOrEmpty(elements[0])) availVariable.Type = elements[0];
                    if (!string.IsNullOrEmpty(elements[1])) availVariable.Alias = elements[1];
                    if (!string.IsNullOrEmpty(elements[2])) availVariable.Variable = elements[2];
                    if (!string.IsNullOrEmpty(elements[3])) availVariable.Status = Convert.ToInt32(elements[3]);
                    if (!string.IsNullOrEmpty(elements[4])) availVariable.Group = elements[4];
                    if (!string.IsNullOrEmpty(elements[5])) availVariable.DayAhead = elements[5];
                    _AvailabilityVariable.Add(availVariable);
                }
            }
            return _AvailabilityVariable;
        }
        public static DataTable GetSnapshot(List<string> variables)
        {
            DataTable dt = new DataTable();
            // Read the content from the snapshot file named with Site-Block-Snapshot
            var filename = Properties.Settings.Default.SnapshotFilePath;
            dt = ReadSnapShotVariableFile(variables, filename);
            // This table has columns => Index,Timestamp,Name,EngUnits,Value,Good
            return dt;
        }


        public static DataTable GetChartData()
        {
            DataTable dtChart = new DataTable();
            // Read the content from the snapshot file named with Site-Block-Snapshot
            var filename = Properties.Settings.Default.SnapshotChartFilePath;
            dtChart = ReadChartTxt(filename);
            // This table has columns => Index,Timestamp,Name,EngUnits,Value,Good
            return dtChart;
        }

        public static DataTable ReadChartTxt(string filename)
        {
            // Timestamp in this table should be UTC
            // Create datatable schema based on Variable class
            DataTable dataTable = CreateVariableDataTable();
            if (string.IsNullOrEmpty(filename) || !File.Exists(filename)) return dataTable;

            try
            {
                // Read values into datatable
                int n = 0;
                foreach (string row in File.ReadLines(filename))
                {
                    // Skip header row
                    if (n == 0)
                    {
                        n++; continue;
                    }

                    // Split line
                    DataRow newRow = dataTable.NewRow();
                    var line = row.Split('\t');  // split on tab

                    // Get only variables in list (if included)
                    //if (variables != null && variables.Count() > 0 &&
                    //    !variables.Any(w => line[2].Contains(w))) continue;

                    // Get variable index
                    int index = 0; int.TryParse(line[0], out index);
                    newRow["Timestamp"] = index;

                    // Get Timestamp
                    DateTimeOffset dateTime = DateTimeOffset.MinValue;
                    DateTimeOffset.TryParse(line[1].ToString(), out dateTime);
                    if (dateTime == DateTimeOffset.MinValue) continue;

                    // Update timestamp
                    newRow["Timestamp"] = dateTime.LocalDateTime;

                    // Get name and engunits
                    newRow["AI-ON"] = line[2] as string;
                    newRow["F-ON"] = string.IsNullOrEmpty(line[3]) ? string.Empty : line[3] as string;

                    // Get value
                    double value = 0; double.TryParse(line[4].ToString(), out value);
                    newRow["Min"] = value;

                    // Get good or bad
                    bool good = true; bool.TryParse(line[5].ToString(), out good);
                    newRow["XL-P"] = good;

                    dataTable.Rows.Add(newRow);
                    n++;
                }

                return dataTable;
            }
            catch (Exception ex)
            {
                //Messages.Add(ex.Message);
                return dataTable;
            }
        }


        public static DataTable ReadSnapShotVariableFile(List<string> variables, string filename)
        {
            // Timestamp in this table should be UTC
            // Create datatable schema based on Variable class
            DataTable dataTable = CreateVariableDataTable();
            if (string.IsNullOrEmpty(filename) || !File.Exists(filename)) return dataTable;

            try
            {
                // Read values into datatable
                int n = 0;
                foreach (string row in File.ReadLines(filename))
                {
                    // Skip header row
                    if (n == 0)
                    {
                        n++; continue;
                    }

                    // Split line
                    DataRow newRow = dataTable.NewRow();
                    var line = row.Split('\t');  // split on tab

                    // Get only variables in list (if included)
                    if (variables != null && variables.Count() > 0 &&
                        !variables.Any(w => line[2].Contains(w))) continue;

                    // Get variable index
                    int index = 0; int.TryParse(line[0], out index);
                    newRow["Index"] = index;

                    // Get Timestamp
                    DateTimeOffset dateTime = DateTimeOffset.MinValue;
                    DateTimeOffset.TryParse(line[1].ToString(), out dateTime);
                    if (dateTime == DateTimeOffset.MinValue) continue;

                    // Update timestamp
                    newRow["Timestamp"] = dateTime.LocalDateTime;

                    // Get name and engunits
                    newRow["Name"] = line[2] as string;
                    newRow["EngUnits"] = string.IsNullOrEmpty(line[3]) ? string.Empty : line[3] as string;

                    // Get value
                    double value = 0; double.TryParse(line[4].ToString(), out value);
                    newRow["Value"] = value;

                    // Get good or bad
                    bool good = true; bool.TryParse(line[5].ToString(), out good);
                    newRow["Good"] = good;

                    dataTable.Rows.Add(newRow);
                    n++;
                }

                return dataTable;
            }
            catch (Exception ex)
            {
                //Messages.Add(ex.Message);
                return dataTable;
            }
        }

        public static DataTable CreateVariableDataTable()
        {
            // Create datatable to get columns list
            DataTable dataTable = new DataTable();
            dataTable.Columns.Add("Index", typeof(int));
            dataTable.Columns.Add("Timestamp", typeof(DateTime));
            dataTable.Columns.Add("Name", typeof(string));
            dataTable.Columns.Add("EngUnits", typeof(string));
            dataTable.Columns.Add("Value", typeof(double));
            dataTable.Columns.Add("Good", typeof(bool));
            return dataTable;
        }




        // After getting snapshot fill the Properties set the class with the 
        //public static IEnumerable<string> GetValues(DataRow r)
        //{
        //    var value = from c in Properties.Settings.Default.ForecastColumns.Cast<string>()
        //                       let m = c.Split(',') // get the variable names
        //                       where m[2] == r["Name"].ToString()
        //                       select r["Value"].ToString();

        //    return value;
        //}

        // Read the properties settings and fill that into the class TESVariable
        // On Web Page load it will call this function and get the List of TES Variable
        // And using this list it will update the tesVariable.Value in the web Page
        public static List<TESVariable> SettingsToClass()
        {
            List<TESVariable> _TESVariableList = new List<TESVariable>();
            var varList = Properties.Settings.Default.ForecastColumns;
            foreach (string var in varList)
            {
                if (!string.IsNullOrEmpty(var))
                {
                    string[] elements = getArray(var);
                    //string[] elements = (from Match m in Regex.Matches(var, @"\[[^]]*]|\{[^}]*}|\<[^}]*>|[^,]+")
                    //                     select m.Value).ToArray();
                    TESVariable tesVariable = new TESVariable();
                    if (!string.IsNullOrEmpty(elements[0])) tesVariable.Type = elements[0];
                    if (!string.IsNullOrEmpty(elements[1])) tesVariable.Alias = elements[1];
                    if (!string.IsNullOrEmpty(elements[2])) tesVariable.Variables = elements[2].Substring(1, elements[2].Length - 2).Split(',').ToList();
                    if (!string.IsNullOrEmpty(elements[3])) tesVariable.EngUnits = elements[3];
                    if (!string.IsNullOrEmpty(elements[4])) tesVariable.Group = elements[4];
                    if (!string.IsNullOrEmpty(elements[5])) tesVariable.panelID = elements[5];
                    _TESVariableList.Add(tesVariable);
                }
            }
            return _TESVariableList;
        }


        public static List<string> GetVariableList()
        {
            var varList = Properties.Settings.Default.ForecastColumns;
            List<string> varNameList = new List<string>();
            foreach (string var in varList)
            {
                if (!string.IsNullOrEmpty(var))
                {
                    string[] elements = getArray(var);

                    if (!string.IsNullOrEmpty(elements[2]))
                    {
                        var varNames = elements[2].Substring(1, elements[2].Length - 2).Split(',').ToList();
                        varNameList.AddRange(varNames);
                    }
                }
            }
            return varNameList;
        }

        public static string[] getArray(string input)
        {
            var delimiterPositions = new List<int>();
            int bracesDepth = 0;
            int bracketsDepth = 0;

            for (int i = 0; i < input.Length; i++)
            {
                switch (input[i])
                {
                    case '<':
                        bracesDepth++;
                        break;
                    case '>':
                        bracesDepth--;
                        break;

                    default:
                        if (bracesDepth == 0 && bracketsDepth == 0 && input[i] == ',')
                        {
                            delimiterPositions.Add(i);
                        }
                        break;
                }
            }

            var result = SplitAtPositions(input, delimiterPositions);
            return result;
        }

        public static string[] SplitAtPositions(string input, List<int> delimiterPositions)
        {
            var output = new List<string>();

            for (int i = 0; i < delimiterPositions.Count; i++)
            {
                int index = i == 0 ? 0 : delimiterPositions[i - 1] + 1;
                int length = delimiterPositions[i] - index;
                string s = input.Substring(index, length);
                output.Add(s);
            }

            string lastString = input.Substring(delimiterPositions.Last() + 1);
            output.Add(lastString);

            return output.ToArray();
        }

        public static string GetUpdatePath(string fileName)
        {
            // write the modification into setting
            var directory = Properties.Settings.Default.UpdateFilePath;
            string configDirectory = Path.Combine(directory, "UpdateFiles");
            string updatePath = Path.Combine(configDirectory, fileName + ".txt");
            string[] colNames = new string[2] { "VariableName", "Value" };
            var initialString = String.Join("\t", colNames.ToList()) + Environment.NewLine;
            // Make sure exits, if not, create it
            if (!Directory.Exists(configDirectory))
            {
                // Create Directory
                Directory.CreateDirectory(configDirectory);

                // Also need to create Derate.txt file
                updatePath = Path.Combine(configDirectory, fileName + ".txt");
                File.WriteAllText(updatePath, initialString);
            }

            // Make sure at least an empty file exists
            if (!File.Exists(updatePath))
                File.WriteAllText(updatePath, initialString);
            return updatePath;
        }

        public static DataTable ReadUpdateFileIntoDataTable(string filename)
        {
            DataTable dataTable = new DataTable();

            if (string.IsNullOrEmpty(filename) || !File.Exists(filename)) return new DataTable();

            try
            {
                // Open the file readonly so it is not locked
                int index = 0;
                using (FileStream fs = new FileStream(filename, FileMode.Open, FileAccess.Read, FileShare.ReadWrite))
                {
                    using (StreamReader sr = new StreamReader(fs))
                    {
                        do
                        {
                            // Read line
                            string line = sr.ReadLine();

                            // Split the line into columns
                            if (line == null) continue;
                            string[] column = line.Split('\t');

                            // Process headers and find forecast name
                            if (index == 0)
                            {
                                // Create table headers
                                dataTable = CreateDataTableHeaders(column);

                                // Read next data line
                                line = sr.ReadLine();
                                if (string.IsNullOrEmpty(line))
                                    return dataTable;
                                else
                                    column = line.Split('\t');
                            }
                            // Add values to datatable
                            DataRow row = dataTable.NewRow();
                            for (int n = 0; n < column.Count(); n++)
                            {
                                row[n] = column[n];
                            }

                            // Add row to datatable
                            dataTable.Rows.Add(row);

                            index++;

                        } while (!sr.EndOfStream);

                    }

                    return dataTable;
                }
            }
            catch (Exception ex)
            {
                return new DataTable();
            }
        }

        private static DataTable CreateDataTableHeaders(string[] headers)
        {
            DataTable dataTable = new DataTable();

            // Add column headers
            int colIndex = 0;
            foreach (var col in headers)
            {
                dataTable.Columns.Add(col, typeof(string));
                colIndex++;
            }
            return dataTable;
        }

        public static void WriteDataTableToFile(DataTable sourceTable, string path, bool includeHeaders)
        {
            if (sourceTable == null) return;

            using (FileStream stream = File.Open(path, FileMode.Create, FileAccess.ReadWrite, FileShare.Read))
            {
                using (StreamWriter writer = new StreamWriter(stream, Encoding.UTF8))
                {
                    // Write headers first
                    if (includeHeaders)
                    {
                        var headers = sourceTable.Columns.OfType<DataColumn>().Select(r => r.ColumnName);
                        writer.WriteLine(String.Join("\t", headers));
                    }

                    // Write data rows
                    if (sourceTable.Rows.Count > 0)
                        foreach (DataRow row in sourceTable.Rows)
                        {
                            List<string> array = new List<string>();
                            foreach (DataColumn col in sourceTable.Columns)
                            {
                                // Try to catch null values
                                string column = string.Empty;
                                if (row[col.ColumnName] == null) column = string.Empty;

                                column = row[col.ColumnName].ToString();
                                array.Add(column);
                            }

                            // Write row separated by tab
                            writer.WriteLine(String.Join("\t", array));
                        }
                }
            }
        }


    }
}