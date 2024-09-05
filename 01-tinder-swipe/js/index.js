let isAnimation = false
const DECISION_THRESHOLD = 100
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

    deltaX = currentX - startX

    const opacity = Math.abs(deltaX) / 100
    const angleRotation = deltaX / 15
    const isSwipeRight = deltaX > 0

    isAnimation = true

    currentCard.style.transform = `translateX(${deltaX}px) rotateZ(${angleRotation}deg)`

    const choiceElm = isSwipeRight
      ? currentCard.querySelector('.choice.like')
      : currentCard.querySelector('.choice.nope')

    choiceElm.style.opacity = opacity
  }

  function handleCardRelease() {
    const isSwipeMade = Math.abs(deltaX) > DECISION_THRESHOLD
    const goRight = deltaX > 0

    if (isSwipeMade) {
      currentCard.style.transform = ''
      currentCard.classList.add(goRight ? 'go__right' : 'go__left')
    } else {
      currentCard.style.transform = ''
      currentCard.classList.add('reset')

      currentCard.querySelectorAll('.choice').forEach(choice => {
        choice.style.opacity = 0
      })
    }

    currentCard.addEventListener('transitionend', () => {
      if (isSwipeMade) {
        currentCard.remove()
      } else {
        currentCard.classList.remove('reset')
      }

      isAnimation = false
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
