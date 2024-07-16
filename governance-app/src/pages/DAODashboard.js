// src/pages/DAODashboard.js

import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  Card, 
  CardContent 
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
  if (!daoInfo) return null;

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          DAO Information
        </Typography>
        <Typography variant="body2">
          Contract: {daoInfo.info?.contract || 'N/A'}
        </Typography>
        <Typography variant="body2">
          Version: {daoInfo.info?.version || 'N/A'}
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
const Loading = () => (
  <Typography variant="h5" align="center">Loading...</Typography>
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

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (!user || !user.address) {
        setError('User address not available');
        setLoading(false);
        return;
      }

      try {
        const [daoData, votingPowerData] = await Promise.all([
          fetchDAOData(user.address),
          fetchVotingPower(user.address, process.env.REACT_APP_PAGE_DAO_CONTRACT)
        ]);

        if (isMounted) {
          setDaoInfo(daoData.data.daoInfo || null);
          setSubDAOs(daoData.data.subDAOs || []);
          setVotingPower(votingPowerData.data.votingPower || null);
        }
      } catch (err) {
        console.error('Error fetching DAO data:', err);
        if (isMounted) setError(err.message || 'Failed to fetch DAO data');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [user]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>DAO Dashboard</Typography>
      <Grid container spacing={3}>
        {daoInfo && (
          <Grid item xs={12}>
            <DAOInfo daoInfo={daoInfo} />
          </Grid>
        )}
        {votingPower && (
          <Grid item xs={12} md={6}>
            <VotingPower votingPower={votingPower} />
          </Grid>
        )}
        {subDAOs.length > 0 && (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>Sub-DAOs</Typography>
                <List>
                  {subDAOs.map((subDAO, index) => (
                    <ListItem key={index}>
                      <ListItemText 
                        primary={subDAO.addr} 
                        secondary={subDAO.charter || 'No charter'} 
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default DAODashboard;