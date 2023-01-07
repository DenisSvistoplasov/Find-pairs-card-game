import React, { CSSProperties, useEffect, useState } from 'react';
import styles from './gamefield.css';
import Card, { ICardProps, onOpen } from "./Card/Card";

import shirtImage from '../../assets/img/shirt.jpg';
import { compose } from '../../utils/fp_utils';
import { Timer } from './Timer';
import { GameOverModal } from './GameOverModal';

interface ICardProps_ {
  isOpen: boolean;
  isOpenable: boolean;
  isGuessed: boolean;
  content: number;
  shirtImg: string;
  id: number;
  key: number;
  [key: string]: any;
}
type cardPresentation = { id: number, content: number | string; };
type fieldSize = { width: number, height: number; };

function validateFieldSize(fieldSize: fieldSize) {
  let cardsAmount = fieldSize.width * fieldSize.height;
  if (cardsAmount % 2 !== 0 || cardsAmount < 4) {
    cardsAmount = 4;
    fieldSize = { width: 4, height: 4 };
  }
  return fieldSize;
}
function getFieldGridStyle(fieldSize: fieldSize): CSSProperties {
  return {
    gridTemplate: `repeat(${fieldSize.height},1fr)/repeat(${fieldSize.width},1fr)`
  };
}
const closeAndUnblockCardsFunction = compose(closeAllCards, unblockCards);


export function GameField({ fieldSize = { width: 4, height: 4 }, onRestart=()=>{} }) {

  fieldSize = validateFieldSize(fieldSize);
  const cardsAmount = fieldSize.width * fieldSize.height;
  const filedStyle = getFieldGridStyle(fieldSize);

  const addOnOpen = addOnOpenFunction(onOpen);
  const createDeck = compose(addOnOpen, createShuffledCardDeck);

  const [openedCards, setOpenedCards] = useState([] as cardPresentation[]);
  const [deck, setDeck] = useState(createDeck(cardsAmount) as ICardProps[]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [progress, setProgress] = useState(0);

  function onTimeOut() {
    setIsGameOver(true);
  }
  function onOpen(id: number, content: string | number): void {
    setOpenedCards(openedCards => ([...openedCards, { id, content }]));
    setDeck(openOneCard(id));
  };
  function markGuessedCards(openedCards: cardPresentation[]) {
    setDeck(markGuessedCardsFunction(openedCards));
    setProgress(progress => progress + 2);
  }
  function closeAndUnblockCards() {
    setDeck(closeAndUnblockCardsFunction);
  }
  useEffect(() => {
    if (openedCards.length === 2) {
      setDeck(blockCards);

      setTimeout(() => {
        if (checkForEqualCard(openedCards)) {
          markGuessedCards(openedCards);
        }
        setOpenedCards([]);
        closeAndUnblockCards();
      }, 500);
    }
  }, [openedCards.length < 2]);
  useEffect(() => {
    if (progress == cardsAmount) {
      setIsWon(true);
      setIsGameOver(true);
    }
  }, [progress == cardsAmount]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.gameField} style={filedStyle}>
      {deck.map(card => <Card {...card} />)}
      </div>
      {!isGameOver && <Timer time={2.5*cardsAmount**1.1} onTimeOut={onTimeOut} />}
      {isGameOver && <GameOverModal isWon={isWon} onRestart={onRestart}/>}
    </div>
  );
}


function makeGameNumbers(n: number) {
  return Array(n).fill(0).map((_, index) => Math.floor(index / 2) + 1);
}

function createDeckFromNumbers(numbers: number[]): ICardProps_[] {
  return numbers.map((number, index) => (
    {
      isOpen: false,
      isOpenable: true,
      isGuessed: false,
      content: number,
      shirtImg: shirtImage,
      id: index,
      key: index
    }
  ));
}

function createRandomColorArray(n: number) {
  return Array(n).fill(0).map((_, i) => `hsl(${Math.round(i * 360 / n)},100%,50%)`);
}

function addRandomColor(deck: ICardProps_[]) {
  const randomColors = createRandomColorArray(deck.length / 2);
  for (let i = 0; i < deck.length; i += 2) {
    deck[i].color = deck[i + 1].color = randomColors[i / 2];
  }
  return deck;
}

function randomizeArray<T>(arr: T[]) {
  let res: T[] = Array(arr.length);
  let n = arr.length;
  arr.forEach(el => {
    let index = Math.floor(Math.random() * n--);
    putArrayElement(res, el, index);
  });
  return res;

  function putArrayElement(arr: any[], el: any, index: number) {
    for (let i = 0; i <= index; i++) {
      if (arr[i] !== undefined) index++;
    }
    arr[index] = el;
  }
}

function addOnOpenFunction(onOpen: onOpen) {
  return (deck: ICardProps_[]) => {
    return deck.map(card => ({ ...card, onOpen: onOpen }));
  };
}

const createShuffledCardDeck: (n: number) => ICardProps[] = compose(randomizeArray, addRandomColor, createDeckFromNumbers, makeGameNumbers);


function checkForEqualCard(cards: cardPresentation[]) {
  return cards[0].content === cards[1].content;
}

function markGuessedCardsFunction(openedCards: cardPresentation[]) {
  return function (deck: ICardProps[]) {
    return deck.map(card => {
      if (card.content === openedCards[0].content) return { ...card, isGuessed: true };
      else return card;
    });
  };
}

function openOneCard(id: number) {
  return function (deck: ICardProps[]) {
    return deck.map(card => {
      if (card.id === id) return { ...card, isOpen: true };
      else return card;
    });
  };
}

function closeAllCards(deck: ICardProps[]) {
  return deck.map(card => {
    if (card.isGuessed) return card;
    else return { ...card, isOpen: false };
  });
}

function blockCards(deck: ICardProps[]) {
  return deck.map(card => ({ ...card, isOpenable: false }));
}

function unblockCards(deck: ICardProps[]) {
  return deck.map(card => ({ ...card, isOpenable: true }));
}




