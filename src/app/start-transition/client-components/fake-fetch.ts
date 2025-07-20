export function fakeFetch() {
  const wait = Date.now() + 3000;
  while (Date.now() < wait) {
    // Busy wait
  }
  return new Array(10);
}
