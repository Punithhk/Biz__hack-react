const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

app.get("/proposal-data", (req, res) => {
  const filePath = path.join(__dirname, "spinach.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      return res.status(500).send("Internal Server Error");
    }

    res.json(JSON.parse(data));
  });
});

app.post("/approve-proposal", (req, res) => {
  const { product, quantity, discount, manufactureDate, expiryDate } = req.body;

  const data = [
    {
      "Product name": product,
      Quantity: quantity,
      "Manufacture date": manufactureDate,
      "Expiry Date": expiryDate,
      Discount: discount.replace("%", ""),
    },
  ];

  fs.writeFile(
    `${product}_approval.json`,
    JSON.stringify(data, null, 2),
    (err) => {
      if (err) {
        console.error("Error writing JSON file:", err);
        return res.status(500).send("Internal Server Error");
      }

      res.send("Proposal approved and JSON file saved");
    }
  );
});

app.post("/disapprove-proposal", (req, res) => {
  res.send("Proposal disapproved");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
