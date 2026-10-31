import { z } from "zod";

export const post = z.object({
  content: z.string().nonempty().max(280),
});
