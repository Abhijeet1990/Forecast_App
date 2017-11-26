/// <reference path="angular1.4.min.js" />
(function () {
    angular.module("myModule", [])
                        .controller('statusController', function ($scope, http) {
                            var statuslist = [];
                            var varList = [];
                            $scope.groupName = [];
                            http.GetStatus().then(function (success) {
                                if (success.status == 200) {
                                    $scope.statuses = angular.fromJson(success.data.d);
                                    statuslist = $scope.statuses;
                                    http.GetAvailabilityVariable().then(function (success) {
                                        if (success.status == 200) {
                                            $scope.variables = angular.fromJson(success.data.d);
                                            varList = $scope.variables;
                                            angular.forEach($scope.variables, function (i) {
                                                angular.forEach($scope.statuses, function (j) {
                                                    if (j.Name == i.Variable) {
                                                        var obj = {};
                                                        obj.aliasName = i.Alias;
                                                        obj.name = j.Name;
                                                        if (j.Value == '0') {
                                                            obj.color = 'red';
                                                            obj.value = 'No';
                                                        }
                                                        else if (j.Value == '1') {
                                                            obj.color = 'green';
                                                            obj.value = 'Yes';
                                                        }

                                                        obj.dayAhead = i.DayAhead;
                                                        obj.group = i.Group;
                                                        $scope.groupName.push(angular.copy(obj));
                                                    }
                                                });
                                            });
                                        }
                                    })
                                }
                            })
                            $scope.changeColor = function (id) {
                                if (id == "No")
                                    return { "background-color": "green" };
                                else if (id == "Yes")
                                    return { "background-color": "red" };
                            };

                            function callServiceStatus() {
                                var statuslist = [];
                                var varList = [];
                                $scope.groupName = [];
                                http.GetStatus().then(function (success) {
                                    if (success.status == 200) {
                                        $scope.statuses = angular.fromJson(success.data.d);
                                        statuslist = $scope.statuses;
                                        http.GetAvailabilityVariable().then(function (success) {
                                            if (success.status == 200) {
                                                $scope.variables = angular.fromJson(success.data.d);
                                                varList = $scope.variables;
                                                angular.forEach($scope.variables, function (i) {
                                                    angular.forEach($scope.statuses, function (j) {
                                                        if (j.Name == i.Variable) {
                                                            var obj = {};
                                                            obj.aliasName = i.Alias;
                                                            obj.name = j.Name;
                                                            if (j.Value == '0') {
                                                                obj.color = 'red';
                                                                obj.value = 'No';
                                                            }
                                                            else if (j.Value == '1') {
                                                                obj.color = 'green';
                                                                obj.value = 'Yes';
                                                            }

                                                            obj.dayAhead = i.DayAhead;
                                                            obj.group = i.Group;
                                                            $scope.groupName.push(angular.copy(obj));
                                                        }
                                                    });

                                                });

                                            }
                                        })
                                    }
                                })
                                $scope.changeColor = function (id) {
                                    if (id == "No")
                                        return { "background-color": "green" };
                                    else if (id == "Yes")
                                        return { "background-color": "red" };
                                };
                            }

                            // Canceling EquipmentSetting values 
                            $scope.CancelEquipmentStatus = function () {
                                alertify.confirm("Do you want to reset the form?").set('onok', function () {
                                    callServiceStatus();
                                });
                            }

                        })

                        .controller('settingController', function ($scope, http) {
                            console.log("calllll");
                            var statuslist = [];
                            var varList = [];
                            $scope.groupName = [];

                            http.GetSettingValue().then(function (success) {
                                if (success.status == 200) {
                                    $scope.statuses = angular.fromJson(success.data.d);
                                    statuslist = $scope.statuses;
                                    http.GetEngineerSettingVariable().then(function (success) {
                                        if (success.status == 200) {
                                            $scope.variables = angular.fromJson(success.data.d);
                                            varList = $scope.variables;

                                            angular.forEach($scope.variables, function (i) {
                                                angular.forEach($scope.statuses, function (j) {
                                                    if (j.Name == i.Variable) {
                                                        var obj = {};
                                                        obj.aliasName = i.Alias;
                                                        if (j.Name.indexOf("Max") >= 0) {
                                                            obj.max = "true";
                                                        }
                                                        else if (j.Name.indexOf("Min") >= 0) {
                                                            obj.max = "false";
                                                        }
                                                        if (j.Name.indexOf("Start") >= 0) {
                                                            obj.start = "true";
                                                        }
                                                        else {
                                                            obj.start = "false";
                                                        }
                                                        obj.value = j.Value;
                                                        obj.name = j.Name;
                                                        obj.group = i.Group;
                                                        $scope.groupName.push(angular.copy(obj));
                                                    }
                                                });

                                            });
                                            console.log('groupName', $scope.groupName);
                                        }
                                    })
                                }
                            })



                            $scope.changeColor = function (id) {
                                if (id == "No")
                                    return { "background-color": "green" };
                                else if (id == "Yes")
                                    return { "background-color": "red" };
                            };


                            function callService() {
                                var statuslist = [];
                                var varList = [];
                                $scope.groupName = [];

                                http.GetSettingValue().then(function (success) {
                                    if (success.status == 200) {
                                        $scope.statuses = angular.fromJson(success.data.d);
                                        statuslist = $scope.statuses;
                                        http.GetEngineerSettingVariable().then(function (success) {
                                            if (success.status == 200) {
                                                $scope.variables = angular.fromJson(success.data.d);
                                                varList = $scope.variables;

                                                angular.forEach($scope.variables, function (i) {
                                                    angular.forEach($scope.statuses, function (j) {
                                                        if (j.Name == i.Variable) {
                                                            var obj = {};
                                                            obj.aliasName = i.Alias;
                                                            if (j.Name.indexOf("Max") >= 0) {
                                                                obj.max = "true";
                                                            }
                                                            else if (j.Name.indexOf("Min") >= 0) {
                                                                obj.max = "false";
                                                            }
                                                            if (j.Name.indexOf("Start") >= 0) {
                                                                obj.start = "true";
                                                            }
                                                            else {
                                                                obj.start = "false";
                                                            }
                                                            obj.value = j.Value;
                                                            obj.name = j.Name;
                                                            obj.group = i.Group;
                                                            $scope.groupName.push(angular.copy(obj));
                                                        }
                                                    });

                                                });
                                                console.log('groupName', $scope.groupName);
                                            }
                                        })
                                    }
                                })

                                //calling function 

                                $scope.changeColor = function (id) {
                                    if (id == "No")
                                        return { "background-color": "green" };
                                    else if (id == "Yes")
                                        return { "background-color": "red" };
                                };
                            }



                            // Updating EquipmentSetting values 
                            $scope.UpdateEquipment = function () {
                                //alert($scope.groupName);
                                console.log('$scope.groupName', $scope.groupName);
                            }

                            $scope.test = function (group) {
                                alert(group);
                            }

                            // Canceling EquipmentSetting values 
                            $scope.CancelEquipment = function () {
                                alertify.confirm("Do you want to reset the form?").set('onok', function () {
                                    callService();
                                });


                            }


                            //Authenticateing user login
                            $scope.AuthenticateUser = function () {
                                alert('call');
                                console.log('AuthenticateUser call');
                                console.log('username');
                                console.log('AuthenticateUser call');
                            }

                        });
}());