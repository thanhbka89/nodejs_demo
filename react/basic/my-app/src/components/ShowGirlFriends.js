const ShowGirlFriends = (props) => {
    return (
      <ul>
        {props.listGirlFriends.map((person, index) => {
          props.children(person);
          return <li key={person.id}>{person.name}</li>;
        })}
      </ul>
    );
  };

  export default ShowGirlFriends;