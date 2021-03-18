import { useDispatch } from 'react-redux'
import { removeUser } from '../store/actions/userAction'
function UsersList (props) {
  const dispatch = useDispatch()
  
  const remove = (id) => {
    dispatch(removeUser(id))
  }

  return (
    <tr>
      <td>
        <div className="icon">{props.user.name.split(" ").map((n)=>n[0].toUpperCase()).join("")}</div>
      </td>
      <td>{props.user.name}</td>
      <td>{props.user.phone_number}</td>
      <td>{props.user.email}</td>
      <td><button onClick={() => remove(props.user._id)} style={{border: 'none', background: 'white'}}><i style={{color: 'red'}} class="fas fa-trash"></i></button></td>
    </tr>
  )
}

export default UsersList