'use client';
import { useState, useEffect, useRef } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { validateMessage } from '@/lib/safety-filter';
import { Send, AlertCircle } from 'lucide-react';

export default function ChatRoom({ roomId, intent, fingerprint, onEnd }: any) {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [timeLeft, setTimeLeft] = useState('12:00');
  const [strikes, setStrikes] = useState(0);
  const [warning, setWarning] = useState<string | null>(null);
  const supabase = createClientComponentClient();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const channel = supabase.channel(`msgs-${roomId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `room_id=eq.${roomId}` }, 
      (payload) => setMessages(prev => [...prev, payload.new])).subscribe();

    const timer = setInterval(async () => {
      const { data } = await supabase.from('rooms').select('expires_at').eq('id', roomId).single();
      if (!data) return;
      const diff = new Date(data.expires_at).getTime() - Date.now();
      if (diff <= 0) { clearInterval(timer); onEnd(); }
      else { setTimeLeft(`${Math.floor(diff/60000)}:${Math.floor((diff%60000)/1000).toString().padStart(2,'0')}`); }
    }, 1000);

    return () => { supabase.removeChannel(channel); clearInterval(timer); };
  }, [roomId]);

  const handleSend = async (e: any) => {
    e.preventDefault();
    const safety = validateMessage(input);
    if (!safety.isValid) {
      setStrikes(s => s + 1);
      setWarning(safety.error!);
      if (strikes >= 1) { 
        await supabase.from('reputation').upsert({ fingerprint_hash: fingerprint, is_blocked: true });
        onEnd();
      }
      return;
    }
    await supabase.from('messages').insert({ room_id: roomId, content: input });
    setInput('');
    setWarning(null);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-white">
      <div className="p-4 border-b border-slate-800 flex justify-between">
        <span className="font-mono text-blue-400">{timeLeft}</span>
        <span className="text-xs text-slate-500">ENCRYPTED SESSION</span>
      </div>
      <div className="bg-blue-600/10 p-3 text-center text-blue-300 text-sm">{intent.prompt}</div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`max-w-[80%] p-3 rounded-2xl ${m.user_id === roomId ? 'ml-auto bg-blue-600' : 'bg-slate-800'}`}>{m.content}</div>
        ))}
      </div>
      <form onSubmit={handleSend} className="p-4 border-t border-slate-800">
        {warning && <div className="text-red-400 text-xs mb-2 flex items-center gap-1"><AlertCircle size={12}/>{warning}</div>}
        <div className="flex gap-2">
          <input value={input} onChange={e => setInput(e.target.value)} className="flex-1 bg-slate-900 border-none rounded-xl p-3 outline-none focus:ring-1 focus:ring-blue-500" placeholder="Type..." />
          <button type="submit" className="p-3 bg-blue-600 rounded-xl"><Send size={20}/></button>
        </div>
      </form>
    </div>
  );
}
