// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database"
import { getFirestore, collection, doc, getDocs, getDoc, query, where } from "firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const database = getDatabase(app)


const db = getFirestore(app)
const songsCollection = collection(db, "songs")
const updateCollection = collection(db, "update")
const chartsCollection = collection(db, "charts")
const chartLevelsCollection = collection(db, "chartLevels")

function mapQuerySnapshot(querySnapshot) {
  return querySnapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id
  }))
}

export async function rating() {
  const chartsQuerySnapshot = await getDocs(chartsCollection)
  const chartsDataArr = mapQuerySnapshot(chartsQuerySnapshot)

  const chartLevelsQuerySnapshot = await getDocs(chartLevelsCollection)
  const chartLevelsDataArr = mapQuerySnapshot(chartLevelsQuerySnapshot)

  return (
    {
      charts: chartsDataArr,
      chartLevels: chartLevelsDataArr
    }
  )
}

export async function getSongs() {
  const songQuerySnapshot = await getDocs(songsCollection)
  const songDataArr = songQuerySnapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id
  }))

  const updateQuerySnapshot = await getDocs(updateCollection)
  const updateDataArr = updateQuerySnapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id
  }))

  const isLoggedIn = JSON.parse(localStorage.getItem('maimaiSongListUser'))

  const userName = isLoggedIn ? isLoggedIn.userName : null
  const usersRef = ref(database);
  const snapshot = await get(usersRef);
  const users = snapshot.val();
  const userArr = Object.values(users);
  const user = isLoggedIn ? userArr.find(user => user.userName === userName) : ""


  return {
    update: updateDataArr,
    songs: songDataArr,
    database: user 
  }
}


