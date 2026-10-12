import React, { useState, useEffect } from 'react';
import {
  Trophy,
  Calendar,
  Clock,
  Sparkles,
  ChevronDown,
  Info,
  CheckCircle2,
  Lock,
  Hourglass,
  ExternalLink,
  Gift,
} from 'lucide-react';
import type { RaffleInfo, RaffleStats } from '../types';
import { formatCLP, formatDate } from '../utils/format';

interface HeroSectionProps {
  raffle: RaffleInfo | null;
  stats: RaffleStats;
  onOpenPrizeDetail: () => void;
  onOpenRules: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  raffle,
  stats,
  onOpenPrizeDetail,
  onOpenRules,
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 14,
    hours: 8,
    minutes: 42,
    seconds: 15,
  });

  useEffect(() => {
    if (!raffle?.fecha_sorteo) return;

    const target = new Date(raffle.fecha_sorteo).getTime();

    const updateTimer = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [raffle?.fecha_sorteo]);

  const percentageSold = Math.min(
    100,
    Math.round((stats.pagados / (stats.total || 500)) * 100)
  );

  return (
    <section className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-10 lg:py-16">
      {/* Background glow effects */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-amber-500/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/2 -right-20 h-80 w-80 rounded-full bg-emerald-500/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Winner Banner if Drawn */}
        {raffle?.sorteoGanador && (
          <div className="mb-8 overflow-hidden rounded-2xl border border-amber-500/40 bg-gradient-to-r from-amber-950/80 via-yellow-900/60 to-amber-950/80 p-6 shadow-2xl shadow-amber-500/10 backdrop-blur-md">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-center md:text-left">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30">
                  <Trophy className="h-8 w-8 animate-bounce" />
                </div>
                <div>
                  <div className="text-xs font-semibold tracking-wider uppercase text-amber-400">
                    ¡Tenemos Ganador Oficial!
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    Número Ganador: <span className="font-mono text-amber-300">#{raffle.sorteoGanador.numero}</span>
                  </h3>
                  <p className="text-sm text-slate-300">
                    Afortunado(a): <span className="font-semibold text-white">{raffle.sorteoGanador.buyerNombre}</span> (RUT {raffle.sorteoGanador.buyerDocumento})
                  </p>
                </div>
              </div>
              <div className="text-xs text-amber-300/80 font-mono bg-amber-950/60 px-4 py-2 rounded-xl border border-amber-500/20">
                Sorteado el {formatDate(raffle.sorteoGanador.fechaSorteo)}
              </div>
            </div>
          </div>
        )}

        <div className="mx-auto max-w-3xl">
          {/* Left Column: Raffle Presentation */}
          <div className="space-y-6 text-center">
            {/* Clean Kicker */}
            <div className="flex items-center justify-center gap-2 text-xs font-medium text-amber-400">
              <Sparkles className="h-4 w-4" />
              <span>Sorteo Notarial Oficial</span>
              <span aria-hidden="true">·</span>
              <span>500 Números Exclusivos (001 - 500)</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {raffle?.nombre || 'Gran Sorteo 2026'}
            </h1>



            {/* Countdown Timer */}
            <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-4">
              <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-300 mb-3">
                <Clock className="h-4 w-4 text-amber-400" />
                <span>Tiempo restante para el sorteo:</span>
              </div>
              <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center font-mono">
                <div className="rounded-lg bg-slate-900 border border-slate-800 p-2 sm:p-3">
                  <span className="text-xl sm:text-2xl font-bold text-white tabular-nums">
                    {timeLeft.days.toString().padStart(2, '0')}
                  </span>
                  <span className="block text-[10px] sm:text-xs text-slate-400 uppercase mt-0.5">
                    Días
                  </span>
                </div>
                <div className="rounded-lg bg-slate-900 border border-slate-800 p-2 sm:p-3">
                  <span className="text-xl sm:text-2xl font-bold text-white tabular-nums">
                    {timeLeft.hours.toString().padStart(2, '0')}
                  </span>
                  <span className="block text-[10px] sm:text-xs text-slate-400 uppercase mt-0.5">
                    Horas
                  </span>
                </div>
                <div className="rounded-lg bg-slate-900 border border-slate-800 p-2 sm:p-3">
                  <span className="text-xl sm:text-2xl font-bold text-white tabular-nums">
                    {timeLeft.minutes.toString().padStart(2, '0')}
                  </span>
                  <span className="block text-[10px] sm:text-xs text-slate-400 uppercase mt-0.5">
                    Min
                  </span>
                </div>
                <div className="rounded-lg bg-slate-900 border border-slate-800 p-2 sm:p-3">
                  <span className="text-xl sm:text-2xl font-bold text-amber-400 tabular-nums">
                    {timeLeft.seconds.toString().padStart(2, '0')}
                  </span>
                  <span className="block text-[10px] sm:text-xs text-slate-400 uppercase mt-0.5">
                    Seg
                  </span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href="#numeros"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-sm hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/20 active:scale-98 cursor-pointer"
              >
                Elegir Mis Números Ahora
                <ChevronDown className="h-4 w-4" />
              </a>
              <button
                onClick={onOpenRules}
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl border border-slate-700 bg-slate-900/60 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
              >
                <Info className="h-4 w-4 text-slate-400" />
                Ver Bases y Garantía Notarial
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
