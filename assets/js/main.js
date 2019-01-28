let playing = false;
let justDone = false;
var obj_winning;
var items_order;

const el1 = document.querySelector("#machine1");
const el2 = document.querySelector("#machine2");
const el3 = document.querySelector("#machine3");

const fontAnimation = anime
  .timeline({
    loop: true
  });

const machine1 = new SlotMachine(el1, {
  active: 0,
});
const machine2 = new SlotMachine(el2, {
  active: 0,
});
const machine3 = new SlotMachine(el3, {
  active: 0,
});

var winning_list = [{
    no: "1",
    items: [{
        id: "0",
        name: "qct",
        locations: ["1", "8", "13", "20"]
      },
      {
        id: "1",
        name: "astri",
        locations: ["2"]
      },
      {
        id: "9",
        name: "netelastic",
        locations: ["12"]
      }
    ],
    winning_msg: "FMC"
  },
  {
    no: "2",
    items: [{
        id: "0",
        name: "qct",
        locations: ["1", "8", "13", "20"]
      },
      {
        id: "15",
        name: "redhat",
        locations: ["18", "22"]
      },
      {
        id: "6",
        name: "kgp",
        locations: ["7", "16"]
      }
    ],
    winning_msg: "NGCO Delivery"
  },
  {
    no: "3",
    items: [{
        id: "0",
        name: "qct",
        locations: ["1", "8", "13", "20"]
      },
      {
        id: "10",
        name: "onf",
        locations: ["14"]
      },
      {
        id: "11",
        name: "opnfv",
        locations: ["17"]
      }
    ],
    winning_msg: "Open Technology"
  },
  {
    no: "4",
    items: [{
        id: "0",
        name: "qct",
        locations: ["1", "8", "13", "20"]
      },
      {
        id: "2",
        name: "baicells",
        locations: ["3"]
      },
      {
        id: "13",
        name: "radisys",
        locations: ["21"]
      }
    ],
    winning_msg: "5G RAN"
  },
  {
    no: "5",
    items: [{
        id: "0",
        name: "qct",
        locations: ["1", "8", "13", "20"]
      },
      {
        id: "14",
        name: "spirent",
        locations: ["23"]
      },
      {
        id: "11",
        name: "opnfv",
        locations: ["17"]
      }
    ],
    winning_msg: "NFV Validation"
  },
  {
    no: "6",
    items: [{
        id: "0",
        name: "qct",
        locations: ["1", "8", "13", "20"]
      },
      {
        id: "5",
        name: "intel",
        locations: ["6", "10", "24"]
      },
      {
        id: "8",
        name: "netcope",
        locations: ["11"]
      }
    ],
    winning_msg: "DP Acceleration"
  },
  {
    no: "7",
    items: [{
        id: "0",
        name: "qct",
        locations: ["1", "8", "13", "20"]
      },
      {
        id: "7",
        name: "lumina",
        locations: ["9"]
      },
      {
        id: "3",
        name: "broadcom",
        locations: ["4", "15"]
      }
    ],
    winning_msg: "SDN"
  },
  {
    no: "8",
    items: [{
        id: "0",
        name: "qct",
        locations: ["1", "8", "13", "20"]
      },
      {
        id: "9",
        name: "netelastic",
        locations: ["12"]
      },
      {
        id: "12",
        name: "qwilt",
        locations: ["19"]
      }
    ],
    winning_msg: "E2E Use Case"
  },
  {
    no: "9",
    items: [{
        id: "0",
        name: "qct",
        locations: ["1", "8", "13", "20"]
      },
      {
        id: "1",
        name: "astri",
        locations: ["2"]
      },
      {
        id: "4",
        name: "f5",
        locations: ["5"]
      }
    ],
    winning_msg: "VNF Security"
  },
  {
    no: "10",
    items: [{
        id: "0",
        name: "qct",
        locations: ["1", "8", "13", "20"]
      },
      {
        id: "5",
        name: "intel",
        locations: ["6", "10", "24"]
      },
      {
        id: "15",
        name: "redhat",
        locations: ["18", "22"]
      }
    ],
    winning_msg: "Optimized NFVI"
  },
  {
    no: "11",
    items: [{
        id: "0",
        name: "qct",
        locations: ["1", "8", "13", "20"]
      },
      {
        id: "1",
        name: "astri",
        locations: ["2"]
      },
      {
        id: "13",
        name: "radisys",
        locations: ["21"]
      }
    ],
    winning_msg: "5G Mobile"
  }
];

function playSound(cases) {
  var snd = new Audio();

  switch (cases) {
    case "game_idle":
      document.getElementById("bgSnd").play();
      break;
    case "game_start":
      snd.src = "assets/audio/game_start.mp3";
      snd.play();
      break;
    case "game_starting":
      snd.src = "assets/audio/game_starting.mp3";
      snd.play();
      break;
    case "item_active":
      snd.src = "assets/audio/item_active.mp3";
      snd.play();
      break;
    case "game_finished":
      document.getElementById("bgFinished").play();
      break;
  }
}

function init() {
  //console.log("enter init.");
  $("#winMsg").text("");
  document.getElementById("bgFinished").pause();
  document.getElementById("bgFinished").currentTime = 0;
  playSound("game_idle");
  playing = false;
  justDone = false;
  $(".popup-wrap").fadeOut(500);
  $(".logo").removeClass("selected");
  fontAnimation.pause();
  //fontAnimation.remove();
  //$("#winMsg").removeClass("ml2");
}

