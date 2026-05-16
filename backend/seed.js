const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

dotenv.config();

const Seller = require("./models/sellerSchema");
const Product = require("./models/productSchema");
const { productDataList } = require("./seedData");

const DEMO_SELLER = {
    name: "Demo Seller",
    email: "demo@shop.com",
    password: "demo123",
    shopName: "Demo Shop",
};

async function seed() {
    await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    let seller = await Seller.findOne({ email: DEMO_SELLER.email });
    if (!seller) {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(DEMO_SELLER.password, salt);
        seller = await Seller.create({ ...DEMO_SELLER, password: hashedPass });
        console.log(`Created seller: ${seller.email} / ${DEMO_SELLER.password}`);
    } else {
        console.log(`Seller already exists: ${seller.email}`);
    }

    await Product.deleteMany({ seller: seller._id });
    console.log("Cleared existing products for demo seller");

    const products = productDataList.map(p => ({ ...p, seller: seller._id }));
    const inserted = await Product.insertMany(products);
    console.log(`Inserted ${inserted.length} products`);

    await mongoose.disconnect();
    console.log("Done");
}

seed().catch(err => {
    console.error("Seed failed:", err);
    process.exit(1);
});
