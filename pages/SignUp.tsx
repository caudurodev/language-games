import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSignUpEmailPassword } from '@nhost/nextjs';
import Link from 'next/link';
import Image from 'next/image';
import Input from '../components/Forms/Input';
import Spinner from '../components/Forms/Spinner';

const SignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();

    const { signUpEmailPassword, isLoading, isSuccess, needsEmailVerification, isError, error } =
        useSignUpEmailPassword();

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        await signUpEmailPassword(email, password, {
            displayName: `${firstName} ${lastName}`.trim(),
            metadata: {
                firstName,
                lastName
            }
        });
    };

    useEffect(() => {
        console.log('isError', isError, error);
    }, [isError]);

    if (isSuccess) {
        router.push('/');
        return null;
    }

    const disableForm = isLoading || needsEmailVerification;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="p-8 bg-white rounded-lg shadow-md">
                {/* <div className="mb-6 flex items-center justify-center w-full">
                    <Image src="/logo.svg" alt="logo" layout="fill" objectFit="contain" />
                </div> */}

                {needsEmailVerification ? (
                    <p className="text-center text-gray-700">
                        Please check your mailbox and follow the verification link to verify your email.
                    </p>
                ) : (
                    <form onSubmit={handleOnSubmit} className="space-y-4">
                        <div className="flex space-x-4">
                            <Input
                                placeholder="First name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                disabled={disableForm}
                                required
                            />
                            <Input
                                placeholder="Last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                disabled={disableForm}
                                required
                            />
                        </div>
                        <Input
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={disableForm}
                            required
                        />
                        <Input
                            type="password"
                            label="Create password"
                            placeholder="Create password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={disableForm}
                            required
                        />

                        <button type="submit" disabled={disableForm} className="w-full py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600">
                            {isLoading ? <Spinner size="sm" /> : 'Create account'}
                        </button>

                        {isError ? <p className="mt-2 text-red-500">{error?.message}</p> : null}
                    </form>
                )}
            </div>

            <p className="mt-4 text-gray-600">
                Already have an account?{' '}
                <Link href="/sign-in">
                    <a className="text-blue-500 hover:underline">Sign in</a>
                </Link>
            </p>
        </div>
    );
}

export default SignUp;
