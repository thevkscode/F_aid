var info;
async function init(startDate, endDate) {
  const data = await API(startDate, endDate);
  info = data;
  deleteTable("tbody");
  pairList(info);
  PairDetail(0);
  window.localStorage.setItem("index", 0);
  selectRowToInput();
}
init("2020-01-01", "2020-02-27");

document.getElementById("from").addEventListener("change", () => {
  var startDate = new Date(document.getElementById("from").value);
  startDate = new Date(startDate.setDate(startDate.getDate() + 1))
    .toISOString()
    .slice(0, 10);
  document.getElementById("to").min = startDate;
});

document.getElementById("from").addEventListener("change", () => {
  var endDate = new Date(document.getElementById("to").value);
  endDate = new Date(endDate.setDate(endDate.getDate() - 1))
    .toISOString()
    .slice(0, 10);
  document.getElementById("to").max = endDate;
});

document.getElementById("calculate").addEventListener("click", async () => {
  var startDate = document.getElementById("from").value;
  var endDate = document.getElementById("to").value;
  if (!startDate) {
    alert("Please fill the start date");
    return;
  }
  if (!endDate) {
    alert("Please fill the end date");
    return;
  }
  await init(startDate, endDate);
});

async function API(startDate, endDate) {
  const dates = {
    startDate: startDate,
    endDate: endDate,
  };
  let date = `startDate=${startDate}&endDate=${endDate}`;
  console.log(dates);
  const data = await fetch(
    // "https://pair-trade-7tzhu537fa-el.a.run.app/api?" + date,
    "http://localhost:8080/api?" + date,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(dates),
    }
  ).then((response) => response.json());
  return data.data;
}

function deleteTable(bodyname) {
  var elmtTable = document.getElementById(bodyname);
  var tableRows = elmtTable.getElementsByTagName("tr");
  var rowCount = tableRows.length;

  for (var x = rowCount - 1; x >= 0; x--) {
    console.log(tableRows[x], x);
    elmtTable.removeChild(tableRows[x]);
  }
  // elmtTable.removeChild(tableRows[0]);
}

function selectRowToInput() {
  var table = document.getElementById("table");
  var rows = table.getElementsByTagName("tr");

  for (var i = 0; i < rows.length; i++) {
    var currentRow = table.rows[i];
    currentRow.onclick = function () {
      rows = this.rowIndex;
      PairDetail(rows);
      window.localStorage.setItem("index", rows);
    };
  }
}

function pairList(tableData) {
  var tableBody = document.getElementById("tbody");

  tableData.forEach(function (rowData) {
    var row = document.createElement("tr");

    var Pair_1 = document.createElement("th");
    Pair_1.appendChild(document.createTextNode(rowData.pair1));
    row.appendChild(Pair_1);

    var pair_2 = document.createElement("th");
    pair_2.appendChild(document.createTextNode(rowData.pair2));
    row.appendChild(pair_2);

    tableBody.appendChild(row);
  });
}
document.getElementById("sort").addEventListener("change", () => {
  var sortBy = document.getElementById("sort").value;
  if (sortBy == "correlation") {
    info.sort((a, b) => b.correlation - a.correlation);
  } else {
    info.sort((a, b) => b.profit - a.profit);
  }
  deleteTable("tbody");
  pairList(info);
  PairDetail(0);
  selectRowToInput();
});

function PairDetail(index) {
  var data = info[index];
  console.log("pair detail", data);
  deleteTable("thbody");
  detailTable(data.date, data.closingPrice1, data.closingPrice2, data.period);
  document.getElementById("tablecol2").innerHTML = data.pair1;
  document.getElementById("tablecol3").innerHTML = data.pair2;
  // document.getElementById("tablecol4").innerHTML = "Other"
  document.getElementById("tablecol4").style.display = "block";

  document.getElementById("correlation").innerHTML = data.correlation;
  document.getElementById("profit").innerHTML = data.profit;
  document.getElementById("stockname").innerHTML =
    data.pair1 + " & " + data.pair2;

  plot(
    data.date,
    data.closingPrice1,
    data.closingPrice2,
    data.pair1,
    data.pair2,
    "line",
    "line"
  );
}

