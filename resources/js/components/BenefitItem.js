function BenefitItem(props) {

    const { title, content } = props;

    return (
        <div className="benefitItems">
            <h3>{title}</h3>
            <p>{content}</p>
        </div>
    );
}

export default BenefitItem;