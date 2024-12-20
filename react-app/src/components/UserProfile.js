import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


function UserProfile({ className }) {
    const [profile, setProfile] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    const login = useGoogleLogin({
        onSuccess: async tokenResponse => {
            console.log(tokenResponse);
            const userInfo = await axios
                .get('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                })
                .then(res => res.data);

            console.log(userInfo);
            setProfile(userInfo);

            // Optionally, send userInfo to your backend
            await axios.post('https://externship2024backend.vercel.app/make-user', userInfo);
        },
    });

    const logout = () => {
        setProfile(null);
        // Optionally, handle logout on your backend
        // window.location.href = 'https://externship2024backend.vercel.app/logout';
    };

    return (
        <div className="user-profile">
            {profile ? (
                <div className="d-flex align-items-center">
                    <img
                        src={profile.picture}
                        alt="profile"
                        className="img-fluid rounded-circle"
                        style={{ marginRight: .25 + 'em', width: 32 }}
                    />
                    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                        <DropdownToggle caret className="btn btn-link p-0 ml-2">
                            <span className="ml-2">Welcome, {profile.given_name}</span>
                            <i className="fas fa-caret-down"></i>
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={logout}>Log out</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            ) : (
                <button onClick={login} className="btn btn-success">
                    Log in
                </button>
            )}
        </div>
    );
}

export default UserProfile;