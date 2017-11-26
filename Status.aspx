<%@ Page Title="" Language="C#" MasterPageFile="~/OperatorMaster.Master" AutoEventWireup="true" CodeBehind="Status.aspx.cs" Inherits="RTP.TESWebServer.Status" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script>
        $(document).ready(function () {
            $("#navText").text("Thermal Energy Storage Real time Status");
        })
    </script>
    <style>
        body {
            margin-top: 4%;
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
                margin-top: 65px;
            }
        }

        @media only screen and (max-width: 980px) {
            body {
                margin-top: 65px;
            }
        }

        @media only screen and (max-width: 360px) {
            body {
                margin-top: 85px;
            }
        }

        .idle {
            background-color: white;
            color: black;
            font-size: 11px;
        }

        .partDischarge {
            background-color: #ffcc00;
            color: #ffcc00;
        }

        .change {
            background-color: #e8704d;
            color: #e8704d;
        }

        .changeMode {
            background-color: #e8704d;
            font-size: 11px;
        }

        .fullDischarge {
            background-color: #00cc99;
            color: #00cc99;
        }

        .chillersOnly {
            background-color: #9933ff;
            color: #9933ff;
        }

        .btnBroder {
            border: 1px solid #808080;
            width: 90%;
        }

        .fulldischarge {
            background-color: #00cc99;
            font-size: 11px;
        }

        .chillers {
            background-color: #9933ff;
            font-size: 11px;
        }
    </style>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server" ng-app="myApp" ng-controller="operatorController">

    <div class="container">
        <div class="row" ng-controller="operatorController">
            <div id="mhDiv" class="col-lg-2 col-md-4 dvBlock">
                <h2>Ambient Conditions</h2>
                <p class="ngDiv">Temperature</p>
                <div ng-repeat="val in status.AmbientCondition track by $index" class="ngDiv">
                    <table class="tbl">
                        <tr>
                            <td style="margin-left: 5px;">
                                <span class="txtMain">{{val.lable}}</span>

                            </td>
                            <td class="sTd" ng-repeat="txtBox in val.textbox track by $index">
                                <input class="input-smm" type="text" ng-model="txtBox" />
                            </td>
                            <td class="sTd">
                                <span class="txtMain">{{val.engUnit}}</span>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>

            <!-- Adding Combustion Turbine-->
            <div id="mhDiv" class="col-lg-4 col-md-8 dvBlock">
                <h2>Combustion Turbines</h2>

                <div class="row">
                    <div class="col-sm-6">
                        <p class="ngDiv">Inlet Air Temps</p>
                        <table class="tbl">
                            <tr>
                                <td style="width: 40%">&nbsp</td>
                                <td style="width: 30%"><span class="smallText">Actual</span></td>
                                <td style="width: 30%"><span class="smallText">Optimal</span></td>
                                <td style="width: 30%">&nbsp</td>
                            </tr>
                        </table>

                        <div ng-repeat="val in status.CombustionTurbine1 track by $index" class="ngDiv">
                            <table class="tbl">
                                <tr>
                                    <td style="width: 40%">
                                        <span class="txtMain">{{val.lable}}</span>
                                    </td>

                                    <td style="width: 30%" ng-repeat="value in val.textbox">
                                        <input class="input-smm" type="text" ng-model="value" />
                                    </td>
                                    <td style="width: 30%">
                                        <span class="txtMain">{{val.engUnit}}</span>
                                    </td>

                                </tr>
                            </table>
                        </div>
                    </div>

                    <!--Adding 2nd textbox-->
                    <div class="col-sm-6">
                        <p class="text-center">Coil Flow Rates</p>
                        <table class="tbl">
                            <tr>
                                <td style="width: 28%">&nbsp</td>
                                <td style="width: 28%"><span class="smallText">Actual</span></td>
                                <td style="width: 30%"><span class="smallText">Optimal</span></td>
                                <td style="width: 30%">&nbsp</td>
                            </tr>
                        </table>

                        <div ng-repeat="val in status.CombustionTurbine2 track by $index">
                            <table class="tbl">
                                <tr>
                                    <td style="width: 40%">
                                        <span class="txtMain">{{val.lable}}</span>
                                    </td>

                                    <td style="width: 30%" ng-repeat="value in val.textbox">
                                        <input class="input-smm" type="text" ng-model="value" />
                                    </td>
                                    <td style="width: 30%">
                                        <span class="txtMain">{{val.engUnit}}</span>
                                    </td>

                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>


            <!-- Adding Chiller Packaged-->
            <div id="mhDiv" class="col-lg-4 col-md-8 dvBlock">
                <h2>Chiller Packages</h2>

                <div class="row">
                    <div class="col-sm-6">
                        <p class="ngDiv">Chilled Water Temps</p>
                        <table class="tbl">
                            <tr>
                                <td style="width: 35%"></td>
                                <td style="width: 30%"><span class="smallText">Actual</span></td>
                                <td style="width: 30%"><span class="smallText">Optimal</span></td>
                            </tr>
                        </table>
                        <div ng-repeat="chil in status.Chiller1 track by $index" class="ngDiv">
                            <table class="tbl">
                                <tr>
                                    <td style="width: 40%">
                                        <span class="txtMain">{{chil.lable}}</span>
                                    </td>
                                    <td style="width: 30%" ng-repeat="txtBoxChil in chil.textbox">
                                        <input class="input-smm" type="text" ng-model="txtBoxChil" />
                                    </td>
                                    <td style="width: 30%">
                                        <span class="txtMain">{{chil.engUnit}}</span>
                                    </td>
                                    <%-- <td style="width: 30%">
                                        <input class="input-smm" type="text" ng-model="chil.value" />
                                    </td>--%>
                                </tr>
                            </table>
                        </div>
                    </div>

                    <!--Adding 2nd textbox-->
                    <div class="col-lg-6">
                        <p class="text-center">Flow Rates</p>
                        <table class="tbl">
                            <tr>
                                <td style="width: 20%"></td>
                                <td style="width: 20%"><span class="smallText">Actual</span></td>
                                <td style="width: 30%"><span class="smallText">Optimal</span></td>
                            </tr>
                        </table>
                        <div ng-repeat="val in status.Chiller2 track by $index">
                            <table class="tbl">
                                <tr>
                                    <td style="width: 40%">
                                        <span class="txtMain">{{val.lable}}</span>
                                    </td>
                                    <td style="width: 30%" ng-repeat="txtBoxChil2 in val.textbox track by $index">
                                        <input class="input-smm" type="text" ng-model="txtBoxChil2" />
                                    </td>
                                    <td style="width: 30%">
                                        <span class="txtMain">{{val.engUnit}}</span>
                                    </td>
                                    <%-- <td style="width: 30%">
                                        <input class="input-smm" type="text" ng-model="val.value" />
                                    </td>--%>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Adding Secondary Pumps -->
            <div class="col-lg-2 col-md-4 dvBlock" style="height: 210px">
                <h2>Secondary Pumps</h2>

                <p style="margin-left: 6px;">In Service</p>
                <table class="tbl">
                    <tr>
                        <td style="width: 35%"></td>
                        <td style="width: 30%"><span class="smallText">Actual</span></td>
                        <td style="width: 50%"><span class="smallText">Optimal</span></td>

                    </tr>
                </table>
                <div>
                    <table class="tbl">
                        <tr ng-repeat="val in status.SecondaryPumps track by $index">
                            <td style="width: 40%">
                                <span class="txtMain" style="margin-left: 6px;">{{val.lable}}</span>
                            </td>
                            <td style="width: 30%" ng-repeat="sp in val.textbox">
                                <input class="input-smm" type="text" ng-model="sp" />
                            </td>
                            <td style="width: 30%">
                                <span class="txtMain">{{val.engUnit}}</span>
                            </td>
                        </tr>
                    </table>
                </div>

            </div>

        </div>

        <!-- Thermal Energy Storage Tank-->
        <div class="row">
            <div>
                <span>{{status.TESTank}}</span>
            </div>
            <div class="col-lg-3 col-md-3 dvBlock" ng-controller="operatorController">
                <h2>Thermal Energy Storage Tank</h2>
                <div class="col-md-12" style="height: 361px">
                    <table class="tbl">
                        <tr>
                            <td style="width: 40%"></td>
                            <td style="width: 30%"><span class="smallText">Actual</span></td>
                            <td style="width: 30%; margin-left: 20px;"><span class="smallText">Optimal</span></td>

                        </tr>
                    </table>
                    <table class="tbl" ng-repeat="val in status.TESTank track by $index">
                        <tr>
                            <td style="width: 40%">
                                <span class="txtMain">{{val.lable}}</span>
                            </td>

                            <td style="width: 30%" ng-repeat="txtBoxThermal in val.textbox">
                                <input ng-if="val.lable === 'TES Mode'" class="input-smm btnBroder" type="button" ng-value="getValue(txtBoxThermal,'')" ng-class="getValue(txtBoxThermal,'color')" />
                                <input ng-if="val.lable !== 'TES Mode'" class="input-smm" type="text" ng-model="txtBoxThermal" />
                            </td>
                            <td style="width: 30%">
                                <span class="txtMain">{{val.engUnit}}</span>
                            </td>
                        </tr>
                        <tr>
                        </tr>
                    </table>
                </div>
            </div>

            <!--Chart Content -->
            <div class="col-lg-9 col-md-9 dvBlock" style="height: 385px;" ng-controller="statusHighChart">
                <h2>TES Tank Thermocline level</h2>
                <div class="row">
                    <div class="col-lg-3 col-md-3">
                        <div class="col-lg-12">
                            <table>
                                <tr>
                                    <td class="legend">
                                        <div class="txtLgnd"></div>
                                    </td>
                                    <td>
                                        <h6>Idle</h6>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="legend">
                                        <div class="txtLgndY"></div>
                                    </td>
                                    <td>
                                        <h6>Part Discharge</h6>
                                    </td>
                                </tr>

                                <tr>

                                    <td class="legend">
                                        <div class="txtLgndR"></div>
                                    </td>
                                    <td>
                                        <h6>Change</h6>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="legend">
                                        <div class="txtLgndG"></div>
                                    </td>
                                    <td>
                                        <h6>Full Discharge</h6>
                                    </td>
                                </tr>

                                <tr>
                                    <td class="legend">
                                        <div class="txtLgndP"></div>
                                    </td>
                                    <td>
                                        <h6>Chillers Only</h6>
                                    </td>
                                </tr>
                            </table>

                        </div>

                        <div class="col-lg-12" style="margin-top: 90px">
                            <div style="margin-bottom: 20px;">
                                <h6>Chiller Packages In Service</h6>
                            </div>
                            <div>
                                <h6>Secondary Pumps In Service</h6>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-9 col-md-9">
                        <%-- <div class="row scale-margin-left">--%>
                        <div class="scale-margin-left">
                            <table>
                                <tr>
                                    <td class="boxClass" ng-repeat="value in HistoricalActualMode track by $index" ng-click="selectedBox(value$index)"
                                        ng-class="value == 0 && value == null ? 'idle':value == 1 ?'partDischarge':value == 2?'change':value == 3?'fullDischarge':value == 4?'chillersOnly':''">{{value}}
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <%--</div>--%>
                        <div class="row">
                            <div id="container" style="width: 100%; height: 260px; margin: 0 auto"></div>
                        </div>
                        <div class="scale-margin-left">
                            <table>
                                <tr style="cursor: pointer">
                                    <td class="boxClassBelow" ng-repeat="value in chillerPackages track by $index" ng-class="selectedBoxIndex == $index ? 'selectedBoxLower':''">{{value}}
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class="scale-margin-left">
                            <table>
                                <tr style="cursor: pointer">
                                    <td class="boxClassBelow" ng-repeat="value in secondaryPumps track by $index" ng-class="selectedBoxIndex == $index ? 'selectedBoxLower':''">{{value}}
                                    </td>
                                </tr>
                            </table>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    </div>
</asp:Content>
