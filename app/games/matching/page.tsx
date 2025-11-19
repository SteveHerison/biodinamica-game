"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DndContext, DragEndEvent, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ArrowLeft, Check, X, Shuffle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { matchingData, MatchingPair } from "@/lib/data";
import { useGameStore } from "@/lib/store";
import { playSound, playConfetti } from "@/lib/sounds";

interface DroppableItem {
    id: string;
    text: string;
    correctMatch: string;
    currentMatch: string | null;
}

function SortableItem({ id, text, isCorrect, isIncorrect }: { id: string; text: string; isCorrect?: boolean; isIncorrect?: boolean }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <Card className={`p-4 cursor-move hover:bg-slate-700/50 transition-colors ${isCorrect ? 'bg-green-900/30 border-green-500' :
                isIncorrect ? 'bg-red-900/30 border-red-500' :
                    'bg-slate-800/50 border-slate-700'
                }`}>
                <div className="flex items-center justify-between">
                    <span className="text-white">{text}</span>
                    {isCorrect && <Check className="w-5 h-5 text-green-400" />}
                    {isIncorrect && <X className="w-5 h-5 text-red-400" />}
                </div>
            </Card>
        </div>
    );
}

export default function MatchingGame() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [leftItems, setLeftItems] = useState<DroppableItem[]>([]);
    const [rightItems, setRightItems] = useState<string[]>([]);
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);
    const { addScore, incrementStreak, resetStreak } = useGameStore();

    const sensors = useSensors(useSensor(PointerSensor));

    const categories = [
        { id: "muscle-action", name: "Músculo → Ação", count: matchingData.filter(d => d.category === "muscle-action").length },
        { id: "movement-muscle", name: "Movimento → Músculo", count: matchingData.filter(d => d.category === "movement-muscle").length },
        { id: "lever-example", name: "Alavanca → Exemplo", count: matchingData.filter(d => d.category === "lever-example").length },
        { id: "anatomy-definition", name: "Anatomia → Definição", count: matchingData.filter(d => d.category === "anatomy-definition").length },
    ];

    useEffect(() => {
        if (selectedCategory) {
            const categoryData = matchingData.filter(d => d.category === selectedCategory);
            const shuffledData = [...categoryData].sort(() => Math.random() - 0.5).slice(0, 8);

            setLeftItems(shuffledData.map(d => ({
                id: `left-${d.id}`,
                text: d.left,
                correctMatch: d.right,
                currentMatch: null
            })));

            const shuffledRight = shuffledData.map(d => d.right).sort(() => Math.random() - 0.5);
            setRightItems(shuffledRight);
            setShowResults(false);
            setScore(0);
        }
    }, [selectedCategory]);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) return;

        const activeIndex = rightItems.indexOf(active.id as string);
        const overIndex = rightItems.indexOf(over.id as string);

        if (activeIndex !== overIndex) {
            setRightItems(arrayMove(rightItems, activeIndex, overIndex));
        }
    };

    const checkAnswers = () => {
        playSound('click');
        let correct = 0;

        leftItems.forEach((item, index) => {
            if (item.correctMatch === rightItems[index]) {
                correct++;
            }
        });

        setScore(correct);
        setShowResults(true);

        if (correct === leftItems.length) {
            playConfetti();
            playSound('victory');
            addScore(correct * 10, 'matching');
            incrementStreak();
        } else {
            playSound('incorrect');
            // Don't reset streak - let them try again!
        }
    };

    const shuffle = () => {
        playSound('click');
        setRightItems([...rightItems].sort(() => Math.random() - 0.5));
        setShowResults(false);
    };

    const reset = () => {
        playSound('click');
        if (selectedCategory) {
            const categoryData = matchingData.filter(d => d.category === selectedCategory);
            const shuffledData = [...categoryData].sort(() => Math.random() - 0.5).slice(0, 8);

            setLeftItems(shuffledData.map(d => ({
                id: `left-${d.id}`,
                text: d.left,
                correctMatch: d.right,
                currentMatch: null
            })));

            const shuffledRight = shuffledData.map(d => d.right).sort(() => Math.random() - 0.5);
            setRightItems(shuffledRight);
            setShowResults(false);
            setScore(0);
        }
    };

    if (!selectedCategory) {
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
                        <h1 className="text-3xl font-bold">Conecte os Conceitos</h1>
                        <div className="w-24" />
                    </div>

                    <p className="text-slate-300 text-center mb-8">
                        Escolha uma categoria e arraste os itens da direita para conectar com os da esquerda
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {categories.map((cat, index) => (
                            <motion.div
                                key={cat.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card
                                    className="p-6 bg-slate-800/50 border-slate-700 hover:border-cyan-500 cursor-pointer transition-all hover:scale-105"
                                    onClick={() => setSelectedCategory(cat.id)}
                                >
                                    <h3 className="text-xl font-bold mb-2">{cat.name}</h3>
                                    <p className="text-slate-400 text-sm">{cat.count} pares disponíveis</p>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <Button variant="ghost" className="text-slate-300 hover:text-white" onClick={() => setSelectedCategory(null)}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Categorias
                    </Button>
                    <h1 className="text-2xl font-bold">
                        {categories.find(c => c.id === selectedCategory)?.name}
                    </h1>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={shuffle}>
                            <Shuffle className="w-4 h-4 mr-2" />
                            Embaralhar
                        </Button>
                        <Button variant="outline" size="sm" onClick={reset}>
                            Reiniciar
                        </Button>
                    </div>
                </div>

                {showResults && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6"
                    >
                        <Card className={`p-4 ${score === leftItems.length ? 'bg-green-900/30 border-green-500' : 'bg-orange-900/30 border-orange-500'}`}>
                            <p className="text-center text-lg font-bold">
                                {score === leftItems.length
                                    ? `🎉 Perfeito! Você acertou todas as ${leftItems.length} conexões!`
                                    : `Você acertou ${score} de ${leftItems.length} conexões.`
                                }
                            </p>
                            {score !== leftItems.length && (
                                <div className="flex gap-2 justify-center mt-4">
                                    <Button
                                        onClick={() => setShowResults(false)}
                                        variant="outline"
                                        size="sm"
                                    >
                                        Tentar Novamente
                                    </Button>
                                    <Button
                                        onClick={shuffle}
                                        variant="outline"
                                        size="sm"
                                    >
                                        <Shuffle className="w-4 h-4 mr-2" />
                                        Embaralhar
                                    </Button>
                                </div>
                            )}
                        </Card>
                    </motion.div>
                )}

                <div className="grid grid-cols-2 gap-8">
                    {/* Left Column (Fixed) */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-slate-400 mb-4">CONCEITOS</h3>
                        {leftItems.map((item, index) => (
                            <Card key={item.id} className={`p-4 ${showResults && item.correctMatch === rightItems[index] ? 'bg-green-900/30 border-green-500' :
                                showResults && item.correctMatch !== rightItems[index] ? 'bg-red-900/30 border-red-500' :
                                    'bg-slate-800/50 border-slate-700'
                                }`}>
                                <div className="flex items-center justify-between">
                                    <span>{item.text}</span>
                                    {showResults && item.correctMatch === rightItems[index] && <Check className="w-5 h-5 text-green-400" />}
                                    {showResults && item.correctMatch !== rightItems[index] && <X className="w-5 h-5 text-red-400" />}
                                </div>
                            </Card>
                        ))}
                    </div>

                    {/* Right Column (Draggable) */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-slate-400 mb-4">RESPOSTAS (Arraste para ordenar)</h3>
                        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                            <SortableContext items={rightItems} strategy={verticalListSortingStrategy}>
                                {rightItems.map((item, index) => (
                                    <SortableItem
                                        key={item}
                                        id={item}
                                        text={item}
                                        isCorrect={showResults && leftItems[index]?.correctMatch === item}
                                        isIncorrect={showResults && leftItems[index]?.correctMatch !== item}
                                    />
                                ))}
                            </SortableContext>
                        </DndContext>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <Button size="lg" onClick={checkAnswers} className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                        Verificar Respostas
                    </Button>
                </div>
            </div>
        </div>
    );
}
