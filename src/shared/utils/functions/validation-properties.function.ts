import { validateSync } from "class-validator";
import { ErrorResponseDto } from "../../../infraestructure/dto/response/error.res.dto";

export async function ValidationProperties(dto: object) {
  const errors: string[] = [];
  const errorValidations = await validateSync(dto);

  if (errorValidations.length > 0) {
    errorValidations.forEach((errorVal) => {
      const tempArrValues = Object.values(
        errorVal.constraints as { [key: string]: string }
      );
      errors.push(...tempArrValues);
    });
    throw new ErrorResponseDto({ message: "Error en validaciones", errors });
  } else {
    return;
  }
}
