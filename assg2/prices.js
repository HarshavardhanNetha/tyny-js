let banana
let orange
let mango

let bananaPrice = 5
let mangoPrice = 0.5
let orangePrice = 1

let total = 100

let arr = []

let maxBananas = total / bananaPrice
let maxMangoes = total / mangoPrice
let maxOranges = total / orangePrice

for(banana = 1; banana < maxBananas; banana++){
    for(orange = 1; orange < maxOranges; orange++){
        for(mango = 1; mango < maxMangoes; mango++){
            let sum =  (banana*bananaPrice)+(mango*mangoPrice)+(orange*orangePrice)
            // console.log(sum);
            if(sum === 100 && banana+orange+mango === 100){
                // console.log(`Banana - ${banana} , Orange - ${orange} , Mango - ${mango}`);
                let obj = {"Banana": banana, "Orange": orange, "Mango": mango}
                arr.push(obj)
            }
        }
    }
}

console.log(arr);