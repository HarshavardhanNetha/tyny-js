const { ObjectID } = require("bson")
const { Schema } = require("mongoose")
const mongoose = require("mongoose")
const {ObjectId} = require('mongodb'); 


let BonusCreditLogModel = null;
let CampaignLogModel = null;
let CreditConsumptionLogModel =  null;

//retrieve only nonzero bonuscredit logs which have validity from old_to_new

let calculateAvailableCredits = async (needed, businessOwnerId) => {
    // let creditsPresent = 0
    let matchStage = {$expr: {$and: [{ $eq: ["$businessOwnerId",businessOwnerId]},{ $ne: ["$remainingCredits",0]}]}}
    let groupStage = { _id: "$businessOwnerId", creds: { $sum: "$remainingCredits" } }

    let creditsPresent = await BonusCreditLogModel.aggregate([{$match: matchStage}, {$group: groupStage}])
    // console.log("CreditsPresentLog")
    // console.log(creditsPresent)
    
    if(creditsPresent.length && creditsPresent[0].creds >= needed ){
        console.log(`Credits Present: ${creditsPresent[0].creds}`)
        return true
    }
    else{
        return false
    }
}

let runAlgorithm = async (requiredCredits, campaignId, businessOwnerId) => {
    let accumulatedCredits = 0
    let index = 0
    let matchStage = {$expr: {$and: [{ $eq: ["$businessOwnerId",businessOwnerId]},{ $ne: ["$remainingCredits",0]}]}}
    const bonuscreditlogs = await BonusCreditLogModel.aggregate([{$match: matchStage}])
    // console.log("BonusCreditLogs")
    // console.log(bonuscreditlogs)

    while(true) {
        if(bonuscreditlogs[index].remainingCredits >= requiredCredits-accumulatedCredits){
            let tempValue = bonuscreditlogs[index].remainingCredits -=  requiredCredits-accumulatedCredits
            await BonusCreditLogModel.findByIdAndUpdate(bonuscreditlogs[index]._id, {remainingCredits: tempValue})
            let creditUtilLog = {
                "campaignId":campaignId,
                "businessOwnerId":businessOwnerId,
                "lienCredits": requiredCredits-accumulatedCredits,
                "utilizedCredits": 0,
                "bonusCreditLogId": bonuscreditlogs[index]._id 
            }
            await CreditConsumptionLogModel.create(creditUtilLog)
            break
        }
        else{
            // bonuscreditlogs[index].remainingCredits = 0
            await BonusCreditLogModel.findByIdAndUpdate(bonuscreditlogs[index]._id, {remainingCredits: 0})

            accumulatedCredits+= bonuscreditlogs[index].credits
            let creditUtilLog = {
                "campaignId":campaignId,
                "businessOwnerId":businessOwnerId,
                "lienCredits": bonuscreditlogs[index].credits,
                "utilizedCredits": 0,
                "bonusCreditLogId": bonuscreditlogs[index]._id
            }
            // creditUtilizationLogs.push(creditUtilLog)
            await CreditConsumptionLogModel.create(creditUtilLog)
            // await BonusCreditLogModel.updateMany(bonuscreditlogs)
            index++
        }
    }

    return true
}

let createCampaign = async (requiredCredits, businessOwnerId) => {
    // check if availableCredits from bonus are enough to perform the trxn
    let checkNeeded = await calculateAvailableCredits(requiredCredits, businessOwnerId)
    if(checkNeeded){
        // console.log("Credits are enough")
        const campaignDoc = await CampaignLogModel.create({
            creditsNeeded: requiredCredits,
            businessOwnerId: businessOwnerId
        })
        let runAlgo = await runAlgorithm(requiredCredits, campaignDoc._id, businessOwnerId)
        if(runAlgo)
            return {status:true, data: campaignDoc}
    }
    else{
        console.log("Add additional credits")
        return {status:false}
    }
}

