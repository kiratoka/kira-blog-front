import { getSession } from "@/lib/session";
import InputCreatePost from "./_components/InputCreatePost";

const page = async() => {
const session = await getSession()

    return (
        <div className="md:mt-20">
            <InputCreatePost session={session}/>

        </div>
    );
};

export default page;