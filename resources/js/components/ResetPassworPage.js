
import FormItem from "./formItem";
import useInput from '../helper/useInput';
import axios from "axios";

function ResetPasswordPage(props) {

    const oldpass = useInput("", false);
    const newpass = useInput("", false);
    const confirmpass = useInput("", false);
    const id = props.id;

    function ResetPasswordFunc(e) {
        e.preventDefault();

        axios.post("http://localhost:8000/api/users/" + id, {
            'password': oldpass.value,
            'newpassword': newpass.value,
            'confirm_password': confirmpass.value,
        })
            .then(function (data) {
                console.log(data);
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    return (
        <div>
            <form action="#" onSubmit={ResetPasswordFunc}>
                <FormItem
                    title="Old Password "
                    type="password"
                    useInputObject={oldpass}
                    className="input_form"
                    placeholder="Old Password"
                />
                <FormItem
                    title="New Password"
                    type="password"
                    useInputObject={newpass}
                    className="input_form"
                    placeholder="Password"
                />
                <FormItem
                    title="Confirm Password"
                    type="password"
                    useInputObject={confirmpass}
                    className="input_form"
                    placeholder="Confirm Password"
                />
                <input className='resetPasswordBTN' type="submit" value="Reset Password" />
            </form>
        </div>
    );
}

export default ResetPasswordPage;