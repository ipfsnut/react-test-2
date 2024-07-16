// src/services/api.js

import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export const fetchDAOData = async (address) => {
  console.log(`Fetching DAO data for address: ${address}`);
  try {
    const response = await api.get(`/api/dao-data?address=${address}`);
    console.log('DAO data fetched successfully:', response.data);
    return response;
  } catch (error) {
    console.error('Error fetching DAO data:', error.response || error);
    throw error;
  }
};

export const fetchProposals = async () => {
  console.log('Fetching proposals');
  try {
    const response = await api.get('/api/proposals');
    console.log('Proposals fetched successfully:', response.data);
    return response;
  } catch (error) {
    console.error('Error fetching proposals:', error.response || error);
    throw error;
  }
};

export const fetchVotingPower = async (address, daoId) => {
  console.log(`Fetching voting power for address: ${address}, daoId: ${daoId}`);
  try {
    const response = await api.get(`/api/voting-power?address=${address}&daoId=${daoId}`);
    console.log('Voting power fetched successfully:', response.data);
    return response;
  } catch (error) {
    console.error('Error fetching voting power:', error.response || error);
    throw error;
  }
};

export const fetchStakedAmount = async (address, daoId) => {
  console.log(`Fetching staked amount for address: ${address}, daoId: ${daoId}`);
  try {
    const response = await api.get(`/api/staked-amount?address=${address}&daoId=${daoId}`);
    console.log('Staked amount fetched successfully:', response.data);
    return response;
  } catch (error) {
    console.error('Error fetching staked amount:', error.response || error);
    throw error;
  }
};