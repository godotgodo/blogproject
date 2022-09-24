import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { addFavorite, deleteFavorite } from '../../store/favoritesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard(props) {
  const favoritePostlar = useSelector((state) => state.favorites.value);
  const [expanded, setExpanded] = useState(false);
  const [isFavorite, setisFavorite] = useState(false);
  const [open, setOpen] = React.useState(false);
  const { data } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    if (favoritePostlar.includes(data)) {
      setisFavorite(true);
    }
    else {
      setisFavorite(false);
    }
  }, [favoritePostlar, data]);
  

  const handleExpandClick = () => {
    navigate("/blog/" + data.title);
    setExpanded(!expanded);
  };


  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 600);
  };

  const ekleFavorilere = () => {
    if (!isFavorite) {
      dispatch(addFavorite(data));
    }
    else {
      dispatch(deleteFavorite(data));
    }
    setisFavorite(!isFavorite);
  }

  return (
    <div className='card'>
      <Card sx={{ maxWidth: 345, mb: 4 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              G
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={data.title}
          subheader={data.date}
        />
        <CardMedia
          component="img"
          height="194"
          image={data.img}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {data.abstract}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton sx={() => isFavorite && { color: 'red' }} onClick={() => {
            ekleFavorilere();
          }} aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <ClickAwayListener onClickAway={handleTooltipClose}>
            <div>
              <Tooltip
                PopperProps={{
                  disablePortal: true,
                }}
                onClose={handleTooltipClose}
                open={open}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title="URL copied."
              >
                <IconButton onClick={() => {
                  console.log(document.URL + '/' + data.title + " kopyalama başarılı");
                  navigator.clipboard.writeText(document.URL + '/' + data.title);
                  handleTooltipOpen();
                }} aria-label="share">
                  <ShareIcon />
                </IconButton>
              </Tooltip>
            </div>
          </ClickAwayListener>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <Tooltip title="Open">
              <OpenInFullIcon />
            </Tooltip>
          </ExpandMore>
        </CardActions>
      </Card>
    </div>
  );
}
