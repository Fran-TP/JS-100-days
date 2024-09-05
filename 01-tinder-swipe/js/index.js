let isAnimation = false
const DECISION_THRESHOLD = 75
let deltaX = 0

const handleStartSwipe = event => {
  //this is to prevent multiple swipe events
  if (isAnimation) {
    console.log('return')
    return
  }

  //get the current card
  const currentCard = event.target.closest('article')

  if (!currentCard) return
  const startX = event.pageX

  function handleMove(event) {
    const currentX = event.pageX
    const deltaX = currentX - startX
    const opacity = Math.abs(deltaX) / 100
    const isSwipeRight = deltaX > 0

    isAnimation = true

    currentCard.style.transform = `translateX(${deltaX}px) rotateZ(${
      deltaX / 15
    }deg)`

    const choiceElm = isSwipeRight
      ? currentCard.querySelector('.choice.like')
      : currentCard.querySelector('.choice.nope')

    choiceElm.style.opacity = opacity
  }

  function handleCardRelease(event) {
    const currentX = event.pageX
    const deltaX = currentX - startX
    const madeDecision = Math.abs(deltaX) > DECISION_THRESHOLD
    const goRight = deltaX > 0

    if (madeDecision) {
      currentCard.style.transform = ''
      currentCard.classList.add(goRight ? 'go__right' : 'go__left')

      currentCard.addEventListener('transitionend', () => {
        console.log('transition end 1')
        currentCard.remove()
      })
    } else {
      currentCard.style.transition = `transform 0.3s`
      currentCard.style.transform = `translateX(0)`
    }

    currentCard.addEventListener('transitionend', () => {
      isAnimation = false
      console.log('transition end 2')
    })

    currentCard.removeEventListener('mousemove', handleMove)
    currentCard.removeEventListener('mouseup', handleCardRelease)
    currentCard.removeEventListener('mouseleave', handleCardRelease)
  }

  currentCard.addEventListener('mousemove', handleMove)
  currentCard.addEventListener('mouseup', handleCardRelease)
  currentCard.addEventListener('mouseleave', handleCardRelease)
}

document.addEventListener('mousedown', handleStartSwipe)
