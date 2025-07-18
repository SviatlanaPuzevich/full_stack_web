import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            bookCount
            id
        }
    }
`
export const EDIT_AUTHOR = gql`
    mutation EditAuthor($name: String!, $setBornTo: Int!) {
        editAuthor(name: $name, setBornTo: $setBornTo) {
            name
            born
            id
        }
    }
`

export const ALL_BOOKS = gql`
    query AllBooks($genre: String) {
        allBooks(genre: $genre) {
            title
            published
            genres
            author {
                name
            }
        }
    }
`

export const ADD_BOOK = gql`
    mutation AddBook(
        $title: String!
        $published: Int!
        $author: String!
        $genres: [String!]!
    ) {
        addBook(
            title: $title
            published: $published
            author: $author
            genres: $genres
        ) {
            title
            genres
            published
            id
            author {
                name
            }
        }
    }
`

export const LOGIN = gql`
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
        }
    }
`

export const FAVORITE_GENRE = gql`
    query {
        me {
            favoriteGenre
        }
    }
`
export const BOOK_ADDED = gql`
    subscription {
        bookAdded {
            title
            id
            author {
                name
            }
        }
    }
`

export const ALL_GENRES = gql`
    query {
        allGenres
    }
`
