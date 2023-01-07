import React, { useState } from "react";
import './app.global.sass';
import { GameField } from "./components/GameField";
import { SettingsForm } from "./components/SettingsForm";


type fieldSize = { width: number; height: number; };

export function App() {
  const [isGameField, setIsGameField] = useState(false);
  const [fieldSize, setFieldSize] = useState({ width: 4, height: 4 });

  const onSettingsSubmit = (fieldSize:fieldSize) => {
    setFieldSize(fieldSize);
    setIsGameField(true);
  };
  const onRestart = () => {
    setIsGameField(false);
  };

  return (
    <div className='app'>
      {isGameField
        ? <GameField fieldSize={fieldSize} onRestart={onRestart} />
        : <SettingsForm onSubmit={onSettingsSubmit} />
      }
    </div>
  );
}