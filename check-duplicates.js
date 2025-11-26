const fs = require('fs');

// Read the data file
const content = fs.readFileSync('./lib/data.ts', 'utf8');

console.log('=== VERIFICANDO DUPLICATAS NOS JOGOS ===\n');

// Extract levers data
const leversMatch = content.match(/export const leversData = \{[\s\S]*?\n\};/);
if (leversMatch) {
    const leversText = leversMatch[0];

    // Extract all questions
    const questionMatches = [...leversText.matchAll(/question: "(.*?)"/g)];
    const questions = questionMatches.map(m => m[1]);

    console.log('🎯 JOGO DE ALAVANCAS:');
    console.log(`Total de perguntas: ${questions.length}`);

    // Check for duplicate questions
    const questionCounts = {};
    questions.forEach(q => {
        questionCounts[q] = (questionCounts[q] || 0) + 1;
    });

    const duplicateQuestions = Object.entries(questionCounts).filter(([q, count]) => count > 1);
    if (duplicateQuestions.length > 0) {
        console.log('\n❌ PERGUNTAS DUPLICADAS:');
        duplicateQuestions.forEach(([q, count]) => {
            console.log(`  - [${count}x] ${q.substring(0, 80)}...`);
        });
    } else {
        console.log('✅ Nenhuma pergunta duplicada encontrada');
    }

    // Extract all answers
    const answerMatches = [...leversText.matchAll(/answer: "(.*?)"/g)];
    const answers = answerMatches.map(m => m[1]);

    // Check for duplicate answers (this is expected, so we'll just report)
    const answerCounts = {};
    answers.forEach(a => {
        answerCounts[a] = (answerCounts[a] || 0) + 1;
    });

    console.log('\n📊 Distribuição de respostas:');
    Object.entries(answerCounts).forEach(([a, count]) => {
        console.log(`  - ${a}: ${count} vezes`);
    });
}

// Extract whoAmI data
const whoAmIMatch = content.match(/export const whoAmIData: WhoAmIQuestion\[\] = \[[\s\S]*?\n\];/);
if (whoAmIMatch) {
    const whoAmIText = whoAmIMatch[0];

    // Extract all answers
    const answerMatches = [...whoAmIText.matchAll(/answer: "(.*?)"/g)];
    const answers = answerMatches.map(m => m[1]);

    console.log('\n\n🤔 JOGO "QUEM SOU EU?":');
    console.log(`Total de respostas: ${answers.length}`);

    const answerCounts = {};
    answers.forEach(a => {
        answerCounts[a] = (answerCounts[a] || 0) + 1;
    });

    const duplicateAnswers = Object.entries(answerCounts).filter(([a, count]) => count > 1);
    if (duplicateAnswers.length > 0) {
        console.log('\n❌ RESPOSTAS DUPLICADAS:');
        duplicateAnswers.forEach(([a, count]) => {
            console.log(`  - [${count}x] ${a}`);
        });
    } else {
        console.log('✅ Nenhuma resposta duplicada encontrada');
    }

    // Extract all hints
    const hintMatches = [...whoAmIText.matchAll(/"(.*?)"/g)];
    const hints = hintMatches.map(m => m[1]).filter(h => !answers.includes(h));

    const hintCounts = {};
    hints.forEach(h => {
        hintCounts[h] = (hintCounts[h] || 0) + 1;
    });

    const duplicateHints = Object.entries(hintCounts).filter(([h, count]) => count > 1);
    if (duplicateHints.length > 0) {
        console.log('\n⚠️ DICAS DUPLICADAS:');
        duplicateHints.forEach(([h, count]) => {
            console.log(`  - [${count}x] ${h}`);
        });
    } else {
        console.log('✅ Nenhuma dica duplicada encontrada');
    }
}

