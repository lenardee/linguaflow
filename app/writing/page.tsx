import type { Metadata } from 'next';
import { WritingClient } from '@/components/skills/WritingClient';
export const metadata: Metadata = { title: 'LinguaFlow – Writing' };
export default function WritingPage() { return <WritingClient />; }
