// src/pages/Proposals.js
import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import ProposalList from '../components/ProposalList';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { fetchProposals } from '../services/api';

const Proposals = () => {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProposals = async () => {
      try {
        const response = await fetchProposals();
        setProposals(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch proposals');
        setLoading(false);
      }
    };

    getProposals();
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Proposals
      </Typography>
      <ProposalList proposals={proposals} />
    </Container>
  );
};

export default Proposals;