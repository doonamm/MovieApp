export default function Input(props){
    if(!props.useInputObject){
        const {error} = props;
        return(
            <div className={error ? 'input error' : 'input'}>
                <input 
                    type={props.type} 
                    placeholder={props.placeholder || ""}
                    value={props.value}
                    onChange={props.onChange} 
                />
                {error && <p>{error}</p>}
            </div>
        );
    }
    const {value, setValue, error} = props.useInputObject;
    return (
        <div className={error ? 'input error' : 'input'}>
            <input
                type={props.type}
                placeholder={props.placeholder || ""}
                value={value}
                onChange={(e)=>setValue(e.target.value)}
            />
            {error && <p>{error}</p>}
        </div>
    ) 
}