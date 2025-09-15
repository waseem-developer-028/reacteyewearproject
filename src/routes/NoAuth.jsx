import { redirect } from "react-router-dom";
import { isLoggedIn } from "../utils/helper";

export default async function NoAuth() {
    if(!isLoggedIn()) {
        return redirect('/login')
    }

    return null
}