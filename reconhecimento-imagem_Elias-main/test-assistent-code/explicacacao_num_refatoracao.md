# Explicação Linha a Linha - `refatoracao.py`

## Código original

```python
def c(l):
    t=0
    for i in range(len(l)):
        t=t+l[i]
    m=t/len(l)
    mx=l[0]
    mn=l[0]
    for i in range(len(l)):
        if l[i]>mx:
            mx=l[i]
        if l[i]<mn:
            mn=l[i]
    return t,m,mx,mn

x=[23,7,45,2,67,12,89,34,56,11]
a,b,c2,d=c(x)
print("total:",a)
print("media:",b)
print("maior:",c2)
print("menor:",d)
```

---

## Explicação detalhada linha a linha

```python
def c(l):
```
- Declara a função chamada `c`.
- O parâmetro `l` representa uma lista de números.

```python
    t=0
```
- Cria a variável `t` e atribui 0.
- `t` será usada para acumular a soma dos elementos da lista.

```python
    for i in range(len(l)):
```
- Inicia um loop que percorre os índices da lista `l`.
- `len(l)` retorna a quantidade de elementos na lista.
- `range(len(l))` gera valores de `0` até `len(l)-1`.

```python
        t=t+l[i]
```
- Acessa o elemento da lista na posição `i`.
- Soma esse elemento ao total `t`.
- A cada repetição, `t` é atualizado com a soma acumulada.

```python
    m=t/len(l)
```
- Calcula a média dos valores da lista.
- Divide o total `t` pelo número de elementos `len(l)`.
- O resultado é guardado na variável `m`.

```python
    mx=l[0]
    mn=l[0]
```
- Inicializa as variáveis `mx` e `mn` com o primeiro elemento da lista.
- `mx` será usado para armazenar o maior valor encontrado.
- `mn` será usado para armazenar o menor valor encontrado.

```python
    for i in range(len(l)):
```
- Cria um segundo loop para percorrer todos os elementos da lista novamente.
- Novamente, `i` representa cada índice válido de `l`.

```python
        if l[i]>mx:
            mx=l[i]
```
- Verifica se o elemento atual é maior que o maior valor armazenado em `mx`.
- Se for maior, atualiza `mx` para esse novo valor.

```python
        if l[i]<mn:
            mn=l[i]
```
- Verifica se o elemento atual é menor que o menor valor armazenado em `mn`.
- Se for menor, atualiza `mn` para esse novo valor.

```python
    return t,m,mx,mn
```
- Retorna quatro valores da função `c`:
  - `t`: soma total dos elementos da lista
  - `m`: média dos elementos
  - `mx`: maior elemento
  - `mn`: menor elemento
- Em Python, funções podem retornar várias variáveis em uma tupla.

```python
x=[23,7,45,2,67,12,89,34,56,11]
```
- Cria a lista `x` com 10 números inteiros.
- Essa lista será usada como exemplo para testar a função.

```python
a,b,c2,d=c(x)
```
- Chama a função `c`, passando a lista `x` como argumento.
- Atribui os quatro valores retornados aos nomes `a`, `b`, `c2` e `d`.
- `a` = soma total, `b` = média, `c2` = maior valor, `d` = menor valor.

```python
print("total:",a)
print("media:",b)
print("maior:",c2)
print("menor:",d)
```
- Exibe os resultados no console.
- Cada `print` mostra uma etiqueta e a variável correspondente.

---

## Resumo do que o código faz

1. Calcula a soma de todos os números da lista `x`.
2. Calcula a média desses números.
3. Encontra o maior número da lista.
4. Encontra o menor número da lista.
5. Mostra esses valores na tela.

---

## Observações de refatoração

- O código funciona, mas pode ser melhorado em legibilidade.
- É comum usar nomes de função e variáveis mais descritivos.
- Também é possível percorrer a lista diretamente em vez de usar índices.
