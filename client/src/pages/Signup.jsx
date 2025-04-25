import React from 'react';
import '../App.css';
import { useState } from 'react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { useNavigate } from 'react-router-dom';
import axiosBaseUrl from '../utils/axios';
import useToast from '../hooks/useToast';
import Toast from '../components/common/Toast';
import { Link } from 'react-router-dom';
import '../styles/pages/login-signup.css';
import { getLocationInfo } from '../utils/location';

const Signup = () => {
    const [fullName, setfullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [toast, setToast] = useToast();

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const locationInfo = await getLocationInfo();
            if (!locationInfo) {
                throw new Error('Could not fetch location information');
            }
            const response = await axiosBaseUrl.post('/signup', {
                name: fullName,
                email: email,
                password: password,
                ip: locationInfo.ip,
                latitude: locationInfo.latitude,
                longitude: locationInfo.longitude,
            });

            if (response.data.success) {
                localStorage.setItem('id', response.data.data.user.id);
                localStorage.setItem('name', response.data.data.user.name);
                navigate('/select-source');
            } else {
                setToast({
                    message: 'Signup failed',
                    success: false,
                    visible: true,
                });
                console.log('Signup failed:', response.data.message);
            }
        } catch (error) {
            setToast({
                message: 'Error during signup',
                success: false,
                visible: true,
            });
            console.error('Error during signup:', error);
        }
    };

    return (
        <>
            <section className="container login_signup_section">
                <form className="bg-primary body2">
                    <h2 className="text-white h2">Sign Up</h2>
                    <Input
                        type={'text'}
                        name={'full_name'}
                        value={fullName}
                        onChange={(e) => setfullName(e.target.value)}
                        placeholder={'Full Name'}
                        classes={'body2'}
                    />
                    <Input
                        type={'email'}
                        name={'email'}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={'Email'}
                        className={'body2'}
                    />
                    <Input
                        type={'password'}
                        name={'pass'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={'Password'}
                        className={'body2'}
                    />
                    <Button
                        text={'Sign up'}
                        onClick={handleSignup}
                        className={'w-full'}
                        bgColor="bg-secondary"
                        textColor="text-black"
                    />
                    <p className="body2 text-white">
                        Don't have account ?{' '}
                        <span className="text-secondary">
                            <Link to={'/login'} value="Login" className="underline">
                                Login
                            </Link>
                        </span>
                    </p>
                </form>
            </section>

            <Toast toast={toast} setToast={setToast} />
        </>
    );
};
export default Signup;
