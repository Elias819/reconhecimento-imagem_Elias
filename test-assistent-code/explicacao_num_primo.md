# Explicação Linha a Linha - Função `é_primo()`

## Visão Geral
Este documento explica detalhadamente como a função `é_primo()` verifica se um número é primo.

---

## Definição da Função

```python
def é_primo(numero):
```
- **`def`**: Palavra-chave que declara uma nova função em Python
- **`é_primo`**: Nome da função (usando acentuação, comum em português)
- **`numero`**: Parâmetro que recebe o número a ser verificado

---

## Docstring (Documentação)

```python
    """
    Verifica se um número é primo.
    
    Args:
        numero (int): O número a ser verificado
    
    Returns:
        bool: True se o número é primo, False caso contrário
    """
```
- Texto entre `"""` é a documentação da função
- **`Args`**: Descreve os argumentos que a função recebe
  - `numero (int)`: Tipo inteiro
- **`Returns`**: Descreve o que a função retorna
  - `bool`: Valor booleano (True ou False)

---

## Primeira Verificação - Números ≤ 1

```python
    if numero <= 1:
        return False
```
- **`if numero <= 1:`**: Se o número é menor OU igual a 1
- **`return False`**: A função encerra e retorna `False`
- **Por quê?** Números primos devem ser maiores que 1 por definição

**Exemplo:**
- `é_primo(0)` → retorna `False`
- `é_primo(1)` → retorna `False`

---

## Segunda Verificação - Número 2

```python
    if numero == 2:
        return True
```
- **`if numero == 2:`**: Se o número é exatamente 2
- **`return True`**: A função encerra e retorna `True`
- **Por quê?** 2 é o único número primo que é par

**Exemplo:**
- `é_primo(2)` → retorna `True` imediatamente

---

## Terceira Verificação - Números Pares

```python
    if numero % 2 == 0:
        return False
```
- **`numero % 2`**: Operador `%` calcula o resto da divisão
  - Se um número dividido por 2 deixa resto 0, é par
- **`if numero % 2 == 0:`**: Se o número é par
- **`return False`**: Encerra e retorna `False`
- **Por quê?** Todos os pares maiores que 2 não são primos

**Exemplo:**
- `é_primo(4)` → `4 % 2 = 0` → retorna `False`
- `é_primo(10)` → `10 % 2 = 0` → retorna `False`

---

## Quarta Verificação - Loop (Verificação Principal)

```python
    for i in range(3, int(numero ** 0.5) + 1, 2):
        if numero % i == 0:
            return False
```

### Entendendo o `range()`

```python
range(3, int(numero ** 0.5) + 1, 2)
```

- **`3`**: Começa a partir do 3 (pois já verificamos 2)
- **`int(numero ** 0.5)`**: Calcula a raiz quadrada do número
  - `numero ** 0.5` → potência 0.5 = raiz quadrada
  - `int()` → converte para inteiro (remove decimais)
  - **Por quê raiz quadrada?** Se um número `n` tem um divisor maior que √n, deve ter outro menor que √n

- **`+ 1`**: Adiciona 1 porque o `range()` é exclusivo no final
  - `range(3, 5)` gera: 3, 4 (não inclui 5)

- **`, 2`**: Passo de 2 (incrementa de 2 em 2)
  - Só testa números ímpares: 3, 5, 7, 9, 11, ...
  - **Por quê?** Já sabemos que pares não são primos

### Dentro do Loop

```python
        if numero % i == 0:
            return False
```

- **`if numero % i == 0:`**: Se o número é divisível por `i`
  - (resto da divisão é 0)
- **`return False`**: Encontrou um divisor, então não é primo

**Exemplo com 15:**
- `é_primo(15)` com `15 ** 0.5 ≈ 3.87`, logo `int(3.87) + 1 = 4`
- Loop testa: `i = 3`
- `15 % 3 = 0` → encontrou divisor
- Retorna `False` imediatamente

---

## Retorno Final

```python
    return True
```
- Se nenhum divisor foi encontrado, o número é primo
- Retorna `True`

**Exemplo com 13:**
- `é_primo(13)` com `13 ** 0.5 ≈ 3.6`, logo `int(3.6) + 1 = 4`
- Loop testa: `i = 3`
- `13 % 3 = 1` (não é divisível) → continua
- Loop termina (não há mais valores)
- Retorna `True`

---

## Seção de Testes

```python
if __name__ == "__main__":
```
- **`if __name__ == "__main__":`**: Condição especial em Python
- Código dentro só executa se o arquivo é rodado diretamente
- Não executa se o arquivo é importado em outro programa

### Loop de Testes

```python
    numeros_teste = [1, 2, 3, 4, 5, 10, 13, 17, 20, 29, 30, 97]
    
    for num in numeros_teste:
        resultado = "é primo" if é_primo(num) else "não é primo"
        print(f"{num} {resultado}")
```

- **`numeros_teste = [...]`**: Lista de números para testar
- **`for num in numeros_teste:`**: Loop que pega um número por vez
- **`resultado = "é primo" if é_primo(num) else "não é primo"`**: 
  - Operador ternário: se a função retorna `True`, atribui "é primo", senão "não é primo"
- **`print(f"{num} {resultado}")`**: 
  - `f""` = f-string (permite inserir variáveis com `{}`)
  - Exibe o número e se é primo ou não

---

## Resumo de Eficiência

| Aspecto | Como Funciona |
|---------|---------------|
| **Verificação rápida** | Elimina pares imediatamente |
| **Limite de teste** | Só testa até √n, não até n |
| **Passo eficiente** | Só testa números ímpares |
| **Complexidade** | O(√n) operações no máximo |

---

## Exemplos de Execução

| Número | Passos | Resultado |
|--------|--------|-----------|
| **2** | Verifica `== 2` | ✅ Primo |
| **4** | Verifica par | ❌ Não primo |
| **13** | Testa 3 (resto 1) | ✅ Primo |
| **15** | Testa 3 (resto 0) | ❌ Não primo |
| **97** | Testa 3,5,7,9 (todos resto ≠ 0) | ✅ Primo |
