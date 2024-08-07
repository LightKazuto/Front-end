"use client";
import ButtonAppBar from '../../components/Header';
import LandingPage from '../../components/landing-page';
import Grid from '../../components/grid';

function Dashboard() {

    return (
        <div>
            <div>
            <ButtonAppBar />
            </div>

            <div>
                <LandingPage />
            </div>

            <div>
                <Grid />
            </div>
        </div>
    )
}

export default Dashboard