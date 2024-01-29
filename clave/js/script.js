document.addEventListener("DOMContentLoaded", function () {
    const amountInput = document.getElementById("amountInput");
    const numericKeysContainer = document.getElementById("keyboard");

    function shuffleNumericKeys() {
        const numericKeys = Array.from(numericKeysContainer.children)
            .filter(key => key.textContent.match(/^\d+$/));

        const shuffledKeys = numericKeys.slice();
        for (let i = shuffledKeys.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledKeys[i], shuffledKeys[j]] = [shuffledKeys[j], shuffledKeys[i]];
        }

        numericKeysContainer.innerHTML = "";
        shuffledKeys.forEach(key => numericKeysContainer.appendChild(key));
    }

    shuffleNumericKeys();

    window.appendNumber = function (number) {
        const currentValue = amountInput.value;

        if (currentValue.length < 4 && !currentValue.includes(number)) {
            amountInput.value += number;
            updateNumericKeysDisplay();
            shuffleNumericKeys(); 
        }
    };

    window.clearAmount = function () {
        const currentValue = amountInput.value;

        if (currentValue.length > 0) {
            alert("Clave ingresada: " + currentValue);
            amountInput.value = "";
            updateNumericKeysDisplay();
        }
    };

    window.deleteLastDigit = function () {
        const currentValue = amountInput.value;
        amountInput.value = currentValue.slice(0, -1);
        updateNumericKeysDisplay();
    };

    function updateNumericKeysDisplay() {
        const numericKeys = document.querySelectorAll("#keyboard .key");

        numericKeys.forEach(function (key) {
            key.textContent = key.dataset.originalValue;
        });
    }

    const numericKeys = document.querySelectorAll("#keyboard .key");

    numericKeysContainer.addEventListener("mouseover", function () {
        numericKeys.forEach(function (key) {
            const keyValue = key.textContent;
            if (keyValue.match(/^\d+$/)) {
                key.textContent = "*";
            }
        });
    });

    numericKeysContainer.addEventListener("mouseout", function () {
        updateNumericKeysDisplay();
    });

    numericKeys.forEach(function (key) {
        key.addEventListener("click", function () {
            const keyValue = this.textContent;

            if (keyValue === "C") {
                clearAmount();
            } else if (keyValue === "←") {
                deleteLastDigit();
            } else {
                appendNumber(keyValue);
            }
        });

        key.dataset.originalValue = key.textContent;
    });
});
