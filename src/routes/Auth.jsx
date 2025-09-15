import { redirect } from "react-router-dom";
import { isLoggedIn } from "../utils/helper";

export default async function Auth() {
    if(isLoggedIn()) {
        return redirect('/')
    }

    return null
}