import mongoose from "mongoose";
import {MongoDbService} from "../MongoDbService";
import {services} from "../services"
import {Accounts} from "./schemas/Accounts";
import {IAccount} from "../../../models/IAccount";
import {Products} from "./schemas/Products";
import {IAccountService} from "../interfaces/IAccountService";


export class AccountService implements IAccountService {
    private instance: MongoDbService;

    constructor() {
        this.instance = MongoDbService.instance;
    }

    public async add(acc: IAccount) {
        await this.instance.getConnection();

        const newAcc = new Accounts({...acc});
        const result = await newAcc.save();
        return result["_id"];
    }

    public async get(count: number, offset: number) {
        await this.instance.getConnection();
        return Accounts.find().skip(offset).limit(count);
    }

    public async getByUsername(username: string) {
        await this.instance.getConnection();
        return (await Accounts.find({username}) as any)?.[0];
    }

    public async update(acc: IAccount) {
        await this.instance.getConnection();

        const result = await Products.updateOne({"_id": new mongoose.Types.ObjectId(acc.id)}, {
            username: acc.username,
            email: acc.email,
            contactDetails: acc.contactDetails
        });
        return result.matchedCount;
    }

    public async delete(id: mongoose.Types.ObjectId) {
        await this.instance.getConnection();
        const {deletedCount} = await Accounts.deleteOne({"_id": new mongoose.Types.ObjectId(id)});
        return deletedCount;
    }
}

MongoDbService.registerService(services.account, new AccountService());