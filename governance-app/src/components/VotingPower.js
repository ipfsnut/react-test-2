// src/components/VotingPower.js
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const VotingPower = ({ votingPower }) => {
  if (!votingPower) return null;

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          Your Voting Power
        </Typography>
        <Typography variant="h4">
          {votingPower.power ? BigInt(votingPower.power).toLocaleString() : 'N/A'}
        </Typography>
        <Typography variant="body2">
          At height: {votingPower.height || 'N/A'}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default VotingPower;