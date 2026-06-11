const display = document.getElementById("display");
const historyList = document.getElementById("history");

function append(value){

    display.value += value;
}

function clearDisplay(){

    display.value = "";
}

function deleteLast(){

    display.value = display.value.slice(0,-1);
}

function clearHistory(){
    historyList.innerHTML = "";
    historyList.innerHTML = "";
    localStorage.removeItem("history");
}

function calculate(){

    try{

        const expression = display.value;
        const result = eval(expression);

        const li = document.createElement("li");
        li.textContent = `${expression} = ${result}`;

        historyList.prepend(li);
        saveHistory();

        display.value = result;

    }

    catch{

        display.value = "Error";
    }
}

document.addEventListener("keydown",(event)=>{

    const key = event.key;

    if(
        (key >= "0" && key <= "9") ||
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/" ||
        key === "." ||
        key === "%"
    ){

        append(key);
    }

    else if(key === "Enter"){

        calculate();
    }

    else if(key === "Backspace"){

        deleteLast();
    }

    else if(key === "Escape"){

        clearDisplay();
    }
});

window.onload = () => {
    historyList.innerHTML = localStorage.getItem("history") || "";
};

function saveHistory(){
    localStorage.setItem("history", historyList.innerHTML);
}