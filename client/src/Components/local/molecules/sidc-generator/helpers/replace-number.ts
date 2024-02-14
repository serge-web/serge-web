
const replaceNumber = (originalNumber: number | bigint, replacementNumber: string, startIndex: number): string | null => {
  let originalNumberString = originalNumber.toString()
  const replacementNumberString = replacementNumber.toString()

  const replacementLength = replacementNumberString.length

  if (startIndex + replacementLength <= originalNumberString.length) {
    originalNumberString = originalNumberString.substring(0, startIndex) + replacementNumberString + originalNumberString.substring(startIndex + replacementLength)
        
    const modifiedNumber = originalNumberString

    return modifiedNumber
  } else {
    console.log("Replacement doesn't fit into the original number.")
    return null
  }
}

export default replaceNumber
