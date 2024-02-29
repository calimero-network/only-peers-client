import { gql } from "@apollo/client";

export const GET_POSTS = gql`
    query Posts {
        posts {
            id,
            title,
            content,
            comments {
                text,
                user
            }
        }
    }
`
export const GET_POST = gql`
    query getPost($id: Int!) {
        post(id: $id) {
            id,
            title,
            content,
            comments {
                text,
                user
            }
        }
    }
`
