
import {createContext, useReducer} from 'react';
import githubReducer from './GithubReducer';


const GithubContext = createContext();

// const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
// const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({children})=>{

    // REDUCER
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false,
      }
    const [state, dispatch] = useReducer(githubReducer, initialState)

    // FUNCTION
   

    // clear user from state (restaurer)
    // const clearUsers = ()=>{
    //     dispatch({
    //         type: 'CLEAR_USERS'
    //     })
    // }

    // // set loading
    // const setLoading = ()=>dispatch({type: 'SET_LOADING'})

    // RENDERED ELEMENTS
    return (
        <GithubContext.Provider value={{
            ...state,
            dispatch,
        }}>
            {children}
        </GithubContext.Provider>
    )
} 

export default GithubContext