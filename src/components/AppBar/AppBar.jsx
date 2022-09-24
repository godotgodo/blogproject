import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Tab from '@mui/material/Tab';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { NavLink } from "react-router-dom";
import './appbar.css';
import Modal from '@mui/material/Modal';
import { useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { deleteFavorite } from '../../store/favoritesSlice';

const pages = [{ name: 'Home', path: '/' },
{ name: 'Contact', path: '/contact' },
{ name: 'Blog', path: '/blog' }
];

const favoritemodalstyle = {
    position: 'absolute',
    top: '173px',
    right: '-100px',
    transform: 'translate(-50%, -50%)',
    width: 200,
    height: 200,
    maxHeight: 300,
    overflow: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius:'1rem',
    p: 0,
};

const ResponsiveAppBar = (props) => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const dispatch = useDispatch();

    //favoritemodal
    const [open, setOpen] = React.useState(false);
    const favoritePosts = useSelector((state) => state.favorites.value);
    

    const silFavorilerden=async(favPost)=>{
        dispatch(deleteFavorite(favPost));
    }

    const handleOpen = () => {
        setOpen(true)
    };
    const handleClose = () => setOpen(false);

    

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = (e) => {
        setAnchorElNav(null)
    };


    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                                    <NavLink to={page.path}><Typography textAlign="center">{page.name}</Typography></NavLink>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <NavLink key={page.name} to={page.path} className='navlink'>
                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                    value={page.name}
                                >
                                    {page.name}
                                </Button>
                            </NavLink>
                        ))}
                    </Box>
                    <Tab onClick={() => {
                        handleOpen();
                    }} icon={<FavoriteIcon />} label="FAVORITES" />
                    <Modal 
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={favoritemodalstyle} className={'fav-modal'}>
                            <ul>
                                {
                                    favoritePosts.map((favPost) =>
                                        <li className='fav-li' key={favPost.img}>
                                            <h3 key={favPost.title}>{favPost.title}</h3>
                                            <IconButton onClick={()=>{silFavorilerden(favPost)}}>
                                                <DeleteIcon/>
                                            </IconButton>
                                        </li>
                                    )
                                }
                            </ul>
                        </Box>
                    </Modal>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;
