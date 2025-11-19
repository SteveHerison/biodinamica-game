"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, X, HelpCircle, Scale } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { leversData } from "@/lib/data";
import { useGameStore } from "@/lib/store";
import { playSound, playConfetti } from "@/lib/sounds";

type Difficulty = "easy" | "medium" | "hard";

export default function LeversGame() {
    const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [score, setScore] = useState(0);
    const [showTutorial, setShowTutorial] = useState(false);
    const { addScore, incrementStreak, resetStreak } = useGameStore();

    useEffect(() => {
        const dontShowAgain = localStorage.getItem('levers-tutorial-hidden');
        if (!dontShowAgain && difficulty) {
            setShowTutorial(true);
        }
    }, [difficulty]);

    const hideTutorial = (dontShowAgain: boolean) => {
        if (dontShowAgain) {
            localStorage.setItem('levers-tutorial-hidden', 'true');
        }
        setShowTutorial(false);
    };

    const questions = difficulty ? leversData[difficulty] : [];
    const progress = difficulty ? ((currentQuestion + 1) / questions.length) * 100 : 0;

    const handleAnswer = (type: string) => {
        if (showFeedback) return;

        playSound('click');
        setSelectedAnswer(type);
        setShowFeedback(true);

        const isCorrect = type === questions[currentQuestion].type;

        if (isCorrect) {
            playSound('correct');
            setScore(score + 10);
            addScore(10, 'levers');
            incrementStreak();
        } else {
            playSound('incorrect');
            resetStreak();
        }
    };

    const nextQuestion = () => {
        playSound('click');
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setShowFeedback(false);
        } else {
            playConfetti();
            playSound('victory');
        }
    };

    const reset = () => {
        setDifficulty(null);
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setShowFeedback(false);
        setScore(0);
    };

    if (!difficulty) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <Link href="/">
                            <Button variant="ghost" className="text-slate-300 hover:text-white">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Voltar
                            </Button>
                        </Link>
                        <h1 className="text-3xl font-bold">Quebra-cabeça das Alavancas</h1>
                        <div className="w-24" />
                    </div>

                    <p className="text-slate-300 text-center mb-8">
                        Escolha o nível de dificuldade
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            { id: "easy" as Difficulty, name: "Fácil", color: "from-green-500 to-emerald-500", count: 12 },
                            { id: "medium" as Difficulty, name: "Médio", color: "from-yellow-500 to-orange-500", count: 12 },
                            { id: "hard" as Difficulty, name: "Difícil", color: "from-red-500 to-pink-500", count: 12 }
                        ].map((level, index) => (
                            <motion.div
                                key={level.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card
                                    className="p-6 bg-slate-800/50 border-slate-700 hover:border-cyan-500 cursor-pointer transition-all hover:scale-105"
                                    onClick={() => setDifficulty(level.id)}
                                >
                                    <div className={`w-full h-2 rounded-full bg-gradient-to-r ${level.color} mb-4`} />
                                    <h3 className="text-2xl font-bold mb-2">{level.name}</h3>
                                    <p className="text-slate-400 text-sm">{level.count} questões</p>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (currentQuestion >= questions.length) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <h2 className="text-4xl font-bold mb-4">🎉 Parabéns!</h2>
                    <p className="text-2xl mb-2">Você completou o nível {difficulty}!</p>
                    <p className="text-xl text-slate-300 mb-8">Pontuação: {score}</p>
                    <div className="flex gap-4 justify-center">
                        <Button onClick={reset} size="lg">
                            Voltar ao Menu
                        </Button>
                        <Button onClick={() => {
                            setCurrentQuestion(0);
                            setSelectedAnswer(null);
                            setShowFeedback(false);
                            setScore(0);
                        }} variant="outline" size="lg">
                            Jogar Novamente
                        </Button>
                    </div>
                </motion.div>
            </div>
        );
    }

    const question = questions[currentQuestion];
    const options = [
        { text: "1ª Classe (Interfixa)", type: "1" },
        { text: "2ª Classe (Inter-resistente)", type: "2" },
        { text: "3ª Classe (Interpotente)", type: "3" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8">
            {/* Tutorial Modal */}
            <Dialog open={showTutorial} onOpenChange={() => { }}>
                <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-2xl">
                            <Scale className="w-6 h-6 text-cyan-400" />
                            Como Jogar: Alavancas
                        </DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="text-slate-300 space-y-4">
                        <p>🎯 <strong>Objetivo:</strong> Identifique o tipo de alavanca (1ª, 2ª ou 3ª classe) em cada situação!</p>

                        <div className="space-y-2">
                            <p>⚖️ <strong>Tipos de Alavanca:</strong></p>
                            <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                                <li><strong>1ª Classe (Interfixa):</strong> Fulcro entre força e resistência</li>
                                <li><strong>2ª Classe (Inter-resistente):</strong> Resistência entre fulcro e força</li>
                                <li><strong>3ª Classe (Interpotente):</strong> Força entre fulcro e resistência</li>
                            </ul>
                        </div>

                        <p className="text-sm text-slate-400">💡 Dica: Pense em onde está o ponto fixo (fulcro), onde a força é aplicada e onde está a resistência!</p>
                        <p className="text-sm text-slate-400">💯 Pontuação: 10 pontos por acerto</p>
                    </DialogDescription>
                    <div className="flex flex-col gap-2 mt-4">
                        <Button onClick={() => hideTutorial(false)} className="w-full">
                            Entendi, vamos jogar!
                        </Button>
                        <Button onClick={() => hideTutorial(true)} variant="outline" className="w-full">
                            Não mostrar novamente
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <Button variant="ghost" onClick={reset} className="text-slate-300 hover:text-white">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Níveis
                    </Button>
                    <div className="text-lg font-semibold">
                        Questão {currentQuestion + 1} de {questions.length}
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" onClick={() => setShowTutorial(true)}>
                            <HelpCircle className="w-4 h-4" />
                        </Button>
                        <div className="text-lg font-semibold text-cyan-400">
                            Pontos: {score}
                        </div>
                    </div>
                </div>

                <Progress value={progress} className="mb-8" />

                <motion.div
                    key={currentQuestion}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                >
                    <Card className="p-8 bg-slate-800/50 border-slate-700 mb-6">
                        <p className="text-xl leading-relaxed mb-8">{question.question}</p>

                        <div className="grid grid-cols-1 gap-4">
                            {options.map((option) => {
                                const isSelected = selectedAnswer === option.type;
                                const isCorrect = option.type === question.type;
                                const showCorrect = showFeedback && isCorrect;
                                const showIncorrect = showFeedback && isSelected && !isCorrect;

                                return (
                                    <motion.button
                                        key={option.type}
                                        onClick={() => handleAnswer(option.type)}
                                        disabled={showFeedback}
                                        whileHover={{ scale: showFeedback ? 1 : 1.02 }}
                                        whileTap={{ scale: showFeedback ? 1 : 0.98 }}
                                        className={`p-4 rounded-lg border-2 transition-all text-left ${showCorrect ? 'bg-green-900/30 border-green-500' :
                                            showIncorrect ? 'bg-red-900/30 border-red-500' :
                                                'bg-slate-700/30 border-slate-600 hover:border-cyan-500'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-lg">{option.text}</span>
                                            {showCorrect && <Check className="w-6 h-6 text-green-400" />}
                                            {showIncorrect && <X className="w-6 h-6 text-red-400" />}
                                        </div>
                                    </motion.button>
                                );
                            })}
                        </div>
                    </Card>

                    <AnimatePresence>
                        {showFeedback && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                            >
                                <Card className={`p-6 mb-6 ${selectedAnswer === question.type ? 'bg-green-900/30 border-green-500' : 'bg-red-900/30 border-red-500'
                                    }`}>
                                    <p className="text-lg font-semibold mb-2">
                                        {selectedAnswer === question.type ? '✅ Correto!' : '❌ Incorreto'}
                                    </p>
                                    <p className="text-slate-200">
                                        Resposta: {question.answer}
                                    </p>
                                    {question.explanation && (
                                        <p className="text-slate-300 mt-2 text-sm">
                                            {question.explanation}
                                        </p>
                                    )}
                                </Card>

                                <div className="text-center">
                                    <Button onClick={nextQuestion} size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-500">
                                        {currentQuestion < questions.length - 1 ? 'Próxima Questão' : 'Ver Resultado'}
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
}
