import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function MyPage() {
    const movieList = ['movie1', 'movie2', 'movie3'];

    return (
        <div className="page">
            <img src="main.png" alt="Main" className="main-image" />
            <div className="thumbnail-grid">
                {movieList.map((movie, index) => (
                    <ThumbNail key={index} index={index} movie={movie} />
                ))}
            </div>
        </div>
    );
}

function ThumbNail({ index, movie }) {
    const imageSrc = `/images/image${index}.png`;
    const navigate = useNavigate();
    const handleClick = () => {
        console.log('clicked', movie);
        navigate(`/mymovie/${movie}`);
    };
    return (
        <Card sx={{ maxWidth: 345 }} onClick={handleClick}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="240"
                    image={`/images/image${index}.png`}
                    src="/images/sample.png"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {movie}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles,
                        with over 6,000 species, ranging across all continents
                        except Antarctica
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default MyPage;
