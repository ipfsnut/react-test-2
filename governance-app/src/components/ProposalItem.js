// src/components/ProposalItem.js
import React from 'react';
import { ListItem, ListItemText, Button } from '@mui/material';

const ProposalItem = ({ proposal }) => {
  return (
    <ListItem>
      <ListItemText
        primary={proposal.title}
        secondary={`Status: ${proposal.status}`}
      />
      <Button variant="contained" color="primary">
        Vote
      </Button>
    </ListItem>
  );
};

export default ProposalItem;
