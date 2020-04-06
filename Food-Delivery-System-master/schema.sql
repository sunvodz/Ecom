DROP TABLE IF EXISTS UserAccount CASCADE;
DROP TABLE IF EXISTS FDSManager CASCADE;
DROP TABLE IF EXISTS Customers CASCADE;
DROP TABLE IF EXISTS CreditCardList CASCADE;
DROP TABLE IF EXISTS Restaurants CASCADE;
DROP TABLE IF EXISTS Staffs CASCADE;
DROP TABLE IF EXISTS FoodItem CASCADE;
DROP TABLE IF EXISTS FoodCategories CASCADE;
DROP TABLE IF EXISTS DeliveryRiders CASCADE;
DROP TABLE IF EXISTS PartTime CASCADE;
DROP TABLE IF EXISTS FullTime CASCADE;
DROP TABLE IF EXISTS PartTimeWeekSchedule CASCADE;
DROP TABLE IF EXISTS MonthSchedule CASCADE;
DROP TABLE IF EXISTS FullTimeWeekSchedule CASCADE;
DROP TABLE IF EXISTS Workdays CASCADE;
DROP TABLE IF EXISTS Shifts CASCADE;
DROP TABLE IF EXISTS Orders CASCADE;
DROP TABLE IF EXISTS OrderedItem CASCADE;
DROP TABLE IF EXISTS Payment CASCADE;
DROP TABLE IF EXISTS Promotion CASCADE;
DROP TABLE IF EXISTS SpecialPromotion CASCADE;
DROP TABLE IF EXISTS DeliveryPromotion CASCADE;
DROP TABLE IF EXISTS PricePromotion CASCADE;
DROP TABLE IF EXISTS Locations CASCADE;
DROP TABLE IF EXISTS Assignment CASCADE;
DROP TABLE IF EXISTS Feedback CASCADE;
DROP SEQUENCE IF EXISTS ManagerSeq, CidSeq, SidSeq, DidSeq, PartTimeWeekSeq, FullTimeWeekSeq, MonthSeq, IOidSeq, LidSeq, OidSeq, FidSeq, PromoSeq, feedbackSeq;

--accessRight 1:FDS Manageer, 2: Restaurant Staff, 3: Delivery Riders, 4: Customers

CREATE SEQUENCE UserAccountSeq;
CREATE TABLE UserAccount (
	uid INTEGER DEFAULT nextval('UserAccountSeq'),
	userName 	VARCHAR(100) NOT NULL,
	password 	VARCHAR(100) NOT NULL,
	accessRight INTEGER NOT NULL,
	PRIMARY KEY (uid),
	UNIQUE (userName)
);
ALTER SEQUENCE UserAccountSeq OWNED BY userAccount.uid;

CREATE SEQUENCE ManagerSeq;
CREATE TABLE FDSManager (
	mid 	INTEGER DEFAULT nextval('ManagerSeq'),
	uid 	INTEGER,
	mname 	VARCHAR(100) NOT NULL,
	PRIMARY KEY (mid),
	FOREIGN KEY (uid) REFERENCES UserAccount (uid) ON DELETE CASCADE 
);
ALTER SEQUENCE ManagerSeq OWNED BY FDSManager.mid;

CREATE SEQUENCE CidSeq;
CREATE TABLE Customers (
	cid 			INTEGER DEFAULT nextval('CidSeq'),
	uid 			INTEGER,
	name 			VARCHAR(50) NOT NULL,
	numOrders 		INTEGER,
	rewardPoints 	INTEGER,
	currentAddress 	VARCHAR(100) NOT NULL,
	lastOrderTime 	TIMESTAMP,
	createdDate 	DATE NOT NULL,
	PRIMARY KEY (cid),
	FOREIGN KEY (uid) REFERENCES UserAccount (uid) ON DELETE CASCADE 
);
ALTER SEQUENCE CidSeq OWNED BY Customers.cid;

CREATE TABLE CreditCardList (
	ccid 				INTEGER,
	creditCardNumber 	bigint,
	PRIMARY KEY (creditCardNumber),
	FOREIGN KEY (ccid) REFERENCES Customers (cid) ON DELETE CASCADE
);

CREATE SEQUENCE RidSeq;
CREATE TABLE Restaurants (
	rid 		INTEGER DEFAULT nextval('RidSeq'),
	name 		VARCHAR(50) NOT NULL,
	minAmount 	DECIMAL NOT NULL,
	address 	VARCHAR(100) NOT NULL,
	PRIMARY KEY (rid)
);
ALTER SEQUENCE RidSeq OWNED BY Restaurants.rid;

