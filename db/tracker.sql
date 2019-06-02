DROP TABLE IF EXISTS proteges;

CREATE TYPE gender AS ENUM ('Male', 'Female', 'Other');

CREATE TABLE proteges(
	idp SERIAL PRIMARY KEY,
	firstName VARCHAR(20) NOT NULL,
    secondName VARCHAR(30) NOT NULL,
    birthdate DATE NOT NULL,
    phone VARCHAR(9) NOT NULL,
    email VARCHAR(50) NOT NULL,
    gender gender NOT NULL,
	height FLOAT(8) NOT NULL,
	targetWeight FLOAT(8) NOT NULL,
    kcalDemand FLOAT(8) NOT NULL
);

DROP TABLE IF EXISTS measures;

CREATE TABLE measures (
	p_id INTEGER NOT NULL,
	currentWeight FLOAT(8) DEFAULT NULL,
	waist FLOAT(8) DEFAULT NULL,
	neck FLOAT(8) DEFAULT NULL,
	bodyFat FLOAT(8) DEFAULT NULL,
	measureDate DATE,
	FOREIGN KEY (p_id) REFERENCES proteges(idp) ON UPDATE CASCADE
);

DROP TABLE IF EXISTS daily;

CREATE TABLE daily (
	idd SERIAL PRIMARY KEY,
	p_id INTEGER NOT NULL,
	dailyDate DATE NOT NULL,
	dailyKcal INTEGER DEFAULT NULL,
	burnedKcal INTEGER DEFAULT NULL,
	FOREIGN KEY(p_id) REFERENCES proteges(idp)
);

DROP TABLE IF EXISTS meals;

CREATE TABLE meals (
    idm SERIAL PRIMARY KEY,
    d_id INTEGER NOT NULL,
    mealName VARCHAR(30) NOT NULL,
    kcalPerDg INTEGER NOT NULL,
    gramature INTEGER NOT NULL,
    FOREIGN KEY (d_id) REFERENCES daily(idd)
);

DROP TABLE IF EXISTS exercises;

CREATE TABLE exercises (
    d_did INTEGER NOT NULL,
    exerciseName VARCHAR(30) NOT NULL,
    startAt TIME NOT NULL,
    endAt TIME NOT NULL,
    kcalPerHour INTEGER NOT NULL,
    FOREIGN KEY (d_did) REFERENCES daily(idd)
);