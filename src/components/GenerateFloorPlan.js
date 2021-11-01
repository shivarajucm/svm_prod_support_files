import React, { Component, useEffect } from 'react'
import Box from '@material-ui/core/Box';
import axios from 'axios';
import * as Constants from '../utils/Constants';

class FloorPlan extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            drawingCoordinates: {}
        }
    };

    componentDidMount() {

        axios.get(Constants.url + "UKP/rest/endpoints/GetFloorElements", {
            params: {
                "GenInfoID": this.props.generalInfoId,
            }
        }).then(res => {
            //alert(res.data.structureElements.length)
            this.state.drawingCoordinates = res.data;
        })
            .catch(err => {
                alert("Error " + err);
            });

        this.updateCanvas();
    }
    updateCanvas() {
        var headerX = 30;
        var headerY = 80;
        var columnlength = 400;
        var columnWidth = 80;
        var ownerName = this.props.ownerName;
        var vpcNo = this.props.structureCode.split("/")[this.props.structureCode.split("/").length - 1];
        var structureCode = this.props.structureCode;

        var scaleConstLengthInPx = 60;
        var scaleConstWidthInPx = 60;


        const ctx = this.refs.canvas.getContext('2d');
        ctx.font = " bold 15px arial";
        ctx.beginPath();
        ctx.rect(headerX, headerY, columnlength, columnWidth);
        ctx.fillText("Owner Name:", headerX + 70, headerY + 30);
        ctx.stroke();

        //second column

        ctx.beginPath();
        ctx.rect(headerX + columnlength, headerY, columnlength, columnWidth);
        ctx.fillText("VPC No:", headerX + columnlength + 70, headerY + 30);
        ctx.stroke();

        //third column
        ctx.beginPath();
        ctx.rect(headerX + columnlength + columnlength, headerY, columnlength, columnWidth);
        ctx.fillText("Structure Code:", headerX + columnlength + columnlength + 70, headerY + 30);
        ctx.stroke();
        ctx.save();
        ctx.restore();

        ctx.font = "14px arial";

        //First column data
        ctx.fillText(ownerName, headerX + 70, headerY + 50);

        //2nd column data


        ctx.fillText(vpcNo, headerX + columnlength + 70, headerY + 50);
        ctx.stroke();

        //3rd column data


        ctx.fillText(structureCode, headerX + columnlength + columnlength + 70, headerY + 50);
        ctx.stroke();

        var x = 300;
        var y = 900;

        ctx.font = "10px arial";

        var drawingCoordinates = {

            "textEntry": [
                {
                    "areaName": "Room1",
                    "horizontal": "3.00",
                    "vertical": "3.28",
                    "horizontalWall1": "WL3",
                    "horizontalWall2": "WL6",
                    "verticalWall1": "WL2",
                    "verticalWall2": "WL4"
                }, {
                    "areaName": "Room2",
                    "horizontal": "3.00",
                    "vertical": "3.95",
                    "horizontalWall1": "WL6",
                    "horizontalWall2": "WL7",
                    "verticalWall1": "WL1",
                    "verticalWall2": "WL5"
                }, {
                    "areaName": "Katta1",
                    "horizontal": "1.85",
                    "vertical": "0.75",
                    "horizontalWall1": "",
                    "horizontalWall2": "",
                    "verticalWall1": "",
                    "verticalWall2": ""
                }, {
                    "areaName": "Katta2",
                    "horizontal": "0.7",
                    "vertical": "1.15",
                    "horizontalWall1": "",
                    "horizontalWall2": "",
                    "verticalWall1": "",
                    "verticalWall2": ""
                }
            ],
            "structureElements": [
                {
                    "mainLabel": "WL1",
                    "subLabel": "WL1",
                    "orientation": "V",
                    "xAxis": 0.00,
                    "yAxis": 5.70,
                    "length": 4.55,
                    "breadth": 0.60,
                    "height": 2.70,
                    "circumference": ""
                }, {
                    "mainLabel": "WL2",
                    "subLabel": "WL2",
                    "orientation": "V",
                    "xAxis": 0.00,
                    "yAxis": 9.88,
                    "length": 4.18,
                    "breadth": 0.60,
                    "height": 2.5,
                    "circumference": ""
                }, {
                    "mainLabel": "WL3",
                    "subLabel": "WL3",
                    "orientation": "H",
                    "xAxis": 0.60,
                    "yAxis": 9.88,
                    "length": 3.00,
                    "breadth": 0.30,
                    "height": 2.50,
                    "circumference": ""
                }, {
                    "mainLabel": "WL4",
                    "subLabel": "WL4",
                    "orientation": "V",
                    "xAxis": 3.60,
                    "yAxis": 9.88,
                    "length": 4.18,
                    "breadth": 0.30,
                    "height": 2.50,
                    "circumference": ""
                }, {
                    "mainLabel": "WL5",
                    "subLabel": "WL5",
                    "orientation": "V",
                    "xAxis": 3.60,
                    "yAxis": 5.70,
                    "length": 4.55,
                    "breadth": 0.30,
                    "height": 2.70,
                    "circumference": ""
                }, {
                    "mainLabel": "WL6",
                    "subLabel": "WL6",
                    "orientation": "H",
                    "xAxis": 0.6,
                    "yAxis": 6.30,
                    "length": 3.00,
                    "breadth": 0.6,
                    "height": 2.7,
                    "circumference": ""
                }, {
                    "mainLabel": "WL7",
                    "subLabel": "WL7",
                    "orientation": "H",
                    "xAxis": 0.60,
                    "yAxis": 1.75,
                    "length": 3.00,
                    "breadth": 0.6,
                    "height": 2.5,
                    "circumference": ""
                }, {
                    "mainLabel": "K1",
                    "subLabel": "K1",
                    "orientation": "H",
                    "xAxis": 0.00,
                    "yAxis": 1.15,
                    "length": 1.85,
                    "breadth": 0.75,
                    "height": 0.25,
                    "circumference": ""
                }, {
                    "mainLabel": "K2",
                    "subLabel": "K2",
                    "orientation": "V",
                    "xAxis": 3.50,
                    "yAxis": 1.15,
                    "length": 1.15,
                    "breadth": 0.7,
                    "height": 0.5,
                    "circumference": ""
                }, {
                    "mainLabel": "WL6",
                    "subLabel": "D1",
                    "orientation": "",
                    "xAxis": '',
                    "yAxis": '',
                    "length": 1.87,
                    "breadth": 0.93,
                    "height": 1.90,
                    "circumference": ""
                }, {
                    "mainLabel": "WL7",
                    "subLabel": "D2",
                    "orientation": "",
                    "xAxis": '',
                    "yAxis": '',
                    "length": 1.60,
                    "breadth": 1.20,
                    "height": 2.18,
                    "circumference": ""
                }, {
                    "mainLabel": "WL6",
                    "subLabel": "W1",
                    "orientation": "",
                    "xAxis": '',
                    "yAxis": '',
                    "length": 0.50,
                    "breadth": 0.30,
                    "height": 0.35,
                    "circumference": ""
                }, {
                    "mainLabel": "WL7",
                    "subLabel": "W2",
                    "orientation": "",
                    "xAxis": '',
                    "yAxis": '',
                    "length": 0.50,
                    "breadth": 0.60,
                    "height": 0.75,
                    "circumference": ""
                }, {
                    "mainLabel": "WL5",
                    "subLabel": "W3",
                    "orientation": "",
                    "xAxis": '',
                    "yAxis": '',
                    "length": 1.60,
                    "breadth": 0.60,
                    "height": 0.75,
                    "circumference": ""
                }, {
                    "mainLabel": "WL2",
                    "subLabel": "CB1",
                    "orientation": "",
                    "xAxis": '',
                    "yAxis": '',
                    "length": 0.36,
                    "breadth": 0.25,
                    "height": 0.45,
                    "circumference": ""
                }, {
                    "mainLabel": "WL2",
                    "subLabel": "CH1",
                    "orientation": "",
                    "xAxis": '',
                    "yAxis": '',
                    "length": 1.00,
                    "breadth": 0.30,
                    "height": 0.90,
                    "circumference": ""
                }
            ]
        };
        //var textEntries = drawingCoordinates.textEntry;
        var structureElements = this.state.drawingCoordinates.structureElements;

        //textEntries.forEach((textEntry) => {

        //});

        var superStructureElements = [];
        var superStructureElementCount = 0;

        if (structureElements != null && structureElements != undefined && structureElements.length > 0) {
            structureElements.forEach((elements) => {

                var elementWidth = scaleConstWidthInPx;
                var elementlength = elements.length;
                var elementXAxis = x;
                var elementYAxis = y;
                var superStructureJSONString;
                var superStructureJSONObj;

                //updateScaleConstInPx(elementlength);
                //updateScaleWidthConstInPx(elements.breadth);
                if (elements.mainLabel == elements.subLabel) {

                    elementWidth = elements.breadth * scaleConstWidthInPx;

                    if (elements.orientation == "H") {
                        if (elements.xAxis > 0.00) {
                            elementXAxis = elementXAxis + (elements.xAxis * scaleConstLengthInPx);
                        }
                        if (elements.yAxis > 0.00) {
                            elementYAxis = elementYAxis - (elements.yAxis * scaleConstLengthInPx);
                        }
                        //alert ("elements.mainLabel: " + elements.mainLabel + "\nelementXAxis: " + elementXAxis + "\nelementYAxis: " + elementYAxis + "\nelementlength*scaleConstLengthInPx: " + elementlength*scaleConstLengthInPx + "\nelementWidth: " + elementWidth);
                        ctx.beginPath();
                        ctx.rect(elementXAxis, elementYAxis, elementlength * scaleConstLengthInPx, elementWidth);
                        ctx.stroke();
                        ctx.save();
                        ctx.restore();
                        ctx.fillText(elements.mainLabel + "(" + elements.length + " * " + elements.breadth + ")", elementXAxis - 30 + ((elementlength * scaleConstLengthInPx) / 2), ((elementWidth / 2) + elementYAxis) - 20);
                        ctx.stroke();
                        ctx.save();
                        ctx.restore();
                    } else if (elements.orientation == "V") {
                        if (elements.xAxis > 0.00) {
                            elementXAxis = elementXAxis + elements.xAxis * scaleConstLengthInPx;
                        }
                        if (elements.yAxis > 0.00) {
                            elementYAxis = elementYAxis - (elements.yAxis * scaleConstLengthInPx);
                        }
                        //alert ("elements.mainLabel: " + elements.mainLabel + "\nelementXAxis: " + elementXAxis + "\nelementYAxis: " + elementYAxis + "\nelementlength*scaleConstLengthInPx: " + elementlength*scaleConstLengthInPx + "\nelementWidth: " + elementWidth);
                        ctx.beginPath();
                        ctx.rect(elementXAxis, elementYAxis, elementWidth, (elementlength * scaleConstLengthInPx));
                        ctx.stroke();
                        ctx.save();
                        ctx.restore();
                        ctx.fillText(elements.mainLabel, elementXAxis, (elementYAxis + ((elementlength * scaleConstLengthInPx) / 2)));
                        ctx.stroke();
                        ctx.save();
                        ctx.restore();
                    }

                    superStructureJSONString = '{"superStructureElementName" : "' + elements.mainLabel + '", "orientation": "' + elements.orientation + '", "xAxis": ' + elementXAxis + ', "yAxis": ' + elementYAxis + ',"lengthInPx": ' + elementlength * scaleConstLengthInPx + ',"widthInPx": ' + elementWidth + '}';
                    superStructureJSONObj = JSON.parse(superStructureJSONString);
                    superStructureElements.push(superStructureJSONObj);
                }
            });
        
            structureElements.forEach((elements) => {

                if (elements.mainLabel != elements.subLabel) {

                    for (var i = 0; i < superStructureElements.length; i++) {
                        if (superStructureElements[i].superStructureElementName == elements.mainLabel) {
                            if (superStructureElements[i].subElementsCount == undefined || superStructureElements[i].subElementsCount == 0) {
                                superStructureElements[i].subElementsCount = 1;
                            } else {
                                superStructureElements[i].subElementsCount += 1;
                            }

                            if (superStructureElements[i].orientation == "H") {
                                var subElementWidth = elements.breadth * scaleConstLengthInPx;
                                var subElementLength = superStructureElements[i].widthInPx;
                                var subElementXAxis = superStructureElements[i].xAxis + superStructureElements[i].lengthInPx - subElementWidth - 20;


                                switch (superStructureElements[i].subElementsCount) {
                                    case 1:
                                        subElementXAxis = superStructureElements[i].xAxis + superStructureElements[i].lengthInPx - subElementWidth - 20;
                                        break;
                                    case 2:
                                        subElementXAxis = superStructureElements[i].xAxis + 20;
                                        break;
                                    case 3:
                                        subElementXAxis = superStructureElements[i].xAxis + (superStructureElements[i].lengthInPx / 2);
                                        break;
                                }

                                ctx.beginPath();
                                ctx.rect(subElementXAxis, superStructureElements[i].yAxis, subElementWidth, subElementLength);
                                var windowRegEx = /W[0-9]+/g;
                                if (elements.subLabel.match(windowRegEx)) {
                                    ctx.rect(subElementXAxis, ((superStructureElements[i].yAxis + (subElementLength / 2)) - 5), subElementWidth, 5);
                                }
                                ctx.stroke();
                                ctx.save();
                                ctx.restore();
                                ctx.fillText(elements.subLabel, subElementXAxis + (subElementWidth / 2) - 10, superStructureElements[i].yAxis + 10);
                                ctx.stroke();
                                ctx.save();
                                ctx.restore();
                            } else if (superStructureElements[i].orientation == "V") {
                                var subElementWidth = superStructureElements[i].widthInPx;
                                var subElementLength = elements.length * scaleConstLengthInPx;
                                var subElementYAxis = superStructureElements[i].yAxis + superStructureElements[i].lengthInPx - subElementLength - 20;


                                switch (superStructureElements[i].subElementsCount) {
                                    case 1:
                                        subElementYAxis = superStructureElements[i].yAxis + superStructureElements[i].lengthInPx - subElementLength - 20;
                                        break;
                                    case 2:
                                        subElementYAxis = superStructureElements[i].yAxis + 20;
                                        break;
                                    case 3:
                                        subElementYAxis = superStructureElements[i].yAxis + (superStructureElements[i].lengthInPx / 2);
                                        break;
                                }
                                ctx.beginPath();
                                var cupboardRegEx = /CB[0-9]+/g;
                                if (elements.subLabel.match(cupboardRegEx)) {
                                    ctx.rect(superStructureElements[i].xAxis + 10, subElementYAxis - 30, subElementWidth - 10, subElementLength);
                                    ctx.fillText(elements.subLabel, superStructureElements[i].xAxis, (subElementYAxis + (subElementLength / 2)) - 30);
                                } else {
                                    ctx.rect(superStructureElements[i].xAxis, subElementYAxis, subElementWidth, subElementLength);
                                    ctx.fillText(elements.subLabel, superStructureElements[i].xAxis, (subElementYAxis + (subElementLength / 2)));
                                }
                                var windowRegEx = /W[0-9]+/g;
                                if (elements.subLabel.match(windowRegEx)) {
                                    ctx.rect(superStructureElements[i].xAxis + (subElementWidth / 2) - 3, subElementYAxis, 5, subElementLength);
                                }

                                ctx.stroke();
                                ctx.save();
                                ctx.restore();
                            }
                        }
                    }
                }
            });
        }
    }
    render() {
        return (
            <canvas ref="canvas" width="1300" height="1200" >
                Your browser does not support the HTML5 canvas tag.
            </canvas>
        );
    }
}

export default FloorPlan;

/*
export default function FloorPlan(){


    useEffect(() => {
        
    });
    
    return (
        <div>
            <canvas id="floorPlanCanvas" width="1200" height="900" style="border:1px solid #d3d3d3;">
                Your browser does not support the HTML5 canvas tag.
            </canvas>
        </div>
    );
}*/
