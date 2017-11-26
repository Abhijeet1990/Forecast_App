<%@ Page Title="" Language="C#" MasterPageFile="~/OperatorMaster.Master" AutoEventWireup="true" CodeBehind="OptimizerGoals.aspx.cs" Inherits="RTP.TESWebServer.OptimizerGoals" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/bootstrap-theme.min.css" rel="stylesheet" />   
    
  <%--  <script src="js/plugin/highcharts.js"></script>--%>
    <script src="js/plugin/heatmap.js"></script>
    <script src="js/plugin/exporting.js"></script>
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
            height: 268px;
        }

        .tbl {
            width: 100%;
        }

        .td {
            border: 1px solid wheat;
            text-align: center;
        }

        .bold {
            border: 2px solid wheat;
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



        .heatChartClass {
            min-width: 300px;
            max-width: 800px;
            height: 140px;
            margin: auto;
        }

        body {
            margin-top: 50px;
        }

        hr {
            display: block;
            margin-top: 0.5em;
            margin-bottom: 0.5em;
            margin-left: auto;
            margin-right: auto;
            border-style: inset;
            border-width: 1px;
        }

        .highcharts-point {
            background-color: #f90;
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

        .highcharts-point highcharts-color-0 {
            color: yellow;
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

        /*ul.ticks-ul {
            margin-left: 18%;
        }*/

        .ticks-ul li {
            list-style-type: none;
            float: left;
            margin-right: 8.3%;
            font-size: 12px;
            font-style: normal;
        }

        .button {
            list-style-type: none;
            float: left;
        }

        .ticks-ul li::after {
            content: '|';
            position: absolute;
            margin-left: 1.7%;
        }

        @media only screen and (max-width: 360px) {
            body {
                margin-top: 100px;
            }
        }

        @media only screen and (max-width: 768px) {
            body {
                margin-top: 165px;
            }
        }


        @media only screen and (max-width: 980px) {
            body {
                margin-top: 100px;
            }
        }

        
        .modal-dialog {
            width: 331px;
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
            width: 320px;
        }
    </style>
    <script>
        $(document).ready(function () {
            $("#navText").text("Thermal Energy Storage Real Time & Day Ahead Optimizer Schedule");

            $(".highcharts-point").click(function () {
                $(".highcharts-text-outline").text();
            })
        })

        $(window).resize(function () {
            location.reload();
        });


    </script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container" ng-app="myApp" ng-controller="heatChartController">
        <div class="row">
            <div class="col-lg-12 dvBlock">
                <!--TES Tank & Optimizer Settings-->
                <h2>TES Tank & Optimizer Settings</h2>
                <div class="row">
                    <div class="col-lg-4 col-md-5 col-sm-5" style="margin-top: 100px">
                        <div class="col-lg-11">
                            <h5 class="text-primary">Real Time Optimization Objective</h5>

                            <form class="form-inline" role="form" style="margin-left: 10px;">
                                <div class="form-group">
                                    <div class="radio">
                                        <label class="radio-inline control-label">
                                            <input type="radio" id="amount_25" name="amount" value="">
                                            Maximize Net Power Output
                                        </label>
                                    </div>

                                    <div class="radio">
                                        <label class="radio-inline control-label">
                                            <input type="radio" id="amount_25" name="amount" value="">
                                            Minimize Net Heat Rate
                                        </label>


                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div class="col-lg-8 col-md-7 col-sm-7">
                        <ul>
                            <li ng-repeat="val in data track by $index" class="button">
                                <button ng-click="yo($index)">{{val}}</button>
                            </li>
                        </ul>
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="heatChartClass" id="containerHeat1" width="40%"></div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="heatChartClass" id="containerHeat2"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xs-12">
                    <hr>
                </div>

                <div class="row">
                    <div class="col-lg-4 col-md-5 col-sm-5" style="margin-top: 100px">
                        <div class="col-lg-11">
                            <h5 class="text-primary">Day Ahead Optimization Objective</h5>
                            <form class="form-inline" role="form" style="margin-left: 10px;">
                                <div class="form-group">
                                    <div class="radio">
                                        <label class="radio-inline control-label">
                                            <input type="radio" id="amount_26" name="amount" value="">
                                            Maximize Net Power Output
                                        </label>
                                    </div>

                                    <div class="radio">
                                        <label class="radio-inline control-label">
                                            <input type="radio" id="amount_26" name="amount" value="">
                                            Minimize Net Heat Rate
                                        </label>


                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div class="col-lg-8 col-md-7 col-sm-7">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="heatChartClass" id="containerHeat3"></div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="heatChartClass" id="containerHeat4"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-xs-12">
                    <hr>
                </div>

                <div class="col-lg-3 col-lg-offset-5">

                    <div class="row" style="margin-bottom:10px;">
                        <div class="col-lg-5">
                             <input type="submit"class="btn btn-default" data-toggle="modal" value="Update" data-target="#myModal1" onclick="LoginUser()" />
                        </div>


                        <div class="col-lg-5">
                            <input type="button" class="btn btn-default" value="Cancel" ng-click="CancelOptimizer()" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
