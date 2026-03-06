const loginUser = async (email, password) => {
  try {
    const userCredential = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    console.log("Usuario logueado:", userCredential.user);
  } catch (error) {
    console.error("Error en el login:", error.message);
  }
};