CREATE SEQUENCE SidSeq;
CREATE TABLE Staffs (
	sid 			INTEGER DEFAULT nextval('SidSeq'),
	uid 			INTEGER,
	rid 			INTEGER NOT NULL,
	name 			VARCHAR(50) NOT NULL,
	hireDate 		DATE NOT NULL,
	terminationDate DATE,
	PRIMARY KEY (Sid),
	FOREIGN KEY (rid) REFERENCES Restaurants (rid) ON DELETE CASCADE,
	FOREIGN KEY (uid) REFERENCES UserAccount (uid) ON DELETE CASCADE 
);
ALTER SEQUENCE SidSeq OWNED BY Staffs.Sid;

CREATE SEQUENCE FidSeq;
CREATE TABLE FoodItem (
	Fid 				INTEGER DEFAULT nextval('FidSeq'),
	rid					INTEGER NOT NULL,
	name 				VARCHAR(50) NOT NULL,
	originalPrice 		DECIMAL NOT NULL,
	categories 			VARCHAR(10) NOT NULL,
	dailyLimit 			INTEGER NOT NULL,
	availabilityStatus 	INTEGER, -- to reset to dailyLimit daily
	PRIMARY KEY (Fid),
	FOREIGN KEY (rid) REFERENCES Restaurants (rid) ON DELETE CASCADE
);
ALTER SEQUENCE FidSeq OWNED BY FoodItem.Fid;

CREATE TABLE FoodCategories (
	fcid 	INTEGER,
	name 	VARCHAR(100),
	UNIQUE (name),
	FOREIGN KEY (fcid) REFERENCES FoodItem (Fid)
);

CREATE SEQUENCE DidSeq;
CREATE TABLE DeliveryRiders (
	Did					INTEGER DEFAULT nextval('DidSeq'),
	uid					INTEGER,
	name 				VARCHAR(50) NOT NULL,
	startDate 			DATE NOT NULL,
	terminationDate 	DATE,
	PRIMARY KEY (Did),
	FOREIGN KEY (uid) REFERENCES UserAccount (uid) ON DELETE CASCADE 
);
ALTER SEQUENCE DidSeq OWNED BY DeliveryRiders.Did;

CREATE TABLE PartTime (
	-- Part time delivery driver
    Did 				INTEGER,
    weekSalary 			INTEGER,
    weekScheduleId 		INTEGER,
    PRIMARY KEY (Did),
    FOREIGN KEY (Did) REFERENCES DeliveryRiders
);

CREATE TABLE FullTime (
	-- Full time delivery driver
	Did 				INTEGER,
	monthSalary			INTEGER,
	monthScheduleId		INTEGER,
	PRIMARY KEY (Did),
    FOREIGN KEY (Did) REFERENCES DeliveryRiders
);

CREATE SEQUENCE PartTimeWeekSeq;
CREATE TABLE PartTimeWeekSchedule (
	Wid 				INTEGER,
	day 				TEXT,
	startTime 			INTEGER,
	endTime 			INTEGER,
	PRIMARY KEY (Wid)
);
ALTER SEQUENCE PartTimeWeekSeq OWNED BY PartTimeWeekSchedule.Wid;

CREATE OR REPLACE FUNCTION valid_duration() RETURNS TRIGGER AS $valid_duration$
	DECLARE
		duration 	INTEGER;
	BEGIN
		duration := NEW.endTime - NEW.startTime;
		IF duration <= 0 OR duration > 4 THEN
			RAISE EXCEPTION 'Invalid work duration!';
		END IF;
		RETURN NULL;
	END;
$valid_duration$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS valid_duration ON PartTimeWeekSchedule;
CREATE TRIGGER valid_duration 
BEFORE INSERT OR UPDATE ON PartTimeWeekSchedule
FOR EACH ROW
EXECUTE PROCEDURE valid_duration();

CREATE OR REPLACE FUNCTION has_break() RETURNS TRIGGER AS $has_break$
	DECLARE
		overlap		INTEGER;
	BEGIN
		SELECT P.Wid INTO overlap
		FROM PartTimeWeekSchedule as P
		WHERE NEW.startTime - 1 >= all (
				SELECT P.endTime
				FROM P
				WHERE P.day = NEW.day
				AND P.startTime < NEW.startTime
				);
		IF overlap IS NOT NULL THEN
			RAISE EXCEPTION 'There is insufficient break from previous work';
		END IF;
		RETURN NULL;
	END;
$has_break$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS has_break ON PartTimeWeekSchedule;
CREATE TRIGGER has_break
AFTER INSERT OR UPDATE ON PartTimeWeekSchedule
FOR EACH ROW
EXECUTE PROCEDURE has_break();

