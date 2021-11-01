import React, { useEffect } from 'react';
import { DataGrid, GridToolbar, useGridSlotComponentProps } from '@material-ui/data-grid';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import Pagination from '@mui/material/Pagination';
import * as Constants from '../utils/Constants';

import GIUpdateFormContainer from './GIUpdateFormContainer';
import './GIUpdateFormContainer.css';
import './DataTable.css';

const axios = require('axios');
let result=localStorage.getItem('login');
//alert(result);
//const src = ;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const columns = [
    // {
    //     field: 'ID',
    //     hide:true
    // },
    {
        field: 'Sl_No',
        headerName: 'Sl No.',
        headerClassName: 'column-header',
        width: 120,
        editable: false,
    },
    {
        field: 'StructureCode',
        headerName: 'Structure Code',
        headerClassName: 'column-header',
        width: 400,
        editable: false,
    },
    {
        field: 'DateOfNotification',
        headerName: 'Date of 11(1) Notification',
        headerClassName: 'column-header',
        width: 200,
        editable: false,
    },
    {
        field: 'OwnerName',
        headerName: 'Owner Name',
        headerClassName: 'column-header',
        sortable: true,
        width: 300,
    }, {
        field: 'CreatedOn',
        headerName: 'Created On',
        headerClassName: 'column-header',
        sortable: true,
        width: 180,
    },
];



function CustomPagination() {
    const { state, apiRef } = useGridSlotComponentProps();
    const classes = useStyles();
    

    return (
        <Pagination
            className={classes.root}
            color="primary"
            count={state.pagination.pageCount}
            page={state.pagination.page + 1}
            onChange={(event, value) => apiRef.current.setPage(value - 1)}
        />
    );
}

export default function DataTable() {
    const classes = useStyles();
    const [pageSize, setPageSize] = React.useState(20);
    const [open, setOpen] = React.useState(false);
    const [rows, setRows] = React.useState([]);
    const[rowId,setrowID]=React.useState('');

    React.useEffect(() => {
      //  alert("Function called");
        axios.get(Constants.url+'UKP/rest/endpoints/GetAllGenInfoV2')
        .then(function (response) {
           setRows(response.data.mGenInfoReportModel);
        })
        .catch(function (error) {
            if (error.response) {
                alert(error.response.data);
                alert(error.response.status);
                alert(error.response.headers);
            } else if (error.request) {
                alert("Error Request: " + error.request);
                alert('Error: ' + error.message);
            } else {
                alert('Error: ' + error.message);
            }
        });
       
    }, [])

   
   
   
    const handleCellDoubleClick = (params, event) => {
       // alert(event + " $$$ " + params.row.ID);
        localStorage.removeItem('dsrid');
        localStorage.removeItem('generalInfoID');
       setrowID(params.row.ID);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        return (
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    District has been added successfully!
                </Alert>
            </Snackbar>
        );
    }

    return (
        <div>
            <div style={{ height: 450, width: '100%' }}>
                <DataGrid
                 getRowId={(r) => r.ID}
                    rows={rows}
                    rowHeight={30}
                    columns={columns}
                    pageSize={pageSize}
                    Pagination
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[10, 20, 50, 100]}
                    pagination
                    disableSelectionOnClick
                    onCellDoubleClick={handleCellDoubleClick}
                    scrollbarSize={5}
                    components={{
                        Toolbar: GridToolbar,
                        Pagination: CustomPagination,
                    }}
                />
            </div>
            <div>
                <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                Update General Information
                            </Typography>
                            <Button autoFocus color="inherit" onClick={handleClose}>
                                save
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <div>
                        <GIUpdateFormContainer value={rowId}/>
                    </div>
                </Dialog>
            </div>
        </div>
    );
}
