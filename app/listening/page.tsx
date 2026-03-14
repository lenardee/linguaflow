import type { Metadata } from 'next';
import { ListeningClient } from '@/components/skills/ListeningClient';
export const metadata: Metadata = { title: 'LinguaFlow – Listening' };
export default function ListeningPage() { return <ListeningClient />; }
