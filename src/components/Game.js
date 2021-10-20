import * as Chess from 'chess.js'
import { BehaviorSubject } from 'rxjs'
import { auth } from '../firebase'
import { fromDocRef } from 'rxfire/firestore'

let gameRef

const chess = new Chess()

export let gameSubject

export const initGame = async (gameRefFb) => {
  const { currentUser } = auth
  if (gameRefFb) {
    gameRef = gameRefFb
    const initialGame = await gameRefFb.get().then(doc => doc.data())
    if (!initialGame) {
      return "notfound"
    }
    const creator = initialGame.members.find(m => m.creator === true)

    if (initialGame.status === 'waiting' && creator.uid !== currentUser.uid) {
      const currUser = {
        uid: currentUser.uid,
        name: localStorage.getItem("userName"),
        piece: creator.piece === 'w' ? 'b' : 'w'
      }
      const updatedMembers = [...initialGame.members, currUser]
      await gameRefFb.update({ members: updatedMembers, status: 'ready' })
    } else if (!initialGame.map(m => m.uid).includes(currentUser.uid)) {
      return 'intruder'
    }
    chess.reset()
    gameSubject = fromDocRef(gameRefFb)
  } else {
    gameSubject = new BehaviorSubject()
    const savedGame = localStorage.getItem('savedGame')
    if (savedGame) {
      chess.load(savedGame)
    }
    updateGame()
  }
}

export const move = (from, to, promotion) => {
  let tempMove = { from, to }
  if (promotion) {
    tempMove.promotion = promotion
  }

  const legalMove = chess.move(tempMove)
  if (legalMove) {
    updateGame()
  }
}

export const handleMove = (from, to) => {
  const promotions = chess.moves({ verbose: true }).filter(m => m.promotion)
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
  const isGameOver = chess.game_over()
  const newGame = {
    board: chess.board(),
    pendingPromotion,
    isGameOver,
    turn: chess.turn(),
    result: isGameOver ? getGameResult() : null
  }
  localStorage.setItem('savedGame', chess.fen())
  gameSubject.next(newGame)
}

const getGameResult = () => {
  if (chess.in_checkmate()) {
    const winner = chess.turn() === "w" ? 'BLACK' : 'WHITE'
    return `CHECKMATE - WINNER - ${winner}`
  } else if (chess.in_draw()) {
    let reason = '50 - MOVES - RULE'
    if (chess.in_stalemate()) {
      reason = 'STALEMATE'
    } else if (chess.in_threefold_repetition()) {
      reason = 'REPETITION'
    } else if (chess.insufficient_material()) {
      reason = "INSUFFICIENT MATERIAL"
    }
    return `DRAW - ${reason}`
  } else {
    return 'UNKNOWN REASON'
  }
}

export const resetGame = () => {
  chess.reset()
  updateGame()
}

