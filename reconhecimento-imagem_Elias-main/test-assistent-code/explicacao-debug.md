# Documentação de Depuração - debug.py

## Resumo
Foram encontrados e corrigidos **4 erros principais** no código, incluindo erros de sintaxe, tipo de dados e indentação.

---

## Erros Encontrados e Corrigidos

### **Erro 1: String sem aspas (Linha 6)**

**Tipo:** SyntaxError - String não fechada

**Código Original:**
```python
item1 = float(input(Preço do item 1? ))
```

**Problema:**
- A string `"Preço do item 1? "` não possui aspas de abertura
- Python não consegue identificar onde a string começa
- Gera erro de sintaxe ao executar

**Código Corrigido:**
```python
item1 = float(input("Preço do item 1? "))
```

**Explicação:**
- Adicionadas as aspas duplas `"` ao redor da string de mensagem
- Agora a sintaxe está correta

---

### **Erro 2: Input retorna string, não número (Linha 21)**

**Tipo:** TypeError - Operação entre tipos incompatíveis

**Código Original:**
```python
desconto_cupom = (input("Você tem um cupom de desconto? (Digite o percentual ou 0): "))
desconto = subtotal * (desconto_cupom / 100)
```

**Problema:**
- `input()` sempre retorna uma string (texto)
- Tentar dividir uma string por 100 (`desconto_cupom / 100`) causa erro
- O código tenta fazer operações matemáticas com uma string na linha 27 (`if desconto_cupom > 0:`)
- Comparação de string com número gera comportamento inesperado

**Código Corrigido:**
```python
desconto_cupom = float(input("Você tem um cupom de desconto? (Digite o percentual ou 0): "))
desconto = subtotal * (desconto_cupom / 100)
```

**Explicação:**
- Adicionada conversão `float()` ao redor do `input()`
- Agora a string é convertida para número decimal
- Operações matemáticas funcionam corretamente

---

### **Erro 3: F-string incompleta (Linha 39)**

**Tipo:** ValueError - String não é formatada como f-string

**Código Original:**
```python
print(" Item 2:        R$ {total_item2:.2f}")
```

**Problema:**
- A string contém `{total_item2:.2f}` mas não é uma f-string
- O `f` antes das aspas está faltando
- Python trata como texto literal, não como uma variável
- Resultado: exibe literalmente `R$ {total_item2:.2f}` ao invés do valor

**Código Corrigido:**
```python
print(f" Item 2:        R$ {total_item2:.2f}")
```

**Explicação:**
- Adicionado o prefixo `f` antes da string
- Agora Python reconhece como f-string e substitui a variável pelo seu valor
- A formatação `.2f` exibe o número com 2 casas decimais

---

### **Erro 4: Indentação incorreta (Linha 45-46)**

**Tipo:** IndentationError - Bloco de código mal indentado

**Código Original:**
```python
if desconto_cupom > 0: 
print(f" Desconto ({desconto_cupom:.0f}%): -R$ {desconto:.2f}")
```

**Problema:**
- O comando `print` não está indentado
- Python espera um bloco indentado após `if:`
- Gera erro de indentação ao executar
- Além disso, o espaço em branco após `:` não é válido

**Código Corrigido:**
```python
if desconto_cupom > 0:
    print(f" Desconto ({desconto_cupom:.0f}%): -R$ {desconto:.2f}")
```

**Explicação:**
- Adicionados 4 espaços (ou 1 tab) antes de `print`
- Agora faz parte do bloco `if`
- Removido o espaço inválido após `:`

---

## Tabela Resumida de Erros

| Linha | Tipo de Erro | Problema | Solução |
|-------|--------------|----------|---------|
| 6 | SyntaxError | String sem aspas | Adicionar `"` antes e depois do texto |
| 21 | TypeError | Input é string, não número | Envolver com `float()` |
| 39 | ValueError | F-string sem o prefixo `f` | Adicionar `f` antes das aspas |
| 45 | IndentationError | Código após `if:` não indentado | Indentar 4 espaços |

---

## Resultado Final

Após as correções, o código:
- ✅ Executa sem erros de sintaxe
- ✅ Realiza operações matemáticas corretamente
- ✅ Exibe valores formatados adequadamente
- ✅ Trata a indentação corretamente

O programa agora funciona como esperado: solicita dados do cliente, calcula subtotal, aplica imposto e desconto, e exibe o total final de forma formatada.
