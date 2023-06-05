function Loader(pfx) {
  var load_pos = 0;
  var load_fce = function (fns, item_cb, final_cb) {
    if (fns.length <= load_pos) {
      console.log("finished loading: " + JSON.stringify(fns));
      if (typeof final_cb !== "undefined") {
        final_cb();
      }
    } else {
      fetch(pfx + fns[load_pos])
        .then((data) => data.json())
        .then((jdata) => {
          // console.log(fns[load_pos], jdata);
          if (typeof item_cb !== "undefined") {
            item_cb(fns[load_pos], jdata);
          }
          load_pos++;
          load_fce(fns, item_cb, final_cb);
        })
        .catch((err) => {
          console.error(err);
          load_pos++;
          load_fce(fns, item_cb, final_cb);
        });
    }
  };
  var obj = {
    exec: load_fce,
  };
  return obj;
}
/*
function load_finished() {
    // your final code
}

function item_loaded(fn, data) {
  if (typeof window.data_dict === "undefined") {
    window.data_dict = {};
  }
  window.data_dict[fn] = data;
}

var fns = [
  "data-22kv.json",
  "rounds-idx.json",
  "gates-...idx.json",
  "cats-idx.json",
];

var linst = new Loader("json/");
linst.exec(fns, item_loaded, load_finished);
*/
function setClickEvent(name, eventFce) {
  const but_gen = document.getElementById(name);
  if (but_gen) {
    but_gen.addEventListener("click", eventFce, true);
  } else {
    console.error(`element with name ${name} not found`);
  }
}
const el_div_toast = document.getElementById("toast");
var toast_timeout_obj;
const TOAST_WAIT_SECS = 1.5;

function hideToast(event) {
  el_div_toast.style.display = "none";
}

function showToast(hdrtxt, text, display_duration_secs, bg_color) {
  if (el_div_toast) {
    var show_secs = TOAST_WAIT_SECS;
    if (typeof display_duration_secs === "number") {
      show_secs = display_duration_secs;
    }
    if (typeof bg_color !== "undefined") {
      el_div_toast.style.backgroundColor = bg_color;
    } else {
      el_div_toast.style.backgroundColor = "#fcc";
    }
    el_div_toast.innerHTML = `<div class='toast-hdr'>${hdrtxt}</div><br />${text}`;
    el_div_toast.style.display = "block";
    if (
      typeof toast_timeout_obj !== "undefined" &&
      toast_timeout_obj !== null
    ) {
      clearTimeout(toast_timeout_obj);
      toast_timeout_obj = null;
    }
    toast_timeout_obj = setTimeout(hideToast, show_secs * 1000);
  } else {
    console.error("el_div_toast not found");
  }
}
if (el_div_toast) {
  el_div_toast.addEventListener("click", hideToast);
}
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
function later(el,delay) {
  let elst = el.style;
  setTimeout(function () {
    elst.backgroundColor = "";
  }, delay);
}

window.utils = {
  Loader: Loader,
  setClickEvent: setClickEvent,
  showToast: showToast,
  later: later,
  getRandomInt: getRandomInt
};
