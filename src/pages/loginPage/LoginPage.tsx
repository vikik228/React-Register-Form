import {InpRegEmail, InpRegPassword} from "../../components/input/InpReg.tsx";
import { Link, useNavigate } from "react-router-dom";
import type { Users } from "../registerPage/users.ts";
import '../../components/form/reg-form.css'
import '../registerPage/register-page..css'
import { LogButton } from "../../components/button/LogButton.tsx";
import { Toast } from "../../components/Toast/Toast.tsx";
import { useState } from "react";
import { toast } from "react-hot-toast";

function LoginPage() {

    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    const navigate = useNavigate();





    const [login, setLogin] = useState<Omit<Users, 'id' | 'login'>>({
        email: '',
        password: '',
    });

    const handleLogin = async (e: React.SubmitEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/info');
            if (!response.ok) {
                throw new Error("Error");
            }
            const users: Users[] = await response.json();
            const foundUser = users.find(
                (user) => user.email === login.email && user.password === login.password
            );
            if (foundUser) {
                setIsSuccess(true);
                setIsError(false);


                setTimeout(() => {
                    toast.dismiss();
                    navigate("/Auth");
                }, 1500)

            }
            else {
                setIsError(true);
                setIsSuccess(false);
                setTimeout(() => {
                    setIsError(false);
                }, 3000);
            }
        } catch (e) {
            setIsError(true);
            setIsSuccess(false);
            setTimeout(() => {
                setIsError(false);
            }, 3000);
        }
    };

    return (
        <form onSubmit={handleLogin}>

        <div className="background">
            <div className="page">
                <div className="card">
                    <label className="font1">Почта</label>
                    <InpRegEmail
                        value={login.email}
                        onChange={(value) => setLogin(prev => ({...prev, email: value}))}
                    />
                    <label className="font1">Пароль</label>
                    <InpRegPassword
                        value={login.password}
                        onChange={(value) => setLogin(prev => ({...prev, password: value}))}
                    />
                    <p className="login-link" >
                        <Link to="/">Нет аккаунта? Зарегистрироваться</Link>
                    </p>
                    <LogButton />
                    {isSuccess && <Toast message="Вы успешно вошли" type="success" />}
                    {isError && <Toast message={"Ошибка входа"} type="error" />}
                </div>
            </div>
        </div>
        </form>
    )
}

export default LoginPage;