// Extract movement data
const movementMatch = content.match(/export const movementData: MovementQuestion\[\] = \[[\s\S]*?\n\];/);
if (movementMatch) {
    const movementText = movementMatch[0];

    // Extract all titles
    const titleMatches = [...movementText.matchAll(/title: "(.*?)"/g)];
    const titles = titleMatches.map(m => m[1]);

    console.log('\n\n🏃 JOGO DE MOVIMENTOS:');
    console.log(`Total de questões: ${titles.length}`);

    const titleCounts = {};
    titles.forEach(t => {
        titleCounts[t] = (titleCounts[t] || 0) + 1;
    });

    const duplicateTitles = Object.entries(titleCounts).filter(([t, count]) => count > 1);
    if (duplicateTitles.length > 0) {
        console.log('\n❌ TÍTULOS DUPLICADOS:');
        duplicateTitles.forEach(([t, count]) => {
            console.log(`  - [${count}x] ${t}`);
        });
    } else {
        console.log('✅ Nenhum título duplicado encontrado');
    }

    // Extract all image URLs
    const imageMatches = [...movementText.matchAll(/imageUrl: "(.*?)"/g)];
    const images = imageMatches.map(m => m[1]);

    const imageCounts = {};
    images.forEach(i => {
        imageCounts[i] = (imageCounts[i] || 0) + 1;
    });

    const duplicateImages = Object.entries(imageCounts).filter(([i, count]) => count > 1);
    if (duplicateImages.length > 0) {
        console.log('\n⚠️ IMAGENS DUPLICADAS:');
        duplicateImages.forEach(([i, count]) => {
            console.log(`  - [${count}x] ${i}`);
        });
    } else {
        console.log('✅ Nenhuma imagem duplicada encontrada');
    }
}

// Extract matching data
const matchingMatch = content.match(/export const matchingData: MatchingPair\[\] = \[[\s\S]*?\n\];/);
if (matchingMatch) {
    const matchingText = matchingMatch[0];

    // Extract all pairs
    const pairMatches = [...matchingText.matchAll(/\{ id: \d+, left: "(.*?)", right: "(.*?)", category: "(.*?)" \}/g)];

    console.log('\n\n🔗 JOGO DE CORRESPONDÊNCIA:');
    console.log(`Total de pares: ${pairMatches.length}`);

    // Check for duplicate pairs
    const pairStrings = pairMatches.map(m => `${m[1]} → ${m[2]}`);
    const pairCounts = {};
    pairStrings.forEach(p => {
        pairCounts[p] = (pairCounts[p] || 0) + 1;
    });

    const duplicatePairs = Object.entries(pairCounts).filter(([p, count]) => count > 1);
    if (duplicatePairs.length > 0) {
        console.log('\n❌ PARES DUPLICADOS:');
        duplicatePairs.forEach(([p, count]) => {
            console.log(`  - [${count}x] ${p}`);
        });
    } else {
        console.log('✅ Nenhum par duplicado encontrado');
    }

    // Check for duplicate left values
    const leftValues = pairMatches.map(m => m[1]);
    const leftCounts = {};
    leftValues.forEach(l => {
        leftCounts[l] = (leftCounts[l] || 0) + 1;
    });

    const duplicateLefts = Object.entries(leftCounts).filter(([l, count]) => count > 1);
    if (duplicateLefts.length > 0) {
        console.log('\n⚠️ VALORES DA ESQUERDA DUPLICADOS (podem ser intencionais):');
        duplicateLefts.forEach(([l, count]) => {
            console.log(`  - [${count}x] ${l}`);
        });
    }

    // Check for duplicate right values
    const rightValues = pairMatches.map(m => m[2]);
    const rightCounts = {};
    rightValues.forEach(r => {
        rightCounts[r] = (rightCounts[r] || 0) + 1;
    });

    const duplicateRights = Object.entries(rightCounts).filter(([r, count]) => count > 1);
    if (duplicateRights.length > 0) {
        console.log('\n⚠️ VALORES DA DIREITA DUPLICADOS (podem ser intencionais):');
        duplicateRights.forEach(([r, count]) => {
            console.log(`  - [${count}x] ${r}`);
        });
    }
}

console.log('\n\n=== VERIFICAÇÃO CONCLUÍDA ===');
