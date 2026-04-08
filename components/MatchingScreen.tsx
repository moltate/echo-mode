'use client';
import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Loader2 } from 'lucide-react';

export default function MatchingScreen({ intent, fingerprint, onMatch }: any) {
  const supabase = createClientComponentClient();
  const [status, setStatus] = useState('Finding a companion...');

  useEffect(() => {
    let isMounted = true;
    const findMatch = async (fallback = false) => {
      const query = supabase.from('rooms').select('*').eq('status', 'waiting').lt('participant_count', 2);
      if (!fallback) query.eq('intent_slug', intent.slug);
      const { data: existingRooms } = await query.limit(1).single();

      if (existingRooms && isMounted) {
        await supabase.from('rooms').update({ status: 'active', participant_count: 2 }).eq('id', existingRooms.id);
        onMatch(existingRooms.id);
      } else if (isMounted) {
        const expiresAt = new Date(Date.now() + 12 * 60000).toISOString();
        const { data: newRoom } = await supabase.from('rooms').insert({ intent_slug: intent.slug, intent_label: intent.label, expires_at: expiresAt, participant_count: 1 }).select().single();
        if (newRoom) {
          supabase.channel(`room-${newRoom.id}`).on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'rooms', filter: `id=eq.${newRoom.id}` }, 
          (payload) => { if (payload.new.status === 'active') onMatch(newRoom.id); }).subscribe();
          setTimeout(() => { if (isMounted) { setStatus('Broadcasting wider...'); findMatch(true); } }, 30000);
        }
      }
    };
    findMatch();
    return () => { isMounted = false; };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white">
      <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-6" />
      <h2 className="text-2xl font-bold">{status}</h2>
    </div>
  );
}
