'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  useUserStore,
  selectStreak,
  selectTotalSessions,
  selectTotalWords,
  selectTotalMinutes,
  selectSkillProgress,
} from '@/lib/store/userStore';
import { SKILLS } from '@/lib/data/skills';
import { cn } from '@/lib/utils/cn';
import type { SkillMeta } from '@/types';

const fadeUp = {
  hidden:  { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.07, duration: 0.35, ease: 'easeOut' },
  }),
};

function SkillCard({ skill, index }: { skill: SkillMeta; index: number }) {
  const progress  = useUserStore(selectSkillProgress(skill.id));
  const router    = useRouter();
  const xpInLevel = progress.xp % 200;
  const pct       = Math.round((xpInLevel / 200) * 100);

  return (
    <motion.button
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      whileTap={{ scale: 0.97 }}
      onClick={() => router.push(skill.href)}
      className="bg-white rounded-2xl p-4 text-left cursor-pointer border-2 border-transparent shadow-s hover:shadow-m hover:-translate-y-0.5 transition-all duration-200 relative overflow-hidden"
    >
      <span className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: skill.color }} />
      <div className="text-[28px] mb-2 mt-1">{skill.emoji}</div>
      <div className="font-display text-[17px] font-bold text-navy-600">{skill.label}</div>
      <div className="text-[13px] text-muted-foreground mt-0.5">Level {progress.level} · {progress.xp} XP</div>
      <div className="mt-3 h-1.5 bg-brand-cream-2 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${skill.color}, #C9541C)` }}
        />
      </div>
    </motion.button>
  );
}

function StatItem({ value, label, bordered = true }: { value: number | string; label: string; bordered?: boolean }) {
  return (
    <div className={cn('flex-1 py-4 px-2 text-center', bordered && 'border-r border-brand-cream-2 last:border-r-0')}>
      <div className="font-display text-[26px] font-bold text-navy-600">{value}</div>
      <div className="font-code text-[11px] text-muted-foreground mt-0.5 uppercase tracking-wide">{label}</div>
    </div>
  );
}

export function DashboardClient() {
  const streak        = useUserStore(selectStreak);
  const sessions      = useUserStore(selectTotalSessions);
  const words         = useUserStore(selectTotalWords);
  const minutes       = useUserStore(selectTotalMinutes);
  const updateStreak  = useUserStore((s) => s.updateStreak);

  useEffect(() => { updateStreak(); }, [updateStreak]);

  return (
    <div className="min-h-full">
      {/* Hero */}
      <section className="bg-gradient-to-br from-navy-600 to-navy-500 px-5 pt-7 pb-8 relative overflow-hidden">
        <span aria-hidden className="absolute right-[-20px] top-[-20px] font-display text-[200px] italic text-white/[0.04] pointer-events-none select-none leading-none">A</span>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <p className="font-code text-[12px] text-white/60 tracking-widest uppercase">Good day, Learner</p>
          <h1 className="font-display text-[32px] font-bold text-white leading-tight mt-1.5">
            Master <em className="text-brand-orange not-italic">English</em><br />one skill at a time.
          </h1>
          <div className="inline-flex items-center gap-1.5 mt-4 bg-white/10 border border-white/15 rounded-full px-3.5 py-1.5">
            <span className="text-brand-gold font-code text-[12px] tracking-wide">🔥 {streak} Day Streak</span>
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <div className="px-4 -mt-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.35 }}
          className="bg-white rounded-2xl shadow-s border border-brand-cream-2 flex overflow-hidden"
        >
          <StatItem value={sessions} label="Sessions" />
          <StatItem value={words.toLocaleString()} label="Words" />
          <StatItem value={minutes} label="Minutes" bordered={false} />
        </motion.div>
      </div>

      {/* Skill grid */}
      <div className="px-4 mt-6">
        <p className="font-code text-[11px] text-muted-foreground tracking-widest uppercase mb-3 px-1">Your Skills</p>
        <div className="grid grid-cols-2 gap-3">
          {SKILLS.map((skill, i) => <SkillCard key={skill.id} skill={skill} index={i} />)}
        </div>
      </div>

      {/* Daily challenge */}
      <div className="px-4 mt-6 mb-4">
        <p className="font-code text-[11px] text-muted-foreground tracking-widest uppercase mb-3 px-1">Daily Challenge</p>
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.35 }}
          className="bg-gradient-to-br from-brand-orange to-brand-orange-hov rounded-2xl p-5 shadow-m relative overflow-hidden"
        >
          <span aria-hidden className="absolute right-3 top-[-8px] font-display text-[90px] text-white/[0.08] leading-none pointer-events-none">"</span>
          <p className="font-code text-[10px] text-white/70 tracking-widest uppercase">🎯 Today&apos;s Challenge</p>
          <p className="font-display text-[19px] font-bold text-white mt-1 leading-snug">Write 150 words about your favourite travel memory.</p>
          <p className="text-[14px] text-white/80 mt-1">A focused writing exercise to build fluency and descriptive language.</p>
          <a
            href="/writing"
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full text-[14px] font-semibold bg-white/20 text-white border border-white/30 hover:bg-white/30 transition-colors"
          >
            Start Challenge →
          </a>
        </motion.div>
      </div>
    </div>
  );
}
