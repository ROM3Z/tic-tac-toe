import { useState, useEffect, useCallback } from 'react';
import Square from './Square';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Board.css';

const Board: React.FC = () => {
  const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true); // X es el jugador humano
  const [lastClickTime, setLastClickTime] = useState<number>(0); // Para controlar el doble clic
  
  // Verificar si hay un ganador
  const checkWinner = useCallback((squares: (string | null)[]): string | null => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }, []);

  // Función Minimax optimizada para evaluación de jugadas
  const minimax = useCallback((board: (string | null)[], depth: number, isMaximizing: boolean, maxDepth: number): number => {
    const winner = checkWinner(board);
    if (winner === 'X') return -10;  // El jugador humano gana
    if (winner === 'O') return 10;   // La IA gana
    if (depth === maxDepth || !board.includes(null)) return 0; // No hay más jugadas, empate

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = 'O'; // La IA juega con O
          const score = minimax(board, depth + 1, false, maxDepth);
          board[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = 'X'; // El jugador humano juega con X
          const score = minimax(board, depth + 1, true, maxDepth);
          board[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  }, [checkWinner]);

  // Función para obtener el mejor movimiento de la IA
  const bestMove = useCallback(() => {
    let bestScore = -Infinity;
    let move = -1;
    const maxDepth = 10;

    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === null) {
        squares[i] = 'O'; // La IA juega con O
        const score = minimax(squares, 0, false, maxDepth);
        squares[i] = null;
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }

    if (move !== -1) {
      const newSquares = [...squares];
      newSquares[move] = 'O';
      setSquares(newSquares);
      setIsXNext(true);

      const messages = [
        '¿De verdad pensaste que eso me sorprendería? 😂',
        '¡Qué jugada tan... predecible! 😎',
        'Eso fue lo mejor que pudiste hacer? Pobre intento... 😈',
        'A ver, ¿por qué no intentas algo que realmente me haga sudar? 😏',
        '¡Vas bien, pero aún no llegas a mi nivel! 🤪',
        '¿Eso fue un movimiento? ¡Ni siquiera me hizo parpadear! 😜',
        '¡Intenta un poco más! ¿Sabías que a veces se gana con cerebro? 🤔',
        '¡Qué gracioso! Me has dado tiempo para prepararme para la victoria 😆',
        '¿Seguro que eso es lo mejor que puedes hacer? ¡Ni cerca! 😝',
        'Te tengo en la palma de la mano, ¡solo es cuestión de tiempo! 😏'
      ];
      
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      toast.info(randomMessage);
    }
  }, [squares, minimax]);

 // Manejar el clic en una casilla
 const handleClick = (index: number) => {
    const currentTime = Date.now();
    if (currentTime - lastClickTime < 300) { // Doble clic detectado
      toast.error('Jajaja, ya no tienes ese poder aquí');
      return;
    }

    setLastClickTime(currentTime); // Actualizar el tiempo del último clic

    // Solo permitir un movimiento si no hay un ganador y es el turno del jugador
    if (squares[index] || checkWinner(squares) || !isXNext) return;

    const newSquares = [...squares];
    newSquares[index] = 'X'; // Jugador humano juega con X
    setSquares(newSquares);
    setIsXNext(false); // Cambiar al turno de la IA
  };

  // Controlar la lógica de cada turno y el fin del juego
  useEffect(() => {
    const winner = checkWinner(squares);
    if (winner) {
      toast.success(`¡Ganador: ${winner}! 🎉`);
    } else if (!squares.includes(null) && !winner) {
      toast.info('Juguemos de nuevo o tienes miedo 😏');
      setTimeout(resetGame, 2000);
    } else if (!isXNext) {
      setTimeout(bestMove, 500); // Pequeño retraso para simular el pensamiento de la IA
    }
  }, [isXNext, squares, bestMove, checkWinner]);

  // Función para reiniciar el juego
  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    toast.info('¡Nuevo juego! Inténtalo de nuevo 💪');
  };

  // Verificar si hay un ganador
  const winner = checkWinner(squares);
  const status = winner ? `Ganador: ${winner}` : `Turno de: ${isXNext ? 'X' : 'O'}`;

  return (
    <div className="flex flex-col items-center space-y-4">
      <h1 className="text-2xl font-bold">{status}</h1>

      <div className="board">
        {squares.map((value, index) => (
          <Square key={index} value={value} onClick={() => handleClick(index)} />
        ))}
      </div>

      <button onClick={resetGame} className="restart-btn">
        Reiniciar
      </button>
    </div>
  );
};

export default Board;
