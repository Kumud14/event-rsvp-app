"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase"; // adjust if path is different

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data, error } = await supabase
          .from("events")
          .select("*")
          .order("date", { ascending: true });

        if (error) {
          // Log full Supabase error details
          console.error(
            "Supabase error fetching events:",
            error.message,
            error.details,
            error.hint,
            error.code
          );
        }

        if (!data || data.length === 0) {
          console.log("No events found.");
        }

        setEvents(data || []);
      } catch (err) {
        // Catch any unexpected errors
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        📅 Upcoming Events
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading events...</p>
      ) : events.length === 0 ? (
        <p className="text-center text-gray-500">No events found.</p>
      ) : (
        <div className="grid gap-6 max-w-2xl mx-auto">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-shadow border-l-4 border-blue-500"
            >
              <h2 className="text-2xl font-semibold text-gray-800">{event.title}</h2>
              <p className="text-sm text-gray-500 mt-1">
                {event.date} • {event.city}
              </p>
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
      )}
    </main>
  );
}
