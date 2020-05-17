
/*
One of TypeScript’s core principles is that type checking focuses on the shape that values have. 
In TypeScript, interfaces fill the role of naming these types, and are a powerful way of defining 
contracts within your code as well as contracts with code outside of your project. */


export interface Hero {
  id: number;
  name: string;
  power: string;
}

// export
//  function  Hero(pId, pName) {
//     this.id = pId,
//     this.name = pName
//   }

  // constructor lets you create object and degine values
  // but does not enforce data type checking