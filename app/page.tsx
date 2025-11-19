"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Scale, HelpCircle, Activity, Link2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useGameStore } from "@/lib/store";

export default function Home() {
  const { totalScore, level, currentStreak } = useGameStore();

  const games = [
    {
      title: "Alavancas",
      description: "Identifique fulcro, força e resistência",
      icon: Scale,
      href: "/games/levers",
      badge: "3 Níveis",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Quem Sou Eu?",
      description: "Descubra a parte do corpo pelas dicas",
      icon: HelpCircle,
      href: "/games/whoami",
      badge: "Raciocínio",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Movimento em Ação",
      description: "Análise biomecânica de movimentos",
      icon: Activity,
      href: "/games/movement",
      badge: "Visual",
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Conecte os Conceitos",
      description: "Arraste e conecte termos relacionados",
      icon: Link2,
      href: "/games/matching",
      badge: "Novo!",
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4">
            Biodinâmica <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Pro</span>
          </h1>
          <p className="text-slate-300 text-lg">
            Explore a biomecânica do corpo humano através de desafios interativos
          </p>
        </motion.header>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-4 mb-12"
        >
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-slate-400">Pontuação Total</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-cyan-400">{totalScore}</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-slate-400">Nível</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-purple-400">{level}</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-slate-400">Sequência Atual</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-orange-400">{currentStreak} 🔥</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {games.map((game, index) => (
            <motion.div
              key={game.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Link href={game.href}>
                <Card className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all hover:scale-105 cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${game.color}`}>
                        <game.icon className="w-8 h-8 text-white" />
                      </div>
                      <span className="px-3 py-1 rounded-full bg-slate-700 text-xs font-semibold text-slate-300">
                        {game.badge}
                      </span>
                    </div>
                    <CardTitle className="text-2xl mt-4 group-hover:text-cyan-400 transition-colors">
                      {game.title}
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      {game.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
