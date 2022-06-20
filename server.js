require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 8000;
const stripe = require("stripe")(process.env.STRIPE_KEY);
// const YOUR_DOMAIN = "http://localhost:8000"; //local testing
const YOUR_DOMAIN = "https://store-rtp314.herokuapp.com";

const testItems = [
    {
        id: "price_1LBaFPIZqjivVMp2nigbXKKK",
        name: "Thunderbird 1",
        priceInCents: 15000,
        imgColor: "blue",
        description: "Is it a rocket or is it a plane? Yes.",
        imgSrc: "/images/tb1.webp",
    },
    {
        id: "price_1LBaGNIZqjivVMp2XiU4uOcW",
        name: "Thunderbird 2",
        priceInCents: 27500,
        imgColor: "green",
        description: "Totally the best Thunderbird. Iconic.",
        imgSrc: "/images/tb2.webp",
    },
    {
        id: "price_1LBaH1IZqjivVMp2NW2YGXyF",
        name: "Thunderbird 3",
        priceInCents: 16000,
        imgColor: "red",
        description: "Criminally underutilized. Not that much happened in space.",
        imgSrc: "/images/tb3.webp",
    },
    {
        id: "price_1LBaHcIZqjivVMp2EZ86x0uT",
        name: "Thunderbird 4",
        priceInCents: 9900,
        imgColor: "yellow",
        description: "Did you know its grippers were sensitive enough to pick up an egg without breaking it?",
        imgSrc: "/images/tb4.webp",
    },
    {
        id: "price_1LBaI6IZqjivVMp2KtV02UdC",
        name: "Thunderbird 5",
        priceInCents: 25000,
        imgColor: "grey",
        description: "Important, but not that interesting to be honest",
        imgSrc: "/images/tb5.webp",
    },
    {
        id: "price_1LBaIiIZqjivVMp2OXC0dKkh",
        name: "Mole",
        priceInCents: 13000,
        imgColor: "brown",
        description: `Yes, it's technically not a Thunderbird, but it was pretty important`,
        imgSrc: "/images/mole.webp",
    },
];

app.use(express.static(path.join(__dirname, "public"))); //serves files in public folder
app.use(cors());
app.use(express.json()); //creates req.body

app.get("/items", (req, res) => {
    setTimeout(() => {
        res.status(200).json(testItems);
    }, 1000);
});

app.post("/create-stripe-session", async (req, res) => {
    console.log(req.body);
    try {
        const session = await stripe.checkout.sessions.create({
            line_items: req.body.map((item) => {
                return {
                    price: item.id,
                    quantity: item.quantity,
                };
            }),
            mode: "payment",
            success_url: `${YOUR_DOMAIN}/success`,
            cancel_url: `${YOUR_DOMAIN}/cancel`,
        });
        res.status(200).json(session.url);
    } catch (err) {
        console.log(err);
    }
});

app.post("/stripe-webhook", (req, res) => {
    //endpoint opened for webhook
    console.log(req.body);
    res.statusCode(400);
});

// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "public", "index.html"));
// });

app.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log("server listening on port " + PORT);
});
