"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DndContext, DragEndEvent, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ArrowLeft, Check, X, Shuffle, HelpCircle } from "lucide-react";
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

function SortableItem({ id, text, isCorrect, isIncorrect, selectionNumber, onSelect, isMobile }: {
    id: string;
    text: string;
    isCorrect?: boolean;
    isIncorrect?: boolean;
    selectionNumber?: number;
    onSelect?: () => void;
    isMobile?: boolean;
}) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    // Mobile: clickable cards with numbers
    if (isMobile) {
        return (
            <div onClick={onSelect}>
                <Card className={`p-2 sm:p-3 cursor-pointer transition-all ${isCorrect ? 'bg-green-900/30 border-green-500' :
                    isIncorrect ? 'bg-red-900/30 border-red-500' :
                        selectionNumber ? 'bg-cyan-900/30 border-cyan-500' :
                            'bg-slate-800/50 border-slate-700 hover:border-cyan-400'
                    }`}>
                    <div className="flex items-center justify-between gap-2">
                        <span className="text-white text-sm sm:text-base flex-1">{text}</span>
                        <div className="flex items-center gap-2 flex-shrink-0">
                            {selectionNumber && !isCorrect && !isIncorrect && (
                                <span className="w-6 h-6 rounded-full bg-cyan-500 text-white flex items-center justify-center text-sm font-bold">
                                    {selectionNumber}
                                </span>
                            )}
                            {isCorrect && <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />}
                            {isIncorrect && <X className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />}
                        </div>
                    </div>
                </Card>
            </div>
        );
    }

    // Desktop: draggable cards
    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <Card className={`p-2 sm:p-3 cursor-move hover:bg-slate-700/50 transition-colors ${isCorrect ? 'bg-green-900/30 border-green-500' :
                isIncorrect ? 'bg-red-900/30 border-red-500' :
                    'bg-slate-800/50 border-slate-700'
                }`}>
                <div className="flex items-center justify-between gap-2">
                    <span className="text-white text-sm sm:text-base">{text}</span>
                    {isCorrect && <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />}
                    {isIncorrect && <X className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 flex-shrink-0" />}
                </div>
            </Card>
        </div>
    );
}

interface RightItem {
    id: string;
    text: string;
}

