# Test Assistant Code - Projeto Educacional

Um projeto educacional em Python com foco em boas práticas de programação, depuração e refatoração de código. Inclui exemplos práticos de algoritmos e técnicas fundamentais para iniciantes em programação.

## 📚 Conteúdo do Projeto

Este repositório contém três módulos principais com explicações detalhadas:

### 1. **Números Primos** (`num_primos.py`)
Implementação de uma função otimizada para verificar se um número é primo.

#### Características:
- ✓ Função `é_primo(numero)` com docstring em estilo Google
- ✓ Algoritmo otimizado usando raiz quadrada
- ✓ Tratamento de casos especiais (números ≤ 1, pares, número 2)
- ✓ Exemplos de teste incluídos

#### Como usar:
```python
from num_primos import é_primo

# Exemplos
print(é_primo(17))   # True
print(é_primo(10))   # False
print(é_primo(2))    # True
```

#### Otimizações implementadas:
- Rejeita números ≤ 1 imediatamente
- Identifica 2 como o único primo par
- Descarta todos os pares maiores que 2
- Verifica divisibilidade apenas até √n
- Testa apenas números ímpares

---

### 2. **Depuração de Código** (`debug.py`)
Exemplo educacional de código com erros corrigidos e comentários explicativos. Simula um sistema de cálculo de nota fiscal com múltiplos itens, impostos e descontos.

#### Erros originais encontrados e corrigidos:
1. **SyntaxError** - String sem aspas de abertura
2. **TypeError** - Conversão de tipo ausente (string para float)
3. **ValueError** - F-string incompleta
4. **IndentationError** - Indentação incorreta

#### Funcionalidades:
- Entrada de dados para 3 itens
- Cálculo de subtotal com quantidade e preço
- Aplicação automática de imposto (10%)
- Suporte a cupom de desconto por percentual
- Exibição formatada da nota fiscal

#### Exemplo de execução:
```
Cliente: João Silva
Item 1: R$ 50.00
Item 2: R$ 30.00
Item 3: R$ 20.00
---
Subtotal: R$ 100.00
Imposto (10%): R$ 10.00
Desconto (15%): -R$ 15.00
---
TOTAL: R$ 95.00
```

#### Comentários inline explicam:
- Decisões de lógica importante
- Ordem de operações matemáticas
- Propósito de estruturas condicionais
- Tratamento de precisão em ponto flutuante

---

### 3. **Refatoração de Código** (`refatoracao.py`)
Demonstração de como melhorar código legibilidade e manutenibilidade através de refatoração.

#### Melhorias aplicadas:
- ✓ Nomes de variáveis descritivos (`l` → `numeros`, `t` → `soma_total`)
- ✓ Nomes de funções significativos (`c()` → `calcular_estatisticas()`)
- ✓ Substituição de loops por funções nativas (`sum()`, `max()`, `min()`)
- ✓ Estrutura modular com função `main()`
- ✓ Docstrings explicativas
- ✓ Formatação e indentação adequadas

#### Antes (Código original):
```python
def c(l):
    t=0
    for i in range(len(l)):
        t=t+l[i]
    m=t/len(l)
    # ... mais linhas complexas
```

#### Depois (Código refatorado):
```python
def calcular_estatisticas(numeros):
    """Calcula soma, média, maior e menor valor de uma lista de números."""
    if not numeros:
        raise ValueError("A lista de números não pode ser vazia")
    
    soma_total = sum(numeros)
    media = soma_total / len(numeros)
    maior_valor = max(numeros)
    menor_valor = min(numeros)
    
    return soma_total, media, maior_valor, menor_valor
```

#### Como usar:
```python
from refatoracao import calcular_estatisticas

numeros = [23, 7, 45, 2, 67, 12, 89, 34, 56, 11]
soma, media, maior, menor = calcular_estatisticas(numeros)

print(f"Total: {soma}")
print(f"Média: {media:.2f}")
print(f"Maior: {maior}")
print(f"Menor: {menor}")
```

---

## 📋 Estrutura do Projeto

```
test-assistent-code/
├── README.md                          # Este arquivo
├── num_primos.py                      # Verificação de números primos
├── debug.py                           # Código corrigido com comentários
├── refatoracao.py                     # Exemplo de refatoração
├── explicacao_num_primo.md            # Explicação linha a linha - primos
├── explicacao-debug.md                # Explicação dos erros encontrados
└── explicacacao_num_refatoracao.md    # Explicação da refatoração
```

---

## 🚀 Como Executar

### Requisitos
- Python 3.7+
- Nenhuma dependência externa

### Executar cada módulo

**Teste de números primos:**
```bash
python num_primos.py
```

**Simulador de nota fiscal (requer entrada):**
```bash
python debug.py
```

**Cálculo de estatísticas:**
```bash
python refatoracao.py
```

---

## 📖 Documentação Detalhada

Para entender melhor cada seção do código, consulte os arquivos de explicação:

- **[explicacao_num_primo.md](explicacao_num_primo.md)** - Análise linha por linha da função de números primos
- **[explicacao-debug.md](explicacao-debug.md)** - Detalhamento dos 4 erros principais encontrados e corrigidos
- **[explicacacao_num_refatoracao.md](explicacacao_num_refatoracao.md)** - Comparação entre código original e refatorado

---

## 🎯 Objetivos Educacionais

Este projeto foi desenvolvido para ensinar:

✅ **Boas Práticas de Programação**
- Nomenclatura significativa de variáveis e funções
- Uso de docstrings em estilo Google
- Comentários inline para lógica complexa
- Estrutura modular de código

✅ **Algoritmos Fundamentais**
- Verificação de números primos (otimização com raiz quadrada)
- Operações com listas (soma, média, máximo, mínimo)
- Iteração eficiente

✅ **Depuração e Correção**
- Identificação de erros de sintaxe
- Tratamento de tipos de dados
- Resolução de problemas de indentação
- Operações com strings e formatação

✅ **Refatoração de Código**
- Melhorar legibilidade
- Reduzir complexidade
- Utilizar funções nativas do Python
- Aumentar manutenibilidade

---

## 💡 Dicas para Aprendizado

1. **Experimente modificar o código** - Altere valores e veja os resultados
2. **Estude as explicações** - Cada módulo tem detalhes linha a linha
3. **Teste casos extremos** - Veja como o código se comporta em situações limite
4. **Compare o antes e depois** - Veja como a refatoração melhora a qualidade
5. **Execute os exemplos** - Rode o código para consolidar o aprendizado

---

## 📝 Notas

- Todos os códigos estão totalmente funcionais e testados
- Comentários e docstrings estão em português
- O projeto segue as convenções PEP 8 do Python (com ajustes para português)
- Ideal para iniciantes em programação Python

---

## ✨ Contribuições

Este é um projeto educacional. Sinta-se livre para:
- Adicionar novos exemplos
- Melhorar as explicações
- Incluir mais casos de teste
- Sugerir melhorias

---

**Criado para fins educacionais | Foco: Boas Práticas em Python**
