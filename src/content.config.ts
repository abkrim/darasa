import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const SubEntidadSchema = z.object({
  slug: z.string(),
  nombre: z.string(),
  inicio: z.number().int(),
  fin: z.number().int(),
});

const HechoSchema = z.object({
  k: z.string(),
  v: z.string(),
});

const entidades = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/hispania/entidades' }),
  schema: z.object({
    slug: z.string(),
    nombre: z.string(),
    tipo: z.enum([
      'reino',
      'emirato',
      'califato',
      'taifa',
      'condado',
      'corona',
      'confederacion',
      'epoca',
    ]),
    inicio: z.number().int(),
    fin: z.number().int().nullable(),
    colorVar: z.string().startsWith('--c-'),
    sub_entidades: z.array(SubEntidadSchema).optional(),
    desc: z.string().min(1),
    fuentes: z.array(z.string()).min(1),
  }),
});

const soberanos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/hispania/soberanos' }),
  schema: z.object({
    slug: z.string(),
    entidad: z.string(),
    sub_entidad: z.string().optional(),
    id: z.number().int().positive(),
    nombre: z.string(),
    epiteto: z.string().optional(),
    inicio: z.number().int(),
    fin: z.number().int().nullable(),
    capital: z.string().optional(),
    img: z.string().startsWith('/portraits/').nullable(),
    imgCredit: z.string().optional(),
    hechos: z.array(HechoSchema).optional(),
    fuentes: z.array(z.string()).min(1),
  }),
});

export const collections = { entidades, soberanos };
