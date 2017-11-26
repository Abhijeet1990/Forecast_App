(function () {

    angular.module("seriveModule", [])
        .service('http', ['$http', function ($http) {

            this.UpdateDashBoard = function () {
                return $http({
                    method: "POST",
                    url: 'Status.aspx/UpdateDashBoard',
                    data: {}
                }).success(function (data, responce) {
                })
            };

            this.GetTesVariable = function () {
                return $http({
                    method: "POST",
                    url: 'Status.aspx/GetTesVariable',
                    data: {}
                }).success(function (data, responce) {
                })
            };


            //service for forecastVisuals
            this.GetStatus = function () {
                return $http({
                    method: "POST",
                    url: 'EquipmentStatus.aspx/GetStatus',
                    data: {}
                }).success(function (data, responce) {
                })
            };

            this.GetAvailabilityVariable = function () {
                return $http({
                    method: "POST",
                    url: 'EquipmentStatus.aspx/GetAvailabilityVariable',
                    data: {}
                }).success(function (data, responce) {
                })
            };

            this.getChartDataByColumnName = function (isDayAhead, forecastColumn) {
                return $http({
                    method: "POST",
                    url: 'Forecast.aspx/GetOptimizedTESData',
                    dataType: 'json',
                    data: { isDayAhead: isDayAhead, forecastColumn: forecastColumn },
                    headers: { "Content-Type": "application/json" }
                }).success(function (data, responce) {
                    //console.log(responce);
                })
            };

            this.getHistoricalDataByColumnName = function (isDayAhead, forecastColumn) {
                return $http({
                    method: "POST",
                    url: 'Forecast.aspx/GetHistoricalTESData',
                    dataType: 'json',
                    data: { isDayAhead: isDayAhead, variable: forecastColumn },
                    headers: { "Content-Type": "application/json" }
                }).success(function (data, responce) {
                })
            };
            /*------------Services for OptimizationGoals------------------*/
            this.getOptimizationGoals = function (isDayAhead, isObjective) {
                return $http({
                    method: "POST",
                    url: 'OptimizerGoals.aspx/GetOptimizationGoals',
                    dataType: 'json',
                    data: { isDayAhead: isDayAhead, isObjective: isObjective },
                    headers: { "Content-Type": "application/json" }
                }).success(function (data, responce) {
                })
            };

            /*----------- Services for EquipmentSetting  ----------------  */
            this.GetStatus = function () {
                return $http({
                    method: "POST",
                    url: 'EquipmentStatus.aspx/GetStatus',
                    data: {}
                }).success(function (data, responce) {
                })
            };

            this.GetAvailabilityVariable = function () {
                return $http({
                    method: "POST",
                    url: 'EquipmentStatus.aspx/GetAvailabilityVariable',
                    data: {}
                }).success(function (data, responce) {
                })
            };

            this.GetSettingValue = function () {
                return $http({
                    method: "POST",
                    url: 'EquipmentSetting.aspx/GetSettingValue',
                    data: {}
                }).success(function (data, responce) {
                })
            };

            this.GetEngineerSettingVariable = function () {
                return $http({
                    method: "POST",
                    url: 'EquipmentSetting.aspx/GetEngineerSettingVariable',
                    data: {}
                }).success(function (data, responce) {
                })
            };

            /*----------------- login service ------------------*/
            this.userLogin = function (username, password) {
                return $http({
                    method: "POST",
                    url: 'RTPUserDetails.asmx/GetUserDetails',
                    data: '{userName: "' + username + '",password: "' + password + '" }',
                }).success(function (data, responce) {
                })
            };


            /*----------------- Updating equipment setting data to txt file ------------------*/
            this.updateEquipSetting = function (obj) {
                return $http({
                    method: "POST",
                    url: 'RTPUserDetails.asmx/UpdateEquipSettingRec',
                    data: "{" + "obj" + ":" + JSON.stringify(obj) + "}",
                }).success(function (data, responce) {
                })
            };


            /*----------------- Updating equipment status data to txt file ------------------*/
            this.updateEquimentStatus = function (obj) {
                return $http({
                    method: "POST",
                    url: 'RTPUserDetails.asmx/UpdateEquipStatusRec',
                    data: "{" + "obj" + ":" + JSON.stringify(obj) + "}",
                }).success(function (data, responce) {
                })
            };

            /*----------------- Getting data for status page for the first page chart series------------*/
            this.getStatusSeries = function (equipName) {
                return $http({
                    method: "POST",
                    url: 'Status.aspx/GetEquipmentsInService',
                    data: "{" + "equipName" + ":" + JSON.stringify(equipName) + "}",
                   
                }).success(function (data, responce) {
                })
            };

        }])

})();