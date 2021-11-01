import React from "react";
import {styled, makeStyles} from '@material-ui/core/styles'
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from "@material-ui/icons/Add";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Tooltip from "@mui/material/Tooltip";
import * as Constants from "../utils/Constants";
import GIElementDataTable from "./GIElementDataTable";
import "./GIAdditionalInfoTabPanel.css";
// import  TextareaAutosize  from "@material-ui/core";
const axios = require("axios");

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex"
    },
    formControl: {
        margin: theme.spacing(1)
    }
}));

function Alert(props) {
    return <MuiAlert elevation={6}
        variant="filled"
        {...props}/>;
}

export default function FieldMeasurementsPanel(props) {
    // let gridInfoID = localStorage.getItem('id');
    // alert("FieldMeasurement "+props.GeneralInfoID);
    const classes = useStyles();
   
    let DSRID = localStorage.getItem('dsrid');
    let generalInfoID = localStorage.getItem('generalInfoID');
    
    const [open, setOpen] = React.useState(false);
    const [dsrid, setdsrid] = React.useState('');
    const [labelType, setLabelType] = React.useState([]);
    const [mainLabel, setMainLabel] = React.useState([]);
    const [mainLabel1Value, setMainLabel1Value] = React.useState("");
    const [formulaValue, setFormulaValue] = React.useState('');

    const [subLabel, setSubLabel] = React.useState([]);
    const [orderType, setOrderType] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [orientation, setOrientation] = React.useState("");
    const [xAxis, setXAxis] = React.useState(9999);
    const [yAxis, setYAxis] = React.useState(9999);
    const [circumference, setCircumference] = React.useState(9999);
    const [inputDisabled, setInputDisabled] = React.useState(false);
    const [structureType, setStructureType] = React.useState([]);
    const [sublabel1value, setsublabel1value] = React.useState('');
    const [descriptionvalue, setdescriptionvalue] = React.useState('');

    function Empty_and_Null_Check(value){
        if(value==undefined || value==null|| value==''){
            return "0.0";
        }else{
            return value;
        }
    }

    function areaFormula(prefix,B,H,L,Q){
        let result=0.0;
        switch(prefix){
            case "D":
            case "ES":
            case "V":
            case "W":
                result=parseFloat(B)*parseFloat(H)*parseFloat(Q);
                break;
            case "CB":
            case "LT":
            case "OT":
            case "PA":
            case "PL":
            case "PO":
                result=parseFloat(L)*parseFloat(H)*parseFloat(Q);
                break;
            case "CJ":
            case "FL":
            case "LA":
            case "OA":
            case "RA":
                result=parseFloat(L)*parseFloat(B)*parseFloat(Q);
                break;
            default:
            result=0.0;
            
        }
        return result;
    }

    function volumeCalculation(prefix,B,C,H,L,O,Q){
       let result=0.0;
        B=parseFloat(B.toFixed(2));
        C=parseFloat(C.toFixed(2));
        H=parseFloat(H.toFixed(2));
        L=parseFloat(L.toFixed(2));
        O=parseFloat(O.toFixed(2));
        Q=parseFloat(Q.toFixed(2));
        
        switch(prefix){
        case "B":
        case "BA":
        case "CK":
        case "CV":
        case "CW":
        case "E":
        case "EF":
        case "F":
        case "FB":
        case "J":
        case "K":
        case "LI":
        case "NP":
        case "NAGAPATTI":
        case "OV":
        case "RT":
        case "RV":
        case "SH":
        case "WL":
            result=L*B*H*Q;
            break;
        case "BC":
            result=C*C*L*Q*7/88;
            break;
        case "Q":
        case "CH":
        case "EP":
        case "MS":
        case "OQ":
        case "WP":
            result=Q;
            break;
        case "CC":
        case "CE":
        case "CF":
        case "RC":
            result=C*C*H*Q*7/88;
            break;
        case "LQ":
        case "RM":
            result=L*Q;
            break;
        case "SI":
            result=L*B*H*O;
            break;
        default: result=0.0;
        }
        return result.toFixed(2);
        
    }

    // Orientation.map((value,key)=>{
    // console.log('------------>'+value);
    // })

    // axios.get('http://59.97.20.208:8080/UKP/rest/endpoints/GetFloorElements',
    //         params:{
    //             "GenInfoID": 'D8017DB3-B2B6-4AB6-AEFF-11D825334734',
    //         }
    //         ).then(res => {
    //              res.data.structureElements;
    //             alert(res.data.structureElements);
    //         }).catch(error => {
    //             alert(error);
    //         });

         

    const [structureTypeLabelPrefix, setStructureTypeLabelPrefix] = React.useState("");
    const [state, setState] = React.useState({
        lengthField: false,
        breadthField: false,
        heightField: false,
        circumferenceField: false,
        createCopy: false,
        orientationField: false,
        x_axisField: false,
        y_axisField: false
    });

    const {
        lengthField,
        breadthField,
        heightField,
        circumferenceField,
        createCopy,
        orientationField,
        x_axisField,
        y_axisField
    } = state;
    const error = [
        lengthField,
        breadthField,
        heightField,
        circumferenceField,
        createCopy,
        orientationField,
        x_axisField,
        y_axisField,
    ].filter((v) => v).length !== 2;

    const handleClickOpen = () => {
        setOpen(true);
    };
    // const handleChangemainlableValue = (event) => {
    //     setmainlableValue(event.target.value);
    // }; /.

    const handleChange = (event) => {
        enableDisableFields(event.target.value);
    };
    const [strtypeValue, setStrtypeValue] = React.useState("");
    const [SLNUMBER, setSLNUMBER] = React.useState('');
    const slNumber = (event) => {
        // alert(event.target.value);
        // strtypeValue
        setSLNUMBER(event.target.value);
        setMainLabel1Value('')
        setsublabel1value('');
        setMainLabel1Value(strtypeValue + "" + event.target.value);
        setsublabel1value(strtypeValue + "" + event.target.value);
    };
    const [structureIDValue, setStructureIDValue] = React.useState('');
    const [uomID, setuomID] = React.useState('');
    const [uomCode, setuomCode] = React.useState('');
    const handleChangeStrType = (event) => {
        setStrtypeValue(event.target.value);
        enableDisableFields(event.target.value);


        structureType.map((value, key) => {
            if (event.target.value == value.Code) {
                // setStrtypeValue(value.Name);
                // alert(value.Name);
                // alert(value.VolumeFormula);
                setuomID(value.UomID);
                setuomCode(value.UomCode);
                setStructureIDValue(value.ID);
                setFormulaValue(value.VolumeFormula);
                setdescriptionvalue(value.Description);
            }
        })
    };
    const [mainlabelvalue, setmainlabelvalue] = React.useState("");
    const [mainLabelvalue1, setmainLabelvalue1] = React.useState("");

    const handleChangeOrientation = (event) => {
        setOrientation(event.target.value);
        // alert(event.target.value);
    };

    const handleXAxisTextFieldChange = (event) => {
        setXAxis(event.target.value);
    };

    const handleYAxisTextFieldChange = (event) => {
        setYAxis(event.target.value);
    };

    const handleCircumferenceTextFieldChange = (event) => {
        setCircumference(event.target.value);
    }

    const handleMainlabel = (event) => {
        setmainLabelvalue1(event.target.value);
        // alert(event.target.value);
        // mainLabel.map((value, key) => {
        // if (event.target.value == value.ID) {
        //    setmainLabelvalue1(value.Description);
        //     alert(mainLabelvalue1);
        // }
        // });

        // let mainlable = document.getElementById("main-label-select").value;
        // alert("alert "+mainlable);

        axios.get(Constants.url + "UKP/rest/endpoints/GetSubDsrByDSRMainID", {
            params: {
                DSRMain_ID: event.target.value

            }

        }).then((res) => {
            setSubLabel(res.data.mDSRSubList);
        }).catch((err) => {
            alert("Sublabel Error " + err);
        });
    };
    const handleChangeLabelType = (event) => { // alert( "Label:"+ event.target.value+" DSRID:"+dsrid)
       
       // alert("DSRID " + DSRID);
        // alert(DSRID);

        setMainLabel([]);
        setLabelType(event.target.value);
        axios.get(Constants.url + "UKP/rest/endpoints/GetMainDsrByDSRNonDSR", {
            params: {
                Label: event.target.value, // DSR NONDSR
                DSRID: localStorage.getItem('dsrid')
            }
        }).then((res) => {
            setMainLabel(res.data.mDSRMainList);
        }).catch((err) => {
            alert("Error");
        });
        

        
    };

    React.useEffect(() => {
        axios.get(Constants.url + "UKP/rest/endpoints/GetStrElement").then((res) => {
            setStructureType(res.data.mStrElementList);
        }).catch((err) => {
            alert("GetStrType " + err);
        });
    }, []);

    const enableDisableFields = (labelPrefix) => { // alert(labelPrefix);
        switch (labelPrefix) {
            case "B":
            case "BA":
            case "C":
            case "CJ":
            case "CU":
            case "CW":
            case "D":
            case "EF":
            case "ES":
            case "F":
            case "FB":
            case "J":
            case "LI":
            case "NP":
            case "OV":
            case "RT":
            case "RV":
            case "SH":
            case "SI":
            case "V":
            case "W":
                setState({
                    lengthField: true,
                    breadthField: true,
                    heightField: true,
                    circumferenceField: false,
                    createCopy: false,
                    orientationField: false,
                    x_axisField: false,
                    y_axisField: false
                });
                break;
            case "BC":
            case "CC":
            case "CE":
            case "CF":
            case "RC":
                setState({
                    lengthField: true,
                    breadthField: false,
                    heightField: false,
                    circumferenceField: true,
                    createCopy: false,
                    orientationField: false,
                    x_axisField: false,
                    y_axisField: false
                });
                break;
            case "CB":
            case "CH":
            case "CK":
            case "K":
            case "WL":
                setState({
                    lengthField: true,
                    breadthField: true,
                    heightField: true,
                    circumferenceField: false,
                    createCopy: false,
                    orientationField: true,
                    x_axisField: true,
                    y_axisField: true
                });
                break;
            case "FL":
            case "LA":
            case "LT":
            case "OA":
            case "OT":
            case "PA":
            case "PO":
            case "RA":
                setState({
                    lengthField: true,
                    breadthField: false,
                    heightField: true,
                    circumferenceField: false,
                    createCopy: false,
                    orientationField: false,
                    x_axisField: false,
                    y_axisField: false
                });
                break;
            case "OM":
            case "RM":
                setState({
                    lengthField: true,
                    breadthField: false,
                    heightField: false,
                    circumferenceField: false,
                    createCopy: false,
                    orientationField: false,
                    x_axisField: false,
                    y_axisField: false
                });
                break;
            case "E":
                setState({
                    lengthField: true,
                    breadthField: true,
                    heightField: true,
                    circumferenceField: false,
                    createCopy: true,
                    orientationField: false,
                    x_axisField: false,
                    y_axisField: false
                });
                break;
            case "PL":
                setState({
                    lengthField: true,
                    breadthField: false,
                    heightField: true,
                    circumferenceField: false,
                    createCopy: true,
                    orientationField: false,
                    x_axisField: false,
                    y_axisField: false
                });
                break;
            default:
                setState({
                    lengthField: false,
                    breadthField: false,
                    heightField: false,
                    circumferenceField: false,
                    createCopy: false,
                    orientationField: false,
                    x_axisField: false,
                    y_axisField: false
                });
                break;
        }
    };

    const [copy, setCopy] = React.useState(false);

    const handleChangecopy = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked
        });
        const checked = event.target.checked;
        setCopy(checked);


        // to get the checked value
        const checkedValue = event.target.value;

        // to get the checked name
        const checkedName = event.target.name;
        // setRoleID(checkedName);
        // alert(checked + " " + checkedValue + " " + checkedName);
    };

    const handleSave = () => { // alert("Field Save");
        let lable = document.getElementById("label-type-select").value;
        let mainlable = document.getElementById("main-label-select").value;
        let sublable = document.getElementById("sub-label-select").value;//sub-label-select-label
        let description = document.getElementById("description").value;
        let serialNo = document.getElementById("serialNo").value;
        let formula = document.getElementById("formula").value;
        let createCopy = document.getElementById("createCopy").value;
        let itemDescription = document.getElementById("itemDescription").value;
        let mainLabel = document.getElementById("mainLabel").value;
        let subLabel = document.getElementById("subLabel").value;
        let structure_element_orientation_select_label = document.getElementById("structure-element-orientation-select-label").value;
        //setXAxis = document.getElementById("xAxis").value;
        //setYAxis = document.getElementById("yAxis").value;
        let length = document.getElementById("length").value;
        let breadth = document.getElementById("breadth").value;
        let height = document.getElementById("height").value;
        //let circumference = document.getElementById("circumference").value;
        let quantity = document.getElementById("quantity").value;

        alert("MV " + generalInfoID);

        if (copy == true) {
            if (mainLabelvalue1 == 'E') {
                alert("E")
                axios.post(Constants.url + "UKP/rest/endpoints/InsertFieldMeaurements", {
                    params: {
                        "GeneralInfoID:": generalInfoID,
                        "StructureElementID": structureIDValue,
                        "SerialNo": parseInt(serialNo),
                        "ItemDescription": "EXCAVATION",
                        " MainLabel": mainLabel,
                        " SubLabel": subLabel,
                        "O": orientation,
                        "X": xAxis,
                        "Y": yAxis,
                        "L": length,
                        "B": breadth,
                        "H": parseFloat(height),
                        "C": circumference,
                        "Q": quantity,
                        "D": 0,
                        "DsrSubID": sublabelvalue,
                        "UomID": uomID,
                        "UomCode": uomCode,
                        "TotalArea": areaFormula("E", parseFloat(Empty_and_Null_Check(breadth)),
                            parseFloat(Empty_and_Null_Check(height)),
                            parseFloat(Empty_and_Null_Check(length)),
                            parseFloat(Empty_and_Null_Check(quantity))),//prefix,B,H,L,Q
                        "TotalVolume": volumeCalculation("E",       ///prefix,B,C,H,L,O,Q
                            parseFloat(Empty_and_Null_Check(breadth)),
                            parseFloat(Empty_and_Null_Check(circumference)),
                            parseFloat(Empty_and_Null_Check(height)),
                            parseFloat(Empty_and_Null_Check(length)),
                            parseFloat(Empty_and_Null_Check(1)),//O?
                            parseFloat(Empty_and_Null_Check(breadth))),
                        "DSRArea": rate * areaFormula("E", parseFloat(Empty_and_Null_Check(breadth)),
                            parseFloat(Empty_and_Null_Check(height)),
                            parseFloat(Empty_and_Null_Check(length)),
                            parseFloat(Empty_and_Null_Check(quantity))),
                        "DSRVolume": rate * volumeCalculation("E",       ///prefix,B,C,H,L,O,Q
                            parseFloat(Empty_and_Null_Check(breadth)),
                            parseFloat(Empty_and_Null_Check(circumference)),
                            parseFloat(Empty_and_Null_Check(height)),
                            parseFloat(Empty_and_Null_Check(length)),
                            parseFloat(Empty_and_Null_Check(1)),//O?
                            parseFloat(Empty_and_Null_Check(breadth))),
                        "TotalAreaCalculated": areaFormula("E", parseFloat(Empty_and_Null_Check(breadth)),
                            parseFloat(Empty_and_Null_Check(height)),
                            parseFloat(Empty_and_Null_Check(length)),
                            parseFloat(Empty_and_Null_Check(quantity))),//prefix,B,H,L,Q,
                        "TotalVolumeCalculated": volumeCalculation("E",       ///prefix,B,C,H,L,O,Q
                            parseFloat(Empty_and_Null_Check(breadth)),
                            parseFloat(Empty_and_Null_Check(circumference)),
                            parseFloat(Empty_and_Null_Check(height)),
                            parseFloat(Empty_and_Null_Check(length)),
                            parseFloat(Empty_and_Null_Check(1)),//O?
                            parseFloat(Empty_and_Null_Check(breadth))),
                        "CopyFromID": structureIDValue,
                        "Inactive": 0,
                        "CreatedBy": "BCDE82B6-65B9-4D79-AF4C-C9F3D14ABB53",
                        "ModifiedBy": "BCDE82B6-65B9-4D79-AF4C-C9F3D14ABB53",
                        "DsrOrder": orderType
                    }
                }).then((res) => {
                    if (res.data.statusCode == 200 && res.data.status == true) {

                        axios.post(Constants.url + "UKP/rest/endpoints/InsertFieldMeaurements", {
                            "GeneralInfoID": generalInfoID,
                            "StructureElementID": structureIDValue,
                            "SerialNo": parseInt(serialNo),
                            "ItemDescription": "FOUNDATION",
                            "MainLabel": 'F' + SLNUMBER,
                            "SubLabel": 'F' + SLNUMBER,
                            "O": orientation,
                            "X": xAxis,
                            "Y": yAxis,
                            "L": length,
                            "B": breadth,
                            "H": parseFloat(height),
                            "C": circumference,
                            "Q": quantity,
                            "D": 0,
                            "DsrSubID": sublabelvalue,
                            "UomID": uomID,
                            "UomCode": uomCode,
                            "TotalArea": 12.35,
                            "TotalVolume": 14.2,
                            "DSRArea": 13.2,
                            "DSRVolume": 18.2,
                            "TotalAreaCalculated": 32.2,
                            "TotalVolumeCalculated": 18.2,
                            "CopyFromID": structureIDValue,
                            "Inactive": 0,
                            "CreatedBy": "BCDE82B6-65B9-4D79-AF4C-C9F3D14ABB53",
                            "ModifiedBy": "BCDE82B6-65B9-4D79-AF4C-C9F3D14ABB53",
                            "DsrOrder": orderType
                        }).then(res => {
                            if (res.data.statusCode == 200 && res.data.status == true) {
                                alert('Success');
                                resetFields();
                            }
                        }).catch(err => {
                            alert('Error ' + err);
                        })

                    }
                }).catch((err) => {
                    alert("Error->*" + err);
                });

            }


        } else if (mainLabelvalue1 == 'PL') {
            axios.post(Constants.url + "UKP/rest/endpoints/InsertFieldMeaurements", {
                "GeneralInfoID": generalInfoID,
                "StructureElementID": structureIDValue,
                "SerialNo": parseInt(serialNo),
                "ItemDescription": "PLASTER ING",
                "MainLabel": subLabel,
                "SubLabel": subLabel,
                "O": orientation,
                "X": xAxis,
                "Y": yAxis,
                "L": length,
                "B": breadth,
                "H": parseFloat(height),
                "C": circumference,
                "Q": quantity,
                "D": 0,
                "DsrSubID": sublabelvalue,
                "UomID": uomID,
                "UomCode": uomCode,
                "TotalArea": 12.35,
                "TotalVolume": 14.2,
                "DSRArea": 13.2,
                "DSRVolume": 18.2,
                "TotalAreaCalculated": 32.2,
                "TotalVolumeCalculated": 18.2,
                "CopyFromID": structureIDValue,
                "Inactive": 0,
                "CreatedBy": "BCDE82B6-65B9-4D79-AF4C-C9F3D14ABB53",
                "ModifiedBy": "BCDE82B6-65B9-4D79-AF4C-C9F3D14ABB53",
                "DsrOrder": orderType
            }).then((res) => {
                if (res.data.statusCode == 200 && res.data.status == true) {
                    axios.post(Constants.url + "UKP/rest/endpoints/InsertFieldMeaurements", {
                        "GeneralInfoID": generalInfoID,
                        "StructureElementID": structureIDValue,
                        "SerialNo": parseInt(serialNo),
                        "ItemDescription": "PAINTING",
                        "MainLabel": subLabel,
                        "SubLabel": subLabel,
                        "O": orientation,
                        "X": xAxis,
                        "Y": yAxis,
                        "L": length,
                        "B": breadth,
                        "H": parseFloat(height),
                        "C": circumference,
                        "Q": quantity,
                        "D": 0,
                        "DsrSubID": sublabelvalue,
                        "UomID": uomID,
                        "UomCode": uomCode,
                        "TotalArea": 12.35,
                        "TotalVolume": 14.2,
                        "DSRArea": 13.2,
                        "DSRVolume": 18.2,
                        "TotalAreaCalculated": 32.2,
                        "TotalVolumeCalculated": 18.2,
                        "CopyFromID": structureIDValue,
                        "Inactive": 0,
                        "CreatedBy": "BCDE82B6-65B9-4D79-AF4C-C9F3D14ABB53",
                        "ModifiedBy": "BCDE82B6-65B9-4D79-AF4C-C9F3D14ABB53",
                        "DsrOrder": orderType
                    }).then(res => {
                        if (res.data.statusCode == 200 && res.data.status == true) {
                            alert('Success');
                            resetFields();
                        }
                    }).catch(err => {
                        alert("Error->" + err);
                    })

                }
            }).catch((err) => {
                alert(err);
            });

        } else {
            axios.post(Constants.url + "UKP/rest/endpoints/InsertFieldMeaurements", {
                "GeneralInfoID": generalInfoID,
                "StructureElementID": structureIDValue,
                "SerialNo": parseInt(serialNo),
                "ItemDescription": itemDescription,
                "MainLabel": mainLabel,
                "SubLabel": subLabel,
                "O": orientation,
                "X": xAxis,
                "Y": yAxis,
                "L": parseFloat(length),
                "B": parseFloat(breadth),
                "H": parseFloat(height),
                "C": circumference,
                "Q": quantity,
                "D": 0,
                "DsrSubID": sublabelvalue,
                "UomID": uomID,
                "UomCode": uomCode,
                "TotalArea": 12.35,
                "TotalVolume": 14.2,
                "DSRArea": 13.2,
                "DSRVolume": 18.2,
                "TotalAreaCalculated": 32.2,
                "TotalVolumeCalculated": 18.2,
                "CopyFromID": structureIDValue,
                "Inactive": 0,
                "CreatedBy": "BCDE82B6-65B9-4D79-AF4C-C9F3D14ABB53",
                "ModifiedBy": "BCDE82B6-65B9-4D79-AF4C-C9F3D14ABB53",
                "DsrOrder": orderType
            }).then((res) => {
                if (res.data.statusCode == 200 && res.data.status == true) {
                    alert("Success");
                    resetFields();
                }
            }).catch((err) => {
                alert("Error->" + err);
            });
        }

        return (
            <Snackbar open={open}
                autoHideDuration={6000}
                onClose={handleClose}>
                <Alert onClose={handleClose}
                    severity="success">
                    New Element has been added successfully!
                </Alert>
            </Snackbar>
        );
    };

    const resetFields = () => {
        document.getElementById("itemDescription").value = '';
        document.getElementById("mainLabel").value = '';
        document.getElementById("subLabel").value = '';
        document.getElementById("structure-element-orientation-select-label").value = '';
        document.getElementById("xAxis").value = '';
        document.getElementById("yAxis").value = '';
        document.getElementById("length").value = '';
        document.getElementById("breadth").value = '';
        document.getElementById("height").value = '';
        document.getElementById("circumference").value = '';
        document.getElementById("quantity").value = '';
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleAdd = () => {};
    const [sublabelvalue, setsublabelvalue] = React.useState("");
    const [rate,setrate]=React.useState(0);

    const handleChangesublabel = (event) => {
        setsublabelvalue(event.target.value);
        subLabel.map((value, key) => {
            if (value.ID == event.target.value) {
                setDescription("₹" + value.Rate + " - " + value.Description);
                setOrderType(value.DsrOrder);
                setrate(value.Rate);
            }
        });
    };

    return (
        <div>
            <div class="add-new-element-main-form">
                <div class="add-new-element-dsr-label-form">
                    <FormControl sx={
                        {
                            m: 1,
                            minWidth: 120
                        }
                    }>
                        <InputLabel id="label-type-select-label"
                            style={
                                {marginLeft: "20px"}
                        }>
                            Label Type
                        </InputLabel>
                        <Select labelId="label-type-select-label" id="label-type-select"
                            value={labelType}
                            label="Label Type"
                            onChange={handleChangeLabelType}
                            style={
                                {
                                    marginLeft: "20px",
                                    marginTop: "20px",
                                    width: "120px"
                                }
                        }>
                            <MenuItem value="DSR">Dsr</MenuItem>
                            <MenuItem value="NONDSR">Non Dsr</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={
                        {
                            m: 1,
                            minWidth: 120
                        }
                    }>
                        <InputLabel id="main-label-select-label"
                            style={
                                {marginLeft: "20px"}
                        }>
                            Main Label
                        </InputLabel>
                        <Select labelId="main-label-select-label" id="main-label-select"
                            value={mainLabelvalue1}
                            label="Main Label"
                            onChange={handleMainlabel}
                            style={
                                {
                                    marginLeft: "20px",
                                    marginTop: "20px",
                                    width: "250px"
                                }
                        }>
                            {
                            mainLabel.map((test, key) => (
                                <MenuItem key={key}
                                    value={
                                        test.ID
                                }>
                                    {
                                    test.Description
                                } </MenuItem>
                            ))
                        } </Select>
                    </FormControl>
                    <FormControl sx={
                        {
                            m: 1,
                            minWidth: 120
                        }
                    }>
                        <InputLabel id="sub-label-select-label"
                            style={
                                {marginLeft: "20px"}
                        }>
                            Sub Label
                        </InputLabel>
                        <Select labelId="sub-label-select-label" id="sub-label-select" label="Sub Label"
                            value={sublabelvalue}
                            onChange={handleChangesublabel}
                            style={
                                {
                                    marginLeft: "20px",
                                    marginTop: "20px",
                                    width: "150px"
                                }
                        }>
                            {
                            subLabel.map((test, key) => (
                                <MenuItem key={key}
                                    value={
                                        test.ID
                                }>
                                    {
                                    test.Code
                                } </MenuItem>
                            ))
                        } </Select>
                    </FormControl>
                    <TextField autoFocus margin="dense" id="order"
                        value={orderType}
                        label="Order"
                        type="number"
                        style={
                            {
                                marginLeft: "20px",
                                width: "160px"
                            }
                        }/>
                    <Tooltip title={description}
                        placement="bottom">
                        <textarea multiline margin="dense" id="description" label="Description"
                            value={description}
                            style={
                                {
                                    marginTop: "10px",
                                    marginLeft: "20px",
                                    width: "90%",
                                    height: "50px"
                                }
                            }
                            InputProps={
                                {readOnly: true}
                            }/>
                    </Tooltip>
                </div>
                <div class="add-new-element-entry-input-form">
                    <div>
                        <FormControl sx={
                            {
                                m: 1,
                                minWidth: 120
                            }
                        }>
                            <InputLabel id="structure-element-select-label"
                                style={
                                    {marginLeft: "20px"}
                            }>
                                Structure Element
                            </InputLabel>
                            <Select labelId="structure-element-select-label" id="structure-element-select"
                                value={strtypeValue}
                                label="Structure Type"
                                onChange={handleChangeStrType}
                                style={
                                    {
                                        marginLeft: "20px",
                                        marginTop: "20px",
                                        width: "300px"
                                    }
                            }>
                                {
                                structureType.map((test, key) => (
                                    <MenuItem key={key}
                                        value={
                                            test.LabelPrefix
                                    }>
                                        {
                                        test.LabelPrefix + " - " + test.Name
                                    } </MenuItem>
                                ))
                            } </Select>
                        </FormControl>
                        <TextField autoFocus margin="dense" id="serialNo"
                            onChange={slNumber}
                            label="Serial No"
                            type="number"
                            style={
                                {
                                    marginLeft: "20px",
                                    width: "120px"
                                }
                            }/>
                        <TextField autoFocus margin="dense" id="formula"
                            value={formulaValue}
                            label="Formula"
                            style={
                                {
                                    marginLeft: "20px",
                                    width: "180px"
                                }
                            }
                            InputProps={
                                {readOnly: true}
                            }/>
                        <FormControlLabel id="createCopy"
                            style={
                                {
                                    marginTop: "20px",
                                    marginLeft: "10px",
                                    width: "140px"
                                }
                            }
                            disabled={
                                !state.createCopy
                            }
                            onChange={handleChangecopy}
                            control={<Checkbox/>}
                            label="Create Copy"/>
                        <TextField autoFocus margin="dense"
                            value={descriptionvalue}
                            id="itemDescription"
                            label="Item Description"
                            style={
                                {
                                    marginLeft: "20px",
                                    width: "300px"
                                }
                            }/>
                        <TextField autoFocus margin="dense" id="mainLabel"
                            // value={mainLabel1Value}
                            label="Main Label"
                            // disabled={false}

                            style={
                                {
                                    marginLeft: "20px",
                                    width: "200px"

                                }
                            }/>
                        <TextField autoFocus margin="dense"
                            //value={sublabel1value}
                            id="subLabel"
                            label="Sub Label"
                            //disabled={false}
                            style={
                                {
                                    marginLeft: "20px",
                                    width: "200px"
                                }
                            }/>

                        <FormControl sx={
                            {
                                m: 1,
                                minWidth: 120
                            }
                        }>
                            <InputLabel id="structure-element-orientation-select-label"
                                style={
                                    {marginLeft: "20px"}
                            }>
                                Orientation
                            </InputLabel>
                            <Select labelId="structure-element-orientation-select-label" id="structure-element-orientation-select"
                                value={orientation}
                                label="Orientation"
                                onChange={handleChangeOrientation}
                                style={
                                    {
                                        marginLeft: "20px",
                                        marginTop: "20px",
                                        width: "180px"
                                    }
                                }
                                disabled={
                                    !state.orientationField
                            }>
                                {
                                Constants.OrientationArray.map((test, key) => (
                                    <MenuItem key={key}
                                        value={test}>
                                        {test} </MenuItem>
                                ))
                            } </Select>
                        </FormControl>
                        <TextField autoFocus margin="dense" id="xAxis" label="X-Axis" onChange={ handleXAxisTextFieldChange }
                            style={
                                {
                                    marginLeft: "20px",
                                    width: "120px"
                                }
                            }
                            disabled={
                                !state.x_axisField
                            }/>
                        <TextField autoFocus margin="dense" id="yAxis" label="Y-Axis" onChange={handleYAxisTextFieldChange}
                            style={
                                {
                                    marginLeft: "20px",
                                    width: "120px"
                                }
                            }
                            disabled={
                                !state.y_axisField
                            }/>
                        <TextField autoFocus margin="dense" id="length" label="Length"
                            style={
                                {
                                    marginLeft: "20px",
                                    width: "120px"
                                }
                            }
                            disabled={
                                !state.lengthField
                            }/>
                        <TextField autoFocus margin="dense" id="breadth" label="Breadth"
                            style={
                                {
                                    marginLeft: "20px",
                                    width: "120px"
                                }
                            }
                            disabled={
                                !state.breadthField
                            }/>
                        <TextField autoFocus margin="dense" id="height" label="Height"
                            style={
                                {
                                    marginLeft: "20px",
                                    width: "180px"
                                }
                            }
                            disabled={
                                !state.heightField
                            }/>
                        <TextField autoFocus margin="dense" id="circumference" label="Circumference" type="number" onChange={handleCircumferenceTextFieldChange}
                            style={
                                {
                                    marginLeft: "20px",
                                    width: "120px"
                                }
                            }
                            disabled={
                                !state.circumferenceField
                            }/>
                        <TextField autoFocus margin="dense" id="quantity" label="Quantity" type="number"
                            style={
                                {
                                    marginLeft: "20px",
                                    width: "120px"
                                }
                            }/>
                    </div>
                    <div style={
                        {
                            margin: "10px",
                            padding: "10px"
                        }
                    }>
                        <Button onClick={handleClose}
                            variant="contained"
                            color="primary"
                            style={
                                {
                                    float: "right",
                                    margin: "10px"
                                }
                        }>
                            Cancel
                        </Button>
                        <Button onClick={handleSave}
                            variant="contained"
                            color="primary"
                            style={
                                {
                                    float: "right",
                                    margin: "10px"
                                }
                        }>
                            Save
                        </Button>
                    </div>
                </div>
                <div>
                    <GIElementDataTable/>
                </div>
            </div>
        </div>
    );
}
