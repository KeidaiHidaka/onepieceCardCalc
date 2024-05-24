document.addEventListener("DOMContentLoaded", function () {
  var calculateButton = document.getElementById("calculateButton");
  calculateButton.addEventListener("click", function () {
    calculateAddition();
    generateCombinations();
    generateLifeCombinations();
  });

  function calculateAddition() {
    var sum = 0;
    for (var i = 0; i < 7; i++) {
      // 7行に変更
      for (var j = 0; j < 5; j++) {
        var inputValue =
          parseFloat(document.getElementById("input_" + i + "_" + j).value) ||
          0;
        sum += inputValue;
      }
    }
    document.getElementById("result").innerText = "合計: " + sum;
  }

  function generateCombinations() {
    var cardValues = [0, 1, 2];
    var handSize = parseInt(document.getElementById("handSize").value) || 3;
    var combinations = [];

    function generate(currentHand, depth) {
      if (depth === handSize) {
        var sum = currentHand.reduce((acc, val) => acc + val, 0); // 手札の合計値を計算
        combinations.push({ hand: [...currentHand], sum: sum }); // 手札の配列と合計値を追加
        return;
      }
      for (var value of cardValues) {
        currentHand.push(value);
        generate(currentHand, depth + 1);
        currentHand.pop();
      }
    }

    generate([], 0);

    var combinationsText = combinations
      .map((comb) => `${JSON.stringify(comb.hand)} 手札合計値:${comb.sum}`)
      .join("\n");
    document.getElementById("combinations").innerText = combinationsText;
  }

  function generateLifeCombinations() {
    var cardValues = [0, 1, 2];
    var lifeSize = parseInt(document.getElementById("lifeSize").value) || 3;
    var lifeCombinations = [];

    function generate(currentLife, depth) {
      if (depth === lifeSize) {
        lifeCombinations.push([...currentLife]);
        return;
      }
      for (var value of cardValues) {
        currentLife.push(value);
        generate(currentLife, depth + 1);
        currentLife.pop();
      }
    }

    generate([], 0);

    var lifeCombinationsText = lifeCombinations
      .map((comb) => JSON.stringify(comb))
      .join("\n");
    document.getElementById("lifeCombinations").innerText =
      lifeCombinationsText;
  }

  // テキストボックスを縦7横5の表に追加する
  var gridContainer = document.getElementById("gridContainer");

  // 先にヘッダ行を追加する
  var headers = ["", "方式1", "方式2", "方式3", "方式4", "理論値"];
  var headerRow = document.createElement("tr");
  headers.forEach((header) => {
    var th = document.createElement("th");
    th.innerText = header;
    headerRow.appendChild(th);
  });
  gridContainer.appendChild(headerRow);

  var labels = [
    "自分のアタック回数",
    "アタック時のパワー1(降順)",
    "アタック時のパワー2(降順)",
    "アタック時のパワー3(降順)",
    "アタック時のパワー4(降順)",
    "アタック時のパワー5(降順)",
    "アタック時のパワー6(降順)",
  ];

  for (var i = 0; i < 7; i++) {
    // 7行に変更
    var row = document.createElement("tr");

    // ラベル列を追加する
    var labelCell = document.createElement("td");
    labelCell.innerText = labels[i];
    row.appendChild(labelCell);

    for (var j = 0; j < 5; j++) {
      var cell = document.createElement("td");
      var input = document.createElement("input");
      input.type = "number";
      input.id = "input_" + i + "_" + j;
      input.setAttribute("min", "0"); // 最小値を0に設定
      input.setAttribute("max", "2"); // 最大値を2に設定
      cell.appendChild(input);
      row.appendChild(cell);
    }
    gridContainer.appendChild(row);
  }
});
