import axios from 'axios'
import type { CreateNote, Note } from '../types/note'

interface Response {
  notes: Note[]
  totalPages: number
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}` },
})

export const fetchNotes = async (page: number, search: string): Promise<Response> => {
  const { data } = await api.get<Response>('/notes', {
    params: { page, search, perPage: 12 },
  })

  console.log('API response:', data)

  return data
}

export const createNote = async (newNote: CreateNote): Promise<Note> => {
  const { data } = await api.post<Note>('/notes', newNote)

  return data
}

export const deleteNote = async (noteId: string): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${noteId}`)

  return data
}

export const fetchNoteById = async (noteId: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${noteId}`)

  return data
}
