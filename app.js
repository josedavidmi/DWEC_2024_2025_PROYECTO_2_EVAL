
// Importar las librerías necesarias desde Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-analytics.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAeJ0yF0UEplWsgmihcSqrKbyYZNKTj3IU",
    authDomain: "proyecto-2-eval-2024-2025.firebaseapp.com",
    projectId: "proyecto-2-eval-2024-2025",
    storageBucket: "proyecto-2-eval-2024-2025.firebasestorage.app",
    messagingSenderId: "921030329512",
    appId: "1:921030329512:web:f3147347e31a1fc38fee9d",
    measurementId: "G-4QYNXXK0ZE"
};

// Initialize Firebase Analiticas
const analytics = getAnalytics(app);

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Referencias al DOM
const googleSignInButton = document.getElementById("googleSignIn");
const signOutButton = document.getElementById("signOut");
const userDetails = document.getElementById("userDetails");

// Iniciar Sesión con Google
googleSignInButton.addEventListener("click", async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        console.log("Usuario autenticado:", result.user);
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
    }
});

// Detectar cambios en el estado de autenticación
onAuthStateChanged(auth, (user) => {
    if (user) {
        // Usuario autenticado
        userDetails.innerHTML = `
            <h2>Bienvenido, ${user.displayName}</h2>
            <p>Correo: ${user.email}</p>
            <img src="${user.photoURL}" alt="Foto de perfil" style="width: 100px; border-radius: 50%;">
        `;
        googleSignInButton.style.display = "none";
        signOutButton.style.display = "inline-block";
    } else {
        // Usuario no autenticado
        userDetails.innerHTML = "";
        googleSignInButton.style.display = "inline-block";
        signOutButton.style.display = "none";
    }
});

// Cerrar Sesión
signOutButton.addEventListener("click", async () => {
    try {
        await signOut(auth);
        console.log("Sesión cerrada");
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
    }
});
