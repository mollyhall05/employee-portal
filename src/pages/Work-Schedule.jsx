import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {Menu, MenuItem} from "@mui/material";
import {database,collection, addDoc, getDocs, deleteDoc, doc, updateDoc} from "../firebase_setup/firebase";
import './styles/Work-Schedule.css';
import fdmLogo from './styles/images/FDMlogo.png';

function WorkSchedule() {

    const [events, setEvents] = useState([
        {id: 1, title: "Current Day", start: new Date() }
    ]);

    const [menu, setMenu] = useState(null)
    const [selectedEvent, setSelectedEvent] = useState(null)

    const eCollection = collection(database, "events")

    useEffect(() => {
        const fetchEvents = async() => {
            const eventSnap = await getDocs(eCollection);
            const eventList = eventSnap.docs.map(doc => ({ id: doc.id, title: doc.data().title, start: doc.data().start}))
            setEvents(eventList);
        };
        fetchEvents();
    }, []);

    const inputEvent = async (selectedDate) => {
        let title = prompt("Enter the event title");
        const user=JSON.parse(localStorage.getItem("user"));
        const username= user?.name||"Unknown User";
        if (title) {
            const newEvent = {
                title,
                start: selectedDate.date.toISOString(),
                Owner: username

            }
            const docRef = await addDoc(eCollection, newEvent);
            setEvents([...events, { id: docRef.id, ...newEvent }]);
        }
    };


    const renameEvent = async() => {

        let newName = prompt("Update event with a suitable name")

        if(!newName) return;

        const eventId = selectedEvent.event.id;

        await updateDoc(doc(database, "events", eventId), {title: newName })

        setEvents(events.map(event => event.id === eventId
            ? { ...event, title: newName }
            : event
        ));
        menuClose();
    };

    const deleteEvent = async () => {
        const eventId = selectedEvent.event.id;
        if (!eventId) return;

        const formattedDate = new Date(selectedEvent.event.start).toLocaleString();
        if (window.confirm(`Are you sure you want to delete: ${selectedEvent.event.title} on ${formattedDate}?`))
        {
            await deleteDoc(doc(database, "events", eventId))
            setEvents(events.filter(event => event.id !== eventId));
        }
        menuClose();
    };

    const viewEvent = () => {

        alert(`The event you're viewing is "${selectedEvent.event.title}" \n Created by: ${selectedEvent.event.extendedProps.Owner}`);
        menuClose();
    }

    const menuOpen = (event, selectedEvent) => {
        setMenu({
            mouseX: event.clientX + 10,
            mouseY: event.clientY + 10,
        });
        setSelectedEvent(selectedEvent);
    };

    const menuClose= () => {
        setMenu(null);
        setSelectedEvent(null);
    };

    return(
        <div className="schedule-container">
            <div className="schedule-header"> 
                <img src={fdmLogo} alt="FDM Logo" className="logo" />
                <br/>
                <h2 className="schedule-title">Work Schedule</h2>
                <Link to={"/consultant-dashboard"}className="back-link">Back To Dashboard</Link>
            </div>
            <FullCalendar
                plugins = {[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    start: 'timeGridDay timeGridWeek dayGridMonth',
                    center: 'title',
                    end: 'prev today next'
                }}
                events = {events}
                dateClick = {inputEvent}
                eventClick = {(event) => menuOpen(event.jsEvent, event)}
            />
            <Menu

                anchorReference="anchorPosition"
                anchorPosition ={menu ? {top: menu.mouseY, left: menu.mouseX } : undefined}
                open = {Boolean(menu)}
                onClose = {menuClose}
            >
                <MenuItem onClick={renameEvent}>Rename</MenuItem>
                <MenuItem onClick={viewEvent}>View</MenuItem>
                <MenuItem onClick={deleteEvent}>Delete</MenuItem>
            </Menu>
        </div>
    );
}

export default WorkSchedule;