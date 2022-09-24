import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Card from '../Card/Card';
import './Blog.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      className='tabpanel'
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
          {children}
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
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs(props) {
  const [value, setValue] = useState(0);
  const [datam, setDatam] = useState([]);
  const [showData, setshowData] = useState(false);
  const { data } = props;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (data.length !== 0) {
      setDatam(data);
      setshowData(!showData);
    }
  }, [data.length])

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100%', minHeight: '90vh' }}
    >
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider', minWidth: '9rem' }}
      >
        <Tab sx={{ height: '12vh' }} label="Finance" {...a11yProps(0)} />
        <Tab sx={{ height: '12vh' }} label="Software" {...a11yProps(1)} />
        <Tab sx={{ height: '12vh' }} label="Music" {...a11yProps(2)} />
        <Tab sx={{ height: '12vh' }} label="Cinema" {...a11yProps(3)} />
        <Tab sx={{ height: '12vh' }} label="Theatre" {...a11yProps(4)} />
        <Tab sx={{ height: '12vh' }} label="Rock" {...a11yProps(5)} />
        <Tab sx={{ height: '12vh' }} label="Other" {...a11yProps(6)} />
      </Tabs>
      <Outlet />
      <TabPanel value={value} index={0}>
        {
          showData && datam.finance.map((data) => <Card key={data.title} data={data} />)
        }
      </TabPanel>
      <TabPanel value={value} index={1}>
        {
          showData && datam.software.map((data) => <Card key={data.title} data={data} />)
        }
      </TabPanel>
      <TabPanel value={value} index={2}>
        {
          showData && datam.music.map((data) => <Card key={data.title} data={data} />)
        }
      </TabPanel>
      <TabPanel value={value} index={3}>
        {
          showData && datam.cinema.map((data) => <Card key={data.title} data={data} />)
        }
      </TabPanel>
      <TabPanel value={value} index={4}>
        {
          showData && datam.theatre.map((data) => <Card key={data.title} data={data} />)
        }
      </TabPanel>
      <TabPanel value={value} index={5}>
        {
          showData && datam.rock.map((data) => <Card key={data.title} data={data} />)
        }
      </TabPanel>
      <TabPanel value={value} index={6}>
        {
          showData && datam.other.map((data) => <Card key={data.title} data={data} />)
        }
      </TabPanel>
    </Box>
  );
}
