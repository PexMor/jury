const version = "1.0.1";
const cts = "2023/06/05 10:16:37 CEST";
const zero_uuid = "00000000-0000-0000-0000-000000000000";
window.info = {};
window.info.version = version;
window.info.cts = cts;
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("worker.js").then(
    (reg) => {
      // console.log("Service worker registered : ", reg);
    },
    (err) => {
      console.error("Service worker not registered : ", err);
    }
  );
}
const els = {
  about_cont: document.getElementById("about_cont"),
  jury_cont: document.getElementById("jury_cont"),
};
// =====================
var save = {};
function onClick(el) {
  let data = el.getAttribute("data");
  if (typeof data !== undefined && data !== null) {
    let split_arr = data.split(":");
    console.log(split_arr);
    if (typeof save[split_arr[0]] === "undefined") {
      el.style.backgroundColor = "#aaf";
      utils.showToast("Clicked", `Competitior #${split_arr[0]} got mark ${split_arr[1]}`, 2, "#aaf");
      save[split_arr[0]]=split_arr[1];
    } else {
      utils.showToast("Locked", `Competitior #${split_arr[0]} already has mark ${save[split_arr[0]]}`, 2, "#faa");
    }
  } else {
    console.error("Data attribute missing");
  }
  return false;
}
window.onClick = onClick;
function renderJury() {
  let el_jury_cont = els["jury_cont"];
  if (el_jury_cont) {
    let html = "";
    let data = window.data_dict["test.json"];
    html += JSON.stringify(data);
    console.log(data);
    html += "<div class='tab-jury'>";
    for (let ii = 0; ii < data.length; ii++) {
      let item = data[ii];
      html += "<div class='row-jury'>";
      html += "<div class='hdr-item'>";
      html += `<div class="item-bib">${item["bib"]}</div>`;
      html += item["name"];
      html += "</div>";
      html += "<div class='body-item'>";
      for (let jj = 0; jj < 5; jj++) {
        html += `<button data="${
          item["bib"]
        }:${jj}" class='pure-button but-pad' type='button' onclick='return onClick(this)'>${
          jj + 1
        }</button>`;
      }
      html += "</div>";
      html += "</div>";
    }
    html += "</div>";
    el_jury_cont.innerHTML = html;
  } else {
    console.error("missing element");
  }
}
function load_finished() {
  renderJury();
  handleHashChange();
}
function item_loaded(fn, data) {
  if (typeof window.data_dict === "undefined") {
    window.data_dict = {};
  }
  window.data_dict[fn] = data;
}
// =====================
function setVisible(el) {
  const els = document.querySelectorAll(".app_tab");
  for (var ii = 0; ii < els.length; ii++) {
    var xel = els[ii];
    if (typeof el !== "undefined" && el !== null && xel.id === el.id) {
      xel.style.display = "block";
    } else {
      xel.style.display = "none";
    }
  }
}
function handleHashChange(event) {
  var hash = window.location.hash;
  if (event) {
    event.preventDefault();
  }
  //console.log(`handleHashChange: ${hash}`);
  var tab_name = "home";
  if (hash !== "" && hash !== "#") {
    var tmp_txt = hash.substring(1);
    var tmp_arr = tmp_txt.split(/[^a-zA-Z0-9_\-]/);
    tmp_arr = tmp_arr.filter((item) => item.trim() !== "");
    if (tmp_arr.length > 0) {
      tab_name = tmp_arr[0];
    }
  }
  var tab_el = document.getElementById("tab_" + tab_name);
  if (typeof tab_el === "undefined") {
    tab_el = document.getElementById("tab_home");
  }
  setVisible(tab_el);
}
window.addEventListener("hashchange", handleHashChange);
window.addEventListener("DOMContentLoaded", (event) => {
  const fns = ["test.json"];
  var linst = new utils.Loader("json/");
  linst.exec(fns, item_loaded, load_finished);
});
