import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './blogmodal.css';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '80vh',
    bgcolor: 'background.paper',
    border: '0',
    boxShadow: 24,
    borderRadius: '1rem',
    p: 4,
    overflow: 'auto'
};


export default function BasicModal(props) {
    const [open, setOpen] = React.useState(true);
    const [activeData, setActiveData] = React.useState({});
    const navigate = useNavigate();
    const data = props.data;

    const title = useParams();
    const readyTitle = title.title.split("-")[0];

    const datahazirlama = () => {
        var i;
        for (i in data) {
            if (i === readyTitle) {
                data[i].forEach(element => {
                    if (element.title === title.title) {
                        console.log(element);
                        setActiveData(element);
                    }
                });
            }
        }
    }

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        navigate("/blog");
        setOpen(false);
    }

    useEffect(() => {
        if (open) {
            handleOpen();
        }
        datahazirlama();
    }, [open, data.length]);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} className="modal-content">
                <h2>{activeData.title}</h2>
                <hr />
                <img src={activeData.img} alt="img"></img>
                <p>{activeData.text}</p>
                <hr />
                <h3>Comment?</h3>
                <IconButton sx={{ position: 'absolute', top: '15px', right: '15px' }} onClick={handleClose}>
                    <CloseIcon fontSize='large' />
                </IconButton>
            </Box>
        </Modal>
    );
}