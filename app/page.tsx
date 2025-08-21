export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Event RSVP App 🎉</h1>
        <p className="text-lg">Go to <code>/events</code> to view events or <code>/rsvp?event_id=123</code> to RSVP.</p>
      </div>
    </main>
  );
}
