import { defineStore } from "pinia";
import { useStorage } from '@vueuse/core'

export type Note = {
    id: string;
    title: string;
    content: string;
}

function randomUuid () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
    })
}

export const useNoteStore = defineStore('editor', {

    state: () => ({
        notes: useStorage<Array<Note>>('notes', []),
        currentNote: useStorage<Note>('currentNote', null),
        openNotes: useStorage<Array<string>>('openNotes', []),
    }),

    actions: {
        async addNote (title: string, content: string) {
            const note = {
                id: randomUuid(),
                title,
                content,
            } 
            this.notes.push(note)
            return note
        },
        removeNote (id: string) {
            this.notes = this.notes.filter(note => note.id !== id)
        },
        updateNote (id: string, data: { title?: string, content?: string }) {
            this.notes = this.notes.map(note => {
                if (note.id === id) {
                    return {
                        ...note,
                        ...data,
                    }
                }
                return note
            })
        },
        loadNote (id: string) {
            const note = this.notes.find(note => note.id === id)
            if (!note) {
                throw new Error('Note not found')
            }
            this.currentNote = note
            if (!this.openNotes.includes(id)) {
                this.openNotes.push(id)
            }
        },
        async newNote () {
            const note = await this.addNote('New Note', `<h1>take a note</h1><p>what's on your mind?</p>`)
            this.loadNote(note.id)
            return note
        },
        closeNote (id: string) {
            this.openNotes = this.openNotes.filter(openId => openId !== id)
        }
    }

})