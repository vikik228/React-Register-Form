import './reg-form.css'
import '../../pages/registerPage/register-page..css'
import {InpRegEmail, InpRegLogin, InpRegPassword} from "../input/InpReg.tsx";
import {RegButton} from "../button/RegButton.tsx";
import type { Users } from "../../pages/registerPage/users.ts";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Toast } from "../Toast/Toast.tsx";


export function RegForm() {

    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    const [formdata, setFormdata] = useState<Omit<Users, 'id'>>({
        login: '',
        email: '',
        password: '',
    });


    const handleSubmit = async (event: React.SubmitEvent) => {
        event.preventDefault();
        try {
            const response = await fetch('/api/info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formdata),
            });
            if (!response.ok) {

                setIsError(true);
                setIsSuccess(false);
                setTimeout(() => {
                    setIsError(false);
                }, 3000)
                return;
            }
            setIsError(false);
            setIsSuccess(true);
            setTimeout(() => {
                setIsSuccess(false);
            }, 3000)
            await response.json();
            setFormdata({login: "", email: "", password: ""});
        } catch (e) {
            setIsError(true);
            setIsSuccess(false);
            setTimeout(() => {
                setIsError(false);
            }, 3000)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
        <div className="card">
            <label className="font1">Почта</label>
                <InpRegEmail
                    value={formdata.email}
                    onChange={(value) => setFormdata (prev => ({ ...prev, email: value }))}
                />
            <label className="font1">Логин</label>
                <InpRegLogin
                    value={formdata.login}
                    onChange={(value) => setFormdata (prev => ({ ...prev, login: value }))}
                />
            <label className="font1">Пароль</label>
                <InpRegPassword
                    value={formdata.password}
                    onChange={(value) => setFormdata (prev => ({ ...prev, password: value }))}
                />
            <p className="login-link" >
                <Link to="/login">Есть аккаунт? Войти</Link>
            </p>
            <RegButton/>
            {isSuccess && <Toast message="Успешная регистрация" type={'success'} />}
            {isError && <Toast message="Ошибка регистрации" type={'error'} />}
        </div>
        </form>

    )
}

