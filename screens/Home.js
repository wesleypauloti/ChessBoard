import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Importando ícones de MaterialIcons

const ChessBoard = () => {
  const [board, setBoard] = useState(generateInitialBoard());
  const [isReversed, setIsReversed] = useState(false);

  const handlePieceMove = (fromRow, fromCol, toRow, toCol) => {
    const newBoard = [...board];
    newBoard[toRow][toCol] = newBoard[fromRow][fromCol];
    newBoard[fromRow][fromCol] = null;
    setBoard(newBoard);
  };

  const toggleBoardOrientation = () => {
    setIsReversed(!isReversed);
  };

  const renderSquare = (row, col) => {
    const piece = board[row][col];
    const isBlack = (row + col) % 2 !== 0;
    return (
      <TouchableOpacity
        key={`${row}-${col}`}
        style={[styles.square, isBlack && styles.blackSquare]}
        onPress={() => piece && handlePieceMove(row, col, (row + 1) % 8, col)} // Exemplo de movimento
      >
        {piece && (
          <MaterialIcons
            name={piece}
            size={40}
            color={isBlack ? 'white' : 'black'}
          />
        )}
      </TouchableOpacity>
    );
  };

  const renderBoard = () => {
    let boardSquares = [];
    const rows = isReversed ? [...board].reverse() : board;

    for (let row = 0; row < 8; row++) {
      let rowSquares = [];
      for (let col = 0; col < 8; col++) {
        rowSquares.push(renderSquare(isReversed ? 7 - row : row, col));
      }
      boardSquares.push(
        <View key={row} style={styles.row}>
          <Text style={styles.rowLabel}>{isReversed ? row + 1 : 8 - row}</Text>
          {rowSquares}
        </View>
      );
    }
    return boardSquares;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleBoardOrientation} style={styles.button}>
        <Text style={styles.buttonText}>
          {isReversed ? 'Reset Orientation' : 'Flip Board'}
        </Text>
      </TouchableOpacity>
      <View style={styles.boardContainer}>
        <View style={styles.header}>
          {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map((label, index) => (
            <Text key={index} style={styles.headerLabel}>
              {isReversed ? label : label}
            </Text>
          ))}
        </View>
        {renderBoard()}
      </View>
    </View>
  );
};

const generateInitialBoard = () => {
  const initialBoard = Array(8)
    .fill()
    .map(() => Array(8).fill(null));

  // Exemplo de peças iniciais (torres e cavalos)
  initialBoard[0][0] = 'star'; // Por exemplo, uma torre
  initialBoard[7][7] = 'directions-bike'; // Um cavalo
  return initialBoard;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: '#6200ea',
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  boardContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  headerLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    width: 40,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    width: 40,
    textAlign: 'center',
  },
  square: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blackSquare: {
    backgroundColor: '#333',
  },
});

export default ChessBoard;
