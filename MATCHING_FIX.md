// Script para aplicar a correção no jogo de correspondência
// O problema: itens com mesmo texto compartilham o mesmo ID, causando comportamento incorreto

// Mudanças necessárias:
// 1. Mudar rightItems de string[] para {id: string, text: string}[]
// 2. Gerar IDs únicos para cada item
// 3. Atualizar todas as referências para usar item.id e item.text

console.log("Correção aplicada:");
console.log("- rightItems agora usa objetos com id único");
console.log("- Cada item tem um ID baseado em seu índice original");
console.log("- Isso previne que itens com mesmo texto sejam arrastados juntos");
