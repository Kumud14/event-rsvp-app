'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { supabase } from '../lib/supabase';

function RsvpContent() {
  const searchParams = useSearchParams();
  const eventId = searchParams.get('event_id');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    status: 'Yes',
  });

  const [submitted, setSubmitted] = useState(false);
  const [eventName, setEventName] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      if (eventId) {
        const { data } = await supabase
          .from('events')
          .select('title')
          .eq('id', eventId)
          .single();

        if (data) {
          setEventName(data.title);
        }
      }
    };
    fetchEvent();
  }, [eventId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Check if user exists
    const { data: existingUsers } = await supabase
      .from('users')
      .select('id')
      .eq('email', formData.email)
      .single();

    let userId = existingUsers?.id;

    // 2. If user doesn't exist, insert them
    if (!userId) {
      const { data: newUser } = await supabase
        .from('users')
        .insert({
          name: formData.name,
          email: formData.email,
        })
        .select()
        .single();

      userId = newUser?.id;
    }

    // 3. Insert RSVP
    await supabase.from('rsvps').insert({
      user_id: userId,
      event_id: eventId,
      status: formData.status,
    });

    setSubmitted(true);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          📝 RSVP to {eventName}
        </h1>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Your Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">RSVP Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-300"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Maybe">Maybe</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition font-semibold"
            >
              Submit RSVP
            </button>
          </form>
        ) : (
          <div className="text-center text-green-600 font-semibold text-lg">
            🎉 Thank you, your RSVP has been recorded!
          </div>
        )}
      </div>
    </main>
  );
}

export default function RsvpPage() {
  return (
    <Suspense fallback={<div className="text-center mt-10">Loading RSVP Form...</div>}>
      <RsvpContent />
    </Suspense>
  );
}
