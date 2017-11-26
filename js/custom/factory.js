(function () {
angular.module("factoryModule", [])
    .factory('statusFactory', ['$q','http',statusFactory]);


function statusFactory($q,http) {
    var updateDashBoardResult = [], getTesVariableResult = [];
    var statusfactory = {};
    statusfactory.AmbientCondition = [];
    statusfactory.CombustionTurbine1 = [];
    statusfactory.CombustionTurbine2 = [];
    statusfactory.Chiller1 = [];
    statusfactory.Chiller2 = [];
    statusfactory.SecondaryPumps = [];
    statusfactory.TESTank = [];
    statusfactory.UpdateDashBoard = function () {
        var defer = $q.defer()
        http.UpdateDashBoard().then(function (success) {
            if (success.status == 200) {
                updateDashBoardResult = angular.fromJson(success.data.d);
                //console.log('updateDashBoardResult', updateDashBoardResult);
                http.GetTesVariable().then(function (success) {
                    if (success.status == 200) {
                        getTesVariableResult = angular.fromJson(success.data.d);
                        myFun(updateDashBoardResult, getTesVariableResult);
                        defer.resolve(true);
                    }
                })
            }
            else {
                defer.reject("error");
            }
        });
        return defer.promise;
    }

    function myFun(dt, tesVar) {
        statusfactory.AmbientCondition = [];
        statusfactory.CombustionTurbine1 = [];
        statusfactory.CombustionTurbine2 = [];
        statusfactory.Chiller1 = [];
        statusfactory.Chiller2 = [];
        statusfactory.SecondaryPumps = [];
        statusfactory.TESTank = [];

        for (i = 0; i < tesVar.length; i++) {
            if (tesVar[i].Group == "AmbientCondition") {
                var tbl = GetTable(tesVar, dt, i);
               statusfactory.AmbientCondition.push(tbl);

            }
            if (tesVar[i].Group == "CombustionTurbine" && tesVar[i].panelID == "1") {
                var tbl = GetTable(tesVar, dt, i);
               statusfactory.CombustionTurbine1.push(tbl);

            }
            if (tesVar[i].Group == "CombustionTurbine" && tesVar[i].panelID == "2") {
                var tbl = GetTable(tesVar, dt, i);
               statusfactory.CombustionTurbine2.push(tbl);

            }
            if (tesVar[i].Group == "Chillers" && tesVar[i].panelID == "1") {
                var tbl = GetTable(tesVar, dt, i);
               statusfactory.Chiller1.push(tbl);

            }
            if (tesVar[i].Group == "Chillers" && tesVar[i].panelID == "2") {
                var tbl = GetTable(tesVar, dt, i);
               statusfactory.Chiller2.push(tbl);

            }
            if (tesVar[i].Group == "SecondaryPumps") {
                var tbl = GetTable(tesVar, dt, i);
               statusfactory.SecondaryPumps.push(tbl);

            }
            if (tesVar[i].Group == "TESTank") {
                var tbl = GetTable(tesVar, dt, i);
                statusfactory.TESTank.push(tbl);
                //console.log('$scope.TESTank',statusfactory.TESTank);
            }
        }
    }

    function GetTable(tesVar, dt, i) {
        for (j = 0; j < dt.length; j++) {
            // Adding values in Ambient Condition panel
            if (tesVar[i].Variables.indexOf((dt[j]["Name"])) != -1) {
                return GetRow(dt, j, tesVar[i].Variables, tesVar[i]);
            }
        }
        var tr = {};
        tr.textbox = [];
        tr.lable = '';

        return tr;
    }

    function GetRow(dt, j, variables, item) {

        var tr = {};
        tr.textbox = [];
        tr.lable = '';
        tr.engUnit = '';
        for (tblCell = 0; tblCell < variables.length + 2; tblCell++) {
            if (tblCell == 0 && (item.Alias)) {
                tr.lable = item.Alias;
            }
            else if (tblCell == variables.length + 1 && item.EngUnits) {
                tr.engUnit = item.EngUnits;
            }
            else if (variables.length == 2 && tblCell != 0 && tblCell != variables.length + 1) {
                if (dt[j]["Value"] > -1) {
                    tr.textbox.push(dt[j]["Value"]);
                }
                if (dt[j + 1]["Value"] > -1) {
                    j = j + 1;
                    tr.textbox.push(dt[j]["Value"]);
                    tblCell = tblCell + 1;
                }

            }
            else if (variables.length == 1 && tblCell != 0 && tblCell != variables.length + 1) {
                if (dt[j]["Value"]) {
                    tr.textbox.push(dt[j]["Value"]);
                }
            }
        }

        return tr;
    }

    return statusfactory;
}

})();