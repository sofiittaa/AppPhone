import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { auth } from "../firebase/fireBaseConfig";


export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    console.log("Usuario registrado:", userCredential.user);
  } catch (error) {
    console.error("Error en el registro:", error.message);
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    console.log("Usuario logueado:", userCredential.user);
  } catch (error) {
    console.error("Error en el login:", error.message);
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log("Sesión cerrada");
  } catch (error) {
    console.error("Error al cerrar sesión:", error.message);
  }
};
