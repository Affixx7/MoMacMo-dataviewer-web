import React, { useState } from 'react';
import { Grid, TextField, Button } from '@mui/material';
import { fetchImage } from '../api/ApiFunctions'; 
import { Box } from '@mui/system';
import DataHover from '../components/DataHover';
import sample_image from '../components/sample_image.png';

const DataViewer = () => {
  const [inputValues, setInputValues] = useState({
    index: '1',
    bucket: 'momacmos3',
    project: 'momacmo',
    folder: 'meagerdas',
    dataset: '1432_aws_output_filt_5_50_despike',
    volume: '11',
  });
  const [imageSrc, setImageSrc] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  const handleFetch = async () => {
    setIsLoading(true);
    // const imageData = await fetchImage(inputValues);
    const imageData = sample_image;
    setImageSrc(`data:image/png;base64,${imageData}`); // Convert binary data to a Base64 URL
    setIsLoading(false);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
      <Box sx={{m:2}}></Box>
        <TextField
          label="Index"
          name="index"
          value={inputValues.index}
          onChange={handleChange}
          fullWidth
        />
        <Box sx={{m:2}}></Box>
        <TextField
          label="Bucket"
          name="bucket"
          value={inputValues.bucket}
          onChange={handleChange}
          fullWidth
        />
        <Box sx={{m:2}}></Box>
        <TextField
          label="Project"
          name="project"
          value={inputValues.project}
          onChange={handleChange}
          fullWidth
        />
        <Box sx={{m:2}}></Box>
        <TextField
          label="Folder"
          name="folder"
          value={inputValues.folder}
          onChange={handleChange}
          fullWidth
        />
        <Box sx={{m:2}}></Box>
        <TextField
          label="Dataset"
          name="dataset"
          value={inputValues.dataset}
          onChange={handleChange}
          fullWidth
        />
        <Box sx={{m:2}}></Box>
        <TextField
          label="Volume"
          name="volume"
          value={inputValues.volume}
          onChange={handleChange}
          fullWidth
        />
        <Box sx={{m:2}}></Box>
        <Button variant="contained" onClick={handleFetch}>Fetch Image</Button>
      </Grid>
    

      <Grid item xs={12} md={6}>
      <Box sx={{m:2}}></Box>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
            <DataHover src={sample_image} alt="Fetched" />
        //   <img src={imageSrc} alt="Fetched" style={{ maxWidth: '100%', maxHeight: '500px' }} />
        )}
      </Grid>
    </Grid>
  );
};

export default DataViewer;
