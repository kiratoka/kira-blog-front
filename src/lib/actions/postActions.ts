"use server"

import { print } from "graphql"
import { authFetchGraphql, fetchGraphQL } from "../fetchGraphQL"
import { GET_POST_BY_ID, GET_POSTS, GET_USER_POSTS } from "../gqlQueries"
import { Post } from "../types/modelTypes"
import { transformTakeSkip } from "../helpers"

export const fetchPosts = async ({
    page,
    pageSize
}: {
    page?: number,
    pageSize?: number
}) => {

    const { skip, take } = transformTakeSkip({ page, pageSize })
    const data = await fetchGraphQL(print(GET_POSTS), { skip, take })

    return { posts: data.posts as Post[], totalPosts: data.postCount }

}


export const fetchPostById = async (id: number) => {
    const data = await fetchGraphQL(print(GET_POST_BY_ID), { id })

    return data.getPostById as Post
}


export const fetchUserPosts = async ({ page, pageSize }: { page?: number, pageSize: number }) => {

    const { take, skip } = transformTakeSkip({ page, pageSize })

    const data = await authFetchGraphql(print(GET_USER_POSTS), {
        take, skip
    })

    return {
        posts: data.getUserPosts as Post[],
        totalPosts: data.userPostCount as number
    }


}
