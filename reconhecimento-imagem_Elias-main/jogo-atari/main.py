# main.py
import pygame
import sys
from settings import *
from sprites import Player, Asteroid

def draw_text(surf, text, size, x, y):
    """Função auxiliar para desenhar textos centralizados na tela."""
    font = pygame.font.SysFont("arial", size, bold=True)
    text_surface = font.render(text, True, WHITE)
    text_rect = text_surface.get_rect()
    text_rect.midtop = (x, y)
    surf.blit(text_surface, text_rect)

def main():
    # Inicializando o Pygame
    pygame.init()
    screen = pygame.display.set_mode((WIDTH, HEIGHT))
    pygame.display.set_caption("Jogo Atari")
    clock = pygame.time.Clock()

    # Grupos de sprites para facilitar o update e colisão
    all_sprites = pygame.sprite.Group()
    asteroids = pygame.sprite.Group()
    bullets = pygame.sprite.Group()

    # Criação do jogador
    player = Player(all_sprites, bullets)
    all_sprites.add(player)

    # Variáveis dinâmicas de dificuldade
    current_spawn_time = ASTEROID_SPAWN_TIME
    current_min_speed = ASTEROID_MIN_SPEED
    current_max_speed = ASTEROID_MAX_SPEED

    # Evento customizado de tempo para criar asteroides continuamente
    SPAWN_ASTEROID_EVENT = pygame.USEREVENT + 1
    pygame.time.set_timer(SPAWN_ASTEROID_EVENT, current_spawn_time)

    score = 0
    running = True
    game_over = False

    while running:
        # Garantir a taxa de quadros (FPS)
        clock.tick(FPS)

        # 1. Processamento de Eventos
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            
            if not game_over:
                if event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_SPACE:
                        player.shoot()
                        
                # Adicionar um novo asteroide a cada tick do evento
                if event.type == SPAWN_ASTEROID_EVENT:
                    asteroid = Asteroid(current_min_speed, current_max_speed)
                    all_sprites.add(asteroid)
                    asteroids.add(asteroid)

        if not game_over:
            # 2. Atualização dos Estados (Física, Posição)
            all_sprites.update()

            # Verificação de colisão: Tiro acertando Asteroide
            # O True, True faz com que ambos sejam deletados
            hits = pygame.sprite.groupcollide(asteroids, bullets, True, True)
            for hit in hits:
                score += 10
                
                # Aumentar a dificuldade a cada 50 pontos
                level = score // 50
                new_spawn_time = max(500, ASTEROID_SPAWN_TIME - (level * 150))
                if new_spawn_time != current_spawn_time:
                    current_spawn_time = new_spawn_time
                    pygame.time.set_timer(SPAWN_ASTEROID_EVENT, current_spawn_time)
                
                current_min_speed = ASTEROID_MIN_SPEED + (level // 2)
                current_max_speed = ASTEROID_MAX_SPEED + level

                # Criar um asteroide novo para substituir o destruído (mantém o jogo dinâmico)
                asteroid = Asteroid(current_min_speed, current_max_speed)
                all_sprites.add(asteroid)
                asteroids.add(asteroid)

            # Verificação de colisão: Jogador colidindo com Asteroide
            hits = pygame.sprite.spritecollide(player, asteroids, False)
            if hits:
                game_over = True

            # Verificação de condição de derrota: Asteroide chegou no fundo da tela
            for asteroid in asteroids:
                if asteroid.rect.top > HEIGHT:
                    game_over = True

        # 3. Renderização (Desenho na tela)
        screen.fill(BLACK)
        all_sprites.draw(screen)
        
        # Desenhar a pontuação
        font = pygame.font.SysFont("arial", 24, bold=True)
        score_surface = font.render(f"Pontos: {score}", True, WHITE)
        screen.blit(score_surface, (10, 10)) # Canto superior esquerdo

        if game_over:
            draw_text(screen, "GAME OVER", 64, WIDTH // 2, HEIGHT // 3)
            draw_text(screen, "Pressione qualquer tecla para sair", 22, WIDTH // 2, HEIGHT // 2)
            
            # Fechar se pressionar qualquer tecla ao morrer
            # Esperamos o usuário soltar teclas que já estavam sendo pressionadas antes do game over
            keys = pygame.key.get_pressed()
            if any(keys):
                # Limpamos a fila de eventos e verificamos uma nova tecla
                for event in pygame.event.get():
                    if event.type == pygame.KEYDOWN or event.type == pygame.QUIT:
                        running = False

        # Atualizar o display completo
        pygame.display.flip()

    pygame.quit()
    sys.exit()

if __name__ == "__main__":
    main()
