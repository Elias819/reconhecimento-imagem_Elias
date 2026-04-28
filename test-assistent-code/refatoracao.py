def calcular_estatisticas(numeros):
    """Calcula soma, média, maior e menor valor de uma lista de números."""
    if not numeros:
        raise ValueError("A lista de números não pode ser vazia")

    soma_total = sum(numeros)
    media = soma_total / len(numeros)

    maior_valor = numeros[0]
    menor_valor = numeros[0]
    for numero in numeros:
        if numero > maior_valor:
            maior_valor = numero
        if numero < menor_valor:
            menor_valor = numero

    return soma_total, media, maior_valor, menor_valor

def main():
    numeros = [23, 7, 45, 2, 67, 12, 89, 34, 56, 11]
    soma, media, maior, menor = calcular_estatisticas(numeros)

    print("total:", soma)
    print("media:", media)
    print("maior:", maior)
    print("menor:", menor)


if __name__ == "__main__":
    main()