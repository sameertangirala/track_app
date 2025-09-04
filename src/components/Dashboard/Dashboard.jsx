import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'

function TwoButtons() {

      const navigate = useNavigate();
    

    const handleButtonClick1 = () => {
        navigate("/log");
    }

    const handleButtonClick2 = () => {
        navigate("/summary")
    }



    return (
        <div className = "button_container">
            <button onClick={handleButtonClick1}> Log </button>
            <button onClick={handleButtonClick2}> Summary </button>
        </div>
    )
}



export default TwoButtons;
