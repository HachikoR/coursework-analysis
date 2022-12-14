import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    categories: [{type: Schema.Types.ObjectId, ref: "Categories"}]
}, {versionKey: false});

export const Products = mongoose.model("Products", schema, "products");