document.getElementById("getInfo").addEventListener("click", getInfo);

function getInfo() {
    console.log("button clicked");
    window.functionsBridge.getInfo();
}