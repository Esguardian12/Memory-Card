export default function Card({ id, name, image, handleClick }) {
    return (
        <div className="card" onClick={() => handleClick(id)}>
            <img src={image} alt ={name}/>
            <p>{name.charAt(0).toUpperCase() + name.slice(1)}</p>
        </div>
    );
}