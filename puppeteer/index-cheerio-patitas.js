const bcrypt = require('bcrypt')

const arr = "Mora, Hembra, 1 año y 9 meses, En adopción"

async function hash() {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(arr, salt);
    console.log(hashedPass)
}

hash()