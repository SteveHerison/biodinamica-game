// Expanded Biomechanics Question Bank
export interface LeverQuestion {
    id: number;
    question: string;
    answer: string;
    type: "1" | "2" | "3";
    explanation?: string;
}

export interface WhoAmIQuestion {
    answer: string;
    hints: string[];
    category: "joint" | "muscle" | "bone";
}

export interface MovementQuestion {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    options: { text: string; correct: boolean }[];
}

export interface MatchingPair {
    id: number;
    left: string;
    right: string;
    category: "muscle-action" | "movement-muscle" | "lever-example" | "anatomy-definition";
}

// LEVERS GAME - 36 Questions (12 per level)
export const leversData = {
    easy: [
        {
            id: 1,
            question: "Ao fazer flexão de cotovelo (dobrar o braço para levar a mão à boca), o cotovelo é o ponto fixo, o peso da mão é a resistência e o bíceps faz a força. Que tipo de alavanca é essa?",
            answer: "3ª classe (interpotente)",
            type: "3" as const,
            explanation: "O esforço (bíceps) está entre o fulcro (cotovelo) e a resistência (mão)."
        },
        {
            id: 2,
            question: "Ao fazer elevação dos calcanhares (ficar na ponta dos pés), o ponto de apoio está nos dedos do pé, a resistência é o peso do corpo e a força vem do tríceps sural (panturrilha). Qual o tipo de alavanca?",
            answer: "2ª classe (inter-resistente)",
            type: "2" as const,
            explanation: "A resistência (peso do corpo) está entre o fulcro (dedos) e o esforço (panturrilha)."
        },
        {
            id: 3,
            question: "Ao balançar a cabeça para dizer 'sim', o pescoço funciona como uma alavanca com o ponto de apoio nas articulações atlanto-occipitais. Que tipo de alavanca é essa?",
            answer: "1ª classe (interfixa)",
            type: "1" as const,
            explanation: "O fulcro está entre o esforço e a resistência."
        },
        {
            id: 4,
            question: "Em uma gangorra de playground, onde está o fulcro em relação às crianças sentadas?",
            answer: "1ª classe (interfixa)",
            type: "1" as const,
            explanation: "O fulcro (ponto central) está entre as duas forças."
        },
        {
            id: 5,
            question: "Ao usar um carrinho de mão, onde você levanta as alças e a carga fica no centro, que tipo de alavanca é formada?",
            answer: "2ª classe (inter-resistente)",
            type: "2" as const
        },
        {
            id: 6,
            question: "Ao segurar um peso com o braço estendido lateralmente, o ombro é o fulcro e o deltóide aplica força. Que tipo de alavanca?",
            answer: "3ª classe (interpotente)",
            type: "3" as const
        },
        {
            id: 7,
            question: "Uma tesoura funciona como que tipo de alavanca?",
            answer: "1ª classe (interfixa)",
            type: "1" as const,
            explanation: "O parafuso central é o fulcro, entre as lâminas e as alças."
        },
        {
            id: 8,
            question: "Ao abrir uma porta, a maçaneta está longe da dobradiça. Que tipo de alavanca é formada?",
            answer: "2ª classe (inter-resistente)",
            type: "2" as const
        },
        {
            id: 9,
            question: "Ao mastigar, a mandíbula funciona como uma alavanca. O fulcro está na articulação temporomandibular. Que tipo?",
            answer: "3ª classe (interpotente)",
            type: "3" as const
        },
        {
            id: 10,
            question: "Ao usar uma pinça para pegar algo, que tipo de alavanca você está usando?",
            answer: "3ª classe (interpotente)",
            type: "3" as const
        },
        {
            id: 11,
            question: "Um quebra-nozes é um exemplo de que tipo de alavanca?",
            answer: "2ª classe (inter-resistente)",
            type: "2" as const
        },
        {
            id: 12,
            question: "Ao balançar um martelo para pregar um prego, seu cotovelo atua como que tipo de alavanca?",
            answer: "3ª classe (interpotente)",
            type: "3" as const
        }
    ],
    medium: [
        {
            id: 13,
            question: "Ao levantar um halter com o antebraço, onde o cotovelo é o fulcro, o peso do halter é a resistência e o bíceps aplica a força. Qual é a classe da alavanca?",
            answer: "3ª classe",
            type: "3" as const
        },
        {
            id: 14,
            question: "Ao empurrar o corpo para frente durante o andar (fase de impulso), o tornozelo serve como fulcro, a força vem da panturrilha e o peso corporal é a resistência. Qual é a classe de alavanca?",
            answer: "2ª classe",
            type: "2" as const
        },
        {
            id: 15,
            question: "Ao estender o pescoço para olhar para o teto, o fulcro está na articulação da cabeça, a resistência é o peso da cabeça e a força vem dos músculos posteriores do pescoço. Que tipo de alavanca é?",
            answer: "1ª classe",
            type: "1" as const
        },
        {
            id: 16,
            question: "Levantar o antebraço segurando um livro é um exemplo de qual tipo de alavanca?",
            answer: "3ª classe",
            type: "3" as const
        },
        {
            id: 17,
            question: "Durante a flexão plantar (apontar os dedos dos pés para baixo), que tipo de alavanca é formada?",
            answer: "2ª classe",
            type: "2" as const
        },
        {
            id: 18,
            question: "Ao fazer uma remada com halteres, puxando o peso em direção ao corpo, o cotovelo funciona como que tipo de alavanca?",
            answer: "3ª classe",
            type: "3" as const
        },
        {
            id: 19,
            question: "Ao inclinar a cabeça para o lado, que tipo de alavanca é formada na coluna cervical?",
            answer: "1ª classe",
            type: "1" as const
        },
        {
            id: 20,
            question: "Durante um exercício de tríceps (extensão de cotovelo), que tipo de alavanca está sendo utilizada?",
            answer: "1ª classe",
            type: "1" as const
        },
        {
            id: 21,
            question: "Ao segurar uma mochila pesada nas costas, os músculos eretores da espinha trabalham em que tipo de alavanca?",
            answer: "3ª classe",
            type: "3" as const
        },
        {
            id: 22,
            question: "Durante a dorsiflexão do tornozelo (levantar a ponta do pé), que tipo de alavanca é formada?",
            answer: "3ª classe",
            type: "3" as const
        },
        {
            id: 23,
            question: "Ao fazer abdução do ombro (levantar o braço lateralmente), que tipo de alavanca o deltóide utiliza?",
            answer: "3ª classe",
            type: "3" as const
        },
        {
            id: 24,
            question: "Durante a mastigação, quando você morde algo duro, que tipo de alavanca a mandíbula forma?",
            answer: "3ª classe",
            type: "3" as const
        }
    ],
    hard: [
        {
            id: 25,
            question: "Em uma escalada, o movimento de extensão do joelho feito pelo quadríceps para empurrar o corpo para cima representa qual tipo de alavanca?",
            answer: "3ª classe",
            type: "3" as const
        },
        {
            id: 26,
            question: "Durante o ato de sentar e levantar da cadeira, o movimento do tornozelo durante a subida caracteriza qual tipo de alavanca?",
            answer: "2ª classe (quando o corpo sobe na ponta dos pés)",
            type: "2" as const
        },
        {
            id: 27,
            question: "No movimento de extensão do cotovelo (empurrar algo), o tríceps faz força entre o fulcro (cotovelo) e a resistência (peso na mão). Que tipo de alavanca é?",
            answer: "1ª classe",
            type: "1" as const
        },
        {
            id: 28,
            question: "Ao chutar uma bola, o quadril é o fulcro, o quadríceps faz força e o peso da perna é a resistência. Qual é a classe de alavanca?",
            answer: "3ª classe",
            type: "3" as const
        },
        {
            id: 29,
            question: "Se um terapeuta segura o braço de um paciente pelo punho para avaliar a força do bíceps, que tipo de alavanca está sendo utilizada?",
            answer: "3ª classe",
            type: "3" as const
        },
        {
            id: 30,
            question: "Durante um salto vertical, na fase de impulso quando os tornozelos fazem flexão plantar explosiva, que tipo de alavanca é utilizada?",
            answer: "2ª classe",
            type: "2" as const
        },
        {
            id: 31,
            question: "Em um exercício de supino, quando você empurra a barra para cima, o cotovelo funciona como que tipo de alavanca?",
            answer: "1ª classe",
            type: "1" as const,
            explanation: "O tríceps (esforço) está atrás do cotovelo (fulcro), e a carga está na mão."
        },
        {
            id: 32,
            question: "Durante a corrida, na fase de balanço da perna, o quadril funciona como fulcro. Que tipo de alavanca os flexores do quadril utilizam?",
            answer: "3ª classe",
            type: "3" as const
        },
        {
            id: 33,
            question: "Ao realizar uma flexão de braço (push-up), o cotovelo funciona como que tipo de alavanca durante a fase de subida?",
            answer: "1ª classe",
            type: "1" as const
        },
        {
            id: 34,
            question: "Durante um exercício de leg press, quando você empurra a plataforma, o joelho funciona como que tipo de alavanca?",
            answer: "3ª classe",
            type: "3" as const
        },
        {
            id: 35,
            question: "Ao arremessar uma bola de beisebol, o ombro funciona como fulcro. Que tipo de alavanca os músculos do ombro utilizam?",
            answer: "3ª classe",
            type: "3" as const
        },
        {
            id: 36,
            question: "Durante um exercício de prancha (plank), os músculos abdominais trabalham para manter o tronco reto. Que tipo de alavanca é formada?",
            answer: "3ª classe",
            type: "3" as const
        }
    ]
};

