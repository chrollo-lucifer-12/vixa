import {onAuthenticateUser} from "@/actions/user";
import {redirect} from "next/navigation";

const AuthCallbackPage = async () => {

    const auth = await onAuthenticateUser();
    if (auth.status === 200 || auth.status === 201) {
        return redirect(`/dashboard/${auth.workspace?.id}`)
    }

    if (auth.status === 401 || auth.status === 403) {
        return redirect(`/auth/sign-in`)
    }


}

export default AuthCallbackPage