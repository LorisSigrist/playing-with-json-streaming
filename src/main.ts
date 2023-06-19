import { JSONParser } from '@streamparser/json-whatwg';
import { MapStream, asIterator } from './stream-utils';
import { z } from 'zod';
import { displayPhoto } from './display';

const PhotoSchema = z.object({
  albumId: z.number(),
  id: z.number(),
  title: z.string(),
  url: z.string().url(),
  thumbnailUrl: z.string().url()
});

export type Photo = z.infer<typeof PhotoSchema>;
  
const parser = new JSONParser({ paths: ['$.*'], keepStack: false });

const response = await fetch('https://jsonplaceholder.typicode.com/photos');
if (!response.body || !response.ok) throw new Error('Failed to fetch');

const photosStream = response.body
  .pipeThrough(parser)
  .pipeThrough(MapStream(chunk => chunk.value))
  .pipeThrough(MapStream(PhotoSchema.parse))

for await (const photo of asIterator(photosStream)) {
  displayPhoto(photo);
}
