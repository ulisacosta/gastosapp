const dbConnect = require("../../config/mysql");
const { finishDB } = require("../../util/finishDB");

module.exports.add_transaction = (req, res) => {
  const db = dbConnect();

  const { id_wallet, amount, description } = req.body;

  const { id_transaction_type } = req.params;
  const date = new Date(Date.now());

  /* VALIDACIONES */
  /* VALIDACIÓN PARA QUE NO HAYA CAMPOS VACÍOS */
  if (!id_wallet || !amount || !description) {
    return res.status(400).json({ errorFields: "Se debe completar los campos" });
  }
  /* VALIDACIÓN PARA QUE NO SE INGRESEN NÚMEROS NEGATIVOS */
  if (!amount || isNaN(amount) || Number(amount) < 0) {
    return res.status(400).json({ errorFields: "El monto debe ser un número positivo." });
  }
/* VALIDACIÓN PARA QUE NO HAYA DESCRIPCIÓN CON CARACTERES NO VALIDOS */
const validDescription = /^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ0-9 ,.]*$/;
if (!description || !validDescription.test(description)) {
  return res.status(400).json({ errorFields: "La descripción contiene caracteres no válidos." });
}

  const sqlTransaction =
    "INSERT INTO transaction VALUES (NULL,?,?,CASE WHEN ? = 2 THEN -? ELSE ? END,?,?)";
  const verifyTransaction =
    "SELECT transaction_type.id_transaction FROM transaction_type";
  db.query(verifyTransaction, (errVerify, resultVerify) => {
    if (errVerify) {
      console.error(errVerify);
      finishDB(db);
      return res
        .status(500)
        .json({
          error: "Error interno del servidor no se pudo realizar la consulta",
        });
    } else if (resultVerify) {
      const contain = resultVerify.some(
        (obj) => obj.id_transaction === parseFloat(id_transaction_type)
      );

      if (contain) {
        db.query(
          sqlTransaction,
          [
            id_wallet,
            id_transaction_type,
            id_transaction_type,
            amount,
            amount,
            description,
            date,
          ],
          (errTransaction, resultTransaction) => {
            if (errTransaction) {
              console.error(errTransaction);
              finishDB(db);
              return res
                .status(500)
                .json({
                  error:
                    "Error interno del servidor no se pudo insertar transacción",
                });
            } else {
              finishDB(db);
              return res.status(201).json({ message: "Creado con éxito" });
            }
          }
        );
      } else {
        console.log("No existe transacción");
        return res
          .status(404)
          .json({ notFound: "No se encontró transacción para realizar" });
      }
    }
  });
};
