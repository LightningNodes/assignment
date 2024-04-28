import { useMutation, useQuery } from "@tanstack/react-query"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from "../utils/firebase"
import { T_Login, T_Register } from "../types/auth"

export const useUserLogin = () => {
    return useMutation({
        mutationKey: ['userLogin'],
        mutationFn: async (data: T_Login) => {
            const response = await signInWithEmailAndPassword(auth, data.email, data.password)
            return response
        }
    })
}

export const useUserRegister = () => {
    return useMutation({
        mutationKey: ['userRegister'],
        mutationFn: async (data: T_Register) => {
            const response = await createUserWithEmailAndPassword(auth, data.email, data.password);
            const user = auth?.currentUser;
            if (user) {
                await updateProfile(user, { displayName: data.name });
                return response;
            }
            throw new Error('User is not authenticated');
        }
    })
}

export const useGetUserDetails = () => {
    return useQuery({
        queryKey: ['userDetails'],
        queryFn: async () => {
            const user = auth?.currentUser;
            if (user) {
                return user;
            }
            throw new Error('User is not authenticated');
        },
        enabled: true
    })
}