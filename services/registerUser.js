const registerUser = async (email, password) => {
  try {
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
    console.log('Usuario registrado:', userCredential.user);
  } catch (error) {
    console.error('Error en el registro:', error.message);
  }
};

export default registerUser;