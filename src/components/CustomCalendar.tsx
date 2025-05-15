'use client'

import { Calendar, dateFnsLocalizer, ToolbarProps } from 'react-big-calendar'
import { format } from 'date-fns/format'
import { parse } from 'date-fns/parse'
import { startOfWeek } from 'date-fns/startOfWeek'
import { getDay } from 'date-fns/getDay'
import { enUS } from 'date-fns/locale/en-US'
import React, { useEffect, useState, useRef } from 'react'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import '../app/styles/calendar.css'
import { addMonths } from 'date-fns'

const locales = { 'en-US': enUS }
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales })

type EventType = {
  title: string
  modalTitle: string
  start: Date
  end: Date
  allDay: boolean
  description?: string
  location?: string
  htmlLink: string
}

interface GoogleCalendarEvent {
  summary?: string;
  description?: string;
  location?: string;
  htmlLink: string;
  start: {
    date?: string;
    dateTime?: string;
  };
  end: {
    date?: string;
    dateTime?: string;
  };
}

const CALENDAR_ID = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID as string
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY as string

if (!CALENDAR_ID || !API_KEY) {
  throw new Error('Missing required environment variables for Google Calendar')
}

const now = new Date()
const startOfLastYear = new Date(now.getFullYear() - 1, 0, 1)
const endOfThisYear = new Date(now.getFullYear() + 1, 11, 31, 23, 59, 59)

