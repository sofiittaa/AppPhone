import { auth } from "../firebase/fireBaseConfig";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "./loginUser";
import { signOut } from "./logOut";

export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return userCredential.user;
  } catch (error) {
    throw new Error(error.message || "Error en el registro");
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return userCredential.user;
  } catch (error) {
    throw new Error(error.message || "Error en el login");
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    throw new Error(error.message || "Error al cerrar sesion");
  }
};
