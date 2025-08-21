"use client";
import { useEffect, useState } from "react";
import { supabase } from '../lib/supabase'

interface Event {
  id: string;
  title: string;
  date: string;
  city: string;
  description: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true });

      if (error) {
        console.error("Error fetching events:", error);
      } else {
        setEvents(data);
      }
    };

    fetchEvents();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">📅 Upcoming Events</h1>
      <div className="grid gap-6 max-w-2xl mx-auto">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-shadow border-l-4 border-blue-500"
          >
            <h2 className="text-2xl font-semibold text-gray-800">{event.title}</h2>
            <p className="text-sm text-gray-500 mt-1">{event.date} • {event.city}</p>
            <p className="mt-2 text-gray-700">{event.description}</p>
            <a
              href={`/rsvp?event_id=${event.id}`}
              className="inline-block mt-4 text-blue-600 font-semibold hover:underline"
            >
              RSVP Now →
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}
