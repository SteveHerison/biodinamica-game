"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Eye, Lightbulb, HelpCircle, X as XIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { whoAmIData } from "@/lib/data";
import { useGameStore } from "@/lib/store";
import { playSound, playConfetti } from "@/lib/sounds";
import { isValidAnswer } from "@/lib/utils";

export default function WhoAmIGame() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [revealedHints, setRevealedHints] = useState(1);
    const [guess, setGuess] = useState("");
    const [showAnswer, setShowAnswer] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [score, setScore] = useState(0);
    const [questionScore, setQuestionScore] = useState(100);
    const [showTutorial, setShowTutorial] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const { addScore, incrementStreak, resetStreak } = useGameStore();

    const question = whoAmIData[currentQuestion];
    const maxHints = question.hints.length;

    useEffect(() => {
        // Check if user wants to see tutorial
        const dontShowAgain = localStorage.getItem('whoami-tutorial-hidden');
        if (!dontShowAgain) {
            setShowTutorial(true);
        }
    }, []);

    const hideTutorial = (dontShowAgain: boolean) => {
        if (dontShowAgain) {
            localStorage.setItem('whoami-tutorial-hidden', 'true');
        }
        setShowTutorial(false);
    };

    const revealHint = () => {
        if (revealedHints < maxHints) {
            playSound('click');
            setRevealedHints(revealedHints + 1);
            setQuestionScore(Math.max(10, questionScore - 15));
        }
    };

    const checkAnswer = () => {
        playSound('click');
        const correct = isValidAnswer(guess, question.answer);

        if (correct) {
            playSound('correct');
            setScore(score + questionScore);
            addScore(questionScore, 'whoami');
            incrementStreak();
            setShowAnswer(true);
            setIsCorrect(true);
        } else {
            playSound('incorrect');
            setQuestionScore(Math.max(0, questionScore - 10));
            setAttempts(attempts + 1);

            // After 3 attempts, show the answer
            if (attempts >= 2) {
                resetStreak();
                setShowAnswer(true);
                setIsCorrect(false);
            }
        }
    };

    const nextQuestion = () => {
        playSound('click');
        if (currentQuestion < whoAmIData.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setRevealedHints(1);
            setGuess("");
            setShowAnswer(false);
            setIsCorrect(false);
            setQuestionScore(100);
            setAttempts(0);
        } else {
            playConfetti();
            playSound('victory');
        }
    };

    const reset = () => {
        setCurrentQuestion(0);
        setRevealedHints(1);
        setGuess("");
        setShowAnswer(false);
        setIsCorrect(false);
        setScore(0);
        setQuestionScore(100);
        setAttempts(0);
    };

    if (currentQuestion >= whoAmIData.length) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <h2 className="text-4xl font-bold mb-4">🎉 Parabéns!</h2>
                    <p className="text-2xl mb-2">Você completou todos os desafios!</p>
                    <p className="text-xl text-slate-300 mb-8">Pontuação Total: {score}</p>
                    <div className="flex gap-4 justify-center">
                        <Link href="/">
                            <Button size="lg">Voltar ao Menu</Button>
                        </Link>
                        <Button onClick={reset} variant="outline" size="lg">
                            Jogar Novamente
                        </Button>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8">
            {/* Tutorial Modal */}
            <Dialog open={showTutorial} onOpenChange={() => { }}>
                <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-2xl">
                            <HelpCircle className="w-6 h-6 text-purple-400" />
                            Como Jogar: Quem Sou Eu?
                        </DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="text-slate-300 space-y-4">
                        <p>🎯 <strong>Objetivo:</strong> Descubra qual parte do corpo (articulação, músculo ou osso) está sendo descrita!</p>

                        <div className="space-y-2">
                            <p>💡 <strong>Dicas:</strong></p>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                                <li>Você começa com 1 dica revelada</li>
                                <li>Revelar mais dicas custa 15 pontos</li>
                                <li>Quanto menos dicas usar, mais pontos ganha!</li>
                            </ul>
                        </div>

                        <div className="space-y-2">
                            <p>✍️ <strong>Resposta:</strong></p>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                                <li>Digite sua resposta no campo de texto</li>
                                <li>Não precisa se preocupar com maiúsculas ou acentos</li>
                                <li>Você tem 3 tentativas por questão</li>
                            </ul>
                        </div>

                        <p className="text-sm text-slate-400">💯 Pontuação inicial: 100 pts (reduz com dicas e erros)</p>
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
                    <Link href="/">
                        <Button variant="ghost" className="text-slate-300 hover:text-white">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Voltar
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-bold">Quem Sou Eu?</h1>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" onClick={() => setShowTutorial(true)}>
                            <HelpCircle className="w-4 h-4" />
                        </Button>
                        <div className="text-lg font-semibold text-purple-400">
                            Pontos: {score}
                        </div>
                    </div>
                </div>

                <div className="text-center mb-6">
                    <p className="text-slate-400">
                        Questão {currentQuestion + 1} de {whoAmIData.length}
                    </p>
                    <p className="text-sm text-slate-500 mt-1">
                        Pontuação desta questão: {questionScore} pts | Tentativas: {attempts}/3
                    </p>
                </div>

                <motion.div
                    key={currentQuestion}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <Card className="p-8 bg-slate-800/50 border-slate-700 mb-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-semibold flex items-center gap-2">
                                <Lightbulb className="w-5 h-5 text-yellow-400" />
                                Dicas
                            </h3>
                            <span className="text-sm text-slate-400">
                                {revealedHints} de {maxHints} reveladas
                            </span>
                        </div>

                        <div className="space-y-3 mb-6">
                            <AnimatePresence>
                                {question.hints.slice(0, revealedHints).map((hint, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-start gap-3 p-3 bg-slate-700/30 rounded-lg"
                                    >
                                        <span className="text-purple-400 font-bold">{index + 1}.</span>
                                        <p className="text-slate-200">{hint}</p>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {revealedHints < maxHints && !showAnswer && (
                            <Button
                                onClick={revealHint}
                                variant="outline"
                                className="w-full mb-6"
                            >
                                <Eye className="w-4 h-4 mr-2" />
                                Revelar Próxima Dica (-15 pts)
                            </Button>
                        )}

                        {!showAnswer ? (
                            <div className="space-y-4">
                                <Input
                                    value={guess}
                                    onChange={(e) => setGuess(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
                                    placeholder="Digite sua resposta (ex: Ombro, Bíceps, etc)..."
                                    className="bg-slate-700 border-slate-600 text-white text-lg p-6"
                                />
                                {attempts > 0 && !showAnswer && (
                                    <p className="text-orange-400 text-sm">
                                        ❌ Resposta incorreta. Tente novamente! ({3 - attempts} tentativas restantes)
                                    </p>
                                )}
                                <Button
                                    onClick={checkAnswer}
                                    disabled={!guess.trim()}
                                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                                    size="lg"
                                >
                                    Responder
                                </Button>
                            </div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <Card className={`p-6 mb-4 ${isCorrect ? 'bg-green-900/30 border-green-500' : 'bg-red-900/30 border-red-500'}`}>
                                    <p className="text-2xl font-bold text-center mb-2">
                                        {isCorrect ? '✅ Correto!' : '❌ Não foi dessa vez!'}
                                    </p>
                                    <p className="text-xl text-center">
                                        A resposta é: <span className={`font-bold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>{question.answer}</span>
                                    </p>
                                    {isCorrect && (
                                        <p className="text-center text-sm text-slate-300 mt-2">
                                            +{questionScore} pontos
                                        </p>
                                    )}
                                </Card>
                                <Button
                                    onClick={nextQuestion}
                                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-500"
                                    size="lg"
                                >
                                    {currentQuestion < whoAmIData.length - 1 ? 'Próximo Desafio' : 'Ver Resultado'}
                                </Button>
                            </motion.div>
                        )}
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
