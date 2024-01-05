import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

const DataHover = ({ src, alt }) => {
  const [markers, setMarkers] = useState([]);
  const [rows, setRows] = useState([]);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    const bounds = event.target.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    setCoordinates({ x, y });
  };

  const handleAddMarker = () => {
    const newId = new Date().getTime(); // Unique ID based on timestamp
    const newMarker = { id: newId, name: `Marker ${newId}`, top: coordinates.y, left: coordinates.x };
    setMarkers([...markers, newMarker]);
    setRows([...rows, newMarker]);
  };

  const handleDelete = (id) => {
    setMarkers(markers.filter(marker => marker.id !== id));
    setRows(rows.filter(row => row.id !== id));
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130, editable: true },
    { field: 'top', headerName: 'Top', width: 90 },
    { field: 'left', headerName: 'Left', width: 90 },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      renderCell: (params) => (
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => handleDelete(params.id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div style={{ position: 'relative' }}>
      <img
        src={src}
        alt={alt}
        onMouseMove={handleMouseMove}
        onClick={handleAddMarker}
        style={{ position: 'relative', cursor: 'crosshair' }}
      />
      {markers.map(marker => (
        <div
          key={marker.id}
          style={{
            position: 'absolute',
            top: marker.top,
            left: marker.left,
            width: '10px',
            height: '10px',
            backgroundColor: 'red',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        />
      ))}
      <p>Cursor Position - X: {coordinates.x}, Y: {coordinates.y}</p>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
    </div>
  );
};

export default DataHover;
