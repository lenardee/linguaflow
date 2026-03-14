import type { Metadata } from 'next';
import { ReadingClient } from '@/components/skills/ReadingClient';
export const metadata: Metadata = { title: 'LinguaFlow – Reading' };
export default function ReadingPage() { return <ReadingClient />; }
