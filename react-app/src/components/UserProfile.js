import useLogin from "./../auth/useLogin";
import { useAuthStore } from "./../auth/authStore";
import { useShallow } from "zustand/react/shallow";

function UserProfile({ className }) {
    const googleLogin = useLogin();
    const [currentUser, logoutUser] = useAuthStore(
        useShallow((state) => [state.currentUser, state.logoutUser])
    );

    // function handleLogout() {
    //     logoutUser();
    // }

    // const handleGoogleLogin = (codeResponse) => {
    //     setUser(codeResponse);
    //     onLogin(true);
    // };

    // const login = useGoogleLogin({
    //     onSuccess: handleGoogleLogin,
    //     onError: (error) => console.log('Login Failed:', error)
    // });

    return (
        <main className={className}>
            {currentUser ?
                <>
                    <div className="dropdown dropdown-hover dropdown-end">
                        <img
                            src={currentUser.picture}
                            tabIndex={0}
                            role="button"
                            className="btn w-12 h-12 p-0 rounded-full"
                        />
                        <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40">
                            <li>
                                <a>Settings</a>
                            </li>
                            <li>
                                <a onClick={logoutUser}>Sign Out</a>
                            </li>
                        </ul>
                    </div>
                </>
                :
                <button onClick={() => googleLogin()} className="btn">
                    Log in
                </button>}
        </main>
    );
}

export default UserProfile;