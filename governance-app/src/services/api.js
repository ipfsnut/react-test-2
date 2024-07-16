// src/services/api.js

import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export const fetchDAOData = (address) => {
  console.log(`Fetching DAO data for address: ${address}`);
  return api.get(`/api/dao-data?address=${address}`);
};

export const fetchProposals = () => {
  console.log('Fetching proposals');
  return api.get('/api/proposals');
};

export const fetchVotingPower = (address, daoId) => {
  console.log(`Fetching voting power for address: ${address}, daoId: ${daoId}`);
  return api.get(`/api/voting-power?address=${address}&daoId=${daoId}`);
};

export const fetchStakedAmount = (address, daoId) => {
  console.log(`Fetching staked amount for address: ${address}, daoId: ${daoId}`);
  return api.get(`/api/staked-amount?address=${address}&daoId=${daoId}`);
};