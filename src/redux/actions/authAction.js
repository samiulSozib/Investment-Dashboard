import axios from "axios"
//const base_url=process.env.REACT_APP_BASE_URL
//const base_url='http://localhost:1000'
const base_url='https://investment-api.nodescript-it.com'

const loginUrl=`${base_url}/auth/sign-in`

export const singIn=(signInInfo)=>{
    return async(dispatch)=>{
        console.log(signInInfo)
        dispatch({type:"SIGN_IN_REQUEST"})
        try{
            const response=await axios.post(loginUrl,{email:"samiulcse2018@gmail.com",password:"1111111"})
            console.log(response)
            const {token,user}=response.data
            dispatch({type:"SIGN_IN_SUCCESS",payload:{token,user}})
        }catch(error){
            console.log(error)
            dispatch({type:"SIGN_IN_FAIL",payload:error.message})
        }
    }
}


export const logout = () => {
    return (dispatch) => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      dispatch({ type: 'LOGOUT' });
    };
  };