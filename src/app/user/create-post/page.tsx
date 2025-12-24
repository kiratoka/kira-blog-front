import { getSession } from "@/lib/session";
import InputCreatePost from "./_components/InputCreatePost";
import NavbarContainer from "@/components/NavbarContainer";

const page = async () => {
    const session = await getSession()

    return (
        <div>
            <NavbarContainer />
            <div className="md:mt-20">
                <InputCreatePost session={session} />
            </div>

        </div>
    );
};

export default page;