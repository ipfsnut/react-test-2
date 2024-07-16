// src/components/DAOInfo.js
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

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


export default DAOInfo;