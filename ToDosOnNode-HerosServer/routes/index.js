var express = require("express");
var router = express.Router();

var fs = require("fs");
var writedata = "11, Dr Nice, Fire";

fileManager = {
  read: function () {
    let rawdata = fs.readFileSync("herodata.json");
    let goodData = JSON.parse(rawdata);
    console.log(goodData);
    heroArray = goodData;
  },

  write: function () {
    let data = JSON.stringify(heroArray);
    fs.writeFileSync("herodata.json", data);
  },
};

// Array Constructors;
heroArray = [];
powerArray = [];

// Constructors
function Hero(pId, pName, pPower) {
  this.id = pId;
  this.name = pName;
  this.power = pPower;
}

function Power(pPower) {
this.power=pPower;
}

// pre-populate with some data
// heroArray.push( new Hero (11, 'Dr Nice', "Fire") );
// heroArray.push( new Hero (12, 'Narco', "Invisible") );
// heroArray.push( new Hero (13, 'Bombasto', "Fire") );
// heroArray.push( new Hero (14, 'Celeritas',"X-Ray Vision") );
// heroArray.push( new Hero (15, 'Magneta', "Invisible") );
// heroArray.push( new Hero (16, 'RubberMan',"X-Ray Vision") );
// heroArray.push( new Hero (17, 'Dynama', "Invisible") );
// heroArray.push( new Hero (18, 'Dr IQ', "X-Ray Vision") );
// heroArray.push( new Hero (19, 'Magma', "Fire") );
// heroArray.push( new Hero (20, 'Tornado', "Invisible") );
// fileManager.write();  // write the array to disk

router.get("/heroes", function (req, res) {
  fileManager.read(); //  *******************************
  console.log(heroArray);
  res.status(200).json(heroArray);
});

router.get("/heroes/:id", function (req, res) {
  let found = false;
  for (var i = 0; i < heroArray.length; i++) {
    if (heroArray[i].id == req.params.id) {
      console.log(heroArray[i]);
      found = true;
      res.status(200).json(heroArray[i]);
    }
  }
  if (found === false) {
    res.status(500).send("no such hero");
  }
});

// I think this would work somehow but I could not get to where it would work.

// router.get("/powers", function (req, res) {
//   fileManager.read();
//   console.log(heroArray);
//   powerArray = [];
//   let tempPowers = [];
//   let uniquePowers = [];
//   for (var i = 0; i < heroArray.length; i++){
//     tempPowers.push(heroArray[i].power);
//   };

//   uniquePowers = new Set(tempPowers);
//   for (let power of uniquePowers){
//     powerArray.push(new Power(power));
//   }
//   console.log("powerArray List");
//   console.log(powerArray);
  
//   res.status(200).json(powerArray);
// });

router.put("/heroes/:id", function (req, res) {
  var changedHero = req.body;
  for (var i = 0; i < heroArray.length; i++) {
    if (heroArray[i].id == req.params.id) {
      heroArray[i].name = changedHero.name;
      heroArray[i].power = changedHero.power;
      console.log(heroArray[i]);
      fileManager.write(); //  *******************************
      found = true;
      res.status(200).json(heroArray[i]);
    }
  }
  if (found === false) {
    res.status(500).send(err);
  }
});

// delete is used to delete existing object
router.delete("/heroes/:id", function (req, res) {
  for (var i = 0; i < heroArray.length; i++) {
    if (heroArray[i].id == req.params.id) {
      heroArray.splice(i, 1);
      found = true;
      fileManager.write(); //  *******************************
      res.status(200).json("deleted hero");
    }
  }
  if (found === false) {
    res.status(500).send(err);
  }
});

router.post("/heroes", function (req, res) {
  // sort by id (need to create a new, unique id)
  heroArray.sort(function (a, b) {
    return a.id - b.id;
  });
  var newID = heroArray[heroArray.length - 1].id + 1;
  var newHero = new Hero(newID, req.body.name, req.body.power);
  heroArray.push(newHero);
  fileManager.write(); //  *******************************
  res.status(200).json(newHero); // returns the new hero which the observable
  // uses to update the client side array so the display looks correct.
});

// Function region

module.exports = router;
