const djb2 = (str: string) => {
  let hash = 5381
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i)
  }
  return hash >>> 0 // Ensure unsigned integer
}

export const stringToColor = (str: string): string => {
  const hash = djb2(str)
  const red = (hash & 0xff0000) >> 16
  const green = (hash & 0x00ff00) >> 8
  const blue = hash & 0x0000ff

  return `rgb(${red},${green},${blue})`
}
