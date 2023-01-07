export function classNames(...args: any[]) {
  let result = '';
  args.forEach(arg => {
    if (typeof arg === 'string' || typeof arg === 'number')
      result += arg + ' ';
    if (typeof arg === 'object') {
      for (const key in arg) {
        if (arg[key]) result += key + ' ';
      }
    }
  });
  return result.trim();
}