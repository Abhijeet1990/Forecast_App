<%@ Page Title="" Language="C#" MasterPageFile="~/OperatorMaster.Master" AutoEventWireup="true" CodeBehind="EquipmentStatus.aspx.cs" Inherits="RTP.TESWebServer.EquipmentStatus" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

    <script src="js/custom/availability.js"></script>
    <script src="js/html5shiv.js"></script>
    <style>
        .highcharts-plot-background {
            border: 1px solid black !important;
        }

        .boxClass {
            width: 4.41%;
            border: 1px solid black;
            margin: 0;
            font-size: 10px;
        }

        .smallText {
            font-size: 0.8em;
        }

        .boxClassBelow {
            width: 0.41%;
            border: 1px solid black;
            margin: 0;
            text-align: center;
            font-size: 10px;
        }

        .scale-margin-left {
            margin-left: 4%;
            margin-bottom: 10px;
        }

        .selectedBoxUpper {
            border: 1px solid red;
        }

        .selectedBoxLower {
            border: 1px solid red;
            background: yellow;
        }

        .textColor {
            color: blanchedalmond;
            background-color: blanchedalmond;
        }

        .tblContentX {
            margin-left: 10px;
        }

        #divHeight {
            height: 230px;
        }

        body {
            margin-top: 50px;
        }

        .smtxtBox {
            width: 30px;
            height: 50px;
        }

        /*hide the scrollbar*/
        html {
            overflow: scroll;
            overflow-x: hidden;
        }

        ::-webkit-scrollbar {
            width: 0px;
            background: transparent;
        }

        ::-webkit-scrollbar-thumb {
            background: #FF0000;
        }

        @media only screen and (max-width: 768px) {
            body {
                margin-top: 165px;
            }
        }

        @media only screen and (max-width: 980px) {
            body {
                margin-top: 85px;
            }
        }

        @media only screen and (max-width: 360px) {
            body {
                margin-top: 105px;
            }
        }

        .red {
            background-color: red;
        }

        .green {
            background-color: green;
        }

        .modal-dialog {
            width: 331px;
        }

        .modal-content {
            height: 270px;
            width: 320px;
        }

        .input-group-addon {
            color: #fff;
            background: #3276B1;
        }

        .alertify .ajs-commands button {
            padding: 0px !important;
        }
    </style>
    <script>
        $(document).ready(function () {
            $("#navText").text("Thermal Energy Storage Real time & Day Ahead Equipment Status");
        })

        function Reverse(str2) {
            var aa1 = document.getElementById(str2);
            if (aa1.value == "No") {
                document.getElementById(str2).style.backgroundColor = "green";
                document.getElementById(str2).value = "Yes";
            } else {
                document.getElementById(str2).style.backgroundColor = "red";
                document.getElementById(str2).value = "No";
            }
        }
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container" ng-controller="statusController">
        <div class="row">
            <!-- Combustion Turbine-->
            <div class="col-lg-4 col-md-6 dvBlock col-sm-6" id="divHeight">
                <h2>Combustion Turbines</h2>

                <div class="row" style="margin-left: 0px;">
                    <h6 class="text-center">Availability</h6>
                    <table class="tblStatus">
                        <tr>
                            <td class="tbltd">
                                <p class="tblContentX">Alias</p>
                                <span class="smallText">&nbsp</span>
                                <div class="divAlias" ng-repeat="group in groupName|filter:{group:'1',dayAhead:'DA'}">
                                    <span>{{group.aliasName}}</span>
                                </div>
                            </td>
                            <td>
                                <p>Real Time</p>
                                <span class="smallText">Today</span>
                                <table class="table-responsive">
                                    <tbody>
                                        <tr ng-repeat="group in groupName|filter:{group:'1',dayAhead:'RT'}">
                                            <td>
                                                <input type="button" onclick="Reverse(this.id);" ng-style="changeColor(this.value)" class="form-control input-YesNo" ng-class="group.color" id="Text1+{{$index}}" value="{{group.value}}" /></td>

                                        </tr>
                                    </tbody>
                                </table>
                            </td>

                            <td>
                                <p>Day Ahead</p>
                                <span class="smallText">Tomorrow</span>
                                <table class="table-responsive">
                                    <tbody>
                                        <tr ng-repeat="group in groupName|filter:{group:'1',dayAhead:'DA'}">
                                            <td>
                                                <input type="button" onclick="Reverse(this.id);" ng-style="changeColor(this.value);" class="form-control input-YesNo" id="Text2+{{$index}}" value="{{group.value}}" ng-class="group.color" /></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>

            <!-- Chiller Packages-->
            <div class="col-lg-4 col-md-6 dvBlock col-sm-6" id="divHeight">
                <h2>Chiller Packages</h2>
                <div class="row" style="margin-left: 0px;">
                    <h6 class="text-center">Availability</h6>
                    <table class="tblStatus">
                        <tr>
                            <td class="tbltd">
                                <p class="tblContentX">Alias</p>
                                <span class="smallText">&nbsp</span>
                                <div class="divAlias" ng-repeat="group in groupName|filter:{group:'4',dayAhead:'DA'}">
                                    <span>{{group.aliasName}}</span>
                                </div>
                            </td>
                            <td>
                                <p>Real Time</p>
                                <span class="smallText">Today</span>
                                <table class="table-responsive">
                                    <tbody>
                                        <tr ng-repeat="group in groupName|filter:{group:'4',dayAhead:'RT'}">
                                            <td>
                                                <input type="button" onclick="Reverse(this.id);" class="form-control input-YesNo" id="Text3+{{$index}}" value="{{group.value}}" ng-class="group.color" /></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>

                            <td>
                                <p>Day Ahead</p>
                                <span class="smallText">Tomorrow</span>
                                <table class="table-responsive">
                                    <tbody>
                                        <tr ng-repeat="group in groupName|filter:{group:'4',dayAhead:'DA'}">
                                            <td>
                                                <input type="button" onclick="Reverse(this.id);" ng-style="changeColor(this.value);" class="form-control input-YesNo" id="Text4+{{$index}}" value="{{group.value}}" ng-class="group.color" /></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>

                            <td>
                                <p>Run Order</p>
                                <span class="smallText">.</span>
                                <table class="table-responsive" >
                                    <tbody>
                                        <tr ng-repeat="group in chillers track by $index">
                                            <td >
                                                 <button class="form-control input-YesNo" ng-click="changeRunOrder($index,chillers.length)"   style="background-color: #72b1d8">{{group}}</button>
                                      
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>

                        </tr>
                    </table>


                </div>
            </div>


            <!-- Secondary Chilled Water Pumps-->
            <div class="col-lg-4 col-md-6 col-sm-6 dvBlock" id="divHeight">
                <h2>Secondary Chilled Water Pumps</h2>
                <div class="row" style="margin-left: 0px;">
                    <h6 class="text-center">Availability</h6>
                    <table class="tblStatus">
                        <tr>
                            <td class="tbltd">
                                <p class="tblContentX">Alias</p>
                                <span class="smallText">&nbsp</span>
                                <div class="divAlias" ng-repeat="group in groupName|filter:{group:'5',dayAhead:'DA'}">
                                    <span>{{group.aliasName}}</span>
                                </div>
                            </td>

                            <td>
                                <p>Real Time</p>
                                <span class="smallText">Today</span>
                                <table class="table-responsive">
                                    <tbody>
                                        <tr ng-repeat="group in groupName|filter:{group:'5',dayAhead:'RT'}">
                                            <td>
                                                <input type="button" onclick="Reverse(this.id);" id="Text6+{{$index}}" value="{{group.value}}" class="form-control input-YesNo" ng-class="group.color" /></td>

                                        </tr>
                                    </tbody>
                                </table>
                            </td>

                            <td>
                                <p>Day Ahead</p>
                                <span class="smallText">Tomorrow</span>
                                <table class="table-responsive">
                                    <tbody>
                                        <tr ng-repeat="group in groupName|filter:{group:'5',dayAhead:'DA'}">
                                            <td>
                                                <input type="button" onclick="Reverse(this.id);" id="Text7+{{$index}}" value="{{group.value}}" class="form-control input-YesNo" ng-class="group.color" /></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>

                            <td>
                                <p>Run Order</p>
                                <span class="smallText">.</span>
                                <table class="table-responsive">
                                    <tbody>
                                       <%-- <tr ng-repeat="group in groupName|filter:{group:'5',dayAhead:'DA'}">
                                            <td>
                                                <input type="button" class="form-control input-YesNo" id="Text8+{{$index}}" value="{{0}}" style="background-color: #72b1d8"></td>
                                        </tr>--%>

                                         <tr ng-repeat="group in secChiller track by $index">
                                            <td>
                                                <input type="button" class="form-control input-YesNo" id="Text8+{{$index}}" value="{{group}}" ng-click="secondaryRunOrder($index,chillers.length)" style="background-color: #72b1d8"></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>

                        </tr>
                    </table>


                </div>

            </div>
            <!-- HRSG Duct Burners-->
            <div class="col-lg-4 col-md-6 dvBlock" id="divHeight">
                <h2>HRSG Duct Burners</h2>
                <div class="row">

                    <div class="col-lg-12">
                        <h6 class="text-center">Availability</h6>
                        <table class="tblStatus">
                            <tr>
                                <td class="tbltd">
                                    <%--          <p>Alias</p>
                                    <table class="table-responsive" style="margin-top: 25px;">
                                        <tr ng-repeat="group in groupName|filter:{group:'2',dayAhead:'DA'}">
                                            <td>{{group.aliasName}}</td>
                                        </tr>
                                    </table>--%>
                                    <p class="tblContentX">Alias</p>
                                    <span class="smallText">&nbsp</span>
                                    <div class="divAlias" ng-repeat="group in groupName|filter:{group:'2',dayAhead:'DA'}">
                                        <span>{{group.aliasName}}</span>
                                    </div>
                                </td>
                                <td>
                                    <p>Real Time</p>
                                    <span class="smallText">Today</span>
                                    <table class="table-responsive">
                                        <tbody>
                                            <tr ng-repeat="group in groupName|filter:{group:'2',dayAhead:'RT'}">
                                                <td>
                                                    <input type="button" onclick="Reverse(this.id);" id="Text9+{{$index}}" value="{{group.value}}" class="form-control input-YesNo" ng-class="group.color" /></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>

                                <td>
                                    <p>Day Ahead</p>
                                    <span class="smallText">Tomorrow</span>
                                    <table class="table-responsive">
                                        <tbody>
                                            <tr ng-repeat="group in groupName|filter:{group:'2',dayAhead:'DA'}">
                                                <td>
                                                    <input type="button" onclick="Reverse(this.id);" id="Text10+{{$index}}" class="form-control input-YesNo" value="{{group.value}}" ng-class="group.color" /></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </table>

                    </div>
                </div>
            </div>

            <!-- Steam Turbines-->
            <div class="col-lg-4 col-md-6 dvBlock" id="divHeight">
                <h2>Steam Turbines</h2>
                <div class="row">

                    <div class="col-lg-12">
                        <h6 class="text-center">Availability</h6>
                        <table class="tblStatus">
                            <tr>
                                <td class="tbltd">
                                    <p class="tblContentX">Alias</p>
                                    <span class="smallText">&nbsp</span>
                                    <div class="divAlias" ng-repeat="group in groupName|filter:{group:'3',dayAhead:'DA'}">
                                        <span>{{group.aliasName}}</span>
                                    </div>
                                </td>
                                <td>
                                    <p>Real Time</p>
                                    <span class="smallText">Today</span>
                                    <table class="table-responsive">
                                        <tbody>
                                            <tr ng-repeat="group in groupName|filter:{group:'3',dayAhead:'RT'}">
                                                <td>
                                                    <input type="button" onclick="Reverse(this.id);" id="Text11+{{$index}}" value="{{group.value}}" class="form-control input-YesNo" ng-class="group.color" /></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>

                                <td>
                                    <p>Day Ahead</p>
                                    <span class="smallText">Tomorrow</span>
                                    <table class="table-responsive">
                                        <tbody>
                                            <tr ng-repeat="group in groupName|filter:{group:'3',dayAhead:'DA'}">
                                                <td>
                                                    <input type="button" onclick="Reverse(this.id);" id="Text12+{{$index}}" value="{{group.value}}" class="form-control input-YesNo" ng-class="group.color" /></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </table>

                    </div>
                </div>
            </div>

            <!-- TES Tank-->
            <div class="col-lg-4 dvBlock col-md-6" id="divHeight">
                <h2>TES Tank</h2>
                <div class="row">
                    <div class="col-lg-12">
                        <h6 class="text-center">Availability</h6>

                        <table class="tblStatus">
                            <tr>
                                <td class="tbltd">
                                    <h6 class="tblContentX">Alias</h6>
                                    <span class="smallText">&nbsp</span>
                                    <div class="divAlias" ng-repeat="group in groupName|filter:{group:'6',dayAhead:'DA'}">
                                        <span>{{group.aliasName}}</span>
                                    </div>

                                </td>
                                <td>
                                    <p>Real Time</p>
                                    <span class="smallText">Today</span>
                                    <table class="table-responsive">
                                        <tbody>
                                            <tr ng-repeat="group in groupName|filter:{group:'6',dayAhead:'RT'}">
                                                <td>
                                                    <input type="button" onclick="Reverse(this.id);" id="Text13+{{$index}}" value="{{group.value}}" class="form-control input-YesNo" ng-class="group.color" /></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>

                                <td>
                                    <p>Day Ahead</p>
                                    <span class="smallText">Tomorrow</span>
                                    <table class="table-responsive tbl">
                                        <tbody>
                                            <tr ng-repeat="group in groupName|filter:{group:'6',dayAhead:'DA'}">
                                                <td>
                                                    <input type="button" onclick="Reverse(this.id);" id="Text14+{{$index}}" value="{{group.value}}" class="form-control input-YesNo" ng-class="group.color" /></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-lg-3 col-lg-offset-9" style="margin-top: 20px;">
            <div class="col-lg-5">
                <input type="submit" class="btn btn-default" data-toggle="modal" value="Update" data-target="#myModal1" ng-click="updateEquipStatus()" />
            </div>

            <div class="col-lg-5">
                <input type="button" class="btn btn-default" value="Cancel" ng-click="CancelEquipmentStatus()" />
            </div>
        </div>
    </div>
</asp:Content>
