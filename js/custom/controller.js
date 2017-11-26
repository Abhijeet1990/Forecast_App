(function () {
    angular.module("controllerModule", [])
    /*----------- controller used for status page chart  ----------------  */
    .controller('statusHighChart', function ($scope, http) {
        //populate status chart
        $scope.TankLevel = [];
        var d = new Date();
        $scope.hour = d.getHours();
        var min = d.getMinutes();
        $scope.hourMin = $scope.hour + '.' + min,
        http.getChartDataByColumnName(false, 'TankLevel').then(function (success) {
            if (success.status == 200) {
                var data = angular.fromJson(success.data);
                $scope.TankLevel = angular.fromJson(data.d);
                // Display only the future data as an optimal data
                for (index = 0, len = $scope.TankLevel.length ; index < len; ++index) {
                    if (index < $scope.hour) {
                        $scope.TankLevel[index] = null;
                    }
                }
                callChart();
            }
        })

        http.getHistoricalDataByColumnName(false, 'TES Tank Water Level').then(function (success) {
            if (success.status == 200) {
                var data = angular.fromJson(success.data);
                $scope.HistoricalTankLevel = angular.fromJson(data.d);
                // Display only the future data as an optimal data
                for (index = 0, len = $scope.HistoricalTankLevel.length ; index < len; ++index) {
                    if (index > $scope.hour) {
                        $scope.HistoricalTankLevel[index] = null;
                    }
                }
                callChart();
            }
        })

        http.getHistoricalDataByColumnName(false, 'TES Mode Actual').then(function (success) {
            if (success.status == 200) {
                var data = angular.fromJson(success.data);
                $scope.HistoricalActualMode = angular.fromJson(data.d);
                // Display only the future data as an optimal data
                for (index = 0, len = $scope.HistoricalActualMode.length ; index < len; ++index) {
                    if (index > $scope.hour) {
                        $scope.HistoricalActualMode[index] = null;
                    }
                }
                //console.log(' $scope.HistoricalActualMode', $scope.HistoricalActualMode);
            }
        })

        $scope.numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
        $scope.chillerPackages = [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 3];
        $scope.secondaryPumps = ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '3', ' 3', '3', '3', '3', '3', '3', '3', '3', '3', '3', '3', '0', '0'];
        // function start for selected box 
        $scope.selectedBoxIndex = 10;
        $scope.selectedBox = function (val, index) {
            $scope.selectedBoxValue = val;
            $scope.selectedBoxIndex = index;
            //$scope.dynamicClassFlag = index;
        }
        function callChart() {
            Highcharts.chart('container', {
                chart: {
                    type: 'area'
                },
                title: {
                    text: ''
                },
                credits: {
                    enabled: false
                },
                subtitle: {
                    text: ''
                },
                xAxis: {
                    min: 0.5,
                    max: 24,
                    tickInterval: 4,
                    categories: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'],
                    // crosshair: true,
                    plotBands: [{ // mark the weekend
                        color: 'red',
                        from: $scope.hourMin,
                        to: $scope.hourMin,
                    }],
                    plotLines: [{
                        color: 'red',
                        width: 2,
                        value: $scope.hourMin,
                    }]
                },
                yAxis: {
                    gridLineWidth: 0,
                    lineWidth: 1,
                    tickWidth: 1,
                    tickAmount: 6,
                    min: 5,
                    max: 60,
                    title: {
                        text: ''
                    },
                },
                tooltip: {
                    pointFormat: '{series.name} <b>{point.y:,.0f} feet </b><br/> at {point.x} Hrs'
                },
                plotOptions: {
                    series: {
                        pointStart: 0
                    },
                    area: {
                        pointStart: 0,
                        marker: {
                            enabled: false,
                            symbol: 'circle',
                            radius: 2,
                            states: {
                                hover: {
                                    enabled: true
                                }
                            }
                        }
                    }
                },
                series: [
                    {
                        showInLegend: false,
                        name: 'Optimal Tank Level is',
                        //data: [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 55, null, null, null, null, null, null, null, null, null, null, null, null],
                        data: $scope.TankLevel,

                        color: '#4480e2'
                    }, {
                        showInLegend: false,
                        name: 'Tank Level was',
                        data: $scope.HistoricalTankLevel,
                        //data: [null, null, null, null, null, null, null, null, null, null, null, 55, 50, 45, 40, 35, 30, 25, 20, 15, 10, 5, 0, 5, 10, 15],
                        color: '#d5e0f2'
                    }]
            });
        }
    })

    /*----------- controller for forecast chart  ----------------  */
   .controller('forecastController', function ($scope, $http, http, $filter) {
       //$scope.date = new Date();
       $scope.btnText = 'DA',
       $scope.btnLabel = 'Table';
       $scope.selectedChart = 'REAL TIME';
       $scope.seriesData1 = [];
       $scope.seriesData2 = [];
       $scope.categoriesData = [];
       $scope.firstChartSeriesData1 = [];
       $scope.firstChartSeriesData2 = [];
       var columnsArr = ['AmbPress', 'AmbRH', 'AmbTemp', 'CT2Gen', 'CT3Gen', 'CT4Gen', 'STGen', 'NetPower', 'NetHR', 'TankLevel'];
       $scope.flag = 0;
       $scope.MianArr = [];
       $scope.columnObj = {};
       columnsArr.forEach(function (column) {
           http.getChartDataByColumnName(false, column).then(function (success) {
               if (success.status == 200) {
                   var data = angular.fromJson(success.data);
                   $scope.columnObj[column] = angular.fromJson(data.d);
                   $scope.flag = $scope.flag + 1;
               }
           })
       })

       $scope.$watch('flag', function () {
           if ($scope.flag == 10) {
               firstChart();
               NetMWhChart();
               container3();
               container4();
           }
       });

       function getChartRTDA(isTrue) {
           var columnsArr = ['AmbPress', 'AmbRH', 'AmbTemp', 'CT2Gen', 'CT3Gen', 'CT4Gen', 'STGen', 'NetPower', 'NetHR', 'TankLevel'];
           $scope.flag = 0;
           $scope.MianArr = [];
           $scope.columnObj = {};
           columnsArr.forEach(function (column) {
               http.getChartDataByColumnName(isTrue, column).then(function (success) {
                   if (success.status == 200) {
                       var data = angular.fromJson(success.data);
                       $scope.columnObj[column] = angular.fromJson(data.d);
                       $scope.flag = $scope.flag + 1;
                   }
               })
           })

           $scope.$watch('flag', function () {
               if ($scope.flag == 10) {
                   firstChart();
                   NetMWhChart();
                   container3();
                   container4();
               }
           });

       }

       var flg = 0;
       $scope.rtDate = $filter('date')(new Date(), 'fullDate');
       $scope.callRTDAChart = function () {
           if (flg == 0) {
               var todayDate = new Date();
               $scope.rtDate = $filter('date')(new Date().setDate(todayDate.getDate() + 1), 'fullDate');
               $scope.selectedChart = 'DAY AHEAD';
               $scope.btnText = 'RT';
               getChartRTDA('true');
               flg = 1;
           }
           else {
               $scope.btnText = 'DA';
               $scope.selectedChart = 'REAL TIME';
               $scope.rtDate = $filter('date')(new Date(), 'fullDate');
               getChartRTDA('false');
               flg = 0;
           }
       };
       var tmp = 0;
       $scope.expTable = false;
       $scope.chartShow = true;
       //$scope.tableShow = true;
       $scope.showTableChart = function () {
           if (tmp == 0) {
               $scope.btnLabel = 'Chart';
               $scope.expTable = true;
               $scope.tableShow = true;
               $scope.chartShow = false;
               tmp = 1;
           }
           else {

               $scope.btnLabel = 'Table'
               $scope.expTable = false;
               $scope.tableShow = false;
               $scope.chartShow = true;
               tmp = 0;
           }

       }

       //Exporting table to excel sheet
       $scope.exportTable = function () {
           var exelData = [];
           for (i = 0; i < $scope.columnObj.AmbPress.length; i++) {
               console.log('$scope.columnObj.AmbPress.length', $scope.columnObj.AmbPress.length);
               var data = {};
               data.Hour = i + 1;
               columnsArr.forEach(function (colunm) {
                   data[colunm] = $scope.columnObj[colunm][i];
               });
               exelData.push(angular.copy(data));
           }

           console.log('data', exelData);


           alasql('SELECT * INTO XLS("spreadsheet.xls",?) FROM ?', [mystyle, exelData]);
       }

       var mystyle = {
           sheetid: 'My Big Table Sheet',
           headers: true,
           columns: [
             { columnid: 'Hour', title: 'Hour' },
             { columnid: 'AmbPress', title: 'Dry Bulb Temp °F', width: 300 },
             { columnid: 'AmbRH', title: 'Relative Humidity %', width: 300 },
             { columnid: 'AmbTemp', title: 'Atoms Pressure psia', width: 300 },
             { columnid: 'CT2Gen', title: 'Net MWh', width: 300 },
             { columnid: 'CT3Gen', title: 'Net HHV BTU/kWh', width: 300 },
             { columnid: 'CT4Gen', title: 'Net MWh', width: 300 },
             { columnid: 'STGen', title: 'Net HHV BTU/kWh', width: 300 },
             { columnid: 'NetPower', title: 'Net HHV BTU/kWh', width: 300 },
             { columnid: 'NetHR', title: 'Net MWh', width: 300 },
           ],
       };

       // first chart start
       function firstChart() {
           Highcharts.chart('container1', {

               title: {
                   text: ''
               },

               subtitle: {
                   text: ''
               },

               credits: {
                   enabled: false
               },
               exporting: {
                   enabled: false
               },

               xAxis: {
                   opposite: true,
                   min: 0.5,
                   max: 24,
                   tickInterval: 4,
                   gridLineWidth: 1,
                   categories: ['00:00h', '01:00h', '02:00h', '03:00h', '04:00h', '05:00h', '06:00h', '07:00h', '08:00h', '09:00h', '10:00h', '11:00h', '12:00h', '13:00h', '14:00h', '15:00h', '16:00h', '17:00h', '18:00h', '19:00h', '20:00h', '21:00h', '22:00h', '23:00h', '24:00h'],
                   //categories: chartSeries,
               },

               yAxis: {
                   gridLineWidth: 2,
                   lineWidth: 1,
                   tickWidth: 1,
                   tickAmount: 6,
                   min: 0,
                   // max: 100,
                   title: {
                       text: '<sup>o</sup>F'
                   }
               },

               legend: {
                   //itemStyle: {
                   //    fontWeight: 'bold',
                   //    fontSize: '5px'
                   //},
                   layout: 'vertical',
                   align: 'left',
                   verticalAlign: 'middle'
               },

               plotOptions: {
                   series: {
                       pointStart: 0,
                       marker: {
                           enabled: false
                       },
                   },
               },

               series: [
                   {
                       name: 'Press',
                       data: $scope.columnObj.AmbPress,
                       color: '#dd915d'
                   },

                   {
                       name: 'RH',
                       data: $scope.columnObj.AmbRH,
                       color: '#2e86c4'
                   },

                   {
                       name: 'Temp',
                       data: $scope.columnObj.AmbTemp,
                       color: '#808080'
                   },

                    {
                        name: 'RH',
                        data: $scope.columnObj.AmbRH,
                        color: '#d614ac'
                    },
               ]

           });
       }

       // second chart start
       function NetMWhChart() {
           Highcharts.chart('container2', {

               title: {
                   text: ''
               },

               subtitle: {
                   text: ''
               },

               credits: {
                   enabled: false
               },
               exporting: {
                   enabled: false
               },

               xAxis: {
                   labels: {
                       enabled: false
                   },
                   minorTickLength: 0,
                   tickLength: 0,
                   gridLineWidth: 1,
                   min: 0.5,
                   max: 24,
                   tickInterval: 4,
                   categories: ['00:00h', '01:00h', '02:00h', '03:00h', '04:00h', '05:00h', '06:00h', '07:00h', '08:00h', '09:00h', '10:00h', '11:00h', '12:00h', '13:00h', '14:00h', '15:00h', '16:00h', '17:00h', '18:00h', '19:00h', '20:00h', '21:00h', '22:00h', '23:00h', '24:00h'],
               },

               yAxis: {
                   gridLineWidth: 2,
                   lineWidth: 1,
                   tickWidth: 1,
                   tickAmount: 7,
                   min: 100,
                   max: 200,
                   title: {
                       text: 'Net MWh'
                   }
               },

               legend: {
                   layout: 'vertical',
                   align: 'left',
                   verticalAlign: 'middle'
               },

               plotOptions: {
                   series: {
                       pointStart: 0,
                   },

               },

               series: [
                   {
                       name: 'CT2Gen',
                       data: $scope.columnObj.CT2Gen,
                       color: '#2e75b5',
                       marker: {
                           symbol: 'circle'
                       }
                   }, {
                       name: 'CT3Gen',
                       data: $scope.columnObj.CT3Gen,
                       color: '#9cc2e5',
                       marker: {
                           symbol: 'circle'
                       }
                   }, {
                       name: 'CT4Gen',
                       data: $scope.columnObj.CT4Gen,
                       color: '#a5a5a5',
                       marker: {
                           symbol: 'circle'
                       }
                   }
               ]

           });
       }
       // second chart end

       // third chart start
       function container3() {
           Highcharts.chart('container3', {

               title: {
                   text: ''
               },

               subtitle: {
                   text: ''
               },

               credits: {
                   enabled: false
               },
               exporting: {
                   enabled: false
               },
               xAxis: {
                   lineWidth: 0,
                   minorGridLineWidth: 0,
                   lineColor: 'transparent',
                   labels: {
                       enabled: false
                   },
                   minorTickLength: 0,
                   tickLength: 0,
                   gridLineWidth: 1,
                   min: 0.5,
                   max: 24,
                   tickInterval: 4,
                   categories: ['00:00h', '01:00h', '02:00h', '03:00h', '04:00h', '05:00h', '06:00h', '07:00h', '08:00h', '09:00h', '10:00h', '11:00h', '12:00h', '13:00h', '14:00h', '15:00h', '16:00h', '17:00h', '18:00h', '19:00h', '20:00h', '21:00h', '22:00h', '23:00h', '24:00h'],
               },

               yAxis: {
                   gridLineWidth: 2,
                   lineWidth: 1,
                   tickWidth: 1,
                   tickAmount: 7,
                   min: 6400,
                   max: 8000,
                   title: {
                       text: 'Net HHV BTU/kWh'
                   }
               },

               legend: {
                   layout: 'vertical',
                   align: 'left',
                   verticalAlign: 'middle'
               },

               plotOptions: {
                   series: {
                       pointStart: 0,
                   },

               },

               series: [
                   {
                       name: 'NetHR',
                       data: $scope.columnObj.NetHR,
                       color: '#2e75b5',
                       marker: {
                           symbol: 'circle'
                       }
                   }
               ]
           });
       }

       // third chart end

       // fourth chart start
       function container4() {
           Highcharts.chart('container4', {
               chart: {
                   type: 'area'
               },
               title: {
                   text: ''
               },
               credits: {
                   enabled: false
               },
               subtitle: {
                   text: ''
               },
               exporting: {
                   enabled: false
               },
               xAxis: {
                   min: 0.5,
                   minorGridLineWidth: 1,
                   max: 24,
                   tickInterval: 4,
                   gridLineWidth: 1,
                   categories: ['00:00h', '01:00h', '02:00h', '03:00h', '04:00h', '05:00h', '06:00h', '07:00h', '08:00h', '09:00h', '10:00h', '11:00h', '12:00h', '13:00h', '14:00h', '15:00h', '16:00h', '17:00h', '18:00h', '19:00h', '20:00h', '21:00h', '22:00h', '23:00h', '24:00h'],

               },
               yAxis: {
                   gridLineWidth: 2,
                   lineWidth: 1,
                   tickWidth: 1,
                   tickAmount: 7,
                   min: 0,
                   max: 60,
                   title: {
                       text: 'feet'
                   },
               },
               tooltip: {
                   pointFormat: '{series.name} is <b>{point.y:,.0f} feet </b><br/>at {point.x} Hrs'
               },
               legend: {
                   layout: 'vertical',
                   align: 'left',
                   verticalAlign: 'middle',
                   symbolHeight: 15,
                   symbolWidth: 12,
                   symbolRadius: 0
               },
               plotOptions: {
                   series: {
                       pointStart: 0
                   },
                   area: {
                       pointStart: 0,
                       marker: {
                           enabled: false,
                           symbol: 'square',
                           borderWidth: 4,
                           // borderRadius: 10,
                           states: {
                               hover: {
                                   enabled: true
                               }
                           }
                       }
                   }
               },
               series: [
                   {
                       //showInLegend: false,
                       name: 'Tank Level',
                       //data: [16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 54, 52, 50, 48, 40, 32, 24, 16, 8, 6, 4, 8, 10, 12],
                       data: $scope.columnObj.TankLevel,    //// TankLevel (chart 4)
                       color: '#609af7'
                   }]
           });
       }
       // fourth chart end
   })  //ForecastVisuals

    /*----------- controller for Optimizer goals chart  ----------------  */
   .controller('heatChartController', function ($scope, http) {


       //**************first chart series data**********************//
       function zeros(dimensions) {
           var array = [];

           for (var i = 0; i < dimensions[0]; ++i) {
               array.push(dimensions.length == 1 ? 0 : zeros(dimensions.slice(1)));
           }

           return array;
       }

       $scope.seriesDataArray1 = zeros([24, 2]);
       $scope.seriesDataArray2 = zeros([24, 2]);
       $scope.seriesDataArray3 = zeros([24, 2]);
       $scope.seriesDataArray4 = zeros([24, 2]);


       //fill the above 4 variables calling the service...abhijeet
       http.getOptimizationGoals(false, false).then(function (success) {
           if (success.status == 200) {
               var data = angular.fromJson(success.data);
               $scope.seriesData = angular.fromJson(data.d);
               console.log($scope.seriesData);
               for (index = 0, len = $scope.seriesData.length ; index < len; ++index) {
                   $scope.seriesDataArray1[index][1] = $scope.seriesData[index];
               }
               optChart1();
           }
       })
       http.getOptimizationGoals(false, true).then(function (success) {
           if (success.status == 200) {
               var data = angular.fromJson(success.data);
               $scope.seriesData = angular.fromJson(data.d);
               for (index = 0, len = $scope.seriesData.length ; index < len; ++index) {
                   $scope.seriesDataArray2[index][1] = $scope.seriesData[index];
               }
               optChart2();
           }
       })
       http.getOptimizationGoals(true, false).then(function (success) {
           if (success.status == 200) {
               var data = angular.fromJson(success.data);
               $scope.seriesData = angular.fromJson(data.d);
               for (index = 0, len = $scope.seriesData.length ; index < len; ++index) {
                   $scope.seriesDataArray3[index][1] = $scope.seriesData[index];
               }
               optChart3();
           }
       })
       http.getOptimizationGoals(true, true).then(function (success) {
           if (success.status == 200) {
               var data = angular.fromJson(success.data);
               $scope.seriesData = angular.fromJson(data.d);
               for (index = 0, len = $scope.seriesData.length ; index < len; ++index) {
                   $scope.seriesDataArray4[index][1] = $scope.seriesData[index];
               }
               optChart4();
           }
       })

       //**abhijeet
       // first chart start
       function optChart1() {
           var chart1 = Highcharts.chart('containerHeat1', {

               chart: {
                   type: 'heatmap',
               },


               title: {
                   text: 'Real Time Base Load Hour',
                   style: {
                       "fontSize": "12px"
                   }
               },

               xAxis: {
                   opposite: true,
                   tickInterval: 4,
                   startOnTick: true,
                   endOnTick: true,
                   min: 1,
                   max: 24,
                   // verticalAlign: 'top',
                   //  tickPositions: [0, 4, 8, 12, 16, 20, 24],
                   categories: ['00:00h', '01:00h', '02:00h', '03:00h', '04:00h', '05:00h', '06:00h', '07:00h', '08:00h', '09:00h', '10:00h', '11:00h', '12:00h', '13:00h', '14:00h', '15:00h', '16:00h', '17:00h', '18:00h', '19:00h', '20:00h', '21:00h', '22:00h', '23:00h', '24:00h'],
                   // tickmarkPlacement: 'on'
               },

               yAxis: {
                   lineWidth: 0,
                   lineColor: 'transparent',
                   labels: {
                       enabled: false
                   },
                   title: null,
                   min: 0,
                   max: 1,
                   gridLineWidth: 0,
                   startOnTick: true,
                   endOnTick: false,
                   tickLength: 0

               },

               colorAxis: {
                   minColor: '#ed3925',
                   maxColor: '#27ad1b'
               },
               credits: {
                   enabled: false
               },
               exporting: {
                   enabled: false
               },
               legend: {
                   enabled: false
               },
               tooltip: {
                   formatter: function () {
                       return '<b>' + this.series.xAxis.categories[this.point.x] + '</b> Load is <br><b>' +
                           this.point.value + '</b>';
                   }
               },
               plotOptions: {
                   series: {
                       events: {
                           click: function (event, property) {
                               if (event.point.value == 'N') {
                                   $scope.clickedVal = 1;

                               }
                               else if (event.point.value == 'Y') {
                                   $scope.clickedVal = 0;
                               }
                               $scope.seriesDataArray1[event.point.x][1] = angular.copy($scope.clickedVal);
                               chart1.series[0].update({
                                   data: angular.copy($scope.seriesDataArray1),
                               });
                           }
                       },
                       dataLabels: {
                           enabled: true,
                           formatter: function () {
                               varThis = this;

                               if (this.point.value == 0) {
                                   this.point.value = 'N';
                               }
                               else if (this.point.value == 1) {
                                   this.point.value = 'Y';
                               }
                               return this.point.value;
                           }
                       }
                   }
               },

               series: [{
                   name: 'Sales per employee',
                   borderWidth: 1,
                   borderColor: 'black',
                   // color: 'Black',
                   pointPadding: 0,
                   data: $scope.seriesDataArray1,
                   dataLabels: {
                       enabled: true,
                       //  color: 'black',
                       style: {
                           textShadow: 'none'
                       }
                   }
               }]

           });
       }
       // first chart end

       function optChart2() {
           // second chart start
           var chart2 = Highcharts.chart('containerHeat2', {

               chart: {
                   type: 'heatmap',
               },


               title: {
                   text: 'Real Time Optimization Objective',
                   style: {
                       "fontSize": "12px"
                   }
               },

               xAxis: {
                   opposite: true,
                   tickInterval: 4,
                   min: 0,
                   max: 24,
                   categories: ['00:00h', '01:00h', '02:00h', '03:00h', '04:00h', '05:00h', '06:00h', '07:00h', '08:00h', '09:00h', '10:00h', '11:00h', '12:00h', '13:00h', '14:00h', '15:00h', '16:00h', '17:00h', '18:00h', '19:00h', '20:00h', '21:00h', '22:00h', '23:00h', '24:00h'],
               },

               yAxis: {
                   lineWidth: 0,
                   lineColor: 'transparent',
                   labels: {
                       enabled: false
                   },
                   title: null,
                   min: 0,
                   max: 1,
                   gridLineWidth: 0,
                   startOnTick: true,
                   endOnTick: false,
                   tickLength: 0

               },

               colorAxis: {
                   min: 1,
                   minColor: '#FFFFFF',
                   maxColor: '#6be51b'//Highcharts.getOptions().colors[0]
               },
               credits: {
                   enabled: false
               },
               exporting: {
                   enabled: false
               },
               legend: {
                   enabled: false
               },
               tooltip: {
                   formatter: function () {
                       return '<b>' + this.series.xAxis.categories[this.point.x] + '</b> Load is <br><b>' +
                           this.point.value + '</b>';
                   }
               },
               plotOptions: {
                   series: {
                       events: {
                           click: function (event, property) {
                               if (event.point.value == 'L') {
                                   $scope.clickedVal = 2;
                               }
                               else if (event.point.value == 'M') {
                                   $scope.clickedVal = 3;
                               }
                               else if (event.point.value == 'H') {
                                   $scope.clickedVal = 0;
                               }
                               $scope.seriesDataArray2[event.point.x][1] = angular.copy($scope.clickedVal);
                               chart2.series[0].update({
                                   data: angular.copy($scope.seriesDataArray2),
                               });
                           }
                       },
                       dataLabels: {
                           enabled: true,
                           formatter: function () {
                               varThis = this;

                               if (this.point.value == 0) {
                                   this.point.value = '';
                               }
                               else if (this.point.value == 1) {
                                   this.point.value = 'L';
                               }
                               else if (this.point.value == 2) {
                                   this.point.value = 'M';
                               }
                               else if (this.point.value == 3) {
                                   this.point.value = 'H';
                               }
                               return this.point.value;
                           }
                       }
                   }
               },


               series: [{
                   // name: 'Sales per employee',
                   borderWidth: 1,
                   borderColor: 'black',
                   pointPadding: 0,
                   data: $scope.seriesDataArray2,
                   dataLabels: {
                       enabled: true,
                       color: 'black',
                       style: {
                           textShadow: 'none'
                       }
                   }
               }]

           });
       }
       // second chart end

       function optChart3() {
           // third chart start
           var chart3 = Highcharts.chart('containerHeat3', {

               chart: {
                   type: 'heatmap',
               },

               title: {
                   text: 'Day Ahead Base Load Hour',
                   style: {
                       "fontSize": "12px"
                   }
               },

               xAxis: {
                   opposite: true,
                   tickInterval: 4,
                   min: 0,
                   max: 24,
                   // verticalAlign: 'top',
                   //  tickPositions: [0, 4, 8, 12, 16, 20, 24],
                   categories: ['00:00h', '01:00h', '02:00h', '03:00h', '04:00h', '05:00h', '06:00h', '07:00h', '08:00h', '09:00h', '10:00h', '11:00h', '12:00h', '13:00h', '14:00h', '15:00h', '16:00h', '17:00h', '18:00h', '19:00h', '20:00h', '21:00h', '22:00h', '23:00h', '24:00h'],
                   // tickmarkPlacement: 'on'
               },

               yAxis: {
                   lineWidth: 0,
                   lineColor: 'transparent',
                   labels: {
                       enabled: false
                   },
                   title: null,
                   min: 0,
                   max: 1,
                   gridLineWidth: 0,
                   startOnTick: true,
                   endOnTick: false,
                   tickLength: 0

               },

               colorAxis: {
                   minColor: '#ed3925',
                   maxColor: '#27ad1b'
               },
               //colorAxis: {
               //    min: 0,
               //    minColor: '#FFFFFF',
               //    maxColor: Highcharts.getOptions().colors[255]
               //},
               credits: {
                   enabled: false
               },
               exporting: {
                   enabled: false
               },
               legend: {
                   enabled: false
               },
               tooltip: {
                   formatter: function () {
                       return '<b>' + this.series.xAxis.categories[this.point.x] + '</b> Load is <br><b>' +
                           this.point.value + '</b>';
                   }
               },
               plotOptions: {
                   series: {
                       events: {
                           click: function (event, property) {
                               if (event.point.value == 'N') {
                                   $scope.clickedVal = 1;
                               }
                               else if (event.point.value == 'Y') {
                                   $scope.clickedVal = 0;
                               }
                               $scope.seriesDataArray3[event.point.x][1] = angular.copy($scope.clickedVal);
                               chart3.series[0].update({
                                   data: angular.copy($scope.seriesDataArray3),
                               });
                           }
                       },
                       dataLabels: {
                           enabled: true,
                           formatter: function () {
                               varThis = this;

                               if (this.point.value == 0) {
                                   this.point.value = 'N';
                               }
                               else if (this.point.value == 1) {
                                   this.point.value = 'Y';
                               }
                               return this.point.value;
                           }
                       }
                   }
               },

               series: [{
                   name: 'Sales per employee',
                   borderWidth: 1,
                   borderColor: 'black',
                   // color: 'Black',
                   pointPadding: 0,
                   data: $scope.seriesDataArray3,
                   dataLabels: {
                       enabled: true,
                       //color: 'black',
                       style: {
                           textShadow: 'none'
                       }
                   }
               }]

           });
       }
       // third chart end


       function optChart4() {
           // fourth chart start
           var chart4 = Highcharts.chart('containerHeat4', {

               chart: {
                   type: 'heatmap',
               },


               title: {
                   text: 'Day Ahead Optimization Objective',
                   style: {
                       "fontSize": "12px"
                   }

               },

               xAxis: {
                   opposite: true,
                   tickInterval: 4,
                   min: 0,
                   max: 24,
                   categories: ['00:00h', '01:00h', '02:00h', '03:00h', '04:00h', '05:00h', '06:00h', '07:00h', '08:00h', '09:00h', '10:00h', '11:00h', '12:00h', '13:00h', '14:00h', '15:00h', '16:00h', '17:00h', '18:00h', '19:00h', '20:00h', '21:00h', '22:00h', '23:00h', '24:00h'],
               },

               yAxis: {
                   lineWidth: 0,
                   lineColor: 'transparent',
                   labels: {
                       enabled: false
                   },
                   title: null,
                   min: 0,
                   max: 1,
                   gridLineWidth: 0,
                   startOnTick: true,
                   endOnTick: false,
                   tickLength: 0

               },

               colorAxis: {
                   min: 1,
                   minColor: '#FFFFFF',
                   maxColor: '#6be51b'//Highcharts.getOptions().colors[0]
               },
               credits: {
                   enabled: false
               },
               exporting: {
                   enabled: false
               },
               legend: {
                   enabled: false
               },
               tooltip: {
                   formatter: function () {
                       return '<b>' + this.series.xAxis.categories[this.point.x] + '</b> Load is <br><b>' +
                           this.point.value + '</b>';
                   }
               },
               plotOptions: {
                   series: {
                       events: {
                           click: function (event, property) {
                               if (event.point.value == 'L') {
                                   $scope.clickedVal = 2;
                               }
                               else if (event.point.value == 'M') {
                                   $scope.clickedVal = 3;
                               }
                               else if (event.point.value == 'H') {
                                   $scope.clickedVal = 0;
                               }
                               $scope.seriesDataArray4[event.point.x][1] = angular.copy($scope.clickedVal);
                               chart4.series[0].update({
                                   data: angular.copy($scope.seriesDataArray4),
                               });
                           }
                       },
                       dataLabels: {
                           enabled: true,
                           formatter: function () {
                               varThis = this;

                               if (this.point.value == 0) {
                                   this.point.value = '';
                               }
                               else if (this.point.value == 1) {
                                   this.point.value = 'L';
                               }
                               else if (this.point.value == 2) {
                                   this.point.value = 'M';
                               }
                               else if (this.point.value == 3) {
                                   this.point.value = 'H';
                               }
                               return this.point.value;
                           }
                       }
                   }
               },


               series: [{
                   name: 'Sales per employee',
                   borderWidth: 1,
                   borderColor: 'black',
                   pointPadding: 0,
                   data: $scope.seriesDataArray4,
                   dataLabels: {
                       enabled: true,
                       color: 'black',
                       style: {
                           textShadow: 'none'
                       }
                   }
               }]

           });
       }
       $scope.CancelOptimizer = function () {
           alertify.confirm("Do you want to reset the form?").set('onok', function () {
               callServiceStatus();
           });
       }
   })

    /*----------- controller for getting data for status Page  ----------------  */
   .controller('operatorController', function ($scope, statusFactory, http) {
       getData();// for first load
       setInterval(function () {
           getData();
       }, 10000);

       function getData() {
           statusFactory.UpdateDashBoard().then(function () {
               $scope.status = statusFactory;
           }, function (error) {
           })
       }
       $scope.getValue = function (value, type) {
           switch (value) {
               case 0:
                   return type === 'color' ? 'idle' : 'Idle';
                   break;
               case 1:
                   return type === 'color' ? 'chargeMode' : 'Charge';
                   break;
               case 2:
                   return type === 'color' ? 'partdischarge' : 'Part Discharge';
                   break;
               case 3:
                   return type === 'color' ? 'fulldischarge' : 'Full Discharge';
                   break;
               case 4:
                   return type === 'color' ? 'chillers ' : 'Chillers ';
                   break;
               default:

           }
       }
       /*-------Calling service for getting status page chart series--------------*/
       var equipName = 'Sec Pumps';
       http.getStatusSeries(equipName).then(function (success) {
           if (success.status == 200) {
               var res = (success.data.d);
               console.log('status chart res ', res);
           }
       })
   }
   )

    /*----------- controller for getting data for Equipment status page and forecast  ----------------  */
    .controller('equipmentStatusController', function ($scope, http) {
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
    })

    /*---------- controller for Equipment status ------------------*/
    .controller('statusController', function ($scope, http, $filter) {
        var statuslist = [];
        var varList = [];
        $scope.value = 0; $scope.chillers = [];
        $scope.secChillerValue = 0
        $scope.secChiller = [];
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
                                    if (i.Group === '4' && i.DayAhead === 'DA') {
                                        $scope.value = $scope.value + 1
                                        $scope.chillers.push($scope.value);
                                    }

                                    if (i.Group === '5' && i.DayAhead === 'DA') {
                                        $scope.secChillerValue = $scope.secChillerValue + 1
                                        $scope.secChiller.push($scope.secChillerValue);
                                    }
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





        $scope.changeRunOrder = function (index, length) {
            if ($scope.chillers[index] < length)
                $scope.chillers[index] = $scope.chillers[index] + 1
            else
                $scope.chillers[index] = 1;
        }

        $scope.secondaryRunOrder = function (index, length) {
            if ($scope.secChiller[index] < length) {
                if ($scope.secChiller[index] <= length) {
                    $scope.secChiller[index] = $scope.secChiller[index] + 1
                }
                else {
                    $scope.secChiller[index] = $scope.secChiller[index] + 2
                }
                

            }

            else {
                $scope.secChiller[index] = 1;
            }
        }


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
                                angular.forEach($scope.statuses, function (j, index) {
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

        //function for login toggle
        $scope.updateEquipStatus = function () {
            if (sessionStorage.userName === null || sessionStorage.userName === undefined) {
                $('#myModal').modal('toggle');
            }
            else {
                $scope.UpdateEquipmentStatus();
            }
        }


        // Updating Equipment Status values 
        $scope.UpdateEquipmentStatus = function () {
            http.updateEquimentStatus($scope.groupName).then(function (success) {
                if (success.status == 200) {
                    var res = (success.data.d);
                    console.log('status res ', res);
                }
            })

        }


        // Canceling EquipmentSetting values 
        $scope.CancelEquipmentStatus = function () {
            alertify.confirm("Do you want to reset the form?").set('onok', function () {
                callServiceStatus();
            });
        }

    })

    /*-------------- controller for Equipment setting ------------------*/
    .controller('settingController', function ($scope, http) {
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

        //function for login toggle
        $scope.UpdateInfo = function () {
            if (sessionStorage.userName === null || sessionStorage.userName === undefined) {
                $('#myModal').modal('toggle');
            }
            else {
                $scope.UpdateEquipment();
            }
        }
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
            http.updateEquipSetting($scope.groupName).then(function (success) {
                if (success.status == 200) {
                    var res = (success.data.d);
                }
            })

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

    })

    /*------------ Adding controller for the ideal time out ----------- */
   .controller('IdealCtrl', function ($scope, Idle, Keepalive, $uibModal, $timeout) {

       $scope.started = false;

       function closeModals() {
           if ($scope.warning) {
               $scope.warning.close();
               $scope.warning = null;
           }

           if ($scope.timedout) {
               $scope.timedout.close();
               $scope.timedout = null;
           }
       }

       $scope.$on('IdleStart', function () {
           // alert('IdleStart');
           closeModals();

           $timeout(function () {
               $scope.warning = $uibModal.open({
                   template: 'Please do something timeout in 10 sec',
                   windowClass: 'modal-danger'
               });
           }, 10000)

       });

       $scope.$on('IdleEnd', function () {
           closeModals();
           //  alert('IdleEnd');
       });

       $scope.$on('IdleTimeout', function () {
           // alert('IdleTimeout');
           closeModals();
           $scope.timedout = $uibModal.open({
               template: 'Session loged out!',
               windowClass: 'modal-danger'
           });
           sessionStorage.userName = null;
           sessionStorage.clear();
       });

       $scope.start = function () {
           function start() {
               closeModals();
               console.log('fun call start()');
               Idle.watch();
               $scope.started = true;
           };

           $scope.stop = function () {
               closeModals();
               Idle.unwatch();
               $scope.started = false;

           }
       }
   })
    .controller('loginCtrl', function ($scope, Idle, http) {
        $scope.AuthenticateUser = function () {
            http.userLogin($scope.userName, $scope.password).then(function (success) {
                if (success.status == 200) {
                    var res = (success.data.d);
                    console.log('result ', res);
                    //defer.resolve(true);
                    if (res > 0) {
                        sessionStorage.setItem('userName', $scope.userName);
                        $scope.$on('IdleStart', function () { });
                        Idle.watch();
                        $('#myModal').modal('toggle');
                    }
                    else {
                        $scope.errormsg = 'Invalid user name or password';
                    }
                }
            })
        }



    });


})();