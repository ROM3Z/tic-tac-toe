// Square.tsx
interface SquareProps {
    value: string | null;
    onClick: () => void;
  }
  
  const Square: React.FC<SquareProps> = ({ value, onClick }) => {
    let squareStyle = 'square';
    
    if (value === 'X') {
      squareStyle += ' text-blue-500'; // Azul para X
    } else if (value === 'O') {
      squareStyle += ' text-red-500'; // Rojo para O
    }
  
    return (
      <button className={squareStyle} onClick={onClick}>
        {value}
      </button>
    );
  };
  
  export default Square;
  