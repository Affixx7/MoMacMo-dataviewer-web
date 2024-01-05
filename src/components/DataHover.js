import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const DataHover = ({ src, alt }) => {
  const [markers, setMarkers] = useState([]);
  const [rows, setRows] = useState([]);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [counter, setCounter] = useState(0);

  const handleMouseMove = (event) => {
    const bounds = event.target.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    setCoordinates({ x, y });
  };

    const handleAddMarker = () => {
        const newId = counter; // Use the current counter value
        setCounter(counter + 1); // Increment the counter

        const newMarker = {
        id: newId,
        name: `Marker ${newId}`,
        top: coordinates.y,
        left: coordinates.x
        };

        setMarkers(prevMarkers => [...prevMarkers, newMarker]);
        setRows(prevRows => [...prevRows, newMarker]);
    };

  const handleDelete = (id) => {
    setMarkers(markers.filter(marker => marker.id !== id));
    setRows(rows.filter(row => row.id !== id));
  };

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1, editable: true },
    { field: 'top', headerName: 'Top', flex: 1 },
    { field: 'left', headerName: 'Left', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      renderCell: (params) => (
        <IconButton 
          onClick={() => handleDelete(params.id)}
        //   color="primary"
          aria-label="delete"
        >
          <DeleteIcon />
        </IconButton>
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
