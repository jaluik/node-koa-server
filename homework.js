class A {
  constructor() {
    this.nameA = "a";
  }
  validateA() {
    console.log("a");
  }
}
class B extends A {
  constructor() {
    super();
    this.nameB = "b";
  }
  validateB() {
    console.log("b");
  }
}
class C extends B {
  constructor() {
    super();
    this.nameC = "c";
  }
  validateC() {
    console.log("c");
  }
}

var c = new C();

function findMembers(instance, type, method) {
  let keyList = [];
  for (let [key] of Object.entries(instance)) {
    if (key.startsWith(type)) keyList.push(key);
  }
  let prototypeList = [Object.getPrototypeOf(instance)];
  for (let prototype of prototypeList) {
    if (Object.getPrototypeOf(prototype)) {
      prototypeList.push(Object.getPrototypeOf(prototype));
    }
    Object.getOwnPropertyNames(prototype).forEach(item => {
      if (item.startsWith(method)) {
        keyList.push(item);
      }
    });
  }
  return keyList;
}

console.log(findMembers(c, "name", "validate"));
