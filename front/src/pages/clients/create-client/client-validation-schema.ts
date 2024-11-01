import * as Yup from "yup";

const namesSchema = Yup.string().required("Este campo es requerido").matches(/^[a-zA-Z]+$/, "El nombre debe ser alfabetico");
const numericSchema = Yup.string().required("Este campo es requerido").length(10, "Este campo debe contener 10 caracteres numericos").matches(/^[0-9]+$/, "El campo debe ser numerico");

export const clientValidationSchema = Yup.object().shape({
  nit: numericSchema,
  firstName: namesSchema,
  secondName: Yup.string().notRequired().max(20, "El segundo nombre debe ser de maximo 20 caracteres").matches(/^[a-zA-Z]+$/, "El apellido debe ser alfabetico"),
  firstLastName: namesSchema,
  secondLastName: namesSchema,
  birthdate: Yup
    .date()
    .required("Este campo es requerido")
    .max(new Date(), "La fecha de nacimiento no puede ser mayor a la fecha actual")
    .test("birthdate", "El cliente debe ser mayor de edad", (date) => {
      if (!date) return false;

      const today = new Date();
      const birthDate = new Date(date);

      if (birthDate > today) return false;

      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age >= 18;
    }),
  phone: numericSchema,
  email: Yup.string().email("Correo invalido").required("Este campo es requerido").email("El correo debe tener un formato valido"),
});
