'use client';
import { loginGoogle, loginGithub, loginGitlab, loginDiscord, logout } from '@/actions/auth-actions'
import { faGoogle, faGithub, faGitlab, faDiscord, } from '@fortawesome/free-brands-svg-icons';
import { AuthButton } from './auth-button';
import SignOutButton from './sign-out-button';
import { AuthButtonProps } from '@/types/types';

export default function Authbutton({ session }: AuthButtonProps) {
    return (
        <>
            <div className='flex flex-wrap gap-4 w-full '>
                {!session ? (
                    <div className="flex flex-col md:flex-row justify-center gap-2 p-4 w-full">
                        <AuthButton icon={faGoogle} label="Sign In With Google" onClick={loginGoogle} />
                        <AuthButton icon={faGithub} label="Sign In With GitHub" onClick={loginGithub} />
                        <AuthButton icon={faGitlab} label="Sign In With GitLab" onClick={loginGitlab} />
                        <AuthButton icon={faDiscord} label="Sign In With Discord" onClick={loginDiscord} />
                    </div>
                ) : (
                    <SignOutButton onClick={() => logout()} />
                )}
            </div>
        </>
    );
};

