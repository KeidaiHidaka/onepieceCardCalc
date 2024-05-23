document.addEventListener("DOMContentLoaded", function() {
    var calculateButton = document.getElementById("calculateButton");
    calculateButton.addEventListener("click", function() {
        calculateAddition();
    });

    function calculateAddition() {
        var sum = 0;
        for (var i = 0; i < 10; i++) {
            for (var j = 0; j < 5; j++) {
                var inputValue = parseFloat(document.getElementById("input_" + i + "_" + j).value) || 0;
                sum += inputValue;
            }
        }
        document.getElementById("result").innerHTML = "Addition result: " + sum;
    }

    // テキストボックスを縦10横5の表に追加する
    var gridContainer = document.getElementById("gridContainer");
    for (var i = 0; i < 10; i++) {
        var row = document.createElement("tr");
        for (var j = 0; j < 5; j++) {
            var cell = document.createElement("td");
                var input = document.createElement("input");
                input.type = "number";
                input.id = "input_" + i + "_" + j;
                input.setAttribute("min", "0"); // 最小値を0に設定
            if (j > 0) {
                input.setAttribute("step", "1000"); // 2列目以降のテキストボックスに1000単位での増減を設定
                input.setAttribute("min", "0");
                input.addEventListener("input", function() {
                    if (this.value % 1000 !== 0) {
                        this.value = Math.round(this.value / 1000) * 1000;
                    }
                });
            }
                cell.appendChild(input);
            row.appendChild(cell);
        }
        gridContainer.appendChild(row);
    }
});
