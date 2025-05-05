import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { PostInterface } from '@/postInterface';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import CommentIcon from '@mui/icons-material/Comment';
import Link from 'next/link';
import Image from 'next/image';
import ClearIcon from '@mui/icons-material/Clear';
import { useDispatch } from 'react-redux';
import { storeDispatch } from '@/redux/store';
import { deletePost } from '@/redux/slices/postsSlice';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));


export default function Post({ postDetails, isComments = false }: { postDetails: PostInterface, isComments?: boolean }) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    let dispatch = useDispatch<storeDispatch>()

    return (
        <Card sx={{ m: 4, p: 2 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        <Image src={postDetails.user.photo} alt={postDetails.user.name} style={{ width: '100%', height: 'auto' }} width={200} height={200} />
                    </Avatar>
                }
                action={
                    <IconButton onClick={() => dispatch(deletePost(postDetails._id))} aria-label="settings">
                        <ClearIcon sx={{ color: "red" }} />
                    </IconButton>
                }
                title={postDetails.user.name}
                subheader={postDetails.createdAt}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {postDetails.body}
                </Typography>
            </CardContent>
            {postDetails.image && <Image src={postDetails.image} alt={postDetails.body} style={{ width: '100%', height: 'auto', maxHeight: '250px', objectFit: 'cover' }} width={400} height={200} />
            }
            <CardActions sx={{ display: 'flex', justifyContent: 'space-around' }} >
                <IconButton aria-label="add to favorites">
                    <ThumbUpOffAltIcon />
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <CommentIcon />
                </ExpandMore>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                {postDetails.comments.length > 0 && isComments == false ? <>

                    <CardContent sx={{ backgroundColor: '#eee' }}>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                    R
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title={postDetails.comments[0].commentCreator.name}
                            subheader={postDetails.comments[0].createdAt}
                        />
                        <Typography >
                            {postDetails.comments[0].content}

                        </Typography>
                    </CardContent>
                    <Typography sx={{ textAlign: 'right' }}><Link href={'/postdetails/' + postDetails._id} > Show More </Link></Typography>
                </>
                    : postDetails.comments.map((Comment) => <CardContent key={Comment._id} sx={{ backgroundColor: '#eee' }}>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                    R
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title={Comment.commentCreator.name}
                            subheader={Comment.createdAt}
                        />
                        <Typography >
                            {Comment.content}

                        </Typography>
                    </CardContent>)}


            </Collapse>
        </Card>
    );
}