CREATE OR REPLACE FUNCTION valid_weekly_hours() RETURNS TRIGGER AS $valid_weekly_hours$
	DECLARE 
		allStart	INTEGER;
		allEnd		INTEGER;
		total		INTEGER;
	BEGIN
		SELECT sum(P.startTime) INTO allStart
		FROM PartTimeWeekSchedule AS P
		WHERE P.Wid = NEW.Wid;

		SELECT sum(P2.endTime) INTO allEnd
		FROM PartTimeWeekSchedule AS P2
		WHERE P2.Wid = NEW.Wid;
		
		total := allEnd - allStart;
		IF total < 10 OR total > 48 THEN
			RAISE EXCEPTION 'Total work hours exceed valid weekly range.';
		END IF;
	END;
$valid_weekly_hours$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS valid_weekly_hours ON PartTimeWeekSchedule;
CREATE CONSTRAINT TRIGGER valid_weekly_hours
AFTER INSERT OR UPDATE ON PartTimeWeekSchedule
DEFERRABLE INITIALLY DEFERRED
FOR EACH ROW
EXECUTE PROCEDURE valid_weekly_hours();

CREATE TABLE Workdays (
	-- Static table
	Days 				INTEGER,
	description			TEXT,
	PRIMARY KEY (Days)
);

CREATE TABLE Shifts (
	-- Static table
	Shift 				INTEGER,
	description 		TEXT,
	PRIMARY KEY (Shift)
);

CREATE SEQUENCE FullTimeWeekSeq;
CREATE TABLE FullTimeWeekSchedule (
	Wid 				INTEGER,
	Days 				INTEGER,
	Shift 				INTEGER,
	PRIMARY KEY (Wid), 
	FOREIGN KEY (Days) REFERENCES Workdays,
	FOREIGN KEY (Shift) REFERENCES Shifts
);
ALTER SEQUENCE FullTimeWeekSeq OWNED BY FullTimeWeekSchedule.Wid;

CREATE SEQUENCE MonthSeq;
CREATE TABLE MonthSchedule (
	Mid 				INTEGER,
	Wid 				INTEGER,
	PRIMARY KEY (Mid),
	FOREIGN KEY (Wid) REFERENCES FullTimeWeekSchedule
);
ALTER SEQUENCE MonthSeq OWNED BY MonthSchedule.Mid;

CREATE SEQUENCE OidSeq;
CREATE TABLE Orders (
	Oid					INTEGER DEFAULT nextval('OidSeq'),
	Did					INTEGER NOT NULL,
	Cid					INTEGER NOT NULL,
	cost 				DECIMAL NOT NULL,
	location 			VARCHAR(100) NOT NULL,
	orderTime 			TIMESTAMP NOT NULL,
	deliveryCost 		DECIMAL NOT NULL,
	PRIMARY KEY (Oid),
	FOREIGN KEY (Did) REFERENCES DeliveryRiders (Did),
	FOREIGN KEY (Cid) REFERENCES Customers (Cid) ON DELETE CASCADE
);
ALTER SEQUENCE OidSeq OWNED BY Orders.Oid;

CREATE SEQUENCE IOidSeq;
CREATE TABLE OrderedItem (
	IOid 			INTEGER DEFAULT nextval('IOidSeq'),
	Oid				INTEGER,
	Fid				INTEGER,
	quantity 		INTEGER NOT NULL,
	PRIMARY KEY (IOid),
	FOREIGN KEY (Oid) REFERENCES Orders (Oid) ON DELETE CASCADE,
	FOREIGN KEY (Fid) REFERENCES FoodItem (Fid)
);
ALTER SEQUENCE IOidSeq OWNED BY OrderedItem.IOid;

CREATE TABLE Payment (
	Oid		INTEGER PRIMARY KEY REFERENCES Orders ON DELETE CASCADE,
	Cid		INTEGER NOT NULL,
	cash 	BOOLEAN NOT NULL,
	FOREIGN KEY (Cid) REFERENCES Customers (Cid)
);

CREATE SEQUENCE PromoSeq;
CREATE TABLE Promotion (
	promo_id 		INTEGER,
	startTime 		TIMESTAMP NOT NULL,
	endTime 		TIMESTAMP NOT NULL,
	discount 		INTEGER NOT NULL,
	PRIMARY KEY (promo_id)
);
ALTER SEQUENCE PromoSeq OWNED BY Promotion.promo_id;

CREATE TABLE SpecialPromotion (
	promo_id 	INTEGER,
	cid			INTEGER NOT NULL,
	PRIMARY KEY (promo_id),
	FOREIGN KEY (promo_id) REFERENCES Promotion (promo_id),
	FOREIGN KEY (cid) REFERENCES Customers (Cid)
);

