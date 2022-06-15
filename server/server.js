const app = require("express")();
const PORT = 3000;

app.use(express.static("public")); //serves files in public folder
app.use(express.json()); //creates req.body

app.get("/create_stripe_session", (req, res) => {
    console.log(req.body);
});

app.post("/stripe-webhook", (req, res) => {
    //endpoint opened for webhook
    console.log(req.body);
    res.statusCode(400);
});

app.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log("server listening on port " + PORT);
});
