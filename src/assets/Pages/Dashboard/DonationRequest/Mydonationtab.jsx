import * as React from 'react';
import PropTypes from 'prop-types';
//import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { TabList } from 'react-tabs';
import MydonationTable from './myDonationtable.jsx/MydonationTable';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import useAuth from '../../../Hooks/useAutth/useAuth';
import useAdmin from '../../../Hooks/useAdmin';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs() {
  const axiosPublic=useAxiosPublic()
  const {user}=useAuth()
  let isadmin=useAdmin();
  let admin =isadmin[0];

  const {refetch,data : request=[]}=useQuery({
    queryKey:['request'],
    queryFn: async ()=>{
       if(admin){
        const res = await axiosPublic.get(`/blood-request`)
        return res.data;
       }
       const res = await axiosPublic.get(`/blood-request?email=${user.email}`)
       return res.data;
    }
  })
  const pending =request.filter(item=>item.status ==='pending');
  const inprogress =request.filter(item=>item.status ==='inprogress');
  const done =request.filter(item=>item.status ==='done');
  const canceled =request.filter(item=>item.status ==='canceled');

  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
   <div className='mx-auto'>
     <Box  sx={{ bgcolor: 'background.paper', }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="pending" {...a11yProps(0)} />
          <Tab label="inprogress" {...a11yProps(1)} />
          <Tab label="done" {...a11yProps(2)} />
          <Tab label="cancel" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabList
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
        className={"w-full"}
      >
        <TabPanel  value={value} index={0} dir={theme.direction}>
          <MydonationTable  refetch={refetch} items={pending}></MydonationTable>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
        <MydonationTable refetch={refetch}  items={inprogress}></MydonationTable>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
        <MydonationTable refetch={refetch} items={done}></MydonationTable>
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
        <MydonationTable refetch={refetch} items={canceled}></MydonationTable>
        </TabPanel>
      </TabList>
    </Box>
    
   </div>
  );
}