export default function MatchingGame() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [leftItems, setLeftItems] = useState<DroppableItem[]>([]);
    const [rightItems, setRightItems] = useState<RightItem[]>([]);
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<string[]>([]);
    const { addScore, incrementStreak } = useGameStore();

    const sensors = useSensors(useSensor(PointerSensor));

    const categories = [
        { id: "muscle-action", name: "Músculo → Ação", count: matchingData.filter(d => d.category === "muscle-action").length },
        { id: "movement-muscle", name: "Movimento → Músculo", count: matchingData.filter(d => d.category === "movement-muscle").length },
        { id: "lever-example", name: "Alavanca → Exemplo", count: matchingData.filter(d => d.category === "lever-example").length },
        { id: "anatomy-definition", name: "Anatomia → Definição", count: matchingData.filter(d => d.category === "anatomy-definition").length },
    ];

    useEffect(() => {
        // Detect mobile
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

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

            const shuffledRight = shuffledData.map((d, idx) => ({
                id: `right-${d.id}-${idx}`,
                text: d.right
            })).sort(() => Math.random() - 0.5);
            setRightItems(shuffledRight);
            setShowResults(false);
            setScore(0);
            setSelectedOrder([]);
        }
    }, [selectedCategory]);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) return;

        const activeIndex = rightItems.findIndex(item => item.id === active.id);
        const overIndex = rightItems.findIndex(item => item.id === over.id);

        if (activeIndex !== overIndex) {
            setRightItems(arrayMove(rightItems, activeIndex, overIndex));
        }
    };

    const handleMobileSelect = (itemId: string) => {
        if (showResults) return;

        playSound('click');

        // If already selected, remove it and all items after it
        const currentIndex = selectedOrder.indexOf(itemId);
        if (currentIndex !== -1) {
            setSelectedOrder(selectedOrder.slice(0, currentIndex));
        } else {
            // Add to selection
            setSelectedOrder([...selectedOrder, itemId]);
        }
    };

    const checkAnswers = () => {
        playSound('click');
        let correct = 0;

        leftItems.forEach((item, index) => {
            const rightItem = isMobile
                ? rightItems.find(r => r.id === selectedOrder[index])
                : rightItems[index];

            if (rightItem && item.correctMatch === rightItem.text) {
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
        }
    };

    const shuffle = () => {
        playSound('click');
        if (isMobile) {
            setSelectedOrder([]);
        } else {
            setRightItems([...rightItems].sort(() => Math.random() - 0.5));
        }
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

            const shuffledRight = shuffledData.map((d, idx) => ({
                id: `right-${d.id}-${idx}`,
                text: d.right
            })).sort(() => Math.random() - 0.5);
            setRightItems(shuffledRight);
            setShowResults(false);
            setScore(0);
            setSelectedOrder([]);
        }
    };

    if (!selectedCategory) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4 sm:p-6 md:p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <Link href="/">
                            <Button variant="ghost" className="text-slate-300 hover:text-white">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Voltar
                            </Button>
                        </Link>
                        <h1 className="text-2xl sm:text-3xl font-bold">Conecte os Conceitos</h1>
                        <div className="w-24" />
                    </div>

                    <p className="text-slate-300 text-center mb-8 text-sm sm:text-base">
                        Escolha uma categoria e {isMobile ? 'toque nos itens na ordem correta' : 'arraste os itens da direita para conectar'}
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

    const getDisplayText = (index: number): string | undefined => {
        if (isMobile) {
            const itemId = selectedOrder[index];
            return rightItems.find(r => r.id === itemId)?.text;
        }
        return rightItems[index]?.text;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-3 sm:p-6 md:p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 sm:mb-6">
                    <Button variant="ghost" className="text-slate-300 hover:text-white text-sm" onClick={() => setSelectedCategory(null)}>
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Categorias
                    </Button>
                    <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-center flex-1">
                        {categories.find(c => c.id === selectedCategory)?.name}
                    </h1>
                    <div className="flex gap-2 w-full sm:w-auto">
                        <Button variant="outline" size="sm" onClick={shuffle} className="flex-1 sm:flex-none text-xs sm:text-sm">
                            <Shuffle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                            <span className="hidden sm:inline">Embaralhar</span>
                            <span className="sm:hidden">🔀</span>
                        </Button>
                        <Button variant="outline" size="sm" onClick={reset} className="flex-1 sm:flex-none text-xs sm:text-sm">
                            Reiniciar
                        </Button>
                    </div>
                </div>

                {isMobile && !showResults && (
                    <div className="mb-4 p-3 bg-cyan-900/20 border border-cyan-500/30 rounded-lg">
                        <p className="text-cyan-300 text-sm flex items-center gap-2">
                            <HelpCircle className="w-4 h-4" />
                            Toque nos itens da direita na ordem correta ({selectedOrder.length}/{leftItems.length})
                        </p>
                    </div>
                )}

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
                                        onClick={() => {
                                            setShowResults(false);
                                            setSelectedOrder([]);
                                        }}
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                    {/* Left Column (Fixed) */}
                    <div className="space-y-2 sm:space-y-3">
                        <h3 className="text-xs sm:text-sm font-semibold text-slate-400 mb-2 sm:mb-4">CONCEITOS</h3>
                        {leftItems.map((item, index) => {
                            const displayText = getDisplayText(index);
                            const isCorrect = showResults && item.correctMatch === displayText;
                            const isIncorrect = showResults && item.correctMatch !== displayText;
                            return (
                                <Card key={item.id} className={`p-2 sm:p-3 ${isCorrect ? 'bg-green-900/30 border-green-500' :
                                    isIncorrect ? 'bg-red-900/30 border-red-500' :
                                        'bg-slate-800/50 border-slate-700'
                                    }`}>
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-2">
                                            <span className="w-6 h-6 rounded-full bg-slate-700 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                                                {index + 1}
                                            </span>
                                            <span className="text-sm sm:text-base">{item.text}</span>
                                        </div>
                                        {isCorrect && <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />}
                                        {isIncorrect && <X className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 flex-shrink-0" />}
                                    </div>
                                </Card>
                            );
                        })}
                    </div>

                    {/* Right Column */}
                    <div className="space-y-2 sm:space-y-3">
                        <h3 className="text-xs sm:text-sm font-semibold text-slate-400 mb-2 sm:mb-4">
                            RESPOSTAS {isMobile ? <span>(Toque na ordem)</span> : <span className="hidden sm:inline">(Arraste para ordenar)</span>}
                        </h3>
                        {isMobile ? (
                            // Mobile: Click to select
                            <div className="space-y-2">
                                {rightItems.map((item) => {
                                    const selectionIndex = selectedOrder.indexOf(item.id);
                                    const selectionNumber = selectionIndex !== -1 ? selectionIndex + 1 : undefined;
                                    return (
                                        <SortableItem
                                            key={item.id}
                                            id={item.id}
                                            text={item.text}
                                            selectionNumber={selectionNumber}
                                            onSelect={() => handleMobileSelect(item.id)}
                                            isMobile={true}
                                            isCorrect={showResults && leftItems[selectionIndex]?.correctMatch === item.text}
                                            isIncorrect={showResults && selectionIndex !== -1 && leftItems[selectionIndex]?.correctMatch !== item.text}
                                        />
                                    );
                                })}
                            </div>
                        ) : (
                            // Desktop: Drag and drop
                            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                                <SortableContext items={rightItems.map(i => i.id)} strategy={verticalListSortingStrategy}>
                                    {rightItems.map((item, index) => (
                                        <SortableItem
                                            key={item.id}
                                            id={item.id}
                                            text={item.text}
                                            isMobile={false}
                                            isCorrect={showResults && leftItems[index]?.correctMatch === item.text}
                                            isIncorrect={showResults && leftItems[index]?.correctMatch !== item.text}
                                        />
                                    ))}
                                </SortableContext>
                            </DndContext>
                        )}
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <Button
                        size="lg"
                        onClick={checkAnswers}
                        disabled={isMobile && selectedOrder.length !== leftItems.length}
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                    >
                        Verificar Respostas
                    </Button>
                </div>
            </div>
        </div>
    );
}
