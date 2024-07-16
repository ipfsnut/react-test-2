// src/components/ProposalList.js
import React from 'react';
import { List, Typography } from '@mui/material';
import ProposalItem from './ProposalItem';

const ProposalList = ({ proposals }) => {
  return (
    <div>
      <Typography variant="h5" component="div">
        Proposals
      </Typography>
      <List>
        {proposals.map((proposal) => (
          <ProposalItem key={proposal.id} proposal={proposal} />
        ))}
      </List>
    </div>
  );
};

export default ProposalList;