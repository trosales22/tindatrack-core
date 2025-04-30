import React from 'react';
import { Input, FileInput } from 'components/ui/components';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserFormData, userSchema } from 'schemas/userSchema';
import { useEffect } from 'react';
import {
  useChangePasswordMutation,
  useMyProfileQuery,
  useUpdateMyProfileMutation,
} from 'hooks/auth';
import Button from 'components/ui/Button';
import { useQueryClient } from '@tanstack/react-query';
import { UpdatePasswordFormData, updatePasswordSchema } from 'schemas/updatePasswordSchema';
import Layout from 'components/layout/Layout';
import { useSetAuthField } from 'hooks/useSetAuthField';
import { useToast } from 'context/ToastContext';

const SettingsPage: React.FC = () => {
  const { addToast } = useToast();
  const { setAuthField } = useSetAuthField();
  const queryClient = useQueryClient();
  const {
    watch,
    setValue,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  const {
    reset: updatePasswordReset,
    register: updatePasswordRegister,
    handleSubmit: updatePasswordHandleSubmit,
    formState: { errors: updatePasswordErrors },
  } = useForm<UpdatePasswordFormData>({
    resolver: zodResolver(updatePasswordSchema),
  });

  const { data: response }: any = useMyProfileQuery({});
  const detail = response?.data?.data || null;

  useEffect(() => {
    setValue('username', detail?.username || '');
    setValue('email', detail?.email || '');
    setValue('firstname', detail?.firstname || '');
    setValue('lastname', detail?.lastname || '');
    setValue('mobile', detail?.mobile || '');
    setValue('photo_url', detail?.photo_url || null);
  }, [response]);

  const { mutate: updateMyProfile, isPending: isUpdateMyProfileLoading } =
    useUpdateMyProfileMutation({
      onSuccess: () => {
        addToast({
          message: 'Profile updated successfully.',
          type: 'success',
        });

        setAuthField('firstname', watch().firstname);
        setAuthField('lastname', watch().lastname);

        reset();
        queryClient.invalidateQueries({ queryKey: ['MY_PROFILE'] });
      },
      onError: () => {},
    });

  const { mutate: changePassword, isPending: isChangePasswordLoading } = useChangePasswordMutation({
    onSuccess: () => {
      addToast({
        message: 'Password updated successfully.',
        type: 'success',
      });

      updatePasswordReset();
    },
    onError: () => {},
  });

  const onSubmitEditProfile = (data: UserFormData) => {
    updateMyProfile(data);
  };

  const onSubmitChangePassword = (data: UpdatePasswordFormData) => {
    changePassword(data);
  };

  const onError = (errors: any) => {
    console.log('Errors:', errors);
  };

  const onUploadMainPhotoHandler = (urls: string[]) => {
    setValue('photo_url', urls[0]);
  };

  return (
    <Layout>
      <h1 className="text-xl sm:text-2xl font-semibold">Settings</h1>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
        <div className="border border-blue-100 p-5">
          <p className="text-xl font-bold">Edit Profile</p>
          <form onSubmit={handleSubmit(onSubmitEditProfile, onError)} className="w-full">
            <div className="flex flex-col items-center">
              {watch().photo_url && (
                <div className="w-32 h-32 md:w-40 md:h-40 border-2 border-dashed border-gray-300 flex items-center justify-center rounded-lg overflow-hidden">
                  <img
                    src={watch().photo_url || ''}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <FileInput
                label="Upload Main Photo"
                accept="image/*"
                maxSizeLabel="Max size: 5MB"
                className="mt-3"
                onUpload={onUploadMainPhotoHandler}
              />
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
              <Input
                label="Username"
                type="text"
                placeholder="Enter username"
                error={errors.username && errors.username.message}
                {...register('username')}
              />

              <Input
                label="Email"
                type="email"
                placeholder="Enter email"
                error={errors.email && errors.email.message}
                {...register('email')}
              />
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
              <Input
                label="Firstname"
                type="text"
                placeholder="Enter firstname"
                error={errors.firstname && errors.firstname.message}
                {...register('firstname')}
              />

              <Input
                label="Lastname"
                type="text"
                placeholder="Enter lastname"
                error={errors.lastname && errors.lastname.message}
                {...register('lastname')}
              />
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
              <Input
                label="Mobile Number"
                type="text"
                placeholder="Enter mobile number"
                error={errors.mobile && errors.mobile.message}
                {...register('mobile')}
              />
            </div>

            <div className="w-full grid grid-cols-1 gap-2">
              <div className="md:col-span-3 flex justify-end mt-5">
                <Button variant="primary" type="submit" disabled={isUpdateMyProfileLoading}>
                  {isUpdateMyProfileLoading ? 'Saving changes..' : 'Save changes'}
                </Button>
              </div>
            </div>
          </form>
        </div>

        <div className="border border-blue-100 p-5">
          <p className="text-xl font-bold">Change Password</p>
          <form
            onSubmit={updatePasswordHandleSubmit(onSubmitChangePassword, onError)}
            className="w-full"
          >
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
              <Input
                label="Old Password"
                type="password"
                placeholder="Enter old password"
                error={
                  updatePasswordErrors.old_password && updatePasswordErrors.old_password.message
                }
                {...updatePasswordRegister('old_password')}
              />

              <Input
                label="New Password"
                type="password"
                placeholder="Enter new password"
                error={
                  updatePasswordErrors.new_password && updatePasswordErrors.new_password.message
                }
                {...updatePasswordRegister('new_password')}
              />
            </div>

            <div className="w-full grid grid-cols-1 gap-2">
              <div className="md:col-span-3 flex justify-end mt-5">
                <Button variant="primary" type="submit" disabled={isChangePasswordLoading}>
                  {isChangePasswordLoading ? 'Updating password..' : 'Update Password'}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;
