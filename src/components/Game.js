import * as Chess from 'chess.js'
import { BehaviorSubject } from 'rxjs'


let promotion = 'rnb2bnr/pppPkppp/8/4p3/7q/8/PPPP1PPP/RNBQKBNR w KQ - 1 5'

const chess = new Chess(promotion)

// const chess = new Chess()

export const gameSubject = new BehaviorSubject()


export const move = (from, to, promotion) => {
  let tempMove = { from, to }
  if (promotion) {
    tempMove.promotion = promotion
  }

  const legalMove = chess.move(tempMove)
  if (legalMove) {
    gameSubject.next({
      board: chess.board()
    })
  }
}

export const handleMove = (from, to) => {
  const promotions = chess.moves({ verbose: true }).filter(m => m.promotion)
  console.table(promotions)
  if (promotions.some(p => `${p.from}:${p.to}` === `${from}:${to}`)) {
    const pendingPromotion = { from, to, color: promotions[0].color }
    updateGame(pendingPromotion)
  }
  const { pendingPromotion } = gameSubject.getValue()
  if (!pendingPromotion) {
    move(from, to)
  }

  move(from, to)
}

const updateGame = (pendingPromotion) => {
  const newGame = {
    board: chess.board(),
    pendingPromotion
  }
  gameSubject.next(newGame)
}

export const initGame = () => {
  updateGame()
}