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

CREATE OR REPLACE FUNCTION public.sum_exercises() RETURNS TRIGGER AS 
$update_daily_exercises$
DECLARE
    total INTEGER;
    r daily%rowtype;
BEGIN
    ---SELECT sum(kcalPerHour) FROM exercises JOIN daily ON idd = d_did WHERE d_did = x INTO total;---
    FOR r IN 
        SELECT * FROM daily ORDER BY idd DESC
    LOOP
    SELECT sum(kcalPerHour) FROM exercises JOIN daily ON idd = d_did WHERE d_did = r.idd INTO total;
    UPDATE daily SET burnedKcal = total WHERE idd = r.idd;
    END LOOP;
    RETURN NEW;
END;
$update_daily_exercises$ 
LANGUAGE PLPGSQL;

DROP TRIGGER update_daily_exercises ON exercises;

CREATE TRIGGER update_daily_exercises 
    AFTER INSERT ON exercises
    FOR EACH ROW 
    EXECUTE PROCEDURE public.sum_exercises(1);
--- EXECUTE PROCEDURE public.sum_exercises(daily.idd); ---

CREATE OR REPLACE FUNCTION public.sum_meals() RETURNS TRIGGER AS $update_daily_meals$
DECLARE
    r daily%rowtype;
    total INTEGER;
BEGIN
    FOR r IN 
        SELECT * FROM daily ORDER BY idd DESC
    LOOP
    SELECT sum(kcalperdg) FROM meals JOIN daily ON idd = d_id WHERE d_id = r.idd INTO total;
    UPDATE daily SET dailyKcal = total WHERE idd = r.idd;
    END LOOP;
    RETURN NEW;
END;
$update_daily_meals$ LANGUAGE PLPGSQL;

DROP TRIGGER update_daily_meals ON meals;

CREATE TRIGGER update_daily_meals
    AFTER INSERT ON meals
    FOR EACH ROW
    EXECUTE PROCEDURE sum_meals();
