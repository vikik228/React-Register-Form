import type { RegisterPageProps } from "../../pages/registerPage/regPageProps.ts";
import './inp-reg.css'

export function InpRegEmail( {value, onChange }: RegisterPageProps) {

    return (
        <input
            type="email"
            placeholder='Email'
            onChange={(e) => onChange(e.target.value)}
            value={value}
            required
        />
    );
 }


export function InpRegPassword({value, onChange }: RegisterPageProps) {
    return (
        <input
            type="password"
            placeholder='Password'
            maxLength={30}
            value={value}
            onChange={(e) => onChange(e.target.value)}

            required
        />
    )
}
export function InpRegLogin({value, onChange }: RegisterPageProps) {
    return (
        <input
            type="text"
            placeholder='Login'
            maxLength={15}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required
        />
    )
}