let consumeCredits = async(costPerDay, campaignId) => {
    // retrieve non zero consumption logs based on campainId
    // await new Promise(resolve => setTimeout(resolve, 1000));

    // console.log(`Campaign Id: ${campaignId} ${typeof campaignId}`)

    let matchStage = {$expr: {$and: [{ $eq: ["$campaignId",campaignId]},{ $ne: ["$lienCredits","$utilizedCredits"]}]}}

    let consumptionDocs = await CreditConsumptionLogModel.aggregate([{$match: matchStage}])
    console.log(consumptionDocs)

    // console.log("Filtered Credit Logs")
    // console.log(tempCreditLogsIds)

    accumulatedCredits = 0
    requiredCredits = costPerDay
    index = 0

    while(requiredCredits != accumulatedCredits){
        console.log(`Index: ${index} StillNeeded: ${requiredCredits - accumulatedCredits}`)
        if(consumptionDocs[index].lienCredits - consumptionDocs[index].utilizedCredits >= requiredCredits - accumulatedCredits){
            let tempValue = consumptionDocs[index].utilizedCredits + (requiredCredits - accumulatedCredits)
            await CreditConsumptionLogModel.findByIdAndUpdate(consumptionDocs[index]._id,{utilizedCredits: tempValue})
            accumulatedCredits += requiredCredits - accumulatedCredits
        }
        else{
            accumulatedCredits += consumptionDocs[index].lienCredits-consumptionDocs[index].utilizedCredits
            let tempValue = consumptionDocs[index].utilizedCredits + (consumptionDocs[index].lienCredits-consumptionDocs[index].utilizedCredits)
            await CreditConsumptionLogModel.findByIdAndUpdate(consumptionDocs[index]._id,{utilizedCredits: tempValue})
            index++
        }
    }

}

let runFullCampaign = async (costPerDay, campaignId) => {
    await consumeCredits(costPerDay, campaignId);
    await consumeCredits(costPerDay, campaignId);
    await consumeCredits(costPerDay, campaignId);
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
    BonusCreditLogModel = mongoose.model('BonusCreditLogModel', BonusCreditLog);

    const CampaignLog = new Schema ({
        creditsNeeded: {type: Number},
        businessOwnerId: {type: ObjectID}
    }, {timestamps: true})
    CampaignLogModel = mongoose.model('CampaignLogModel', CampaignLog);

    const CreditConsumptionLog = new Schema({
        campaignId: {type: ObjectID},
        businessOwnerId: {type: ObjectID},
        bonusCreditLogId: {type: ObjectID},
        lienCredits: {type: Number},
        utilizedCredits: {type: Number}
    }, {timestamps: true})
    CreditConsumptionLogModel = mongoose.model('CreditConsumptionLogModel', CreditConsumptionLog);

    // creating bonusCreditLogs for testing purpose
    let generatedBusinessOwnerId = new ObjectId()
    console.debug(generatedBusinessOwnerId)

    let createBonusDocs = await createBonusCreditLogs(generatedBusinessOwnerId)
    
    await new Promise(resolve => setTimeout(resolve, 1000));

    let campaignDoc = null;

    if(createBonusDocs){
        let creditsNeededForCampaign = 21
        campaignDoc = await createCampaign(creditsNeededForCampaign,generatedBusinessOwnerId)
        // await new Promise(resolve => setTimeout(resolve, 1000));

    }

    // console.log(`CampaignDoc: ${campaignDoc}`)

    if(campaignDoc.status){
        let perDayCost = 7
        // await new Promise(resolve => setTimeout(resolve, 1000));
        await runFullCampaign(perDayCost, campaignDoc["data"]._id)
    }
}

let createBonusCreditLogs = async (businessOwnerId) => {
    try {
        let credits = [10,20]
        let preparedRecords = []
        credits.forEach(async (credit)=> {
            let preparedDoc = {
                businessOwnerId: businessOwnerId,
                credits: credit,
                remainingCredits: credit        
            }
            preparedRecords.push(preparedDoc);
        })
    
        let addAll = await BonusCreditLogModel.insertMany(preparedRecords)
        return true
    } catch (error) {
        return false
    }
}

const redisConn = async () => {
    
    const redis = require("redis");
    const redisclient = redis.createClient();
    
    (async () => {
        await redisclient.connect({url: 'redis://localhost:6379', legacyMode: true,   defaults: {
            socket: {
              connectTimeout: 50000,
            },
          },});
    })();
    
    console.log("Connecting to the Redis");
    
    redisclient.on("ready", () => {
        console.log("Connected!");
    });
    
    redisclient.on("error", (err) => {
        console.log("Error in the Connection");
    });
}

// mainProgram()
redisConn()