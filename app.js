// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3mBCKUnL1lL9MZ5iyW0PIl2a-tLJjvz0",
  authDomain: "website-6d2c4.firebaseapp.com",
  databaseURL: "https://website-6d2c4-default-rtdb.firebaseio.com",
  projectId: "website-6d2c4",
  storageBucket: "website-6d2c4.firebasestorage.app",
  messagingSenderId: "182842759142",
  appId: "1:182842759142:web:b4312ed6c3e6a8da61e827",
  measurementId: "G-SQMHH36HEJ"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Vote function
function vote(partyId) {
    const partyRef = db.ref('votes/' + partyId);
    partyRef.transaction((currentVotes) => {
        return (currentVotes || 0) + 1;
    }).then(() => {
        alert("Vote submitted!");
        showResults();
    }).catch((error) => {
        console.error("Error voting:", error);
    });
}

// Show results
function showResults() {
    const resultsDiv = document.getElementById('results');
    db.ref('votes').once('value').then((snapshot) => {
        const votes = snapshot.val();
        const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);
        resultsDiv.innerHTML = '';
        for (const [party, count] of Object.entries(votes)) {
            const percentage = ((count / totalVotes) * 100).toFixed(2);
            resultsDiv.innerHTML += `<p>${party}: ${percentage}%</p>`;
        }
    });
}

showResults();
