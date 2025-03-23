import React, {useState} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

function WorkSchedule() {

    const [events, setEvents] = useState([
        {id: 1, title: "Current Day", start: new Date() }
    ]);

    const inputEvent = (selectedDate) => {
        let title = prompt("Enter the event title");
        if (title) {

            const newEvent = {
                id: Date.now(),
                title,
                start: selectedDate.date,
                extendedProps: {id: Date.now()}
            }
            setEvents([...events, newEvent]);
        }
    };

    const eventSelection = (selectedEvent) => {

        let eventselect = prompt("What would you like to do here?");

        if (eventselect === "delete")
        {
            deleteEvent(selectedEvent);
        }
        else if (eventselect === "rename" && selectedEvent.event.extendedProps.id)
        {
            renameEvent(selectedEvent);
        }
        else if (eventselect === "view" && selectedEvent.event.extendedProps.id)
        {
            viewEvent(selectedEvent);
        }

    };

    const renameEvent = (selectedEvent) => {

        let newName = prompt("Update event with a suitable name")

        if(!newName) return;

        setEvents(events.map(event => event.id === selectedEvent.event.extendedProps.id
            ? { ...event, title: newName }
            : event
        ));
    };

    const deleteEvent = (selectedEvent) => {

        const eventId = selectedEvent.event.extendedProps.id;
        if (!eventId) return;

        const formattedDate = new Date(selectedEvent.event.start).toLocaleString();
        if (window.confirm(`Are you sure you want to delete: ${selectedEvent.event.title} on ${formattedDate}?`))
        {
            setEvents(events.filter(event => event.id !== eventId));
        }
    };

    const viewEvent = (selectedEvent) => {

        alert(`The event you're viewing is "${selectedEvent.event.title}"`)
    }


    return(
        <div>
            <h2>Work Schedule</h2>
            <FullCalendar
                plugins = {[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    start: 'timeGridDay timeGridWeek dayGridMonth',
                    center: 'title',
                    end: 'today prev next'
                }}
                events = {events}
                dateClick = {inputEvent}
                eventClick = {eventSelection}
            />
        </div>
    );
}

export default WorkSchedule;