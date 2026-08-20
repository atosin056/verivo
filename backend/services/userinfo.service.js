import db from "../db/connection.js";

const fetchTools = async (userId) => {
  const [tools] = await db.query("SELECT * FROM userTools WHERE userId = ?", [
    userId,
  ]);
  return tools;
};

const fetchReferences = async (userId) => {
  const [references] = await db.query(
    "SELECT * FROM userReferences WHERE userId = ?",
    [userId],
  );
  return references;
};

const fetchWorkplace = async (userId) => {
  const [workplaces] = await db.query(
    "SELECT * FROM workplaces WHERE userId = ?",
    [userId],
  );
  return workplaces;
};

const fetchSubspecialties = async (userId) => {
  const [subSpecialties] = await db.query(
    "SELECT * FROM usersSubSpecialties WHERE userId = ?",
    [userId],
  );
  return subSpecialties;
};

const fetchUser = async (userId) => {
  const [userdata] = await db.query("SELECT * FROM users WHERE id = ?", [
    userId,
  ]);
  return userdata[0];
};

export const fetchUserInfo = async (userId) => {
  try {
    const [user, tools, workplaces, subSpecialties, references] =
      await Promise.all([
        fetchUser(userId),
        fetchTools(userId),
        fetchWorkplace(userId),
        fetchSubspecialties(userId),
        fetchReferences(userId),
      ]);
    return { user, tools, workplaces, subSpecialties, references };
  } catch (err) {
    console.error(err);
    throw err;
  }
};
