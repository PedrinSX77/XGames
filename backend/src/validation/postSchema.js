import { z } from "zod";

export const post = z.object({
  authorName: z.string(),
  content: z.string().nonempty().max(280),
});
