const INTENTS = [
  { slug: 'stressed-advice', label: 'Stressed', prompt: 'You said you\'re stressed — want to share what\'s causing it?' },
  { slug: 'curious-perspective', label: 'Curious', prompt: 'What perspective are you looking to explore today?' },
  { slug: 'lonely-chat', label: 'Lonely', prompt: 'It’s okay to feel lonely. What’s on your mind?' },
  { slug: 'happy-share', label: 'Joyful', prompt: 'Sharing joy doubles it! What’s the good news?' },
  { slug: 'vent-listen', label: 'Need to Vent', prompt: 'Let it all out. This space is yours.' },
  { slug: 'bored-random', label: 'Bored', prompt: 'Let’s start somewhere: what’s a random fact you love?' },
  { slug: 'grief-support', label: 'Grieving', prompt: 'Grief is heavy. Would you like to share a memory?' },
  { slug: 'creative-spark', label: 'Creative', prompt: 'Working on something? I’d love to hear about the process.' },
];

export default function IntentSelector({ onSelect }: { onSelect: (i: any) => void }) {
  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-2xl mx-auto space-y-8">
        <header className="text-center"><h2 className="text-3xl font-bold text-white">How are you feeling?</h2></header>
        <div className="grid grid-cols-2 gap-4">
          {INTENTS.map((intent) => (
            <button key={intent.slug} onClick={() => onSelect(intent)} className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-left hover:border-blue-500 transition-colors group">
              <h3 className="text-white font-bold group-hover:text-blue-400">{intent.label}</h3>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
