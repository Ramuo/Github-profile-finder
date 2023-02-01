import {useState, useContext} from 'react';
import GithubContext from '../../context/github/GithubContext';
import AlertContext from '../../context/alert/AlertContext';
import {searchUsers} from '../../context/github/GithubActions';

function UserSearch() {
    // context
    const {users, dispatch} = useContext(GithubContext);
    const {setAlert}= useContext(AlertContext);

    //State
    const [text, setText] = useState('');

    //functions
    const handleChange = (e)=>{
        setText(e.target.value);
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(text === ''){
            setAlert('Saisissez un nom de profil', 'erreur')
        }else{
            dispatch({type: 'SET_LOADING'})
            const users = await searchUsers(text)
            dispatch({type: 'GET_USERS', payload: users})

            setText('');
        }
    }

  // Rendered items  
  return (
    <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 mb-8 gap-8'>
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <div className="relative">
                        <input type="text" className="w-full pr-40 bg-gray-200 input 
                        input-lg text-black" 
                        placeholder='Chercher des Profils'
                        value={text}
                        onChange={handleChange}
                        />
                        <button type='submit' className="absolute top-0 right-0 
                        rounded-l-none w-36 btn btn-lg">
                            Envoyer
                        </button>
                    </div>
                </div>
            </form>
        </div>
        {users.length > 0 && (
            <div>
                <button onClick={()=> dispatch({type: 'CLEAR_USERS'})} className='btn btn-ghost btn-lg'>
                    Restaurer
                </button>
            </div>
        )}
    </div>
  )
}

export default UserSearch