'use client';
import { useState, useEffect } from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import SafetyExplainer from '@/components/SafetyExplainer';
import IntentSelector from '@/components/IntentSelector';
import MatchingScreen from '@/components/MatchingScreen';
import ChatRoom from '@/components/ChatRoom';
import FeedbackScreen from '@/components/FeedbackScreen';
import { hashFingerprint } from '@/lib/safety-filter';

export default function EchoApp() {
  const [step, setStep] = useState<'safety' | 'intent' | 'matching' | 'chat' | 'feedback'>('safety');
  const [userIntent, setUserIntent] = useState<any>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [fingerprint, setFingerprint] = useState<string>('');
  const supabase = createClientComponentClient();

  useEffect(() => {
    const init = async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      const hash = await hashFingerprint(result.visitorId);
      setFingerprint(hash);
      await supabase.auth.signInAnonymously();
      const { data } = await supabase.from('reputation').select('is_blocked').eq('fingerprint_hash', hash).single();
      if (data?.is_blocked) alert("Device restricted.");
    };
    init();
  }, []);

  if (step === 'safety') return <SafetyExplainer onAccept={() => setStep('intent')} />;
  if (step === 'intent') return <IntentSelector onSelect={(i: any) => { setUserIntent(i); setStep('matching'); }} />;
  if (step === 'matching') return <MatchingScreen intent={userIntent} fingerprint={fingerprint} onMatch={(id: string) => { setRoomId(id); setStep('chat'); }} />;
  if (step === 'chat') return <ChatRoom roomId={roomId} intent={userIntent} fingerprint={fingerprint} onEnd={() => setStep('feedback')} />;
  if (step === 'feedback') return <FeedbackScreen roomId={roomId} onDone={() => window.location.reload()} />;
  return null;
}