export default function CustomCalendar() {
  const [events, setEvents] = useState<EventType[]>([])
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null)
  const [modalPos, setModalPos] = useState<{
    top: number
    left: number
    direction: 'up' | 'down'
  } | null>(null)
  const calendarRef = useRef<HTMLDivElement>(null)
  const [currentDate, setCurrentDate] = useState(new Date())
  
  const onNav = (newDate: Date, action: string) => {
    switch (action) {
      case 'NEXT':
        setCurrentDate(addMonths(newDate, 1))
        break
      case 'PREV':
        setCurrentDate(addMonths(newDate, -1))
        break
      case 'TODAY':
        setCurrentDate(new Date())
        break
      default:
        setCurrentDate(newDate)
        break
    }
      setSelectedEvent(null)
      setModalPos(null)
    }

  useEffect(() => {
    const fetchEvents = async () => {
      const params = new URLSearchParams({
        key: API_KEY,
        timeMin: startOfLastYear.toISOString(),
        timeMax: endOfThisYear.toISOString(),
        singleEvents: 'true',
        orderBy: 'startTime',
      })
      const res = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?${params}`
      )
      const data = await res.json()

      const mappedEvents: EventType[] = data.items
        .filter((event: GoogleCalendarEvent) => event.start && event.end)
        .map((event: GoogleCalendarEvent) => {
          const isAllDay = !!event.start.date && !!event.end.date
          const start = new Date(event.start.dateTime || event.start.date || '')
          const end = new Date(event.end.dateTime || event.end.date || '')

          // Adjust all-day event end date (Google gives next day)
          if (isAllDay) {
            start.setDate(start.getDate() + 1)
          } 
          const start_time = start.toLocaleTimeString([], {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true, 
          }).replace(/(AM|PM)/, match => match.toLowerCase()).replace(' ', '')


          // const displayTitle = isAllDay ? event.summary : `${start_time} ${event.summary}`
          const isMobile = window.innerWidth <= 768
          const displayTitle = isMobile ? '' : isAllDay ? event.summary : `${start_time} ${event.summary}`
          console.log(displayTitle)

          return {
            title: displayTitle || 'Untitled Event',
            modalTitle: event.summary,
            start,
            end,
            allDay: isAllDay,
            description: event.description || '',
            location: event.location || '',
            htmlLink: event.htmlLink
          }
        })
      // console.log(mappedEvents)
      setEvents(mappedEvents)
    }

    fetchEvents()
  }, [])

  return (
    <div ref={calendarRef} className="w-full p-4 md:p-8 relative">
      <h1 className="text-3xl font-bold text-center mb-6 text-green-800">Upcoming Events</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={['month']}
        components={{
          toolbar: (props) => (
        <CustomToolbar
          {...props}
          label={new Date(props.date).toLocaleDateString(undefined, {
            month: 'short',
            year: 'numeric',
          })}
        />
          ),
        }}
        onNavigate={onNav}
        date={currentDate}
        eventPropGetter={(event) => {
          const baseStyle = {
            paddingLeft: '4px',
            fontSize: '0.9rem',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            marginLeft: '4%',
            marginRight: '3%'
          }

          if (window.innerWidth <= 768) {
            
            return {
              style: {
              ...baseStyle,
              borderRadius: '50%',
              width: '8px',
              height: '8px',
              backgroundColor: '#8cba9f', // Tailwind green-700
              marginLeft: 'auto',
              marginRight: 6,
              }
            }
          }
        
          if (event.allDay) {
            return {
              style: {
                ...baseStyle,
                borderRadius: '4px',
                color: 'white',
                backgroundColor: '#8cba9f', // Tailwind green-700
              }
            }
          } else {
            return {
              style: {
                backgroundColor: 'transparent',
                color: '#666666',
                borderLeft: '3px solid #9BAB9F',
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                ...baseStyle,
              }
            }
          }
        }}
        style={{ height: 600 }}
        className="bg-white rounded w-full"
        onSelectEvent={(event, e) => {
          if (!calendarRef.current) return
        
          const eventRect = (e.target as HTMLElement).getBoundingClientRect()
          const containerRect = calendarRef.current.getBoundingClientRect()
          console.log(eventRect)
          console.log(containerRect)
          const modalWidth = 320
          const modalHeight = 200
          const isMobile = window.innerWidth <= 768
          const vert_padding = isMobile ? 0 : 8
          const horiz_padding = isMobile ? 0 : 80
        
          const spaceBelow = containerRect.bottom - eventRect.bottom
          const spaceAbove = eventRect.top - containerRect.top
        
          const shouldFlip = spaceBelow < modalHeight && spaceAbove > modalHeight

          const top = shouldFlip
          ? eventRect.top - containerRect.top - modalHeight - vert_padding
          : eventRect.top - containerRect.top + eventRect.height + vert_padding
          
          let left = eventRect.left - containerRect.left

          if (left + modalWidth > containerRect.width - horiz_padding) {
            left = containerRect.width - modalWidth - horiz_padding
          }
          
          setSelectedEvent(event)
          setModalPos({ top, left, direction: shouldFlip ? 'up' : 'down' })
        }}
        />
        {selectedEvent && modalPos && (
          <div
            className={`
              absolute z-50 bg-white rounded-lg shadow-lg w-[50%] md:w-[90%] max-w-sm p-4 border
              transition-all duration-300 ease-out
              ${modalPos.direction === 'down' ? 'animate-slide-down' : 'animate-slide-up'}
            `}
            style={{ top: modalPos.top, left: modalPos.left }}
          >
            <button
              className="absolute top-2 right-2 text-xl font-bold text-gray-600 hover:text-black"
              onClick={() => {
                setSelectedEvent(null)
                setModalPos(null)
              }}
            >
        
            &times;
          </button>
          <h2 className="text-xl font-bold mb-2">{selectedEvent.modalTitle}</h2>

          <div className="text-sm text-gray-600 mb-2">
            📅 {selectedEvent.start.toLocaleDateString(undefined, {
              weekday: 'long',
              month: 'long',
              day: 'numeric'
            })},{' '}
            {selectedEvent.start.toLocaleTimeString([], {
              hour: 'numeric',
              minute: '2-digit'
            })}{' '}
            -{' '}
            {selectedEvent.end.toLocaleTimeString([], {
              hour: 'numeric',
              minute: '2-digit'
            })}
          </div>

          {selectedEvent.location && (
            <div className="text-xs mb-4 md:text-sm">
              📍 <span className="underline">{selectedEvent.location}</span>
            </div>
          )}

          {selectedEvent.description && (
            <p className="text-xs md:text-sm mb-4 whitespace-pre-wrap" 
                dangerouslySetInnerHTML={{ __html: selectedEvent.description || '' }} />
          )}

          {selectedEvent.htmlLink && (
            <a
              href={selectedEvent.htmlLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 underline"
            >
              Copy to Google Calendar
            </a>
          )}
        </div>
      )}
    </div>
  )
}

function CustomToolbar({ label, onNavigate }: ToolbarProps<EventType, object>) {
  return (
    <div className="grid grid-cols-8 items-center mb-4">
      <div className="col-span-2 flex justify-start">
        <div className="w-4 md:w-16" />

      </div>
      <div className="col-span-4 flex justify-center items-center space-x-5">
      <button
        onClick={() => onNavigate('PREV')}
        className="p-1 rounded hover:bg-gray-200"
        aria-label="Previous"
      >
        <svg className="w-3 h-3 rotate-270 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" strokeWidth="1" d="M9 5 5 1 1 5" />
        </svg>
      </button>

      <span className="text-base md:text-xl font-semibold">{label}</span>

      <button
        onClick={() => {
        onNavigate('NEXT')
        }}
        className="p-1 rounded hover:bg-gray-200"
        aria-label="Next"
      >
        <svg className="w-3 h-3 rotate-90 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" strokeWidth="1" d="M9 5 5 1 1 5" />
        </svg>
      </button>
      </div>
      <div className="col-span-2 flex justify-end">
        <button
          onClick={() => onNavigate('TODAY')}
          className="px-3 py-1 border border-green-800 text-green-800 rounded hover:bg-green-100"
        >
          Today
        </button>
      </div>
    </div>
  )
}
