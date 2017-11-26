<%@ Page Title="" Language="C#" MasterPageFile="~/OperatorMaster.Master" AutoEventWireup="true" CodeBehind="EquipmentSetting.aspx.cs" Inherits="RTP.TESWebServer.EquipmentSetting" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/alertify.bootstrap_1.1.css" rel="stylesheet" />
    <link href="css/homeStyle.css" rel="stylesheet" />

    <style>
        .sbText {
            font-size: 11px;
        }

        .tblContent {
            margin-top: -17px;
        }

        .tblContentX {
            margin-left: 10px;
        }

        #mhdv {
            height: 210px;
        }

        .td {
            border: 1px solid black;
            text-align: center;
        }

        .bold {
            border: 2px solid black;
        }

        .rb {
            margin-top: 5px;
        }


        #ul {
            list-style-type: none;
            margin: 0;
            padding: 0;
            background-color: #f1f1f1;
        }

        .li {
            display: block;
            color: #000;
            padding: 1px 6px;
            text-decoration: none;
            float: left;
            border: 1px solid black;
        }

        .heatChartClass {
            min-width: 300px;
            max-width: 800px;
            height: 140px;
            margin: auto;
        }

        body {
            margin-top: 50px;
        }

        .engUnit {
            font-size: 11px;
        }

        @media only screen and (max-width: 768px) {
            body {
                margin-top: 265px;
            }
        }

        @media only screen and (max-width: 980px) {
            body {
                margin-top: 85px;
            }
        }

        @media only screen and (max-width: 360px) {
            body {
                margin-top: 125px;
            }
        }

        body {
            padding: 50px;
        }

        .modal-dialog {
            width: 300px;
        }

        .modal-footer {
            height: 70px;
            margin: 0;
        }

            .modal-footer .btn {
                font-weight: bold;
            }

            .modal-footer .progress {
                display: none;
                height: 32px;
                margin: 0;
            }

        .input-group-addon {
            color: #fff;
            background: #3276B1;
        }

        .alertify .ajs-commands button {
            padding: 0px !important;
        }

        .modal-content {
            height: 270px;
        }
    </style>

    <script>
        $(document).ready(function () {
            $("#navText").text("Thermal Energy Storage Equipment Setting");
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
    <div class="container" ng-controller="settingController">
        <div class="row">
            <!-- Combustion Turbine-->
            <div id="mhdv" class="col-lg-4 col-md-6 dvBlock">
                <h2>Combustion Turbines</h2>
                <table class="tblStatus">
                    <tr>
                        <td class="tbltd">
                            <h6>Alias</h6>
                            <span class="smallText">&nbsp</span>
                            <div class="divAlias" ng-repeat="group in groupName|filter:{group:'1',max:'false'}">
                                <span>{{group.aliasName}}</span>
                            </div>
                        </td>
                        <td>
                            <h6>Inlet Air Temps</h6>
                            <span class="smallText">Minimum</span>
                            <table>
                                <tbody>
                                    <tr ng-repeat="group in groupName|filter:{group:'1',max:'false'}">
                                        <td>
                                            <input id="Text1"+{{$index}} type="text" class="input-smm" ng-model="group.value" onkeypress='return event.charCode >= 48 && event.charCode <= 57||event.charCode==46' required/></td>
                                        <td><span class="engUnit">°F</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>

                        <td>
                            <h6>Coil Flow Rates</h6>
                            <span class="smallText">Maximum</span>
                            <table>
                                <tbody>
                                    <tr ng-repeat="group in groupName|filter:{group:'1',max:'true'}">
                                        <td>
                                            <input id="Text2"+{{$index}} type="text" class="input-smm" ng-model="group.value" onkeypress='return event.charCode >= 48 && event.charCode <= 57||event.charCode==46' required/></td>
                                        <td><span class="engUnit">gpm</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </table>


            </div>

            <!--Chiller Packages-->
            <div id="mhdv" class="col-lg-4 col-md-6 dvBlock">
                <h2>Chiller Packages</h2>
                <table class="tblStatus">
                    <tr>
                        <td class="tbltd">
                            <h6>Alias</h6>
                            <span class="smallText">&nbsp</span>
                            <div class="divAlias" ng-repeat="group in groupName|filter:{group:'2',max:'true',start:'false'}">
                                <span>{{group.aliasName}}</span>
                            </div>


                        </td>
                        <td>
                            <h6>Temp</h6>
                            <span class="smallText">Minimum</span>
                            <table>
                                <tbody>
                                    <tr ng-repeat="group in groupName|filter:{group:'2',max:'false',start:'false'}">
                                        <td>
                                            <input id="Text3+{{$index}}" type="text" class="input-smm" ng-model="group.value" onkeypress='return event.charCode >= 48 && event.charCode <= 57||event.charCode==46' required/></td>
                                        <td><span class="engUnit">°F</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>

                        <td>
                            <h6>Flow Rates</h6>
                            <span class="smallText">Maximum</span>
                            <table>
                                <tbody>
                                    <tr ng-repeat="group in groupName|filter:{group:'2',max:'true',start:'false'}">
                                        <td>
                                            <input id="Text4+{{$index}}" type="text" class="input-smm" ng-model="group.value" onkeypress='return event.charCode >= 48 && event.charCode <= 57||event.charCode==46' required/></td>
                                        <td><span class="engUnit">gpm</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>

                        <td>
                            <h6>Stop/Start</h6>
                            <span class="smallText">Max</span>
                            <table>
                                <tbody>
                                    <tr ng-repeat="group in groupName|filter:{group:'2',max:'true',start:'true'}">
                                        <td>
                                            <input id="Text5+{{$index}}" type="text" class="input-smm" ng-model="group.value" onkeypress='return event.charCode >= 48 && event.charCode <= 57||event.charCode==46' required/></td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>


            <!-- Secondary Chilled Water Pumps-->
            <div id="mhdv" class="form-group col-lg-4 col-md-6 dvBlock">
                <h2>Secondary Chilled Water Pumps</h2>

                <table class="tblStatus">
                    <tr>
                        <td class="tbltd">
                             <h6>Alias</h6>
                            <span class="smallText">&nbsp</span>
                            <div class="divAlias" ng-repeat="group in groupName|filter:{group:'3',max:'true',start:'false'}">
                                <span>{{group.aliasName}}</span>
                            </div>
                        </td>
                        <td>
                            <h6>Discharge Flow Rates</h6>
                            <span class="smallText">Minimum</span>
                            <table>
                                <tbody>
                                    <tr ng-repeat="group in groupName|filter:{group:'3',max:'true',start:'false'}">
                                        <td>
                                            <input id="Text6+{{$index}}" type="text" class="input-smm" ng-model="group.value" onkeypress='return event.charCode >= 48 && event.charCode <= 57||event.charCode==46' required></td>
                                        <td><span class="engUnit">gpm</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>

                        <td>
                            <h6>Stop/Start</h6>
                            <span class="smallText">Max</span>
                            <table>
                                <tbody>
                                    <tr ng-repeat="group in groupName|filter:{group:'3',start:'true'}">
                                        <td>
                                            <input id="Text7+{{$index}}" type="text" class="input-smm" ng-model="group.value" onkeypress='return event.charCode >= 48 && event.charCode <= 57||event.charCode==46' required/></td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </table>

            </div>




            <!-- HRSG Duct Burners & Steam Turbines-->
            <div id="mhdv" class="form-group col-lg-4 col-md-6 dvBlock">
                <h2>HRSG Duct Burners</h2>
                <table class="tblStatus">
                    <tr>
                        <td class="tbltd">
                             <h6>Alias</h6>
                            <span class="smallText">&nbsp</span>
                            <div class="divAlias" ng-repeat="group in groupName|filter:{group:'5',max:'true'}">
                                <span>{{group.aliasName}}</span>
                            </div>
                           <%-- <h6>Alias</h6>
                            <table style="margin-top: 25px;">
                                <tr ng-repeat="group in groupName|filter:{group:'5',max:'true'}">
                                    <td class="txtMain">{{group.aliasName}}</td>
                                </tr>
                            </table>--%>
                        </td>
                        <td>
                            <h6>DB Fuel Gas Flow Rates</h6>
                            <span class="smallText">Maximum</span>
                            <table>
                                <tbody>
                                    <tr ng-repeat="group in groupName|filter:{group:'5',max:'true'}">

                                        <td>
                                            <input id="Text9" type="text" class="input-smm" ng-model="group.value" onkeypress='return event.charCode >= 48 && event.charCode <= 57||event.charCode==46' required /></td>
                                        <td><span class="engUnit">scfm</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>

            <div id="mhdv" class="form-group col-lg-4 col-md-6 dvBlock">
                <h2>TES Tank</h2>
                <div>
                    <table class="tblStatus">
                        <tr>
                            <td>
                                <h6>Minimum Thermocline Level</h6>
                                <span class="smallText">Maximum</span>
                                <table>
                                    <tbody>
                                        <tr ng-repeat="group in groupName|filter:{group:'4',max:'false'}">
                                            <td>
                                                <input id="Text9" type="text" class="input-smm" ng-model="group.value" onkeypress='return event.charCode >= 48 && event.charCode <= 57||event.charCode==46' required/></td>
                                            <td><span class="engUnit">ft</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </table>

                </div>
            </div>

            <div class="col-lg-3 col-md-6">
                <div class="col-lg-offset-3" style="margin-top:90px;">
                    <div class="col-lg-5">
                        <input type="submit"class="btn btn-default" data-toggle="modal" value="Update" data-target="#myModal1" ng-click="UpdateInfo()"/> 
                      <%--  <input type="submit"class="btn btn-default" data-toggle="modal" value="TXT" data-target="#myModal1" ng-click="UpdateEquipment()" />--%>
                    </div>
                    
                     <div class="col-lg-5">
                        <input type="button" class="btn btn-default" value="Cancel" ng-click="CancelEquipment()" />
                    </div>
                </div>
            </div>

        </div>
    </div>
</asp:Content>
