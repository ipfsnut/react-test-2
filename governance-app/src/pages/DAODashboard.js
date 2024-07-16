// src/pages/DAODashboard.js

import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  Button
} from '@mui/material';
import { fetchDAOData, fetchVotingPower } from '../services/api';
import { useAuth } from '../hooks/useAuth';

// Helper function to format large numbers
const formatLargeNumber = (num) => {
  if (!num) return 'N/A';
  const n = typeof num === 'string' ? parseInt(num, 10) : num;
  if (isNaN(n)) return 'N/A';
  return n.toLocaleString('en-US');
};

// DAOInfo Component
const DAOInfo = ({ daoInfo }) => {
  if (!daoInfo || !daoInfo.info) return null;

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          DAO Information
        </Typography>
        <Typography variant="body2">
          Contract: {daoInfo.info.contract || 'N/A'}
        </Typography>
        <Typography variant="body2">
          Version: {daoInfo.info.version || 'N/A'}
        </Typography>
      </CardContent>
    </Card>
  );
};

// VotingPower Component
const VotingPower = ({ votingPower }) => {
  if (!votingPower) return null;

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          Your Voting Power
        </Typography>
        <Typography variant="h4">
          {formatLargeNumber(votingPower.power)}
        </Typography>
        <Typography variant="body2">
          At height: {votingPower.height || 'N/A'}
        </Typography>
      </CardContent>
    </Card>
  );
};

// Loading Component
const Loading = ({ message }) => (
  <Typography variant="h5" align="center">{message || 'Loading...'}</Typography>
);

// ErrorMessage Component
const ErrorMessage = ({ message }) => (
  <Typography variant="h5" align="center" color="error">{message}</Typography>
);

// Main DAODashboard Component
const DAODashboard = () => {
  const [daoInfo, setDaoInfo] = useState(null);
  const [subDAOs, setSubDAOs] = useState([]);
  const [votingPower, setVotingPower] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const mountedRef = useRef(true);
  const fetchAttempts = useRef(0);

  const fetchData = async () => {
    console.log("fetchData called", user, "Attempt:", fetchAttempts.current);
    fetchAttempts.current += 1;

    if (fetchAttempts.current > 5) {
      console.log("Max fetch attempts reached. Stopping.");
      setError('Max fetch attempts reached. Please refresh the page.');
      setLoading(false);
      return;
    }

    if (!user || !user.address) {
      console.log("No user address available");
      setError('User address not available');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log("Fetching data...");
      const [daoData, votingPowerData] = await Promise.all([
        fetchDAOData(user.address),
        fetchVotingPower(user.address, process.env.REACT_APP_PAGE_DAO_CONTRACT)
      ]);

      console.log("DAO Data:", daoData);
      console.log("Voting Power Data:", votingPowerData);

      if (!mountedRef.current) return;

      // Update state with fetched data
      setDaoInfo(daoData.data.daoInfo);
      setSubDAOs(daoData.data.subDAOs);
      setVotingPower(votingPowerData.data.votingPower);
    } catch (err) {
      console.error('Error fetching data:', err);
      if (mountedRef.current) {
        setError(err.message || 'Failed to fetch data');
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    console.log("useEffect running");
    fetchData();

    return () => {
      mountedRef.current = false;
    };
  }, [user?.address]);

  console.log("Rendering. Loading:", loading, "Error:", error, "DAO Info:", daoInfo, "Voting Power:", votingPower);

  if (loading) return <Loading message={`Loading... User: ${user?.address || 'No user'}`} />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>DAO Dashboard</Typography>
      <Button
        onClick={fetchData}
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
      >
        Refresh Data
      </Button>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <DAOInfo daoInfo={daoInfo} />
        </Grid>
        <Grid item xs={12} md={6}>
          <VotingPower votingPower={votingPower} />
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>Sub-DAOs</Typography>
              {subDAOs.length > 0 ? (
                <List>
                  {subDAOs.map((subDAO, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={subDAO.addr || 'N/A'}
                        secondary={subDAO.charter || 'No charter'}
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body2">No sub-DAOs found.</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DAODashboard;
