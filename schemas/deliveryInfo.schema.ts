import { z } from "zod";

export default z.object({
  addressId: z.string().min(2, "Address must be selected"),
  paymentMethod : z.string()
});

