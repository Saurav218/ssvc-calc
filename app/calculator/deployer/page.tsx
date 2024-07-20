'use client';

import React from 'react';
import { Container, Box, Typography, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { usePriority } from './usePriority';
import { exploitations, exposures, humanImpacts, valueDensities, automatables } from './priority';

export default function DeployerPage() {
  const { formState, priority, handleChange, handleSubmit } = usePriority();

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          SSVC Calculator - Deployer
        </Typography>
        <form>
          {['exploitation', 'exposure', 'automatable', 'valueDensity', 'humanImpact'].map((field) => (
            <FormControl fullWidth margin="normal" key={field}>
              <InputLabel id={`${field}-label`}>{field}</InputLabel>
              <Select
                labelId={`${field}-label`}
                id={field}
                name={field}
                value={formState[field]}
                onChange={handleChange}
              >
                {field === 'exploitation' && exploitations.map(option => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
                {field === 'exposure' && exposures.map(option => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
                {field === 'automatable' && automatables.map(option => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
                {field === 'valueDensity' && valueDensities.map(option => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
                {field === 'humanImpact' && humanImpacts.map(option => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
              </Select>
            </FormControl>
          ))}
          <FormControl fullWidth margin="normal">
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Check Priority
            </Button>
          </FormControl>
        </form>
        {priority && (
          <Box mt={4} className="result">
            <Typography variant="h6">SSVC Priority: {priority}</Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
}
