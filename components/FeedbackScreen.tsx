'use client';
import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function FeedbackScreen({ roomId, onDone }: any) {
  const [rating, setRating] = useState(0);
  const supabase = createClientComponentClient();

  const submit = async () => {
    await supabase.from('feedback').insert({ room_id: roomId, rating });
    onDone();
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-white text-center">
      <div className="max-w-md w-full space-y-6">
        <h2 className="text-2xl font-bold">Conversation Ended</h2>
        <p className="text-slate-400">Data wiped. How was the interaction?</p>
        <div className="flex justify-center gap-4 py-4">
          {[1, 2, 3, 4, 5].map(n => (
            <button key={n} onClick={() => setRating(n)} className={`w-12 h-12 rounded-full border-2 ${rating === n ? 'bg-blue-600 border-blue-400' : 'border-slate-700'}`}>{n}</button>
          ))}
        </div>
        <button onClick={submit} className="w-full py-4 bg-slate-100 text-black font-bold rounded-xl">Wipe & Finish</button>
      </div>
    </div>
  );
}
