const logoutUser = async () => {
  try {
    await firebase.auth().signOut();
    console.log("Sesión cerrada");
  } catch (error) {
    console.error("Error al cerrar sesión:", error.message);
  }
};
