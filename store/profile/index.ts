import { ActionContext } from 'vuex';
import RootState from '@/entities/states/RootState';
import UserEntity from '@/entities/UserEntity';
import UserService from '@/services/UserService';
import ProfileState from '@/entities/states/ProfileState';
import SavingProjectState from '@/entities/states/SavingProjectState';
import ProjectService from '@/services/ProjectService';
import FileEntity from '@/entities/FileEntity';
import UserContactEntity from '@/entities/UserContactEntity';
import UserContactService from '@/services/UserContactService';
import CookieHelper from '@/helpers/CookieHelper';

export const state = (): ProfileState => ({
  profile: {
    id: 0,
    name: '',
    email: '',
    contacts: [],
  },
  contacts: [],
});

export const actions : any = {
  async getProfile(
    { commit }: ActionContext<ProfileState, RootState>,
    userId: number,
  ) {
    const profile = await UserService.getById(userId);

    commit('setProfile', profile);
    commit('setContacts', profile.contacts);
  },

  async saveAvatar(
    context: ActionContext<SavingProjectState, RootState>,
    avatar: FileEntity,
  ) {
    const imagePath = await ProjectService.uploadImg(avatar.file);

    return imagePath;
  },

  async saveProfile(
    { commit }: ActionContext<ProfileState, RootState>,
    profile: UserEntity,
  ) {
    await UserService.update(profile);

    CookieHelper.setCookie('user', JSON.stringify(profile));

    commit('setProfile', profile);
    commit('user/setUser', profile, { root: true });
  },

  async saveContacts(
    { commit, state: currentState }: ActionContext<ProfileState, RootState>,
    newContacts: UserContactEntity[],
  ) {
    const {
      profile: { contacts: oldContacts },
    } = currentState;

    const savingPromises = newContacts.map(async (newContact) => {
      if (newContact.id) {
        await UserContactService.update(newContact);

        return newContact;
      }

      const id = await UserContactService.create(newContact);

      return { ...newContact, id };
    });

    const deletingPromises = oldContacts
      .filter((oldContact) => !newContacts.some(
        ({ id }) => id === oldContact.id,
      ))
      .map(({ id }) => UserContactService.delete(id));

    const contacts = await Promise.all(savingPromises);

    if (deletingPromises.length) await Promise.all(deletingPromises);

    const newProfile = {
      ...currentState.profile,
      contacts,
    };

    commit('setProfile', newProfile);

    CookieHelper.setCookie('user', JSON.stringify(newProfile));

    commit('user/setUser', newProfile, { root: true });
  },
};

export const mutations = {
  setProfile(currentState: ProfileState, profile: UserEntity): void {
    currentState.profile = { ...profile };
  },

  setContacts(currentState: ProfileState, contacts: UserContactEntity[]): void {
    currentState.contacts = [...contacts];
  },
};
