// src/components/StakedAmount.js
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const StakedAmount = ({ stakedAmount }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          Your Staked Amount
        </Typography>
        <Typography variant="h4">
          {stakedAmount}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StakedAmount;
