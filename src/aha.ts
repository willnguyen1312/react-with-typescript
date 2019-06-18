import get from "lodash/get";
import { PathOf, pathOf } from "ts-pathof";

interface OBJ {
  a: {
    b: { c: number };
  };
}

const obj = { a: { b: { c: 1 } } };

const path = pathOf(obj, "a", "b", "c")

const aha = get(obj, path, 3);

console.log(aha || "Nope");
