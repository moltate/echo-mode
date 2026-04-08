export default function SafetyExplainer({ onAccept }: { onAccept: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-slate-950 text-white text-center">
      <div className="max-w-md space-y-8">
        <h1 className="text-4xl font-bold tracking-tight text-blue-500">Echo</h1>
        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 space-y-6">
          <h2 className="text-xl font-semibold text-blue-400">Controlled Anonymity</h2>
          <ul className="text-left space-y-4 text-slate-300">
            <li className="flex gap-3">🛡️ <span>Ephemeral: Data wipes after 12 mins.</span></li>
            <li className="flex gap-3">🤖 <span>Moderated: Real-time safety filtering.</span></li>
            <li className="flex gap-3">📱 <span>Device-tracked: Safety via reputation.</span></li>
          </ul>
          <button onClick={onAccept} className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition-all">I Understand</button>
        </div>
      </div>
    </div>
  );
}
