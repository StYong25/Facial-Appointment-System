import {SQLiteDatabase, enablePromise, openDatabase} from "react-native-sqlite-storage";

enablePromise(true);

const dbName = "myplaces.sqlite";

const callbackSuccess = () => {
    console.log('Successful');
}

const callbackFail = () => {
    console.log('Fail');
}

export const getDB = async() => {
    return openDatabase({
        name: dbName,
        createFromLocation: `~${dbName}`
    },callbackSuccess,callbackFail)
}

export const getPlaces = async(db) => {
    const placeData = [];
    const query = "SELECT * FROM places";
    const results = await db.executeSql(query);
    results.forEach( result => {
        (result.rows.raw()).forEach( item => {
            placeData.push(item);
        })
    })

    return placeData;
}

export const deletePlace = async(db, placeId) => {
    const query = "DELETE FROM places WHERE id = ?";
    await db.executeSql(query,[placeId]);
}

export const createPlace = async(db, name, city, date) => {
    const query = "INSERT INTO places (name, city, date) VALUES (?,?,?)";
    await db.executeSql(query,[name, city, date]);
}

export const editPlace = async(db, id, name, city, date) => {
    const query = "UPDATE places SET name = ?, city = ?, date = ? WHERE id = ?";
    await db.executeSql(query,[name, city, date, id]);
}

export const getPlaceById = async(db, id) => {
    const query = 'SELECT * FROM places WHERE id=?';
    const results = await db.executeSql(query,[id]);
    return results[0].rows.item(0);
}