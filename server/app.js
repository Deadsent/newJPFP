const express = require('express')
const path = require('path')
const cors = require('cors')
const volleyball = require('volleyball')
const app = express()
const Sequelize = require("sequelize");
const { STRING, DECIMAL, TEXT } = require("sequelize");
const sequelize = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/strixhavendb"
);


// static middleware
app.use(express.static(path.join(__dirname, '..','public')))
app.use(cors())
app.use(volleyball)
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

const Campuses = sequelize.define("campus", {
  name: {
    type: STRING,
    allowNull: false,
  },
  address: {
    type: STRING,
    allowNull: true,
  },
  motto: {
    type: STRING,
    allowNull: true,
  }
});

const Students = sequelize.define("student", {
  nameFirst: {
    type: STRING,
    allowNull: false,
  },
  nameLast: {
    type: STRING,
    allowNull: false,
  }
});

const syncDB = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Creating Campuses")
    await Campuses.create({
      name: "Lorehold",
      address: "Orithia, Arcavios",
      motto: "Leave no stone unturned.",
    });
    await Campuses.create({
      name: "Prismari",
      address: "Orithia, Arcavios",
      motto: "Express yourself with the elements.",
    });
    await Campuses.create({
      name: "Quandrix",
      address: "Orithia, Arcavios",
      motto: "Math is magic.",
    });
    await Campuses.create({
      name: "Witherbloom",
      address: "Orithia, Arcavios",
      motto: "Get your hands dirty.",
    });
    await Campuses.create({
      name: "Silverquill",
      address: "Orithia, Arcavios",
      motto: "Sharp style. Sharper wit.",
    });

    console.log("Finished creating Campuses")

    console.log("Creating Students")
    await Students.create({
      nameFirst: "Extus",
      nameLast: "Narr",
      email: "extus.narr@gmail.com",
      gpa: 2.5,
    });
    await Students.create({ nameFirst: "Cadoras", nameLast: "Damellawar" });
    await Students.create({ nameFirst: "Arlo", nameLast: "Wickel" });
    await Students.create({ nameFirst: "Killian", nameLast: "Lu" });
    await Students.create({ nameFirst: "Drazhomir", nameLast: "Yarnask" });
    await Students.create({ nameFirst: "Javenesh", nameLast: "Stoutclaw" });
    console.log("Finished creating Students")
  } catch (error) {
    console.log(error);
  }
};

const startUp = async () => {
  try {
    console.log("Connecting to database...");
    await syncDB();
    console.log("Database connected.");
  } catch (error) {
    console.log(error);
  }
};

startUp();

module.exports = {app, Campuses, Students};

