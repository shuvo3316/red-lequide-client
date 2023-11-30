import useUser from "../../../Hooks/useUser";
import FullWidthTabs2 from "./AllUserTab";

const AllUser = () => {
    const [request]=useUser();
    console.log(request)
    return (
        <div>
            <h2>all user</h2>
            {
                FullWidthTabs2()
            }
        </div>
    );
};

export default AllUser;