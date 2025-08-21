"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "./lib/supabase"; // ✅ If not found, change to "../lib/supabase"

interface Event {
  id: string;
  title: string;
  date: string;
  city: string;
}

export default function HomePage() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("id, title, date, city");

      if (error) {
        console.error("Failed to fetch events:", error);
      } else {
        setEvents(data);
      }
    };

    fetchEvents();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-100 to-pink-100 p-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        🎉 Welcome to Event RSVP App
      </h1>

      {events.length === 0 ? (
        <p className="text-center text-gray-600">No events found.</p>
      ) : (
        <div className="max-w-3xl mx-auto grid gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500"
            >
              <h2 className="text-2xl font-semibold text-gray-800">{event.title}</h2>
              <p className="text-gray-600">{event.date} • {event.city}</p>

              <Link
                href={`/rsvp?event_id=${event.id}`}
                className="inline-block mt-4 text-blue-600 font-semibold hover:underline"
              >
                RSVP to this event →
              </Link>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
