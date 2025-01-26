// Importar las funciones necesarias desde Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
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

// Inicializar Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.getAuth(app);

// Referencias al DOM
const signupEmail = document.getElementById("signupEmail");
const signupPassword = document.getElementById("signupPassword");
const signupButton = document.getElementById("signupButton");

const signinEmail = document.getElementById("signinEmail");
const signinPassword = document.getElementById("signinPassword");
const signinButton = document.getElementById("signinButton");

const signoutButton = document.getElementById("signoutButton");
const userDetails = document.getElementById("userDetails");

// Registro de usuario
signupButton.addEventListener("click", async () => {
    const email = signupEmail.value;
    const password = signupPassword.value;

    try {
        const userCredential = await firebase.createUserWithEmailAndPassword(auth, email, password);
        console.log("Usuario registrado:", userCredential.user);
        alert("Registro exitoso. Por favor, inicia sesión.");
        signupEmail.value = "";
        signupPassword.value = "";
    } catch (error) {
        console.error("Error en el registro:", error);
        alert(error.message);
    }
});

// Inicio de sesión
signinButton.addEventListener("click", async () => {
    const email = signinEmail.value;
    const password = signinPassword.value;

    try {
        const userCredential = await firebase.signInWithEmailAndPassword(auth, email, password);
        console.log("Usuario autenticado:", userCredential.user);
        userDetails.textContent = `Bienvenido: ${userCredential.user.email}`;
        document.getElementById("signin").style.display = "none";
        document.getElementById("signup").style.display = "none";
        document.getElementById("signout").style.display = "block";
    } catch (error) {
        console.error("Error en el inicio de sesión:", error);
        alert(error.message);
    }
});

// Cerrar sesión
signoutButton.addEventListener("click", async () => {
    try {
        await firebase.signOut(auth);
        console.log("Sesión cerrada");
        userDetails.textContent = "";
        document.getElementById("signin").style.display = "block";
        document.getElementById("signup").style.display = "block";
        document.getElementById("signout").style.display = "none";
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
        alert(error.message);
    }
});
