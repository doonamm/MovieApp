import axios from "axios";
import Avatar from "./Avatar";
import FormItem from "./formItem";
import validator from "validator";
import useInput from "../helper/useInput";
import '../../style/SignUpProfile.scss';

function SignUpProfile(props) {


    const { id, className } = props;

    const nickname = useInput("", false);

    function saveProfile(e) {
        e.preventDefault();

        axios.post("http://localhost:8000/api/users/" + { id } + "/profile", {
            "nickname": "",
            "gender": "male",
            "birthday": "2022-5-23",
            "avatar_url": "http://localhost",
        }).then(function (data) {
            console.log(data);
        }).catch(function () {
            console.log(data);
        })
    }

    return (
        <>
            <form action="#" onSubmit={saveProfile} className={className}>
                <Avatar />

                <FormItem
                    title="Nickname"
                    type="text"
                    useInputObject={nickname}
                    className="input_form"
                    placeholder="Nickname"
                />

                <select name="gender">
                    <option value="none" selected>Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">other</option>
                </select>


                <FormItem
                    title="Birthday"
                    type="date"
                    className="input_form"
                    placeholder="Birthday"
                />

                <button>SAVE</button>
            </form>

        </>
    );
}

export default SignUpProfile;