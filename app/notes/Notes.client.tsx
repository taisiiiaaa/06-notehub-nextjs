'use client'
import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { fetchNotes } from '@/lib/api'
import SearchBox from '@/components/SearchBox/SearchBox'
import Pagination from '@/components/Pagination/Pagination'
import Loader from '@/components/Loader/Loader'
import NoteList from '@/components/NoteList/NoteList'
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage'
import Modal from '@/components/Modal/Modal'
import NoteForm from '@/components/NoteForm/NoteForm'
import EmptyState from '@/components/EmptyState/EmptyState'

import styles from './Notes.module.css'

const NotesClient = () => {
  const [searchInput, setSearchInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearchQuery(value)
    setCurrentPage(1)
  }, 300)

  const { data, isSuccess, isLoading, error, isError, isFetching } = useQuery({
    queryKey: ['notes', searchQuery, currentPage],
    queryFn: () => fetchNotes(currentPage, searchQuery),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  })

  const handleSearchChange = (value: string) => {
    setSearchInput(value)
    debouncedSearch(value)
  }

  return (
    <div className={styles.app}>
      <header className={styles.toolbar}>
        <SearchBox value={searchInput} onChange={handleSearchChange} />

        {data && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={currentPage}
            updatePage={setCurrentPage}
          />
        )}

        <button onClick={() => setIsModalVisible(true)} className={styles.button}>
          Create note +
        </button>
      </header>

      <main>
        <section>
          {isLoading && !isError && <Loader />}

          {isSuccess && data.notes.length > 0 && (
            <div className={styles.notesContainer}>
              <NoteList notes={data.notes} />

              {isFetching && !isLoading && <Loader variant='fetching' />}
            </div>
          )}

          {isError && (
            <ErrorMessage
              message={error instanceof Error ? error.message : 'Failed to load notes.'}
            />
          )}

          {isSuccess && data.notes.length === 0 && <EmptyState searchQuery={searchQuery} />}

          {isModalVisible && (
            <Modal onClose={() => setIsModalVisible(false)}>
              <NoteForm onClose={() => setIsModalVisible(false)} />
            </Modal>
          )}
        </section>
      </main>
    </div>
  )
}

export default NotesClient
