import React from 'react';

import { useHistory } from "react-router-dom";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { styled,makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Tooltip from '@mui/material/Tooltip';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
//import FileUploadIcon from '@mui/icons-material/FileUpload';
import * as Constants from '../utils/Constants';

import GIAdditionalInfoTabs from './GIAdditionalInfoTabPanel';
import FloorPlan from './GenerateFloorPlan';
import PrintableReportGeneralInfo from '../printComponent/ReportGeneralInfo';
import PrintableReportFieldMeasurements from '../printComponent/ReportFieldMeasurements';
import './GIUpdateFormContainer.css';
const axios = require('axios');

const src=Constants.url+'UKP/rest/endpoints/GetReport';



const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 260,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    formControlSmall: {
        margin: theme.spacing(2),
        minWidth: 120,
    },
}));

const Input = styled('input')({
    display: 'none',
});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function GIInputFormContainer(params) {
 // alert("GIInputFormContainer "+params.DsrID);
 const [generalInfoID,setGeneralInfoID]=React.useState(params.value);
 const[dsrid,setdsrid]=React.useState('');
 let history = useHistory();
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [taluks, setTaluks] = React.useState([]);
    const [villages, setVillages] = React.useState([]);
    const [dsr, setDSR] = React.useState([]);
    const [structureType, setStructureType] = React.useState('');
    const [ownerName, setOwnerName] = React.useState('');
    const [referenceNumber, setReferenceNumber] = React.useState('');
    const [structureCode, setStructureCode] = React.useState('');
    const[Row,setRows]=React.useState([]);
	const [openDrawing, setOpenDrawing] = React.useState(false);
    const [openReportGI, setOpenReportGI] = React.useState(false);
    const [openReportFieldMeasurements, setOpenReportFieldMeasurements] = React.useState(false);

    const [age, setAge] = React.useState('');

   

    // axios.get('http://localhost:8080/UKP/rest/endpoints/GetReport?GenInfoID',{
    //     params:{
    //         GenInfoID:params.value 
    //     }
    // }).then(res=>{
    //     alert(res.data);

    // }).catch(err=>{
    //     alert(err);

    // })

  //  alert(params.value);
 
  localStorage.setItem('id', params.value);
 // localStorage.removeItem('dsrid');
  
    React.useEffect(() => {
          axios.get(Constants.url+'UKP/rest/endpoints/GetReport',{
              params:{
                GenInfoID:params.value
              }
          })
          .then(function (response) {
            // alert('test1--> '+response.data.mGenInfoReport.OwnerName)
            setOwnerName(response.data.mGenInfoReport.OwnerName);
            setStructureCode(response.data.mGenInfoReport.StructureTypeCode);
            setReferenceNumber(response.data.mGenInfoReport.Reference)
            setDSR(response.data.mGenInfoReport.dsrCode);
            setdsrid(response.data.mGenInfoReport.DsrID);
              localStorage.setItem('dsrid', response.data.mGenInfoReport.DsrID);
              localStorage.setItem('generalInfoID', params.value);

         //  alert("dsrid "+dsrid+" "+response.data.mGenInfoReport.DsrID);
          

          })
          .catch(function (error) {
              if (error.response) {
                  alert("Error "+error.response.data);
                  alert("Error "+error.response.status);
                  alert("Error "+error.response.headers);
              } else if (error.request) {
                  alert("Error Request: " + error.request);
                  alert('Error: ' + error.message);
              } else {
                  alert('Error: ' + error.message);
              }
          });
         
      }, [])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClickGeneralInfo =()=>{
        setOpenReportGI(true);
        
    }

    const handleClickOpenEditGeneralInfo=()=>{
        setOpenReportFieldMeasurements(true);
    }
	
	const handleClose = () => {
        setOpenDrawing(false);
        setOpenReportGI(false);
        setOpenReportFieldMeasurements(false);
    };

    const handleChange = (event) => {
        setStructureType(event.target.value);
    };
	
	const handleClickOpenDrawing = () => {
        setOpenDrawing(true);
    };

    //#cee2f0
    return (
        <React.Fragment>
            <CssBaseline />
            <Container fixed>
                <Typography component="div" style={{ borderRadius: '20px', borderStyle: 'groove', backgroundColor: '#FFFFFF', boxShadow: '3px 3px', height: '203vh', width: '80%', marginLeft: '120px' }}>
                    <div>
                        <div class="fixed-top-form">
                            <div class="upadate-gi-row">
                                <div class="upadate-gi-col-1">
                                    <FormControl className={classes.formControl}>
                                        <TextField
                                            required
                                            id="ownerName"
                                            label="Owner Name"
                                            variant="outlined"
                                            value={ownerName}
                                            size="small"
                                            style={{ width: '850px', paddingTop: '8px' }}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                    </FormControl>
                                </div>
                            </div>
                            <div class="upadate-gi-row">
                                <div class="upadate-gi-col-1">
                                    <FormControl className={classes.formControl}>
                                        <TextField
                                            id="referenceNumber"
                                            label="Reference (VPC/UKP Number)"
                                            variant="outlined"
                                            size="small"
                                            value={referenceNumber}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            style={{ paddingTop: '8px' }}
                                        />
                                    </FormControl>
                                </div>
                                <div class="upadate-gi-col-2">
                                    <FormControl className={classes.formControl}>
                                        <TextField
                                            id="structureCode"
                                            label="Structure Code"
                                            variant="outlined"
                                            size="small"
                                            value={structureCode}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            style={{ paddingTop: '8px' }}
                                        />
                                    </FormControl>
                                </div>
                                <div class="upadate-gi-col-3">
                                    <FormControl className={classes.formControl}>
                                        <TextField
                                            id="dsr"
                                            label="DSR Label"
                                            variant="outlined"
                                            size="small"
                                            value={dsr}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            style={{ paddingTop: '8px' }}
                                        />
                                    </FormControl>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="upadate-gi-row-small">
                        <div class="upadate-gi-col-small">
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<AddIcon />}
                                style={{
                                    float: 'left',
                                    top: '3px'
                                }}
                                onClick={handleClickOpen} >
                                Edit General Info
                            </Button>
                        </div>
                        
                        <div class="upadate-gi-col-small-1">
                            <Button
                                 variant="contained"
                                 color="primary"
                                style={{
                                    float: 'left',
                                    top: '3px'
                                }}
                                onClick={handleClickOpenDrawing}
                            >
                                Open Drawing
                            </Button>
                        </div>
                        <div class="upadate-gi-col-small-2">
                            <label htmlFor="upload-document-label">
                                <Input accept="*" id="upload-document-label" multiple type="file" />
                                <Button
                                     variant="contained"
                                     color="primary"
                                    startIcon={<FileUploadIcon />}
                                    style={{
                                        float: 'left',
                                        top: '3px'
                                    }}
                                >
                                    Upload Document
                                </Button>
                            </label>
                        </div>
                        <div class="upadate-gi-col-small">
                            <Button
                                variant="contained"
                                color="primary"
                                style={{
                                    float: 'left',
                                    top: '3px'
                                }}
                                onClick={handleClickGeneralInfo}
                            >
                                Report - General Info
                            </Button>
                        </div>
                        <div class="upadate-gi-col-small-button">
                            <Button
                                variant="contained"
                                color="primary"
                                style={{
                                    float: 'left',
                                    top: '10px'
                                }}
                                onClick={handleClickOpenEditGeneralInfo}
                            >
                                Report - Field Measurement
                            </Button>
                        </div>
                    </div>

                    <div class="row-small-bottom-grid1">
                        <GIAdditionalInfoTabs generalInfoID={generalInfoID} dsrID={dsrid}/>
                    </div>
					<div>
                        <Dialog fullScreen open={openDrawing} onClose={handleClose} TransitionComponent={Transition}>
                            <AppBar className={classes.appBar}>
                                <Toolbar>
                                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                                        <CloseIcon />
                                    </IconButton>
                                    <Typography variant="h6" className={classes.title}>
                                        Floor Plan For - {ownerName}
                                    </Typography>
                                </Toolbar>
                            </AppBar>
                            <div>
                                <FloorPlan generalInfoID={generalInfoID} structureCode={structureCode} ownerName={ownerName} />
                            </div>
                        </Dialog>
                    </div>
                    <div>
                        <Dialog fullScreen open={openReportGI} onClose={handleClose} TransitionComponent={Transition}>
                            <AppBar className={classes.appBar}>
                                <Toolbar>
                                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                                        <CloseIcon />
                                    </IconButton>
                                    <Typography variant="h6" className={classes.title}>
                                        General Information Report For - {ownerName}
                                    </Typography>
                                </Toolbar>
                            </AppBar>
                            <div>
                                <PrintableReportGeneralInfo generalInfoId={params.value} />
                            </div>
                        </Dialog>
                    </div>
                    <div>
                        <Dialog fullScreen open={openReportFieldMeasurements} onClose={handleClose} TransitionComponent={Transition}>
                            <AppBar className={classes.appBar}>
                                <Toolbar>
                                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                                        <CloseIcon />
                                    </IconButton>
                                    <Typography variant="h6" className={classes.title}>
                                        Field Measurements For - {ownerName}
                                    </Typography>
                                </Toolbar>
                            </AppBar>
                            <div>
                                <PrintableReportFieldMeasurements generalInfoId={params.value} />
                            </div>
                        </Dialog>
                    </div>
                </Typography>
            </Container>
        </React.Fragment>
    );
}