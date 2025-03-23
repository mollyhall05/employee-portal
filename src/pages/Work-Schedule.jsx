import React, {useState} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

function WorkSchedule() {

    const [events, setEvents] = useState([
        {id: 1, title: "Meeting", start: new Date() }
    ]);

    const inputEvent = (selectedDate) => {
        let title = prompt("Enter the event title");
        if (title) {

            const newEvent = {
                id: Date.now(),
                title,
                start: selectedDate.date
            }
            setEvents([...events, newEvent]);
        }
    };


    return(
        <div>
            <h2>Work Schedule</h2>
            <FullCalendar
                plugins = {[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    start: 'timeGridDay, timeGridWeek, dayGridMonth',
                    center: 'title',
                    end: 'today prev, next'
                }}
                events = {events}
                dateClick = {inputEvent}
            />
        </div>
    );
}

export default WorkSchedule;