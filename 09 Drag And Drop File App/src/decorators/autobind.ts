// Decorator: to bind 'this' to current class/obj
export function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const orignalMethod = descriptor.value;
  const newMethod: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = orignalMethod.bind(this);
      return boundFn;
    },
  };
  return newMethod;
}

/*
namespace App {
  // Decorator: to bind 'this' to current class/obj
  export function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const orignalMethod = descriptor.value;
    const newMethod: PropertyDescriptor = {
      configurable: true,
      get() {
        const boundFn = orignalMethod.bind(this);
        return boundFn;
      },
    };
    return newMethod;
  }
}
*/
