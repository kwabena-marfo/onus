import { z } from "zod";

export default z.object({
  username: z.string().min(1, { message: "Invalid Username" }),
  password: z.string().min(1, { message: "Invalid Password" }),
});
