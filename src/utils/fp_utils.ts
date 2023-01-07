export function compose(...fns:Function[]) {
  return function(initValue:any) {
    return fns.reduceRight((val, fn:Function) => fn(val), initValue);
  }
}