// WHO AM I GAME - 15 Questions
export const whoAmIData: WhoAmIQuestion[] = [
    {
        answer: "Ombro",
        category: "joint",
        hints: [
            "Tenho formato esferoide, o que me dá grande amplitude de movimento.",
            "Sou formada pela escápula e pelo úmero.",
            "Meus ligamentos principais são o glenoumeral e o coracoclavicular.",
            "Meus movimentos envolvem flexão, extensão, abdução, adução e rotação.",
            "O músculo deltóide participa de quase todos os meus movimentos.",
            "Os músculos supraespinal, infraespinal, redondo menor e subescapular formam um grupo que me estabiliza.",
            "Sou essencial para levantar e girar o braço."
        ]
    },
    {
        answer: "Cotovelo",
        category: "joint",
        hints: [
            "Sou uma articulação do tipo gínglimo, ou dobradiça.",
            "Permito flexão e extensão do antebraço.",
            "Sou estabilizado pelos ligamentos colaterais radial e ulnar.",
            "O bíceps braquial e o braquial são responsáveis pela minha flexão.",
            "O tríceps braquial realiza minha extensão.",
            "Sou importante em ações como empurrar e puxar.",
            "Tenho um papel central nas atividades que exigem força de braço."
        ]
    },
    {
        answer: "Punho/Mão",
        category: "joint",
        hints: [
            "Sou composta por várias articulações pequenas que permitem movimentos finos.",
            "Realizo flexão, extensão, adução, abdução e circundução.",
            "Sou estabilizada por pequenos ligamentos carpais e colaterais.",
            "Músculos flexores e extensores do antebraço me controlam.",
            "Sou responsável por movimentos de precisão e preensão.",
            "Meus músculos agem de forma coordenada para segurar objetos.",
            "Sou fundamental para atividades manuais e expressão gestual."
        ]
    },
    {
        answer: "Coluna Vertebral",
        category: "bone",
        hints: [
            "Tenho uma morfologia composta por vértebras empilhadas.",
            "Permito flexão, extensão, rotação e inclinação lateral.",
            "Sou estabilizada por ligamentos longitudinais, interespinhosos e supraespinhosos.",
            "Músculos como os eretores da espinha me mantêm ereta.",
            "Os abdominais controlam meus movimentos de flexão e estabilização.",
            "Sou o eixo central do corpo, responsável pela postura.",
            "Minhas ações musculares envolvem equilíbrio e controle fino."
        ]
    },
    {
        answer: "Quadril",
        category: "joint",
        hints: [
            "Sou uma articulação esferoide e muito estável.",
            "Conecto o tronco aos membros inferiores.",
            "Meus ligamentos são o iliofemoral, pubofemoral e isquiofemoral.",
            "O glúteo máximo, o iliopsoas e o reto femoral atuam em mim.",
            "Realizo movimentos de flexão, extensão, abdução, adução e rotação.",
            "Sou importante para sustentar o peso corporal.",
            "Durante a caminhada, sou essencial para o impulso e equilíbrio."
        ]
    },
    {
        answer: "Joelho",
        category: "joint",
        hints: [
            "Sou uma articulação sinovial do tipo dobradiça modificada.",
            "Meus principais ligamentos são os cruzados e colaterais.",
            "Permito flexão, extensão e leve rotação quando flexionado.",
            "O quadríceps realiza minha extensão.",
            "Os isquiotibiais são os responsáveis pela minha flexão.",
            "Sou fundamental para andar, correr e agachar.",
            "Recebo grande carga durante o movimento, por isso dependo de estabilidade muscular."
        ]
    },
    {
        answer: "Tornozelo/Pé",
        category: "joint",
        hints: [
            "Sou uma articulação do tipo dobradiça.",
            "Realizo dorsiflexão, flexão plantar, inversão e eversão.",
            "Sou estabilizado por ligamentos deltóides e talofibulares.",
            "Músculos como o gastrocnêmio, sóleo e tibial anterior me controlam.",
            "Meus movimentos são essenciais para o equilíbrio e a marcha.",
            "Trabalho junto ao arco plantar para absorver impacto.",
            "Sou indispensável para manter o corpo em pé e locomover-se."
        ]
    },
    {
        answer: "Bíceps Braquial",
        category: "muscle",
        hints: [
            "Sou um músculo de duas cabeças localizado no braço.",
            "Minha principal função é flexionar o cotovelo.",
            "Também ajudo na supinação do antebraço.",
            "Sou frequentemente trabalhado em exercícios de rosca.",
            "Minha origem está na escápula e minha inserção no rádio.",
            "Sou um dos músculos mais visíveis do braço.",
            "Trabalho em oposição ao tríceps braquial."
        ]
    },
    {
        answer: "Quadríceps Femoral",
        category: "muscle",
        hints: [
            "Sou um grupo muscular de quatro cabeças na coxa.",
            "Minha principal função é estender o joelho.",
            "Sou essencial para caminhar, correr e subir escadas.",
            "Uma de minhas cabeças também flexiona o quadril.",
            "Sou trabalhado em exercícios como agachamento e leg press.",
            "Minha inserção é na patela através do tendão patelar.",
            "Sou um dos grupos musculares mais fortes do corpo."
        ]
    },
    {
        answer: "Gastrocnêmio",
        category: "muscle",
        hints: [
            "Sou um músculo da panturrilha com duas cabeças.",
            "Minha principal função é fazer flexão plantar do tornozelo.",
            "Também ajudo na flexão do joelho.",
            "Sou visível na parte posterior da perna.",
            "Trabalho junto com o sóleo para formar o tríceps sural.",
            "Minha inserção é no calcâneo através do tendão de Aquiles.",
            "Sou essencial para caminhar, correr e pular."
        ]
    },
    {
        answer: "Deltóide",
        category: "muscle",
        hints: [
            "Sou um músculo triangular que cobre o ombro.",
            "Tenho três partes: anterior, média e posterior.",
            "Minha principal função é abduzir o braço.",
            "Também participo da flexão e extensão do ombro.",
            "Sou responsável pelo formato arredondado do ombro.",
            "Trabalho em quase todos os movimentos do braço.",
            "Sou frequentemente trabalhado em exercícios de desenvolvimento."
        ]
    },
    {
        answer: "Peitoral Maior",
        category: "muscle",
        hints: [
            "Sou um músculo grande e em forma de leque no peito.",
            "Minha principal função é aduzir e flexionar o ombro.",
            "Também faço rotação medial do braço.",
            "Sou trabalhado em exercícios como supino e flexões.",
            "Tenho duas porções: clavicular e esternocostal.",
            "Minha inserção é no úmero.",
            "Sou um dos músculos mais visíveis do tronco."
        ]
    },
    {
        answer: "Glúteo Máximo",
        category: "muscle",
        hints: [
            "Sou o maior músculo do corpo humano.",
            "Minha principal função é estender o quadril.",
            "Também faço rotação lateral da coxa.",
            "Sou essencial para subir escadas e levantar de uma cadeira.",
            "Trabalho intensamente durante corridas e saltos.",
            "Dou forma aos glúteos.",
            "Sou trabalhado em exercícios como agachamento e stiff."
        ]
    },
    {
        answer: "Tríceps Braquial",
        category: "muscle",
        hints: [
            "Sou um músculo de três cabeças na parte posterior do braço.",
            "Minha principal função é estender o cotovelo.",
            "Uma de minhas cabeças também estende o ombro.",
            "Trabalho em oposição ao bíceps braquial.",
            "Sou trabalhado em exercícios como tríceps testa e mergulho.",
            "Minha inserção é no olécrano da ulna.",
            "Sou responsável por grande parte do volume do braço."
        ]
    },
    {
        answer: "Reto Abdominal",
        category: "muscle",
        hints: [
            "Sou um músculo longo e plano na parte anterior do abdômen.",
            "Minha principal função é flexionar o tronco.",
            "Também ajudo na compressão abdominal.",
            "Sou dividido em segmentos por intersecções tendíneas.",
            "Quando bem definido, formo o 'tanquinho'.",
            "Trabalho em exercícios como abdominais e prancha.",
            "Sou importante para a estabilização do core."
        ]
    }
];

