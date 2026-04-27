def é_primo(numero):
    """
    Verifica se um número é primo.
    
    Args:
        numero (int): O número a ser verificado
    
    Returns:
        bool: True se o número é primo, False caso contrário
    """
    
    # Números menores ou iguais a 1 não são primos
    if numero <= 1:
        return False
    
    # 2 é o único número primo par
    if numero == 2:
        return True
    
    # Números pares maiores que 2 não são primos
    if numero % 2 == 0:
        return False
    
    # Verifica divisibilidade por números ímpares até a raiz quadrada do número
    # Se o número tem um divisor maior que sua raiz quadrada,
    # deve ter um divisor menor também
    for i in range(3, int(numero ** 0.5) + 1, 2):
        if numero % i == 0:
            return False
    
    return True


# Exemplos de uso
if __name__ == "__main__":
    # Testando alguns números
    numeros_teste = [1, 2, 3, 4, 5, 10, 13, 17, 20, 29, 30, 97]
    
    print("Verificação de números primos:\n")
    for num in numeros_teste:
        resultado = "é primo" if é_primo(num) else "não é primo"
        print(f"{num} {resultado}")
