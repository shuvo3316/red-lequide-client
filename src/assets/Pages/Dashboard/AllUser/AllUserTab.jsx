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
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAutth/useAuth';
import useAxiosSecure from '../../../Hooks/useaxiosSecure';
import AllUserTable from './AllUserTable';

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

export default function FullWidthTabs2() {
  const axiosSecure=useAxiosSecure()
  //const {user}=useAuth()

  const {refetch,data:users=[]}=useQuery({
    queryKey:['users'],
    queryFn: async ()=>{
        const res = await axiosSecure.get(`/users`)
        return res.data;
    }
  })
//   const pending =request.filter(item=>item.status ==='pending');
//   const inprogress =request.filter(item=>item.status ==='inprogress');
  const blocked =users.filter(item=>item.status ==='blocked');
  const active =users.filter(item=>item.status ==='active');


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
          <Tab label="active" {...a11yProps(0)} />
          <Tab label="blocked" {...a11yProps(1)} />
          
        </Tabs>
      </AppBar>
      <TabList
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
        className={"w-full"}
      >
        <TabPanel  value={value} index={0} dir={theme.direction}>
            <AllUserTable items={active} refetch={refetch}></AllUserTable>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
        <AllUserTable items={blocked} refetch={refetch}></AllUserTable>

        </TabPanel>
       
      </TabList>
    </Box>
    
   </div>
  );
}
