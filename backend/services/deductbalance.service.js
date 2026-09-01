import db from "../db/connection.js";
const deductBalanceService = async (userId, amount) => {
  await db.execute(
    "UPDATE employers SET balance = balance - ? AND escrowbalance = escrowbalance + ? WHERE id = ?",
    [amount, amount, userId],
  );
  return true;
};

export default deductBalanceService;
