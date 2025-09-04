import React, {useState, useEffect} from 'react'
import { LuPiano } from "react-icons/lu"
import axios from 'axios'
import './Log.css'
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"


function Log() {
    const[form, setForm] = useState({
        date: "",
        piece_name: "",
        duration: "",
    })

    const [logs, setLogs] = useState([]);
    const token = localStorage.getItem("access")

    useEffect(() => {
        axios.get("http://127.0.0.1:8001/api/logs/week/", {
            headers: { Authorization: `Bearer ${token}`},
        })
        .then(res => setLogs(res.data))
        .catch(err => console.error(err))
    }, [token])

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://127.0.0.1:8001/api/logs/", form, {
            headers: { Authorization: `Bearer ${token}` },
          })
        .then(res => {
            setLogs([res.data,...logs]);
            setForm({ date: "", piece_name: "", duration: "" })
        })
        .catch(err => console.error(err))
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text("Weekly Piano Practice Log", 14, 15);

        
        const tableRows = logs.map(log => [
            log.date,
            log.piece_name,
            log.duration
        ]);

        autoTable(doc, {
            head: [["Date", "Piece Name", "Duration (min)"]],
            body: tableRows,
            startY: 20,
        });

        doc.save("weekly_practice_log.pdf");

    }

    const deleteRecords = () => {
        axios.delete("http://127.0.0.1:8001/api/logs/delete_all/", {
            headers: { Authorization: `Bearer ${token}`},
        })
        setLogs([])
    }

    return (
        <div className='form'> 
            <h2> Piano Practice Log </h2>
            <form onSubmit={handleSubmit}>
                <h2> Date: <input type="date" name="date" value={form.date} onChange={handleChange} required /> </h2>
                <h2> Piece Name: <input type="text" name="piece_name" value={form.piece_name} onChange={handleChange} required /> </h2>
                <h2> Duration: <input type="text" name="duration" value={form.duration} onChange={handleChange} required /> </h2>
            <button type="submit"> Add Log </button>
            </form>

            <div>
            <h3>Form Data:</h3>
            <p>Date: {form.date}</p>
            <p>Piece Name: {form.piece_name}</p>
            <p>Duration: {form.duration}</p>
          </div>

          <button onClick={generatePDF} style={{marginTop: "20px"}}>
            Generate PDF
          </button>

          <button onClick={deleteRecords} style={{marginTop:"20px"}}>
                Delete all records
          </button>

          <LuPiano className='piano_icon'/>

        </div>

        
    )
}

export default Log
