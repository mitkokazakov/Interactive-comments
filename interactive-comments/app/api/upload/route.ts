import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

const writeFile = promisify(fs.writeFile)

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file: File | null = formData.get('image') as unknown as File
  const userId = formData.get('userId') as string

  if (!file) {
    return NextResponse.json({ success: false, message: 'No file uploaded' }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const uploadsDir = path.join(process.cwd(), 'public', 'uploads')

  // Ensure uploads folder exists
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true })
  }

  const extension = path.extname(file.name)
  const filename = `${userId}.${extension}`
  const filepath = path.join(uploadsDir, filename)

  await writeFile(filepath, buffer)

  return NextResponse.json({ success: true, path: `/uploads/${filename}` })
}