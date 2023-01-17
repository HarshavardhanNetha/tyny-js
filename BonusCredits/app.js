const { ObjectID } = require("bson")
const { Schema } = require("mongoose")
const mongoose = require("mongoose")

let bonuscreditlogs = [{
    "_id":1000,
    "credits":10,
    "remainingCredits":10
},
{
    "_id":1001,
    "credits":20,
    "remainingCredits":20
}]
//retrieve only nonzero bonuscredit logs which have validity from old_to_new

let campaigns = []

let calculateAvailableCredits = async (needed) => {
    let creditsPresent = 0
    bonuscreditlogs.forEach((log) => {
        creditsPresent+=log.credits
    })
    if(creditsPresent>=needed){
        console.log(`Credits Present: ${creditsPresent}`)
        return true
    }
    else{
        return false
    }
}

let creditUtilizationLogs = []

let runAlgorithm = async (requiredCredits, campaignId, businessOwnerId) => {
    let accumulatedCredits = 0
    let index = 0
    while(true) {
        if(bonuscreditlogs[index].remainingCredits >= requiredCredits-accumulatedCredits){
            bonuscreditlogs[index].remainingCredits -=  requiredCredits-accumulatedCredits
            let creditUtilLog = {
                "_id":index,
                "campaignId":campaignId,
                "businessOwnerId":businessOwnerId,
                "lienCredits": requiredCredits-accumulatedCredits,
                "utilizedCredits": 0
            }
            creditUtilizationLogs.push(creditUtilLog)
            break
        }
        else{
            bonuscreditlogs[index].remainingCredits = 0
            accumulatedCredits+= bonuscreditlogs[index].credits
            let creditUtilLog = {
                "_id":index,
                "campaignId":campaignId,
                "businessOwnerId":businessOwnerId,
                "lienCredits": bonuscreditlogs[index].credits,
                "utilizedCredits": 0
            }
            creditUtilizationLogs.push(creditUtilLog)
            index++
        }
    }
}

let createCampaign = async (requiredCredits, businessOwnerId) => {
    // check if availableCredits from bonus are enough to perform the trxn
    if(await calculateAvailableCredits(requiredCredits)){
        console.log("Credits are enough")
        let campaignDoc = {
            "_id":9999,
            "creditsNeeded":requiredCredits,
            "businessOwnerId": businessOwnerId
        }
        campaigns.push(campaignDoc)
        await runAlgorithm(requiredCredits, campaignDoc._id, businessOwnerId)
    }
    else{
        console.log("Add additional credits")
    }
}

let consumeCredits = async(costPerDay) => {
    // retrieve non zero consumption logs based on campainId
    let tempCreditLogsIds = creditUtilizationLogs.filter((doc) => {
        if(doc.utilizedCredits != doc.lienCredits){
            return doc;
        }
    })

    // console.log("Filtered Credit Logs")
    // console.log(tempCreditLogsIds)

    accumulatedCredits = 0
    requiredCredits = costPerDay
    index = 0

    while(requiredCredits != accumulatedCredits){
        console.log(`Index: ${index} StillNeeded: ${requiredCredits - accumulatedCredits}`)
        if(tempCreditLogsIds[index].lienCredits - tempCreditLogsIds[index].utilizedCredits >= requiredCredits - accumulatedCredits){
            tempCreditLogsIds[index].utilizedCredits += requiredCredits - accumulatedCredits
            accumulatedCredits += requiredCredits - accumulatedCredits
        }
        else{
            accumulatedCredits += tempCreditLogsIds[index].lienCredits-tempCreditLogsIds[index].utilizedCredits
            tempCreditLogsIds[index].utilizedCredits += tempCreditLogsIds[index].lienCredits-tempCreditLogsIds[index].utilizedCredits
            index++
        }
    }

    console.log(tempCreditLogsIds)
}

let runFullCampaign = async (costPerDay) => {
    await consumeCredits(costPerDay);
    await consumeCredits(costPerDay);
    await consumeCredits(costPerDay);
}



let mainProgram = async() => {
    //db connection
    await mongoose.connect("mongodb://127.0.0.1:27017/magicCredsEnv")
    // Models
    const BonusCreditLog = new Schema({
        credits: {type: Number},
        remainingCredits: {type: Number},
        businessOwnerId: {type: ObjectID},
    }, {timestamps: true})
    const BonusCreditLogModel = mongoose.model('BonusCreditLogModel', BonusCreditLog);

    const CampaignLog = new Schema ({
        creditsNeeded: {type: Number},
        businessOwnerId: {type: ObjectID}
    }, {timestamps: true})
    const CampaignLogModel = mongoose.model('CampaignLogModel', CampaignLog);

    const CreditConsumptionLog = new Schema({
        campaignId: {type: ObjectID},
        businessOwnerId: {type: ObjectID},
        lienCredits: {type: Number},
        utilizedCredits: {type: Number}
    }, {timestamps: true})
    const CreditConsumptionLogModel = mongoose.model('CreditConsumptionLogModel', CreditConsumptionLog);

    // await createBonusCreditLogs("631ca82bbba3e72a189129fa")
    let credits = [10,20]
    credits.forEach(async (credit)=> {
        await BonusCreditLogModel.create({
            businessOwnerId: ObjectID("631ca82bbba3e72a189129fa"),
            credits: credit,
            remainingCredits: credit
        })
    })

    await createCampaign(21,765874)

    console.log(creditUtilizationLogs)
    console.log(campaigns)
    console.log(bonuscreditlogs)
    await runFullCampaign(7)
}

let createBonusCreditLogs = async (businessOwnerId) => {
    let credits = [10,20]
    credits.forEach(async (credit)=> {
        await BonusCreditLogModel.create({
            businessOwnerId: businessOwnerId,
            credits: credit,
            remainingCredits: credit
        })
    })
}

mainProgram()