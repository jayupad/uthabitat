// export default function Calendar() {
//     return (
//     <iframe src="https://calendar.google.com/calendar/embed?src=uthabitatforhumanity%40gmail.com&ctz=America%2FChicago" 
//     style={{border: 0}} 
//     width="800" 
//     height="600" 
//     frameBorder="0" 
//     ></iframe>
//     );

// }
// components/CustomCalendar.tsx
'use client'

import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar'
import { format } from 'date-fns/format'
import { parse } from 'date-fns/parse'
import { startOfWeek } from 'date-fns/startOfWeek'
import { getDay } from 'date-fns/getDay'
import React, { useEffect, useState } from 'react'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import '../app/styles/calendar.css'

const locales = { 'en-US': require('date-fns/locale/en-US') }
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales })

type EventType = {
  title: string
  start: Date
  end: Date
}

interface GoogleCalendarEvent {
  start?: { dateTime?: string; date?: string }
  end?: { dateTime?: string; date?: string }
  summary?: string
}

type WithStartEnd = GoogleCalendarEvent & {
    start: NonNullable<GoogleCalendarEvent['start']>
    end: NonNullable<GoogleCalendarEvent['end']>
}

function hasStartEnd(event: GoogleCalendarEvent): event is WithStartEnd {
    return !!event.start && !!event.end
}  

const CALENDAR_ID = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID as string
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY as string

if (!CALENDAR_ID || !API_KEY) {
  throw new Error('Missing required environment variables for Google Calendar')
}

const now = new Date()
const startOfLastYear = new Date(now.getFullYear() - 1, 0, 1) // Jan 1 of last year
const endOfThisYear = new Date(now.getFullYear()+1, 11, 31, 23, 59, 59) // Dec 31 of this year
const views = {month: true}

export default function CustomCalendar() {
  const [events, setEvents] = useState<EventType[]>([])
  
  useEffect(() => {
    const fetchEvents = async () => {
      const params = new URLSearchParams({
        key: API_KEY,
        timeMin: startOfLastYear.toISOString(),
        timeMax: endOfThisYear.toISOString(),
        singleEvents: 'true',       // Expands recurring events into individual instances
        orderBy: 'startTime',       // Optional: orders by date
      })
      const res = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?${params}`
      )
      const data = await res.json()
      
      data.items.forEach((event: GoogleCalendarEvent) => {
        if (!event.start || !event.end) {
          console.warn('Skipping event with missing start/end:', event)
        }
      })
      
      const mappedEvents = data.items
        .filter(hasStartEnd)
        .map((event: GoogleCalendarEvent & { start: NonNullable<GoogleCalendarEvent['start']>, end: NonNullable<GoogleCalendarEvent['end']> }) => ({
          title: event.summary || 'Untitled Event',
          start: new Date(event.start.dateTime || event.start.date || ''),
          end: new Date(event.end.dateTime || event.end.date || ''),
        }))
      console.log(mappedEvents)
      setEvents(mappedEvents)
    }
    fetchEvents()
  }, [])

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        className="bg-white rounded shadow"
        style={{ height: 600 }}
        views={['month']}
      />
    </div>
  )
}