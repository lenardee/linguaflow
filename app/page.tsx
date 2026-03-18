import SVARequirementSection from '@/components/SVARequirementSection';
import type { Metadata } from 'next';
import { DashboardClient } from '@/components/home/DashboardClient';

export const metadata: Metadata = { title: 'LinguaFlow – Dashboard' };

export default function HomePage() {
  return (
    <>
      <SVARequirementSection />
      <DashboardClient />
    </>
  );
}