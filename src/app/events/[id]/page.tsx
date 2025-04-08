import { notFound } from 'next/navigation';
import eventsData from '@/data/events.json';
import EventContent from '@/components/EventContent';

interface PageProps {
  params: {
    id: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function EventPage({ params }: PageProps) {
  const event = eventsData.events.find(e => e.id === params.id);
  
  if (!event) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <EventContent event={event} />
    </div>
  );
} 