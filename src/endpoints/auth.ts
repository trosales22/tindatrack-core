import axios from 'axios';
import { LoginPayload, RegisterBusinessAdminPayload } from 'types/auth';

interface UpdateMyProfilePayload {
    username?: string;
    email?: string;
    firstname: string;
    lastname?: string;
}

interface ChangePaswordPayload {
    old_password?: string;
    new_password?: string;
}

export const login = (payload: LoginPayload) => axios.post('/api/v1/core/login', payload);

export const logout = () => axios.post('/api/v1/core/logout');

export const myProfile = () => axios.get('/api/v1/core/my_profile');

export const updateMyProfile = (payload: UpdateMyProfilePayload) => axios.put('/api/v1/core/my_profile', payload);

export const changePassword = (payload: ChangePaswordPayload) => axios.put('/api/v1/core/change_password', payload);

export const registerBusinessAdmin = (payload: RegisterBusinessAdminPayload) => axios.post('/api/v1/core/business_admin/register', payload);