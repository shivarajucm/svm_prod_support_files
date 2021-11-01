import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';

//import FieldMeasurementsPanel from './FieldMeasurementsTabPanel';
import FieldMeasurementsPanel from './FieldMeasurementsTabPanel';
import TextEntryPanel from './TextEntryTabPanel';

export default function GIAdditionalInfoTabs(props) {
 //alert("GIAdditionalInfoTabs "+props.dsrlabelID);

const[generalInfoID,setGeneralInfoID]=React.useState(props.generalInfoID);
const[dsrID,setdsrID]=React.useState('');

// React.useEffect(()=>{
//   setdsrID(props.dsrID);
// },[])

  const [value, setValue] = React.useState('1');

  // React.useEffect(()=>{
  //   alert("GIAdditionalInfoTabs "+props.generalInfoID);
  // },[])
 

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  //alert("GIAdditionalInfoTabs "+props.dsrID);

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Field Measurements" value="1" />
            <Tab label="Text Entry" value="2" />
          </TabList>
        </Box>
       
              <TabPanel value="1"><FieldMeasurementsPanel generalInfoID={generalInfoID} dsrID={dsrID}/></TabPanel>
              <TabPanel value="2"><TextEntryPanel generalInfoID={generalInfoID} /></TabPanel>
      </TabContext>
    </Box>
  );
}