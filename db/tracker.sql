DROP TABLE IF EXISTS proteges;

CREATE TYPE gender AS ENUM ('Male', 'Female', 'Other')

CREATE TABLE proteges(
	idp SERIAL PRIMARY KEY,
	firstName VARCHAR(20) NOT NULL,
    secondName VARCHAR(30) NOT NULL,
    phone VARCHAR(9) NOT NULL,
    email VARCHAR(50) NOT NULL,
    gender gender NOT NULL,
	height FLOAT(8) NOT NULL,
	targetWeight FLOAT(8) NOT NULL,
    kcalDemand FLOAT(8) NOT NULL
);

--- kcalDemand (age, height, weight) ---
INSERT INTO proteges (firstName, secondName, phone, email, gender, height, targetWeight, kcaldemand) VALUES (
    'Jan', 'Kowal', '1994-04-14', '687234123', 'jkowal@mail.com', 'Male', 185.2, 82, 2177
), (
    'Michal', 'Polak', '1984-03-14', '726834569', 'mpol@mail.com', 'Male', 177.5, 77, 1813
), (
    'Anna', 'Schmidt', '1997-08-04', '682346512', 'anna@gmail.com', 'Female', 165.0,  54, 1521
), (
    'Janina', 'Nowak', '2000-01-11', '685123451', 'jnowak@mail.com', 'Female', 170.0, 60, 1422
), (
    'Anastazja', 'Maj', '1989-12-29', '646123572', 'amaj@mail.com', 'Female', 175.1, 67, 1481
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

INSERT INTO measures (p_id, currentWeight, waist, neck, bodyFat, measureDate) VALUES (
    1, 121.3, 121, 45, 33.4, '2019-04-23'
), (
    1, 118.1, 118, 44.2, 32.4, '2019-04-24'
), (
    1, 114.2, 113, 44.1, 31.4, '2019-04-25'
), (
    2, 87.5, 105, 45, 28.3, '2019-04-23'
), (
    2, 89.1, 104, 45.5, 28.1, '2019-04-24'
), (
    2, 86.5, 103, 46.1, 28.0, '2019-04-25'
), (
    3, 78, 90, 38, 20.2, '2019-04-23'
), (
    3, 77.2, 89.2, 38.1, 20.1, '2019-04-24'
), (
    3, 75.9, 88.9, 38.1, 20.0, '2019-04-25'
), (
    4, 67.2, 82.1, 37.2, 20.2, '2019-04-23'
), (
    4, 66.6, 82.0, 37.1, 20.1, '2019-04-24'
), (
    4, 67.1, 81.1, 37.2, 19.8, '2019-04-25'
), (
    5, 82.1, 95.3, 41.2, 24.2, '2019-04-23'
), (
    5, 81.1, 94.1, 41.5, 24.1, '2019-04-24'
), (
    5, 80.5, 93.5, 41.1, 23.8, '2019-04-25'
);

DROP TABLE IF EXISTS daily;

CREATE TABLE daily (
	idd SERIAL PRIMARY KEY,
	p_id INTEGER NOT NULL,
	dailyDate DATE,
	dailyKcal INTEGER DEFAULT NULL,
	burnedKcal INTEGER DEFAULT NULL,
	FOREIGN KEY(p_id) REFERENCES proteges(idp)
);

INSERT INTO daily (p_id, dailydate, dailykcal, burnedkcal) VALUES 
	(1, '2019-04-23', 2485, 491), (1, '2019-04-24', 2497, NULL), (1, '2019-04-25', 2460, 123), 
	(2, '2019-04-23', 2345, 291), (2, '2019-04-24', 2254, NULL), (2, '2019-04-25', 2360, 28), 
	(3, '2019-04-23', 1532, NULL), (3, '2019-04-24', 1444, NULL), (3, '2019-04-25', 1465, NULL), 
	(4, '2019-04-23', 1622, 121), (4, '2019-04-24', 1754, NULL), (4, '2019-04-25', 1672, NULL), 
	(5, '2019-04-23', 1742, NULL), (5, 	'2019-04-24', 1614, NULL), (5, '2019-04-25', 1722, 432);

DROP TABLE IF EXISTS meals;

CREATE TABLE meals (
    idm SERIAL PRIMARY KEY,
    d_id INTEGER NOT NULL,
    mealName VARCHAR(30) NOT NULL,
    kcalPerDg INTEGER NOT NULL,
    gramature INTEGER NOT NULL,
    FOREIGN KEY (d_id) REFERENCES daily(idd)
);

INSERT INTO meals (d_id, mealName, kcalPerDg, gramature) VALUES (
    1, 'Bigos', 64, 300
), (
    1, 'Pierogi', 185, 400
), (
    2, 'Kaszanka', 207, 200
), (
    2, 'Schab', 143, 300
), (
    2, 'Kabanos', 268, 75
), (
    3, 'Kanapka', 360, 100
), (
    4, 'Karpatka', 459, 60
), (
    5, 'Makowiec', 349, 100
);

DROP TABLE IF EXISTS exercises;

CREATE TABLE exercises (
    d_id INTEGER NOT NULL,
    exerciseName VARCHAR(30) NOT NULL,
    startAt TIME NOT NULL,
    endAt TIME NOT NULL,
    kcalPerHour INTEGER NOT NULL,
    FOREIGN KEY (d_id) REFERENCES daily(idd)
);

INSERT INTO exercises (d_id, exerciseName, startAt, endAt, kcalPerHour) VALUES 
	(1, 'Bieg 10km/h', '14:20', '14:46', 1050),
	(3, 'Badminton', '7:20', '7:35', 490),
	(4, 'Pilka nozna', '14:00', '14:20', 1500),
	(6, 'Wchodzenie po schodach', '15:01', '15:03', 700),
	(10, 'Plywanie', '8:00', '8:10', 1210),
	(15, 'Bieg 10km/h', '7:00', '7:28', 1050);
