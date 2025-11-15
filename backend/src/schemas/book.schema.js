import { z } from 'zod';

export const createBookSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long'),
  authorName: z.string().min(3, 'Author name must be at least 3 characters long'),
  authorEmail: z.string().email('Invalid email format'),
  price: z.number().int().positive('Price must be a positive integer'),
  cover: z.string().optional(),
  category: z.string().optional(),
  featured: z.boolean().optional(),
});

export const updateBookSchema = createBookSchema.partial();
