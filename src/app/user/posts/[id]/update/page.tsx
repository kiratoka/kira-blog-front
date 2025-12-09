
import { fetchPostById } from "@/lib/actions/postActions"
import UpdatePost from "./_components/UpdatePost"
import { getSession } from "@/lib/session"

type Props = {
    params: {
        id: number
    }
}


const page = async (props: Props) => {
    const id = await props.params.id
    const session = await getSession();
    const post = await fetchPostById(+id)



    return (
        <div>



            {String(session!.user.id) === String(post.author.id) ?

                <UpdatePost session={session!} post={post} />
                :

                <h1>Kamu tidak berhak update post orang lain ya</h1>
            }

        </div>
    )
}

export default page