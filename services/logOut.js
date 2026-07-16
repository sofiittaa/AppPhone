const logoutUser = async () => {
  try {
    await firebase.auth().signOut();
  } catch (error) {
    console.error("Error al cerrar sesión:", error.message);
  }
};
