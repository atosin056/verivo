import db from "../db/connection.js";

//Function to sanitize and destructurize the array data for userTools
const insertTools = async (userId, tools) => {
  if (tools.length !== 0) {
    //Map the userId to each tool and get the newly formatted array
    const values = tools.map((tool) => [userId, tool]);

    await db.execute("INSERT INTO userTools (userId, tool) VALUES ?", [values]);
  }
  return;
};

//Function to insert the references of each user
const insertReferences = async (userId, references) => {
  // drop entries where the person left the whole thing blank
  const validReferences = references.filter(
    (ref) => ref.name.trim() !== "" || ref.phone.trim() !== "",
  );

  if (validReferences.length === 0) return;

  const values = validReferences.map((ref) => [
    userId,
    ref.name.trim(),
    ref.phone.trim() || null,
    ref.howTheyKnowYou.trim() || null,
  ]);

  await db.execute(
    "INSERT INTO userReferences (userId, name, phone, howTheyKnowYou) VALUES ?",
    [values],
  );
};

const insertWorkplaces = async (userId, workplaces) => {
  // drop entries where the person left the whole thing blank
  const validData = workplaces.filter(
    (workplace) =>
      workplace.place.trim() !== "" ||
      workplace.role.trim() !== "" ||
      workplace.yearFrom.trim() !== "" ||
      workplace.yearTo.trim() !== "",
  );

  if (validData.length === 0) {
    return;
  }

  //Map the userId to each value
  const values = validData.map((workplace) => [
    userId,
    workplace.place || null,
    workplace.role || null,
    workplace.yearFrom || null,
    workplace.yearTo || null,
  ]);

  await db.execute(
    "INSERT INTO workplaces (userId, place, role, yearFrom, yearTo) VALUES ?",
    [values],
  );
};

const insertSubSpecialties = async (userId, subSpecialties) => {
  //sanitize data
  const sanitizedData = subSpecialties.filter(
    (subSpecialty) => subSpecialty.trim() !== "",
  );

  if (sanitizedData.length === 0) {
    return;
  }
  //Map userId to each value
  const values = sanitizedData.map((subSpecialty) => [userId, subSpecialty]);

  //Insert Batch
  await db.execute(
    "INSERT INTO usersSubSpecialties (userId, subSpecialty) VALUES ?",
    [values],
  );
};

const createUserService = async ({
  fullName,
  phone,
  role,
  nickname,
  city,
  marketArea,
  yearSetUp,
  trade,
  learningPath,
  mastersName,
  yearLearned,
  language,
  pitch,
  proudJobStory,
  difficultCustomerStory,
  subSpecialties, // array → user_sub_specialties
  workplaces, // array → user_workplaces
  tools, // array → user_tools
  references, // array → user_references
}) => {
  const [result] = await db.execute(
    "INSERT INTO users (name, role, phone, trade, nickname, city, marketarea, yearsetup, mastersname, yearlearned, language, pitch, proudjobstory, diffictultcustomerstory) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      fullName,
      role,
      phone,
      trade,
      nickname,
      city,
      marketArea,
      yearSetUp,
      mastersName,
      yearLearned,
      language,
      pitch,
      proudJobStory,
      difficultCustomerStory,
    ],
  );
  const userId = result.insertId;
  await db.execute(
    Promise.all(
      insertTools(userId, tools),
      insertReferences(userId, references),
      insertWorkplaces(userId, workplaces),
      insertSubSpecialties(userId, subSpecialties),
    ),
  );

  return userId;
};

export default createUserService;