// MOVEMENT GAME - 10 Questions
export const movementData: MovementQuestion[] = [
    {
        id: 1,
        title: "Agachamento",
        description: "Observe a imagem. Qual movimento está sendo realizado e qual o principal músculo ativado?",
        imageUrl: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&h=400&fit=crop",
        options: [
            { text: "Flexão de quadril — Bíceps femoral", correct: false },
            { text: "Extensão de joelho — Quadríceps femoral", correct: true },
            { text: "Flexão de tornozelo — Tibial anterior", correct: false },
            { text: "Extensão de ombro — Deltóide posterior", correct: false }
        ]
    },
    {
        id: 2,
        title: "Flexão de cotovelo (Rosca de bíceps)",
        description: "Qual o movimento mostrado na imagem e o principal músculo responsável?",
        imageUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&h=400&fit=crop",
        options: [
            { text: "Extensão de cotovelo — Tríceps braquial", correct: false },
            { text: "Flexão de cotovelo — Bíceps braquial", correct: true },
            { text: "Supinação do antebraço — Braquiorradial", correct: false },
            { text: "Extensão de punho — Extensor radial", correct: false }
        ]
    },
    {
        id: 3,
        title: "Elevação dos calcanhares",
        description: "Observe o movimento. Qual é o nome e qual músculo principal está ativado?",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
        options: [
            { text: "Dorsiflexão — Tibial anterior", correct: false },
            { text: "Flexão plantar — Gastrocnêmio", correct: true },
            { text: "Flexão de joelho — Isquiotibiais", correct: false },
            { text: "Extensão de quadril — Glúteo máximo", correct: false }
        ]
    },
    {
        id: 4,
        title: "Corrida – fase de impulso",
        description: "Na fase de impulso da corrida, qual movimento e qual músculo principal estão sendo utilizados?",
        imageUrl: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&h=400&fit=crop",
        options: [
            { text: "Flexão de quadril — Iliopsoas", correct: false },
            { text: "Extensão de quadril — Glúteo máximo", correct: true },
            { text: "Flexão plantar — Tibial anterior", correct: false },
            { text: "Extensão de tronco — Eretor da espinha", correct: false }
        ]
    },
    {
        id: 5,
        title: "Abdução de ombro",
        description: "Que movimento e músculo principal estão representados na imagem?",
        imageUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=400&fit=crop",
        options: [
            { text: "Flexão de ombro — Deltóide anterior", correct: false },
            { text: "Abdução de ombro — Deltóide médio", correct: true },
            { text: "Adução de ombro — Peitoral maior", correct: false },
            { text: "Extensão de ombro — Latíssimo do dorso", correct: false }
        ]
    },
    {
        id: 6,
        title: "Flexão de Braço (Push-up)",
        description: "Durante a flexão de braço, qual é o principal movimento e músculo ativado?",
        imageUrl: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=600&h=400&fit=crop",
        options: [
            { text: "Flexão de ombro — Peitoral maior", correct: true },
            { text: "Extensão de cotovelo — Bíceps braquial", correct: false },
            { text: "Abdução de ombro — Deltóide", correct: false },
            { text: "Flexão de punho — Flexores do antebraço", correct: false }
        ]
    },
    {
        id: 7,
        title: "Prancha (Plank)",
        description: "Na posição de prancha, quais músculos são os principais estabilizadores?",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
        options: [
            { text: "Quadríceps e isquiotibiais", correct: false },
            { text: "Reto abdominal e transverso do abdômen", correct: true },
            { text: "Deltóides e trapézio", correct: false },
            { text: "Glúteos e panturrilha", correct: false }
        ]
    },
    {
        id: 8,
        title: "Remada",
        description: "Durante uma remada, qual é o principal movimento do ombro?",
        imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop",
        options: [
            { text: "Abdução — Deltóide médio", correct: false },
            { text: "Extensão e adução — Latíssimo do dorso", correct: true },
            { text: "Flexão — Peitoral maior", correct: false },
            { text: "Rotação externa — Infraespinal", correct: false }
        ]
    },
    {
        id: 9,
        title: "Stiff (Levantamento Terra Romeno)",
        description: "No exercício stiff, qual é o principal movimento e músculo trabalhado?",
        imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=400&fit=crop",
        options: [
            { text: "Flexão de joelho — Quadríceps", correct: false },
            { text: "Extensão de quadril — Glúteo máximo e isquiotibiais", correct: true },
            { text: "Flexão de tronco — Reto abdominal", correct: false },
            { text: "Extensão de tornozelo — Gastrocnêmio", correct: false }
        ]
    },
    {
        id: 10,
        title: "Desenvolvimento de Ombros",
        description: "No desenvolvimento de ombros, qual é o principal movimento e músculo?",
        imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=400&fit=crop",
        options: [
            { text: "Adução de ombro — Peitoral maior", correct: false },
            { text: "Flexão e abdução de ombro — Deltóide", correct: true },
            { text: "Extensão de cotovelo — Tríceps", correct: false },
            { text: "Rotação interna — Subescapular", correct: false }
        ]
    }
];

