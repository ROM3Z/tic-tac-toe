# Tres en Línea (Tic Tac Toe) con Minimax

Este es un juego de **Tres en Línea (Tic Tac Toe)** implementado en **React + TypeScript** con el algoritmo **Minimax** para la toma de decisiones del jugador de la IA.

## Descripción

El juego de **Tres en Línea** se juega en un tablero de 3x3 donde dos jugadores, uno jugando con **X** y el otro con **O**, toman turnos para marcar las casillas del tablero. El objetivo es alinear tres de tus símbolos (X o O) en línea, ya sea horizontal, vertical o diagonalmente.

## Minimax: Algoritmo de Decisión

El algoritmo **Minimax** es utilizado por la IA (jugador **O**) para determinar la mejor jugada posible. Simula todas las jugadas futuras posibles y evalúa cuál es la mejor jugada para maximizar las posibilidades de ganar y minimizar las posibilidades de perder. 

### Profundidad en Minimax

La **profundidad** (`maxDepth`) en el algoritmo Minimax se refiere a cuántos movimientos futuros la IA evaluará antes de tomar una decisión. Cuanto mayor sea la profundidad, más jugadas posibles se consideran, pero también más tiempo toma calcular la mejor jugada.

Por ejemplo, si la profundidad está establecida en **2**, la IA evaluará hasta **dos jugadas** hacia adelante:

1. La IA evalúa todas las jugadas posibles para su turno.
2. Luego, simula las jugadas que el jugador **X** podría hacer como respuesta.

Esta **profundidad máxima** limita cuántas jugadas hacia adelante la IA evaluará, equilibrando la inteligencia de la IA y la velocidad del juego.

### Ejemplo de Profundidad

Si la IA tiene una profundidad de 2, y el tablero actual está así:

X | O |
| X | O
| | X

La IA evaluará todos los posibles movimientos de **O** en la profundidad 1, y luego simulará las respuestas de **X** en la profundidad 2.

#### ¿Por qué limitar la profundidad?

Limitar la **profundidad** evita que el algoritmo tarde demasiado en calcular la mejor jugada. A medida que la profundidad aumenta, el número de jugadas posibles se incrementa exponencialmente, lo que hace que el algoritmo sea más lento. Mantener la profundidad dentro de un rango razonable asegura que la IA sea inteligente sin sacrificar el rendimiento del juego.

