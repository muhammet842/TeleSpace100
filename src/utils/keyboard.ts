type NumberInputHandler = (pageNumber: number) => void

export function listenForPageNumbers(
  inputElement: HTMLElement,
  onPageNumber: NumberInputHandler,
): () => void {
  let typedNumbers = ''
  const display = document.createElement('span')
  display.className = 'page-input'
  display.setAttribute('aria-live', 'polite')
  inputElement.append(display)

  function showInput() {
    display.textContent = typedNumbers ? `P${typedNumbers}..` : 'P...'
  }

  function handleKeydown(event: KeyboardEvent) {
    if (!/^\d$/.test(event.key)) return

    event.preventDefault()
    typedNumbers += event.key
    if (typedNumbers.length > 3) typedNumbers = typedNumbers.slice(-3)
    showInput()

    if (typedNumbers.length === 3) {
      onPageNumber(Number(typedNumbers))
      typedNumbers = ''
      window.setTimeout(showInput, 250)
    }
  }

  inputElement.addEventListener('keydown', handleKeydown)
  showInput()

  return () => inputElement.removeEventListener('keydown', handleKeydown)
}