// MATCHING GAME - 50+ Pairs
export const matchingData: MatchingPair[] = [
    // Muscle-Action pairs
    { id: 1, left: "Bíceps Braquial", right: "Flexão de Cotovelo", category: "muscle-action" },
    { id: 2, left: "Tríceps Braquial", right: "Extensão de Cotovelo", category: "muscle-action" },
    { id: 3, left: "Quadríceps Femoral", right: "Extensão de Joelho", category: "muscle-action" },
    { id: 4, left: "Isquiotibiais", right: "Flexão de Joelho", category: "muscle-action" },
    { id: 5, left: "Gastrocnêmio", right: "Flexão Plantar", category: "muscle-action" },
    { id: 6, left: "Tibial Anterior", right: "Dorsiflexão", category: "muscle-action" },
    { id: 7, left: "Deltóide Médio", right: "Abdução de Ombro", category: "muscle-action" },
    { id: 8, left: "Peitoral Maior", right: "Adução de Ombro", category: "muscle-action" },
    { id: 9, left: "Latíssimo do Dorso", right: "Extensão de Ombro", category: "muscle-action" },
    { id: 10, left: "Glúteo Máximo", right: "Extensão de Quadril", category: "muscle-action" },
    { id: 11, left: "Iliopsoas", right: "Flexão de Quadril", category: "muscle-action" },
    { id: 12, left: "Reto Abdominal", right: "Flexão de Tronco", category: "muscle-action" },
    { id: 13, left: "Eretores da Espinha", right: "Extensão de Tronco", category: "muscle-action" },
    { id: 14, left: "Trapézio Superior", right: "Elevação da Escápula", category: "muscle-action" },
    { id: 15, left: "Serrátil Anterior", right: "Protração da Escápula", category: "muscle-action" },

    // Movement-Muscle pairs
    { id: 16, left: "Agachamento", right: "Quadríceps e Glúteos", category: "movement-muscle" },
    { id: 17, left: "Rosca Bíceps", right: "Bíceps Braquial", category: "movement-muscle" },
    { id: 18, left: "Supino", right: "Peitoral Maior e Tríceps", category: "movement-muscle" },
    { id: 19, left: "Remada", right: "Latíssimo do Dorso", category: "movement-muscle" },
    { id: 20, left: "Desenvolvimento", right: "Deltóides", category: "movement-muscle" },
    { id: 21, left: "Prancha", right: "Reto Abdominal e Core", category: "movement-muscle" },
    { id: 22, left: "Elevação de Panturrilha", right: "Gastrocnêmio e Sóleo", category: "movement-muscle" },
    { id: 23, left: "Stiff", right: "Isquiotibiais e Glúteos", category: "movement-muscle" },
    { id: 24, left: "Leg Press", right: "Quadríceps", category: "movement-muscle" },
    { id: 25, left: "Pulldown", right: "Latíssimo do Dorso", category: "movement-muscle" },

    // Lever-Example pairs
    { id: 26, left: "1ª Classe", right: "Balançar a cabeça", category: "lever-example" },
    { id: 27, left: "2ª Classe", right: "Ficar na ponta dos pés", category: "lever-example" },
    { id: 28, left: "3ª Classe", right: "Flexão de cotovelo", category: "lever-example" },
    { id: 29, left: "1ª Classe", right: "Tesoura", category: "lever-example" },
    { id: 30, left: "2ª Classe", right: "Carrinho de mão", category: "lever-example" },
    { id: 31, left: "3ª Classe", right: "Pinça", category: "lever-example" },
    { id: 32, left: "1ª Classe", right: "Gangorra", category: "lever-example" },
    { id: 33, left: "2ª Classe", right: "Quebra-nozes", category: "lever-example" },
    { id: 34, left: "3ª Classe", right: "Mastigação", category: "lever-example" },
    { id: 35, left: "1ª Classe", right: "Extensão de cotovelo", category: "lever-example" },

    // Anatomy-Definition pairs
    { id: 36, left: "Fulcro", right: "Ponto de apoio da alavanca", category: "anatomy-definition" },
    { id: 37, left: "Agonista", right: "Músculo que realiza o movimento", category: "anatomy-definition" },
    { id: 38, left: "Antagonista", right: "Músculo que se opõe ao movimento", category: "anatomy-definition" },
    { id: 39, left: "Sinergista", right: "Músculo que auxilia o movimento", category: "anatomy-definition" },
    { id: 40, left: "Flexão", right: "Diminuição do ângulo articular", category: "anatomy-definition" },
    { id: 41, left: "Extensão", right: "Aumento do ângulo articular", category: "anatomy-definition" },
    { id: 42, left: "Abdução", right: "Afastamento da linha média", category: "anatomy-definition" },
    { id: 43, left: "Adução", right: "Aproximação da linha média", category: "anatomy-definition" },
    { id: 44, left: "Pronação", right: "Rotação do antebraço (palma para baixo)", category: "anatomy-definition" },
    { id: 45, left: "Supinação", right: "Rotação do antebraço (palma para cima)", category: "anatomy-definition" },
    { id: 46, left: "Dorsiflexão", right: "Levantar a ponta do pé", category: "anatomy-definition" },
    { id: 47, left: "Flexão Plantar", right: "Apontar o pé para baixo", category: "anatomy-definition" },
    { id: 48, left: "Origem", right: "Ponto de fixação menos móvel", category: "anatomy-definition" },
    { id: 49, left: "Inserção", right: "Ponto de fixação mais móvel", category: "anatomy-definition" },
    { id: 50, left: "Articulação Sinovial", right: "Articulação com cavidade e líquido", category: "anatomy-definition" },
    { id: 51, left: "Tendão", right: "Conecta músculo ao osso", category: "anatomy-definition" },
    { id: 52, left: "Ligamento", right: "Conecta osso ao osso", category: "anatomy-definition" },
    { id: 53, left: "Cartilagem", right: "Tecido que reduz atrito articular", category: "anatomy-definition" },
    { id: 54, left: "Sarcomero", right: "Unidade contrátil do músculo", category: "anatomy-definition" },
    { id: 55, left: "Miofibrila", right: "Filamento dentro da fibra muscular", category: "anatomy-definition" }
];
