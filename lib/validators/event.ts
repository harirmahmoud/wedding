import { z } from "zod";

export const eventApiSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  phone: z.string().min(8, "Phone number is invalid"),
  email: z.string().email("Invalid email"),
  eventDate: z.string(), // ISO string
  adultsCount: z.string(),
  childrenCount: z.string().optional(),

  venues: z.array(z.string()).optional(),
  cateringStyle: z.array(z.string()).optional(),
  entertainment: z.array(z.string()).optional(),
  decoration: z.array(z.string()).optional(),
  photography: z.array(z.string()).optional(),
  beauty: z.array(z.string()).optional(),
  transport: z.array(z.string()).optional(),
  invitations: z.array(z.string()).optional(),
  clothingRental: z.array(z.string()).optional(),
  honeymoon: z.array(z.string()).optional(),
  weddingNight: z.array(z.string()).optional(),
  overnightStaying: z.array(z.string()).optional(),
  trouse_de_marie: z.array(z.string()).optional(),
});
