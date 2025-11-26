"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, X, ZoomIn } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { movementData } from "@/lib/data";
import { useGameStore } from "@/lib/store";
import { playSound, playConfetti } from "@/lib/sounds";

export default function MovementGame() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [score, setScore] = useState(0);
    const [zoomedImage, setZoomedImage] = useState(false);
    const [shuffledOptions, setShuffledOptions] = useState<typeof movementData[0]['options']>([]);
    const { addScore, incrementStreak, resetStreak } = useGameStore();

    const question = movementData[currentQuestion];
    const progress = ((currentQuestion + 1) / movementData.length) * 100;

    useEffect(() => {
        // Shuffle options when question changes
        const options = [...movementData[currentQuestion].options];
        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }
        setShuffledOptions(options);
    }, [currentQuestion]);

    const handleAnswer = (index: number) => {
        if (showFeedback) return;

        playSound('click');
        setSelectedAnswer(index);
        setShowFeedback(true);

        const isCorrect = shuffledOptions[index].correct;

        if (isCorrect) {
            playSound('correct');
            setScore(score + 20);
            addScore(20, 'movement');
            incrementStreak();
        } else {
            playSound('incorrect');
            resetStreak();
        }
    };

    const nextQuestion = () => {
        playSound('click');
        if (currentQuestion < movementData.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setShowFeedback(false);
        } else {
            playConfetti();
            playSound('victory');
        }
    };

    const reset = () => {
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setShowFeedback(false);
        setScore(0);
    };

    if (currentQuestion >= movementData.length) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <h2 className="text-4xl font-bold mb-4">🎉 Parabéns!</h2>
                    <p className="text-2xl mb-2">Você completou todos os movimentos!</p>
                    <p className="text-xl text-slate-300 mb-8">Pontuação: {score}</p>
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

    if (shuffledOptions.length === 0) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <Link href="/">
                        <Button variant="ghost" className="text-slate-300 hover:text-white">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Voltar
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-bold">Movimento em Ação</h1>
                    <div className="text-lg font-semibold text-orange-400">
                        Pontos: {score}
                    </div>
                </div>

                <div className="text-center mb-4">
                    <p className="text-slate-400">
                        Questão {currentQuestion + 1} de {movementData.length}
                    </p>
                </div>

                <Progress value={progress} className="mb-8" />

                <motion.div
                    key={currentQuestion}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <Card className="p-8 bg-slate-800/50 border-slate-700 mb-6">
                        {/* Image */}
                        <div className="relative mb-6 rounded-lg overflow-hidden bg-slate-700/30 group cursor-pointer"
                            onClick={() => setZoomedImage(true)}>
                            <Image
                                src={question.imageUrl}
                                alt={question.title}
                                width={600}
                                height={400}
                                className="w-full h-64 object-cover"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                <ZoomIn className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </div>

                        <p className="text-lg mb-6 text-slate-200">{question.description}</p>

                        <div className="space-y-3">
                            {shuffledOptions.map((option, index) => {
                                const isSelected = selectedAnswer === index;
                                const isCorrect = option.correct;
                                const showCorrect = showFeedback && isCorrect;
                                const showIncorrect = showFeedback && isSelected && !isCorrect;

                                return (
                                    <motion.button
                                        key={index}
                                        onClick={() => handleAnswer(index)}
                                        disabled={showFeedback}
                                        whileHover={{ scale: showFeedback ? 1 : 1.02 }}
                                        whileTap={{ scale: showFeedback ? 1 : 0.98 }}
                                        className={`w-full p-4 rounded-lg border-2 transition-all text-left ${showCorrect ? 'bg-green-900/30 border-green-500' :
                                            showIncorrect ? 'bg-red-900/30 border-red-500' :
                                                'bg-slate-700/30 border-slate-600 hover:border-orange-500'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-base">{option.text}</span>
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
                                className="text-center"
                            >
                                <Card className={`p-6 mb-6 ${shuffledOptions[selectedAnswer!]?.correct ? 'bg-green-900/30 border-green-500' : 'bg-red-900/30 border-red-500'
                                    }`}>
                                    <p className="text-lg font-semibold">
                                        {shuffledOptions[selectedAnswer!]?.correct ? '✅ Correto!' : '❌ Incorreto'}
                                    </p>
                                    {!shuffledOptions[selectedAnswer!]?.correct && (
                                        <p className="text-slate-200 mt-2">
                                            Resposta correta: {shuffledOptions.find(o => o.correct)?.text}
                                        </p>
                                    )}
                                </Card>

                                <Button onClick={nextQuestion} size="lg" className="bg-gradient-to-r from-orange-500 to-red-500">
                                    {currentQuestion < movementData.length - 1 ? 'Próxima Questão' : 'Ver Resultado'}
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Zoom Dialog */}
                <Dialog open={zoomedImage} onOpenChange={setZoomedImage}>
                    <DialogContent className="max-w-4xl bg-slate-900 border-slate-700">
                        <Image
                            src={question.imageUrl}
                            alt={question.title}
                            width={1200}
                            height={800}
                            className="w-full h-auto rounded-lg"
                        />
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
