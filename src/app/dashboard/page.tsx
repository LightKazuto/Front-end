"use client";
import ButtonAppBar from '@/components/Header';
import { Routes, Route } from "react-router-dom";

function Dashboard() {

    return (
        <div>
            <Routes>
                <Route path="/" element={<ButtonAppBar />} />
            </Routes>
        </div>
    )
}

export default Dashboard