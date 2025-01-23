// GET FROM URL
const info = document.getElementById("getInfo")
info.addEventListener("click", getInfo);

function getInfo() {
    const input = document.getElementById("connectURL")
    const url = input.value
    console.log(url);
    window.functionsBridge.getInfo(url);
}
