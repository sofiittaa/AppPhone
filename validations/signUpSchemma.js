import * as Yup from "yup";

const signupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .required("El nombre es obligatorio"),
  email: Yup.string()
    .email("El email no es valido")
    .required("El email es obligatorio"),
  password: Yup.string()
    .min(6, "La contrasena debe tener al menos 6 caracteres")
    .required("La contrasena es obligatoria"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Las contrasenas no coinciden")
    .required("La confirmacion de la contrasena es obligatoria"),
});

export default signupSchema;