CREATE TABLE DeliveryPromotion (
	promo_id 	INTEGER,
	numOrders 	INTEGER NOT NULL,
	PRIMARY KEY (promo_id),
	FOREIGN KEY (promo_id) REFERENCES Promotion (promo_id)
);

CREATE TABLE PricePromotion (
	promo_id 	INTEGER,
	rid 		INTEGER NOT NULL,
	PRIMARY KEY (promo_id),
	FOREIGN KEY (promo_id) REFERENCES Promotion (promo_id),
	FOREIGN KEY (rid) REFERENCES Restaurants (rid)
);

CREATE SEQUENCE LidSeq;
CREATE TABLE Locations (
	Lid			INTEGER DEFAULT nextval('LidSeq'),
	Cid			INTEGER,
	LatestDate	TIMESTAMP NOT NULL,
	address		VARCHAR(100),
	PRIMARY KEY (Lid),
	FOREIGN KEY (Cid) REFERENCES Customers (Cid) ON DELETE CASCADE
);
ALTER SEQUENCE LidSeq OWNED BY Locations.Lid;

CREATE TABLE Assignment (
	Oid						INTEGER,
	Did						INTEGER NOT NULL,
	TimeOrderPlaced 		TIMESTAMP,
	DepartTimeToRestaurant 	TIMESTAMP,
	ArrivalTimeToRestaurant TIMESTAMP,
	DepartTimeToCustomer 	TIMESTAMP,
	ArrivalTimeToCustomer 	TIMESTAMP,
	PRIMARY KEY (Oid),
	UNIQUE(Oid, Did),
	FOREIGN KEY (Oid) REFERENCES Orders (Oid),
	FOREIGN KEY (Did) REFERENCES DeliveryRiders (Did)
);

CREATE SEQUENCE feedbackSeq;
CREATE TABLE Feedback (
	feedback_id 	INTEGER DEFAULT nextval('feedbackSeq'),
	rid 			INTEGER,
	Did 			INTEGER,
	review 			VARCHAR(500),
	rating 			INTEGER NOT NULL,
	PRIMARY KEY (feedback_id),
	FOREIGN KEY (rid) REFERENCES Restaurants (rid), -- reviews for restaurants
	FOREIGN KEY (Did) REFERENCES DeliveryRiders (Did) -- reviews for delivery riders
);
ALTER SEQUENCE feedbackSeq OWNED BY Feedback.feedback_id;

/*
\COPY FDSManager FROM 'C:\Users\User\Desktop\Y4S2\CS2102\Project\data\FDSManager.csv' DELIMITER ',' CSV HEADER;
\COPY Customers FROM 'C:\Users\User\Desktop\Y4S2\CS2102\Project\data\Customers.csv' DELIMITER ',' CSV HEADER;
\COPY Restaurants FROM 'C:\Users\User\Desktop\Y4S2\CS2102\Project\data\Restaurants.csv' DELIMITER ',' CSV HEADER;
\COPY Staffs FROM 'C:\Users\User\Desktop\Y4S2\CS2102\Project\data\Staffs.csv' DELIMITER ',' CSV HEADER;
\COPY FoodItem FROM 'C:\Users\User\Desktop\Y4S2\CS2102\Project\data\FoodItem.csv' DELIMITER ',' CSV HEADER;
\COPY DeliveryRiders FROM 'C:\Users\User\Desktop\Y4S2\CS2102\Project\data\DeliveryRiders.csv' DELIMITER ',' CSV HEADER;
\COPY Orders FROM 'C:\Users\User\Desktop\Y4S2\CS2102\Project\data\Orders.csv' DELIMITER ',' CSV HEADER;
\COPY OrderedItem FROM 'C:\Users\User\Desktop\Y4S2\CS2102\Project\data\OrderedItem.csv' DELIMITER ',' CSV HEADER;
\COPY Payment FROM 'C:\Users\User\Desktop\Y4S2\CS2102\Project\data\Payment.csv' DELIMITER ',' CSV HEADER;
\COPY Promotion FROM 'C:\Users\User\Desktop\Y4S2\CS2102\Project\data\Promotion.csv' DELIMITER ',' CSV HEADER;
\COPY Locations FROM 'C:\Users\User\Desktop\Y4S2\CS2102\Project\data\Locations.csv' DELIMITER ',' CSV HEADER;
\COPY Assignment FROM 'C:\Users\User\Desktop\Y4S2\CS2102\Project\data\Assignment.csv' DELIMITER ',' CSV HEADER;
\COPY Feedback FROM 'C:\Users\User\Desktop\Y4S2\CS2102\Project\data\Feedback.csv' DELIMITER ',' CSV HEADER;
*/
