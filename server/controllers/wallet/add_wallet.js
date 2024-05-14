const dbConnect = require("../../config/mysql");
const { finishDB } = require("../../util/finishDB");

module.exports.add_wallet = (req, res) => {
  const db = dbConnect();
  const { wallet_name } = req.body;
  const date = new Date(Date.now());
  const sqlAddWallet = "INSERT INTO wallet VALUES (NULL,?,?)";
  if (!wallet_name) {
    return res.status(400).json({ errorNewWallet: "Se debe completar los campos" });
  }
  const validDescription = /^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ0-9 ,.]*$/;
  if (!wallet_name || !validDescription.test(wallet_name)) {
    return res.status(400).json({ errorNewWallet: "La billetera contiene caracteres no válidos." });
  }

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