function play(no, runTimes, stopPlay, sec, order) {
  no++;
  runTimes++;
  if (no > 24) {
    no = 1;
  }

  /*
  console.log(
    "no: " +
    no +
    " runTimes: " +
    runTimes +
    " stopPlay: " +
    stopPlay +
    " sec: " +
    sec
  );
  */

  if (runTimes > stopPlay) {
    if (no == 1) {
      $("#no24").removeClass("active");
      $("#no24").addClass("selected");
    } else {
      $("#no" + (no - 1)).removeClass("active");
      $("#no" + (no - 1)).addClass("selected");
    }
    if (order == 0) {
      $("#popup-result").fadeIn(500);
      playSound("game_finished");

      showSlotMachine();

      setTimeout(function () {
        showMsg();
      }, 1000);

      /*setTimeout(function () {
        showSlotMachine();
      }, 3000);*/

      setTimeout(function () {
        playing = false;
        justDone = true;
      }, 6200);
    }
  } else if (runTimes + 10 > stopPlay) {
    playSound("item_active");

    if (no == 1) {
      $("#no24").removeClass("active");
    } else {
      $("#no" + (no - 1)).removeClass("active");
    }
    $("#no" + no).addClass("active");

    setTimeout(function () {
      play(no, runTimes, stopPlay, sec, order);
    }, (sec = sec * 1.3));
  } else {
    playSound("item_active");

    if (no == 1) {
      $("#no24").removeClass("active");
    } else {
      $("#no" + (no - 1)).removeClass("active");
    }

    $("#no" + no).addClass("active");

    setTimeout(function () {
      play(no, runTimes, stopPlay, sec, order);
    }, sec);
  }
}

var contains = function (needle) {
  // Per spec, the way to identify NaN is that it is not equal to itself
  var findNaN = needle !== needle;
  var indexOf;

  if (!findNaN && typeof Array.prototype.indexOf === "function") {
    indexOf = Array.prototype.indexOf;
  } else {
    indexOf = function (needle) {
      var i = -1,
        index = -1;

      for (i = 0; i < this.length; i++) {
        var item = this[i];

        if ((findNaN && item !== item) || item === needle) {
          index = i;
          break;
        }
      }

      return index;
    };
  }

  return indexOf.call(this, needle) > -1;
};

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startToPlay() {
  var no = 0;
  var runTimes = 0;
  var loopTimes = 3;
  var sec = 70;

  var winning = JSON.stringify(
    winning_list[getRandom(0, winning_list.length - 1)]
  );
  //console.log(winning);

  obj_winning = JSON.parse(winning);
  items_order = new Array();

  while (loopTimes > 0) {
    var index = getRandom(0, obj_winning.items.length - 1);
    if (!contains.call(items_order, index)) {
      items_order.push(index);
      loopTimes--;
    }
  }
  //console.log(items_order.toString());

  var stopTimes = [];
  for (var i = 0; i < items_order.length; i++) {
    stopTimes[i] = parseInt(
      obj_winning.items[items_order[i]].locations[
        getRandom(0, obj_winning.items[items_order[i]].locations.length - 1)
      ]
    ).toString();
  }

  setTimeout(function () {
    play(no, runTimes, parseInt(stopTimes[0]) + 48, sec, 2);
  }, i * 100);
  setTimeout(function () {
    play(no, runTimes, parseInt(stopTimes[1]) + 72, sec, 1);
  }, i * 150);
  setTimeout(function () {
    play(no, runTimes, parseInt(stopTimes[2]) + 96, sec, 0);
  }, i * 200);

  setTimeout(function () {
    playSound("game_starting")
  }, 500);
}

function showSlotMachine() {
  machine1.shuffle(1, "", 1, obj_winning.items[items_order[0]].id);
  setTimeout(
    () =>
    machine2.shuffle(1, "", 1, obj_winning.items[items_order[1]].id),
    300
  );
  setTimeout(
    () =>
    machine3.shuffle(1, "", 1, obj_winning.items[items_order[2]].id),
    600
  );
}

function showMsg() {
  $("#winMsg").text(obj_winning.winning_msg.toString());

  $(".ml2").each(function () {
    $(this).html(
      $(this)
      .text()
      .replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>")
    );
  });


  fontAnimation = new anime
    .timeline({
      loop: true
    }).add({
      targets: '.ml2 .letter',
      scale: [4, 1],
      opacity: [0, 1],
      translateZ: 0,
      easing: "easeOutExpo",
      duration: 1300,
      delay: function (el, i) {
        return 70 * i;
      }
    });
  //fontAnimation.restart();


}

$(document).keypress(function (e) {
  // KeyCode: ENTER
  // Start to game
  if (e.keyCode == 13 && playing == false && justDone == false) {
    init();
    playing = true;

    document.getElementById("bgSnd").pause();
    document.getElementById("bgSnd").currentTime = 0;

    setTimeout(function () {
      playSound("game_start");
    }, 500);

    setTimeout(function () {
      startToPlay();
    }, 3500);
  } else if (e.keyCode == 13 && playing == false && justDone == true) {
    init();
  }
});

$(document).ready(function () {
  $(".light").css("animation-duration", "1s");
  setTimeout(function () {
    $('.popup-wrap').addClass("nondisplay");
  }, 500);

  fontAnimation.pause();
});