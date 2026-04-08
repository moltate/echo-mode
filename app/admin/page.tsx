'use client';
import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function AdminPage() {
  const [scores, setScores] = useState<any[]>([]);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('reputation').select('*');
      if (data) setScores(data);
    };
    fetch();
  }, []);

  return (
    <div className="p-8 bg-white min-h-screen text-black">
      <h1 className="text-2xl font-bold mb-4">Safety Admin</h1>
      <table className="w-full border-collapse border">
        <thead><tr className="bg-gray-100"><th>Fingerprint Hash</th><th>Strikes</th><th>Blocked?</th></tr></thead>
        <tbody>
          {scores.map(s => (
            <tr key={s.fingerprint_hash}>
              <td className="border p-2 font-mono text-xs">{s.fingerprint_hash}</td>
              <td className="border p-2">{s.strikes}</td>
              <td className="border p-2">{s.is_blocked ? 'YES' : 'NO'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
