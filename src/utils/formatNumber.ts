export const formatNumber = (number: number) => {
  const str = '' + number

  return str.match(/.{1,4}/g);
}