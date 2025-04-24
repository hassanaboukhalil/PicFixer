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

const Signup = () => {
    const [fullName, setfullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [toast, setToast] = useToast();

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        // if (!validate_password(password)) {
        //   alert(
        //     "Your Password should contain letters, numbers and should contain more than 7 characters"
        //   );
        //   return;
        // }

        try {
            const response = await axiosBaseUrl.post('/signup', {
                full_name: fullName,
                email: email,
                password: password,
            });

            if (response.data.success) {
                localStorage.setItem('id', response.data.user.id);
                localStorage.setItem('full_name', response.data.user.full_name);
                localStorage.setItem('token', response.data.user.token);
                navigate('/dashboard');
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

    //   function validate_password(pass) {
    //     let contains_nb = false;
    //     let contains_letter = false;
    //     if (pass.length < 8) {
    //       return false;
    //     }

    //     for (let i = 0; i < pass.length; i++) {
    //       if ("1234567890".includes(pass[i])) {
    //         contains_nb = true;
    //       } else if (
    //         "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm".includes(pass[i])
    //       ) {
    //         contains_letter = true;
    //       }
    //     }

    //     return contains_nb && contains_letter;
    //   }
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
