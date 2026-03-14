import type { Metadata } from 'next';
import { SpeakingClient } from '@/components/skills/SpeakingClient';
export const metadata: Metadata = { title: 'LinguaFlow – Speaking' };
export default function SpeakingPage() { return <SpeakingClient />; }
