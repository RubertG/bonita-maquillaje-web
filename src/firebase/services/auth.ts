import { signInWithEmailAndPassword, UserCredential } from "firebase/auth"
import { auth } from "../initializeApp"
import { FirebaseError } from "firebase/app"

interface TypeError {
  code?: string;
  message: string;
}

interface SignInReturn {
  userCredential: UserCredential | null;
  error: TypeError | null;
}

export const signIn = async (email: string, password: string): Promise<SignInReturn> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return { userCredential, error: null }
  } catch (error) {
    if (error instanceof FirebaseError) {
      const customError: TypeError = {
        code: error.code,
        message: error.message || "Error al iniciar sesión"
      }
      return { userCredential: null, error: customError }
    }
    const customError: TypeError = {
      message: "Error desconocido al iniciar sesión"
    }
    return { userCredential: null, error: customError }
  }
}


export const singOut = async () => {
  try {
    await auth.signOut()    
  } catch (error) {
    return error as TypeError
  }
}