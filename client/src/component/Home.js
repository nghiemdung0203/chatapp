import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import socket from '../socket/sockett';
import {Grid, TextField, Box, Button, Typography} from '@material-ui/core';
import LoginIcon from '@mui/icons-material/Login';


const Home = () => {
    const [userName, setUserName] = useState('');
    const [Room, setRoom] = useState('');
    const JoinRoom = () => {
        if (userName !== "" && Room !== "") {
            socket.emit('join', {userName: userName, Room: Room});
        }
    }
    return (
        <div style={{padding: 30}}>
            <>      
                    <Grid container spacing = {5} direction={'column'} justifyContent={'center'} alignItems={'center'} style = {{position: 'absolute', top: "40%"}}>
                        <LoginIcon sx={{ fontSize: 60 }} style = {{margin: "20px"}}/>
                        <Grid>
                            <Typography variant="h4">
                                Welcome to Chat App
                            </Typography>
                        </Grid> 
                        <Box xs={8} sx={{width: 300,maxWidth: '100%'}}>
                            <TextField fullWidth size = "medium" label="User Name" value={userName} onChange={(e) => setUserName(e.target.value)} />
                        </Box>
                        <Box xs={8} sx={{width: 300,maxWidth: '100%',}}>
                            <TextField fullWidth size="medium" label="Room Name" value={Room} onChange={(e) => setRoom(e.target.value)} />
                        </Box>
                        <Grid item xs = {12}>
                            <Link to={`/chat/${userName}/${Room}`}>
                                <Button variant="contained" color='primary' onClick={JoinRoom} size="large">Join Room</Button>
                            </Link>
                        </Grid>
                    </Grid>
            </>
        </div>
    )
}

export default Home