import {Link} from "react-router-dom";

export default function Login(props) {    
    return (
        <>
        <form className="w-[100%] max-w-[320px] flex flex-col gap-[1.2rem] p-[2rem] text-center login-form">
            <h1 className="text-[3.0rem] mb-[1rem]">{props.role}</h1>
            <input type="email" placeholder="Email" required className="focus:outline-none focus:ring-2 focus:ring-blue-400 invalid:focus:ring-red-400" />
            <input type="password" placeholder="Password" required className="focus:outline-none focus:ring-2 focus:ring-blue-400 invalid:focus:ring-red-400"/>

            <div className="flex items-center gap-[0.5rem] text-[1rem] justify-start ml-3">
                <input type="checkbox" id="remember" className="accent-black" />
                <label htmlFor="remember">Remember my password</label>
            </div>

            <button type="submit" className="login-btn">LOGIN</button>
        </form>
        </>
    )
}
