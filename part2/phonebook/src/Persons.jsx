import Person from "./Person";

const Persons = ({persons}) => {
    return (
        persons.map((person) => (
            <div key={person.name}><Person person={person}/></div>
        ))
    )
}

export default Persons;