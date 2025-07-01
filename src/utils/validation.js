const validator = require("validator");
const bcrypt = require("bcrypt");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("name details is mandotary");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong");
  }
};

const validateProfileFields = (req) => {
  const { firstName, lastName, age, gender, photoUrl, about, skills } =
    req.body;
  const allowedEditableFields = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "photoUrl",
    "about",
    "skills",
  ];

  // Check for valid fields
  const isValidField = Object.keys(req.body).every((key) =>
    allowedEditableFields.includes(key)
  );

  if (!isValidField) {
    throw new Error("Invalid field(s) in profile update request.");
  }

  // Additional checks:

  // First name validation (min 2, max 30 characters)
  if (
    firstName &&
    (typeof firstName !== "string" ||
      firstName.trim().length < 2 ||
      firstName.trim().length > 30)
  ) {
    throw new Error("First name must be between 2 and 30 characters.");
  }

  // Last name validation (min 2, max 30 characters)
  if (
    lastName &&
    (typeof lastName !== "string" ||
      lastName.trim().length < 2 ||
      lastName.trim().length > 30)
  ) {
    throw new Error("Last name must be between 2 and 30 characters.");
  }

  // Age validation (between 1 and 100)
  if (age && (typeof age !== "number" || age < 1 || age > 100)) {
    throw new Error("Age must be between 1 and 100.");
  }

  // Gender validation (only if provided)
  if (gender && !["male", "female", "other"].includes(gender.toLowerCase())) {
    throw new Error(
      "Gender must be one of the following: male, female, other."
    );
  }

  // Skills validation (max 10 skills)
  if (skills && (!Array.isArray(skills) || skills.length > 10)) {
    throw new Error("Skills must be an array with a maximum of 10 items.");
  }

  // About validation (max 200 characters)
  if (about && (typeof about !== "string" || about.length > 200)) {
    throw new Error(
      "About section must be a string with a maximum length of 200 characters."
    );
  }
};


module.exports = {
  validateSignUpData,
  validateProfileFields,
};
