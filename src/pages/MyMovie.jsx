import { Button } from '@mui/material';
import { useParams } from 'react-router-dom';

function MyMovie() {
    const { id } = useParams();
    const gotoBack = () => {
        window.history.back();
    };
    return (
        <div>
            <video autoPlay loop muted poster="/images/image1.png">
                <source src={`/movie/${id}.mp4`} type="video/mp4" />
            </video>
            <Button variant="contained" color="success" onClick={gotoBack}>
                Go Back
            </Button>
        </div>
    );
}

export default MyMovie;
