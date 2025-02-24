import fs from "fs"

export function log(input: string) {
    const fileName: string = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}.txt`
    const currentTime = `(${new Date().getHours()}-${new Date().getMinutes()}-${new Date().getSeconds()}):`;
    if (fs.existsSync('./logs')) fs.mkdirSync('./logs');

    if (fs.existsSync(`./logs/${fileName}`)) {
        fs.appendFile(`./logs/${fileName}`, `${currentTime} ${input}`, (err) => {
            if (err) throw err;
        });
    }
    else {
        fs.writeFile(`./logs/${fileName}`, `${currentTime} ${input}`, (err) => {
            if (err) throw err;
        })
    }
}
