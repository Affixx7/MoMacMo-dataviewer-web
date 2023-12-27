import React, { useEffect, useState } from 'react';
import { list } from '@aws-amplify/storage';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

const S3FileList = () => {

    const [files, setFiles] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const result = await list('photos/', { level: 'private', bucket: 'momacmos3' });
                setFiles(result);
            } catch (err) {
                console.error('Error fetching files from S3', err);
                setError('Error fetching files');
            }
        };

        fetchFiles();
    }, []);

    return (
        <div>
            {error && <p>Error: {error}</p>}
            <List component="nav" aria-label="mailbox folders">
                {files.map((file, index) => (
                    <React.Fragment key={file.key}>
                        <ListItem button>
                            <ListItemText primary={file.key} />
                        </ListItem>
                        {index < files.length - 1 && <Divider />}
                    </React.Fragment>
                ))}
            </List>
        </div>
    );
};

export default S3FileList;
