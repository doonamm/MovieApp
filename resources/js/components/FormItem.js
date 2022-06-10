import Input from "./Input";

export default function FormItem(props) {
    return (
        <div className="a">
            <h4>{props.title}</h4>
            <Input
                type={props.type}
                useInputObject={props.useInputObject}
            />
        </div>
    );
}
