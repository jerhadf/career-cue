import { error } from '@sveltejs/kit'
import { put } from '@vercel/blob'

export async function post({ request }: { request: any }) {
  const form = await request.formData()
  const file = form.get('file-upload') as File

  if (!file) {
    throw error(400, { message: 'No file to upload.' })
  }

  // Add file validation here...

  const { url } = await put(file.name, file, { access: 'public' })
  return { body: { uploaded: url } }
}