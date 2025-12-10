"use server"

import { print } from "graphql"
import { authFetchGraphql } from "../fetchGraphQL"
import { LIKE_POST_MUTATION, POST_LIKES, UNLIKE_POST_MUTATION } from "../gqlQueries"

export async function getPostLikeData(postId: number) {
    const data = await authFetchGraphql(print(POST_LIKES), {
        postId
    })

    return {
        likeCount: data.postLikesCount as number,
        userLikedPost: data.userLikedPost as boolean
    }

}



export async function likePost(postId: number) {

    await authFetchGraphql(print(LIKE_POST_MUTATION), {
        postId
    })

}


export async function unLikePost(postId: number) {

    await authFetchGraphql(print(UNLIKE_POST_MUTATION), {
        postId
    })


}