document.getElementById("closingprice").addEventListener("click", () => {
  let index = window.localStorage.getItem("index");
  var data = info[index];
  deleteTable("thbody");
  detailTable(data.date, data.closingPrice1, data.closingPrice2, data.period);
  document.getElementById("tablecol2").innerHTML = data.pair1;
  document.getElementById("tablecol3").innerHTML = data.pair2;
  // document.getElementById("tablecol4").innerHTML = "Other"
  document.getElementById("tablecol4").style.display = "block";
  plot(
    data.date,
    data.closingPrice1,
    data.closingPrice2,
    data.pair1,
    data.pair2,
    "line",
    "line"
  );
});
document.getElementById("rsi").addEventListener("click", () => {
  let index = window.localStorage.getItem("index");
  var data = info[index];
  deleteTable("thbody");
  detailTable(data.date, data.rsi1, data.rsi2, data.period);
  document.getElementById("tablecol2").innerHTML = data.pair1;
  document.getElementById("tablecol3").innerHTML = data.pair2;
  // document.getElementById("tablecol4").innerHTML = "Other"
  document.getElementById("tablecol4").style.display = "block";
  plot(data.date, data.rsi1, data.rsi2, data.pair1, data.pair2, "line", "line");
});
document.getElementById("stockA").addEventListener("click", () => {
  let index = window.localStorage.getItem("index");
  var data = info[index];
  deleteTable("thbody");
  detailTable(data.date, data.closingPrice1, data.rsi1, data.period);
  document.getElementById("tablecol2").innerHTML = "Closing Price";
  document.getElementById("tablecol3").innerHTML = "RSI";
  deleteTableColumn();
  plot(
    data.date,
    data.rsi1,
    data.closingPrice1,
    "RSI",
    "Closing Price",
    "line",
    "bar"
  );
});
document.getElementById("stockB").addEventListener("click", () => {
  let index = window.localStorage.getItem("index");
  var data = info[index];
  deleteTable("thbody");
  detailTable(data.date, data.closingPrice2, data.rsi2, data.period);
  deleteTableColumn();
  plot(
    data.date,
    data.rsi2,
    data.closingPrice2,
    "RSI",
    "Closing Price",
    "line",
    "bar"
  );
});

function deleteTableColumn() {
  document.getElementById("tablecol4").style.display = "none";
  var elmtTable = document.getElementById("stable");
  var tableRows = elmtTable.rows;
  var rowCount = tableRows.length;
  for (var x = rowCount - 1; x >= 0; x--) {
    tableRows[x].deleteCell(3);
  }
}

function detailTable(col0, col1, col2, col3) {
  var tableBody = document.getElementById("thbody");
  let k = 0;
  col0.forEach(function (value, i) {
    var row = document.createElement("tr");
    row.style.display = "flex";
    row.style.justifyContent = "space-around";

    var date = document.createElement("th");
    date.appendChild(document.createTextNode(value));
    row.appendChild(date);

    var cl1 = document.createElement("th");
    cl1.appendChild(document.createTextNode(col1[i]));
    row.appendChild(cl1);

    var cl2 = document.createElement("th");
    cl2.appendChild(document.createTextNode(col2[i]));
    row.appendChild(cl2);

    var pro = document.createElement("th");
    if (i == col3[k]) {
      k++;
      pro.appendChild(document.createTextNode("Trade " + k));
    } else {
      pro.appendChild(document.createTextNode("Trade " + k));
    }
    row.appendChild(pro);

    tableBody.appendChild(row);
  });
}

let myLineChart;
function plot(x_axis, data1, data2, lable1, lable2, graph1, graph2) {
  if (myLineChart) myLineChart.destroy();
  let ctx = document.getElementById("myChart");

  myLineChart = new Chart(ctx, {
    data: {
      labels: x_axis,
      datasets: [
        {
          type: graph1,
          label: lable1,
          data: data1,
          borderWidth: 1,
          yAxisID: "y",
          borderColor: "#F96167",
          backgroundColor: "#F9E795",
        },
        {
          type: graph2,
          label: lable2,
          data: data2,
          borderWidth: 1,
          yAxisID: "y1",
          borderColor: "#2F3C7E",
          backgroundColor: "#FBEAEB",
        },
      ],
    },
    options: {
      transitions: {
        show: {
          animations: {
            x: {
              from: 0,
            },
            y: {
              from: 0,
            },
          },
        },
        hide: {
          animations: {
            x: {
              to: 0,
            },
            y: {
              to: 0,
            },
          },
        },
      },
      scales: {
        x: {
          count: 10,
          grid: {
            drawOnChartArea: false, // only want the grid lines for one axis to show up
          },
        },
        y: {
          type: "linear",
          display: true,
          position: "left",
          grid: {
            drawOnChartArea: false, // only want the grid lines for one axis to show up
          },
        },
        y1: {
          type: "linear",
          display: true,
          position: "right",

          // grid line settings
          grid: {
            drawOnChartArea: false, // only want the grid lines for one axis to show up
          },
        },
      },
    },
  });
}

//"https://faid-383508.el.r.appspot.com/api"
