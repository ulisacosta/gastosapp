const dbConnect = require("../../config/mysql");
const { finishDB } = require("../../util/finishDB");

module.exports.add_wallet = (req, res) => {
  const db = dbConnect();
  const { wallet_name } = req.body;
  const date = new Date(Date.now());
  const sqlAddWallet = "INSERT INTO wallet VALUES (NULL,?,?)";

  db.query(sqlAddWallet, [wallet_name, date], (errAddWallet, result) => {
    if (errAddWallet) {
      console.log(errAddWallet);
      finishDB(db);
      return res.status(500).json({
        error: "Error interno del servidor no se pudo crear la billetera",
      });
    } else {
      finishDB(db);
      return res.status(201).json({ message: "Creado con éxito" });
    }
  });
};
