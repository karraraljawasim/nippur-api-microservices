export function dateToTimestamp(date: Date) {
  const timeMs = date.getTime();
  return {
    seconds: Math.floor(timeMs / 1000),
    nanos: (timeMs % 1000) * 1_000_000,
  };
}
