import React, { useState } from 'react';
import { Grid, TextField, Button } from '@mui/material';
import { fetchImage } from '../api/ApiFunctions'; 

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
    const imageData = await fetchImage(inputValues);
    setImageSrc(`data:image/png;base64,${imageData}`); // Convert binary data to a Base64 URL
    setIsLoading(false);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <TextField
          label="Index"
          name="index"
          value={inputValues.index}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Bucket"
          name="bucket"
          value={inputValues.bucket}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Project"
          name="project"
          value={inputValues.project}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Folder"
          name="folder"
          value={inputValues.folder}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Dataset"
          name="dataset"
          value={inputValues.dataset}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Volume"
          name="volume"
          value={inputValues.volume}
          onChange={handleChange}
          fullWidth
        />
        <Button variant="contained" onClick={handleFetch}>Fetch Image</Button>
      </Grid>
    

      <Grid item xs={12} md={6}>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <img src={imageSrc} alt="Fetched" style={{ maxWidth: '100%', maxHeight: '500px' }} />
        )}
      </Grid>
    </Grid>
  );
};

export default DataViewer;
