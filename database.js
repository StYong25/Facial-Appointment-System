import SQLite from 'react-native-sqlite-storage';
import RNFS from 'react-native-fs';

const openDatabase = () => {
  return new Promise((resolve, reject) => {
    const db = SQLite.openDatabase(
      { name: 'app_data.db', location: 'default' },
      () => resolve(db),
      (error) => reject(error)
    );
  });
};

const createUserTable = async () => {
  const db = await openDatabase();
  await new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS User (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          email TEXT UNIQUE,
          gender TEXT,
          password TEXT
        );`,
        [],
        () => resolve(),
        (error) => reject(error)
      );
    });
  });
};

const insertUserData = async (name, email, gender, password) => {
  const db = await openDatabase();
  await new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO User (name, email, gender, password) VALUES (?, ?, ?, ?)',
        [name, email, gender, password],
        () => resolve(),
        (error) => reject(error)
      );
    });
  });
};

const fetchUserData = async (email) => {
  const db = await openDatabase();
  const result = await new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM User WHERE email = ?',
        [email],
        (tx, results) => resolve(results.rows.item(0)),
        (error) => reject(error)
      );
    });
  });
  return result;
};

const createTreatmentTable = async () => {
  const db = await openDatabase();
  await new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Treatment (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          price TEXT,
          period TEXT,
          description TEXT,
          image TEXT
        );`,
        [],
        () => resolve(),
        (error) => reject(error)
      );
    });
  });
};

const insertMultipleData = async () => {
  const db = await openDatabase();
  const count = await new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT COUNT(*) as count FROM Treatment',
        [],
        (tx, results) => resolve(results.rows.item(0).count),
        (error) => reject(error)
      );
    });
  });

  if (count === 0) {
    const treatments = [
      {
        name: 'Hydrating Glow Facial',
        price: '$98',
        period: '60 minutes',
        description: 'A revitalizing treatment designed to deeply hydrate and refresh your skin.',
        image: 'Facials_Spa1.jpg',
      },
      {
        name: 'Anti-Aging Rejuvenation Facial',
        price: '$138',
        period: '75 minutes',
        description: 'Combat signs of aging with advanced skin therapy techniques.',
        image: 'Facials_Spa2.jpg',
      },
      {
        name: 'Acne Clarifying Facial',
        price: '$108',
        period: '70 minutes',
        description: 'Target acne and congestion for clearer, healthier skin.',
        image: 'Facials_Spa3.jpg',
      },
      {
        name: 'Luxury Relaxation Facial',
        price: '$158',
        period: '90 minutes',
        description: 'Indulge in ultimate relaxation with aromatherapy and botanical-rich masks.',
        image: 'Facials_Spa4.jpg',
      },
    ];

    await new Promise((resolve, reject) => {
      db.transaction((tx) => {
        treatments.forEach((treatment) => {
          tx.executeSql(
            'INSERT INTO Treatment (name, price, period, description, image) VALUES (?, ?, ?, ?, ?)',
            [treatment.name, treatment.price, treatment.period, treatment.description, treatment.image],
            () => {},
            (error) => reject(error)
          );
        });
        resolve();
      });
    });
  }
};

const fetchTreatmentDetails = async () => {
  const db = await openDatabase();
  const results = await new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM Treatment',
        [],
        (tx, results) => resolve(results.rows.raw()),
        (error) => reject(error)
      );
    });
  });
  return results;
};

const createBookingTable = async () => {
  const db = await openDatabase();
  await new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Booking (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          date TEXT,
          timeSlot TEXT,
          pax INTEGER,
          treatment TEXT,
          userEmail TEXT,
          FOREIGN KEY (userEmail) REFERENCES User(email)
        );`,
        [],
        () => resolve(),
        (error) => reject(error)
      );
    });
  });
};


const insertBookingData = async (date, timeSlot, pax, treatment, userEmail) => {
  const db = await openDatabase();
  await new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO Booking (date, timeSlot, pax, treatment, userEmail) VALUES (?, ?, ?, ?, ?)',
        [date, timeSlot, pax, treatment, userEmail],
        () => resolve(),
        (error) => reject(error)
      );
    });
  });
};


const fetchBookingData = async (userEmail) => {
  const db = await openDatabase();
  const results = await new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM Booking WHERE userEmail = ?',
        [userEmail],
        (tx, results) => resolve(results.rows.raw()),
        (error) => reject(error)
      );
    });
  });
  return results;
};
const deleteDatabase = async () => {
  const dbPath = `${RNFS.DocumentDirectoryPath}/app_data.db`;
  try {
    await RNFS.unlink(dbPath);
    console.log('Database deleted successfully');
  } catch (error) {
    console.error('Error deleting database:', error);
  }
};

export {
  createUserTable,
  insertUserData,
  fetchUserData,
  createTreatmentTable,
  insertMultipleData,
  fetchTreatmentDetails,
  createBookingTable,
  insertBookingData,
  fetchBookingData,
  deleteDatabase,
};
